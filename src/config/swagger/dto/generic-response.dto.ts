import { ApiProperty } from '@nestjs/swagger';

/* The GenericResponse class is a TypeScript class that represents a generic response object with
properties for success, data, info, and message. */
export class GenericResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: object;

  @ApiProperty()
  info: object;

  @ApiProperty()
  message: string;
}
