import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { ClassValidatorExceptionFactory } from '@app/shared/class-validator/class-validator.exception-factory';
import { HttpExceptionFilter } from '@app/shared/filters/http-exception.filter';
import { ValidationExceptionFilter } from '@app/shared/filters/validation-exception.filter';
import { ResponseInterceptor } from '@app/shared/http/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  const logger = app.get<PinoLogger>(PinoLogger);
  app.useLogger(logger);

  const appConfig = app.get(AppConfigService);

  if (!appConfig.isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NestJS MongoDB Neo4j Api Service')
      .setDescription('NestJS MongoDB Neo4j Api Service')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      exceptionFactory: ClassValidatorExceptionFactory,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  await app.listen(appConfig.port).then(() => {
    logger.log(
      `[${appConfig.env}] API Service is listening on port: ${appConfig.port}`,
    );
  });
}
bootstrap();
