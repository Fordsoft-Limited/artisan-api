import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateResourceException extends ConflictException {
  constructor(message: string) {
    super(message)
  }
}