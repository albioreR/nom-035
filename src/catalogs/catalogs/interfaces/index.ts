export interface IFieldCatalog {
  id: number;
  name: string;
}

export type TFieldsCatalog<T extends IFieldCatalog> = Pick<T, 'id' | 'name'>;
