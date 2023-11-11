import { Body, Controller, Post } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { LoginRequest, LoginResponse } from './model/model';

@Controller('entrance')
export class EntranceController {
    constructor(private entranceService: EntranceService){}

    @Post("login")
    async login(@Body() payload: LoginRequest):Promise<LoginResponse>{
        return await this.entranceService.login(payload)
    }
}
