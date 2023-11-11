import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {ValidationException} from './validation.exception';
import { ErrorCode } from 'src/utils/app.util';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {

    catch(exception: ValidationException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_400).json({
           statusCode:ErrorCode.HTTP_400,
           message: ErrorCode.FAIL_STATUS,
           createdBy: "ValidationFilter",
           data: exception.validationErrors
        });

    }

}
