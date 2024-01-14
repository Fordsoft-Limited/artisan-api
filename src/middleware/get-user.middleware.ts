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
        const tokenParts = authJwtToken.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
          console.error('Invalid token format');
          next();
          return;
        }
    
        const user = this.jwtService.verify(tokenParts[1]);
    
        if (user) {
          console.log('Found user details in JWT: ', user);
          req['user'] = user;
        }
        
        next();
    }
}
