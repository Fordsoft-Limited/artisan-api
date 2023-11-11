import { Injectable } from '@nestjs/common';
import { LoginRequest, LoginResponse } from './model/login.model';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { ArtisanApiResponse } from 'src/model/app.model';

@Injectable()
export class EntranceService {

    async login(login: LoginRequest): Promise<ArtisanApiResponse>{
        return new ArtisanApiResponse(
            new LoginResponse("admin","test", "test", "Oyejide", "Odofin"),
            NotificationMessage.SUCCESS_STATUS,ErrorCode.HTTP_200
        )
    }
}
