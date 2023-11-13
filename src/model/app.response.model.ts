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