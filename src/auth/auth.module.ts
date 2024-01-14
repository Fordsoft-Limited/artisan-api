import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import SecretConfig from '../config/secret.config'
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      load:[SecretConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret=configService.get<string>('JWT_SECRET')
        console.log("JWT_KEY::::", secret)
        return {
          secret,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [JwtModule,AuthService]
})
export class AuthModule {}
