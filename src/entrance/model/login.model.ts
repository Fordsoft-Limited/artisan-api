// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
export class LoginResponse{
    username: string;
    token: string;
    refreshToken: string;
    firstName: string;
    lastName: string;
    role: string[];
    constructor(username:string, token: string, refreshToken:string, firstName:string, lastName:string){
        this.username=username;
        this.token=token;
        this.refreshToken=refreshToken;
        this.firstName=firstName;
        this.lastName=lastName;
        this.role=["ADMIN","SUPER"]
    }
}