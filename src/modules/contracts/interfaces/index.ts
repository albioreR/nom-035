export interface ICreateContractsDto {
  title: string;
  employeesCount: number;
  idTypeTest: number;
  startDate: Date;
  endDate: Date;
  url: string;
}

export interface IGetOne extends ICreateContractsDto {
  id: number;
}
