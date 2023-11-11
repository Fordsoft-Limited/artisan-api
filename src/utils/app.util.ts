export class ErrorCode{
    static readonly SUCCESS_STATUS:string="Success"
    static readonly FAIL_STATUS:string="Fail"
    static readonly HTTP_200:number=200
    static readonly HTTP_400:number=400
    static readonly HTTP_500:number=500
    static readonly HTTP_403:number=403
    static readonly HTTP_509:number=509
    static readonly HTTP_404:number=404
    static readonly HTTP_201:number=201

}
export class NotificationMessage{
    static readonly RECORD_NOT_FOUND:string="Record with specified constraints not found"
    static readonly INVALID_USER:string="Either username/password is incorrect"
}