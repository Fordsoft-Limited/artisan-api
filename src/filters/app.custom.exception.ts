import { ConflictException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class DuplicateResourceException extends ConflictException {
  constructor(message: string) {
    super(message)
  }
}

export class RecordNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message)
  }
}