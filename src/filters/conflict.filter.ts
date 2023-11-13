import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {ValidationException} from './validation.exception';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { DuplicateResourceException } from './conflict.exception';

@Catch(DuplicateResourceException)
export class ConflictFilter implements ExceptionFilter {

    catch(exception: ValidationException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_509).json({
           statusCode:ErrorCode.HTTP_509,
           message: NotificationMessage.FAIL_STATUS,
           data: exception.message
        });

    }

}