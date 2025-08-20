export interface IRenderTemplate<T> {
  template: string;
  context: T;
}

export interface ISendEmail<T> extends IRenderTemplate<T> {
  to: string[];
  subject: string;
  from?: string;
}

export interface ISearchFileByRoute {
  route: string;
  nameFile: string;
}

export interface ISendNewUser {
  email: string;
  password: string;
}
