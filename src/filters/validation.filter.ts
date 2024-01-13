import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {ValidationException} from './validation.exception';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { FileNotFoundException } from './file.fount.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {

    catch(exception: ValidationException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_400).json({
           statusCode:ErrorCode.HTTP_400,
           message: NotificationMessage.FAIL_STATUS,
           createdBy: "ValidationFilter",
           data: exception.validationErrors
        });

    }

}

@Catch(FileNotFoundException)
export class FileNotFoundFilter implements ExceptionFilter {

    catch(exception: FileNotFoundException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_400).json({
           statusCode:ErrorCode.HTTP_400,
           message: NotificationMessage.FAIL_STATUS,
           createdBy: "ValidationFilter",
           data: exception.validationErrors
        });

    }

}
