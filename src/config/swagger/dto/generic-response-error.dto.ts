import { ApiProperty } from '@nestjs/swagger';

/* The GenericResponseError class is a TypeScript class that represents an error response with
properties for success, data, info, and message. */
export class GenericResponseError {
  @ApiProperty({
    example: false,
  })
  success: boolean;

  @ApiProperty()
  data: object;

  @ApiProperty()
  info: object;

  @ApiProperty({
    example: 'Mensaje de error',
  })
  message: string;
}
