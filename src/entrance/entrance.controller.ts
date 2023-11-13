import { Body, Controller, HttpCode, Param, Post, Res } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { LoginRequest } from './model/login.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { ErrorCode } from 'src/utils/app.util';

@Controller('entrance')
export class EntranceController {
    constructor(private entranceService: EntranceService){}

    @Post("login")

    @HttpCode(ErrorCode.HTTP_200)
    async login(@Body() payload: LoginRequest):Promise<ArtisanApiResponse>{
        return await this.entranceService.login(payload)
    }
}
