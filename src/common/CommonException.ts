import { MidwayError } from '@midwayjs/core';

export class CommonException extends MidwayError {
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string) {
    super(message, code.toString());
    this.code = code;
    this.message = message;
  }
}
