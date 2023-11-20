import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports:[
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
