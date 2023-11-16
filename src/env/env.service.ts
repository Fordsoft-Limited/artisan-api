import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class EnvService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = process.env;
  }

   get(key: string): string {
    return this.envConfig[key];
  }
}
