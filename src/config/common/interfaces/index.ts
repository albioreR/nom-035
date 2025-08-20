import { FindAllDto } from '../dto';

export * from './prisma.interface';

export interface IBaseResponse<T> {
  success?: boolean;
  data?: T | object;
  info?: any;
  message?: string;
}

export interface IError {
  status: number;
  message: string;
  name: string;
  code: string;
}

export type IErrorNoStatus = Omit<IError, 'status'>;

export interface IHttpExceptionFIlter {
  401: (message: string) => never;
  403: (message: string) => never;
  500: (message: string) => never;
  409: (message: string) => never;
  422: (message: string) => never;
}

export interface ICommonEmail {
  email: string;
}

export interface ICommonId {
  id: number;
}

export interface ICatalogsAttributes {
  value: number;
  label: string;
}

export interface IMappingCatalogs<T> {
  data: T[];
}

export type TOmitPropControl = 'createdAt' | 'updatedAt' | 'active';

export type TPaginationControl = Omit<
  FindAllDto,
  'like' | 'likeField' | 'skip' | 'take'
>;
export type TWhereFilterControl = Pick<FindAllDto, 'like' | 'likeField'>;

export interface IPrismaPagination {
  skip?: number;
  take?: number;
}

export interface IPrismaWhereFilter<T> {
  where?: T;
}

export interface IPrismaOptions<T>
  extends IPrismaPagination,
    IPrismaWhereFilter<T> {}

export interface IPrismaUpdate<T, A> extends IPrismaWhereFilter<T> {
  data: A;
}

export interface IReturnPagination {
  skip: number;
  take: number;
}

export interface IGlobalId {
  id: number;
}

export interface IGetBooleanFromArray<T> {
  data: T[];
  property: string;
  value: any;
}

export type TFieldsControl = 'createdAt' | 'updatedAt' | 'active';

export type TOmitFieldsControl<T> = Omit<T, TFieldsControl>;
