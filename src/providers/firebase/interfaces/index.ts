export interface IPath {
  path: string;
}
export interface ISetNameFile extends IPath {
  extension: string;
}
export interface IUploadFile extends IPath {
  logo: Express.Multer.File;
}
