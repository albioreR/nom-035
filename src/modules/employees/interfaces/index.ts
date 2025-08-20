import { Employees } from '@prisma/client';

import {
  TDepartmentsCatalog,
  TJobPositionsCatalog,
  TWorkShifts,
} from '@/catalogs';
import { TOmitFieldsControl } from '@/config';
import { TUserAttributesSelected } from '@/modules/users';

export type TEmployeesWithoutControlFields = TOmitFieldsControl<Employees>;

export type TEmployeesFindAll = Pick<
  TEmployeesWithoutControlFields,
  | 'id'
  | 'birthDate'
  | 'firstName'
  | 'secondName'
  | 'cellphone'
  | 'lastName'
  | 'email'
  | 'cp'
  | 'motherLastName'
  | 'street'
  | 'noEmployee'
  | 'idDepartment'
  | 'idJobPosition'
  | 'idWorkShift'
>;

export interface IEmployeesAttributesNoFormat
  extends Omit<
    TEmployeesFindAll,
    'idDepartment' | 'idJobPosition' | 'idWorkShift' | 'id' | 'birthDate'
  > {
  department: string;
  jobPosition: string;
  workShift: string;
  birthDate: string;
}

export interface IEmployeesFindAll extends TEmployeesFindAll {
  users: Pick<TUserAttributesSelected, 'id' | 'name' | 'lastname'>;
}

export interface IEmployeesImport {
  'Primer Nombre': string;
  'Segundo Nombre': string;
  'Apellido Paterno': string;
  'Apellido Materno': string;
  Celular: number;
  Correo: string;
  Domicilio: string;
  'Código Postal': number;
  Cumpleaños: number;
  Departamento: string;
  Puesto: string;
  Turno: string;
  '# Empleado': string;
}

export interface IXlsxArray {
  xlsxArray: IEmployeesImport[];
}

export interface ISetFieldToBulkCreate {
  departments: TDepartmentsCatalog[];
  jobPositions: TJobPositionsCatalog[];
  workShifts: TWorkShifts[];
  findId?: boolean;
}
