export class ErrorCode{
    static readonly HTTP_200:number=200
    static readonly HTTP_400:number=400
    static readonly HTTP_500:number=500
    static readonly HTTP_403:number=403
    static readonly HTTP_509:number=509
    static readonly HTTP_404:number=404
    static readonly HTTP_201:number=201

}
export class NotificationMessage{
    static readonly FAIL_STATUS:string="Fail"
    static readonly SUCCESS_STATUS:string="Success"
    static readonly UNAUTHORIZED_USER:string="You are not authorized to access this resource"
    static readonly RECORD_NOT_FOUND:string="Record with specified constraints not found"

    static readonly INVALID_ACTIVATION_CODE:string="Activation code not valid or have been previously used"
    static readonly DUPLICATE_ACCOUNT:string="Record with specified email/phone already exists"
    static readonly INVALID_USER:string="Either username/password is incorrect"
    static readonly VISITOR_FORM_SUBMITTED:string="Great! You have successfully submitted your visitation form. We will get in touch with you soon."
    static readonly INVITATION_SENT:string="Great! invitation successfully sent to the user"
    static readonly ACCOUNT_ACTIVATED:string="Great! Account successfully activated"
    static readonly ADVERTISEMENT_SAVED:string= "Advertisement success"
}