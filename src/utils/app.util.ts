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
    static readonly RATING_ADDED:string="Great rating added sucessfully"
        static readonly COMMENT_ADDED:string="Great comment added sucessfully"

    static readonly FILE_NOT_FOUND:string="The file you specified not found"
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
    static readonly ADVERTISEMENT_SAVED:string= "Advertisement successfully saved"
    static readonly ARTISAN_SAVED:string= "Artisan successfully saved"
    static readonly BLOG_DELETED:string="Great! Deleted successfully"
    static readonly ADVERISEMENT_DELETED:string="Great! Deleted successfully"
    static readonly VISITOR_DELETED:string="Great! Deleted successfully"
    static readonly ARTISAN_DELETED:string="Great! Deleted successfully"
    static readonly BLOG_PUBLISHED:string= "BLOG successfully published"
    static readonly BLOG_NOT_FOUND:string="Blog with specified constraints not found"
    static readonly ARTISAN_NOT_FOUND:string="Artisan with specified constraints not found"
    static readonly ADVERTISEMENT_NOT_FOUND:string="Artisan with specified constraints not found"
    static readonly ADVERISEMENT_NOT_FOUND:string="Adverisement with specified constraints not found"
    static readonly VISITOR_NOT_FOUND:string="Visitor with specified constraints not found"
    static readonly SERVER_ERROR:string="Server error"
    static readonly UPDATE_ARTISAN_SUCCESS:string="Artisan update Successfully"
    static readonly UPDATE_BLOG_SUCCESS:string="Blog update Successfully"
    static readonly UPDATE_ADVERTISEMENT_SUCCESS:string="ADVERTISEMENT update Successfully"
    static readonly INVALID_OLD_PASSWORD:string="Change password number not valid or have been previously used"
    static readonly PASSWORD_CHANGED_SUCCESSFULLY
     :string="Great! You have successfully changed your password"
    static readonly INVALID_RESET:string="Reset password code not valid or have been previously used"
    static readonly PASSWORD_RESET:string="Great! You have successfully reset your password "
    static readonly FORGOT_PASSWORD:string="Great! You have successfully reset your password "
    static readonly INVALID_INVITATION:string="Invitation code provided is invalid"



}