import { Injectable, Logger,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/model/user.schema';
import { NotificationMessage } from 'src/utils/app.util';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
      ) {}
    
      public getTokenForUser(user: User): string {
        return this.jwtService.sign({
          username: user.username,
          sub: user._id,
        });
      }
    
      public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
      }
    
      public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({username
        }).exec();
    
        if (!user) {
          this.logger.debug(`User ${username} not found!`);
          throw new UnauthorizedException(NotificationMessage.RECORD_NOT_FOUND);
        }
    
        if (!(await bcrypt.compare(password, user.password))) {
          this.logger.debug(`Invalid credentials for user ${username}`);
          throw new UnauthorizedException(NotificationMessage.UNAUTHORIZED_USER);
        }
    
        return user;
      }
}
