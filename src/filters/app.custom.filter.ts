import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { DuplicateResourceException, RecordNotFoundException } from './app.custom.exception';

@Catch(DuplicateResourceException)
export class ConflictFilter implements ExceptionFilter {

    catch(exception: DuplicateResourceException, host: ArgumentsHost): any {

        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_509).json({
           statusCode:ErrorCode.HTTP_509,
           message: NotificationMessage.FAIL_STATUS,
           data: exception.message
        });

    }

}

@Catch(RecordNotFoundException)
export class RecordNotFoundFilter implements ExceptionFilter {

    catch(exception: RecordNotFoundException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse();

        return response.status(ErrorCode.HTTP_509).json({
           statusCode:exception.getStatus(),
           message: NotificationMessage.FAIL_STATUS,
           data: exception.message
        });

    }

}