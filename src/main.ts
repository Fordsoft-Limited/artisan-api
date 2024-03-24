import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { FallbackExceptionFilter } from "./filters/fallback.filter";
import { HttpExceptionFilter } from "./filters/http.filter";
import { ValidationException } from "./filters/validation.exception";
import { ValidationFilter } from "./filters/validation.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
async function bootstrap() {
  const expressApp = express();
  expressApp.set('trust proxy', 1);
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: ["http://localhost:5000","http://localhost:4200","http://localhost:3000","http://admin-artisan.fordsoft.tech"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Artisan Web Service")
    .setDescription("A set of API for management of the artisan website and administrative dashboard")
    .setVersion("1.0")
    .addTag("Artisan","Web Service")
    .addBearerAuth(
      {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
      })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) => `${error.property} has wrong value ${error.value},
              ${Object.values(error.constraints).join(", ")} `
        );

        return new ValidationException(messages);
      },
    })
  );
  await app.listen(5000,()=>console.log("Application started"));
}
bootstrap();
