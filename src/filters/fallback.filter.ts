import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import { ErrorCode } from 'src/utils/app.util';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter{

    catch(exception: any, host: ArgumentsHost)  {

        console.log("fallback exception handler triggered",
            JSON.stringify(exception));

        const ctx = host.switchToHttp(),
            response = ctx.getResponse();


        return response.status(ErrorCode.HTTP_500).json({
            statusCode: ErrorCode.HTTP_500,
            message: ErrorCode.FAIL_STATUS,
            createdBy: "FallbackExceptionFilter",
            data: exception.message ? exception.message :
                'Unexpected error ocurred'
        })

    }


}
