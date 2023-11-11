import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import { ErrorCode } from 'src/utils/app.util';


@Catch(HttpException)
export class HttpExceptionFilter implements  ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        console.log("HTTP exception handler triggered",
            JSON.stringify(exception));

        const ctx = host.switchToHttp();

        const response = ctx.getResponse(),
              request = ctx.getRequest(),
               statusCode = exception.getStatus();


        return response.status(statusCode).json({
            status: statusCode,
            createdBy: "HttpExceptionFilter",
            message: ErrorCode.FAIL_STATUS,
            data: exception.message
        });
    }

}
