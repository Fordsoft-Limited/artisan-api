import { Body, Controller, Post } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { LoginRequest, LoginResponse } from './model/login.model';
import { ArtisanApiResponse } from 'src/model/app.model';

@Controller('entrance')
export class EntranceController {
    constructor(private entranceService: EntranceService){}

    @Post("login")
    async login(@Body() payload: LoginRequest):Promise<ArtisanApiResponse>{
        return await this.entranceService.login(payload)
    }
}
