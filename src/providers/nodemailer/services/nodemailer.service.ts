/**
 * @fileoverview The NodemailerService class in TypeScript handles rendering email templates and sending emails using
nodemailer. */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { UserCreatedEmailEvent } from '@/modules';
import { eventsEmitter } from '@/providers';

import {
  IRenderTemplate,
  ISearchFileByRoute,
  ISendEmail,
  ISendNewUser,
} from '../interfaces';

@Injectable()
export class NodemailerService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * The function `searchFileByRoute` returns the full path of a file based on its name and route.
   * @param {ISearchFileByRoute} nameFile - The name of the file to search for.
   * @param {ISearchFileByRoute} route - The route to search for the file in.
   * @returns the full path of the file by joining the current directory (__dirname), the specified
   * route, and the name of the file.
   */
  private searchFileByRoute({ nameFile, route }: ISearchFileByRoute): string {
    return path.join(__dirname, route, nameFile);
  }

  /**
   * The function `getFile` reads and returns the content of a file specified by the `pathFile`
   * parameter as a string.
   * @param pathFile - The `pathFile` parameter in the `getFile` function is a path to a file or a file
   * descriptor that specifies the location of the file you want to read.
   * @returns The function `getFile` is returning the content of the file located at the `pathFile` in
   * string format.
   */
  private getFile(pathFile: fs.PathOrFileDescriptor): string {
    return fs.readFileSync(pathFile, 'utf8');
  }

  /**
   * The `renderTemplate` function compiles Handlebars templates for an email using a layout template
   * and specific email content.
   * @param  {T} context An object or array to be passed to the Handlebars template for rendering.
   * @param  {String} template The name file to render on email.
   * @returns The `renderTemplate` function returns a string that represents the final HTML content
   * after compiling the layout template with the email template content and context data.
   */
  renderTemplate<T>({ context, template }: IRenderTemplate<T>): string {
    const layoutPath = this.searchFileByRoute({
      route: '../../../../views/layouts',
      nameFile: 'index.hbs',
    });
    const layoutContent = this.getFile(layoutPath);
    const compiledLayout = Handlebars.compile(layoutContent);

    const emailTemplatePath = this.searchFileByRoute({
      route: '../../../../views',
      nameFile: `${template}.hbs`,
    });
    const emailContent = this.getFile(emailTemplatePath);

    const emailBody = Handlebars.compile(emailContent)(context);
    const finalHtml = compiledLayout({ body: emailBody });

    return finalHtml;
  }

  /**
   * The function creates and returns a nodemailer transporter with configuration settings obtained from
   * a config service.
   * @returns A nodemailer Transporter with the type of SentMessageInfo for SMTPTransport is being
   * returned.
   */
  createTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get<string>('EMAIL_FROM'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      port: this.configService.get<number>('EMAIL_PORT'),
    });
  }

  /**
   * The function `sendEmail` sends an email using a specified template and context to a specified
   * recipient.
   * @param  {T} context An object or array to be passed to the Handlebars template for rendering.
   * @param  {String} template The name file to render on email.
   * @param {String[]} to An array of email addresses to send the email to.
   * @param {subject} subject The subject of the email.
   * @param {String} from The email address to send the email from.
   */
  async sendEmail<T>({
    template,
    context,
    to,
    subject,
    from,
  }: ISendEmail<T>): Promise<void> {
    const html = this.renderTemplate<T>({
      context,
      template,
    });

    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const transporter = this.createTransport();

    await transporter.sendMail(mailOptions);
  }

  /**
   * The function `handleUserCreatedEvent` is an event handler that listens for the `user.created` event
   * and sends a welcome email to the new user.
   * @param {UserCreatedEmailEvent<ISendNewUser>} payload The payload of the `user.created` event
   * containing the email and password of the
   * new user.
   * @returns The `handleUserCreatedEvent` function is an asynchronous function that sends a welcome
   * email to the new user.
   */
  @OnEvent(eventsEmitter.user.created, { async: true })
  async handleUserCreatedEvent({
    payload,
  }: UserCreatedEmailEvent<ISendNewUser>): Promise<void> {
    await this.sendEmail<ISendNewUser>(payload);
  }
}
