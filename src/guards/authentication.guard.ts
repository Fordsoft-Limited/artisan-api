import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { NotificationMessage } from 'src/utils/app.util';


@Injectable()
export class AuthenticationGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean  {

        const host = context.switchToHttp(),
                request = host.getRequest();

        const user = request["user"];

        if (!user) {
            console.log("User not authenticated, denying access...");
            throw new UnauthorizedException(NotificationMessage.UNAUTHORIZED_USER);
        }

        console.log("User is authenticated, allowing access");

        return true;
    }

}
