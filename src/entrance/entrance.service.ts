import { Injectable } from '@nestjs/common';
import { LoginRequest, LoginResponse } from './model/model';

@Injectable()
export class EntranceService {

    async login(login: LoginRequest): Promise<LoginResponse>{
        return new LoginResponse("admin","test", "test", "Oyejide", "Odofin")
    }
}
