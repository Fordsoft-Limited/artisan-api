import { Transform, Type } from 'class-transformer';
export class ArtisanApiResponse{
    data: any;
    message: string;
    statusCode: number;
    constructor(data:any, message: string, statusCode:number){
       this.data=data;
       this.message=message;
       this.statusCode=statusCode;
    }
}

class ContactResponse {
  category: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
}

export class LoginResponse {
  isActive: boolean;
  isBlocked: boolean;
  username: string;
  token: string;
  contact: ContactResponse;
}
