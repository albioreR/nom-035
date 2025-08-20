import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import Handlebars from 'handlebars';
import { join, resolve } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionsFilter, nodeEnv } from './config';
import { morganMiddleware } from './providers';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication | any>(AppModule);

  app.setGlobalPrefix('api/v3');
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionsFilter());
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  app.setBaseViewsDir(resolve(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  const partialsDir = resolve(__dirname, '../views/templates');
  const filenames = fs.readdirSync(partialsDir);

  filenames.forEach((filename) => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const filepath = resolve(partialsDir, filename);
    const template = fs.readFileSync(filepath, 'utf8');
    Handlebars.registerPartial(name, template);
  });

  if (process.env.NODE_ENV === nodeEnv.development) {
    const config = new DocumentBuilder()
      .setTitle('X-NOM-035')
      .setDescription('Documentación de la API de X-NOM-035, versión 3.0.0')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const customCss = fs.readFileSync(
      join(__dirname, '../public/swagger.css'),
      'utf8',
    );
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v3/swagger', app, document, {
      customCss,
    });
  }

  app.use(morganMiddleware);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
