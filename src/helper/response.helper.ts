import { HttpStatus } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';

export class DefaultResponse {
  static readonly EMPTY_STRING = '';
  static sendBadRequest(message: string, data: any = null): ResponseDTO {
    return {
      success: false,
      message,
      data,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  static sendNotFound(message: string, data: any = null): ResponseDTO {
    return { success: false, message, data, statusCode: HttpStatus.NOT_FOUND };
  }

  static sendCreated(message: string, data: any = null): ResponseDTO {
    return { success: true, message, data, statusCode: HttpStatus.CREATED };
  }

  static sendOk(message: string, data: any = null): ResponseDTO {
    return { success: true, message, data, statusCode: HttpStatus.OK };
  }

  static sendUnauthorized(message: string, data: any = null): ResponseDTO {
    return {
      success: false,
      message,
      data,
      statusCode: HttpStatus.UNAUTHORIZED,
    };
  }

  static sendConflict(message: string, data: any = null) {
    return { success: false, message, data, statusCode: HttpStatus.CONFLICT };
  }

  static sendInternalServerError(message: string, data: any = null) {
    return {
      success: false,
      message,
      data,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
