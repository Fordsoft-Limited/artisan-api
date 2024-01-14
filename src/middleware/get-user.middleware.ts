import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService){}

    use(req: Request, res: Response, next: () => void){

        const authJwtToken = req.headers.authorization;

        if(!authJwtToken) {
            next();
            return;
        }

            const user = this.jwtService.verify(authJwtToken)

            if (user) {
                console.log("Found user details in JWT: ", user);
                req["user"] = user;
            }
        
        next();
    }
}
