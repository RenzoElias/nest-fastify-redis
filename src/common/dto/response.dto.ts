import { HttpStatus } from '@nestjs/common';

export class ResponseDTO<T = any> {
  success: boolean;
  message: string;
  data: T;
  statusCode: HttpStatus;
}
