import { customAlphabet } from 'nanoid';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import * as pino from 'pino';
import { Options } from 'pino-http';

import { Module } from '@nestjs/common';

import { LoggerConfigModule } from './config/config.module';
import { LoggerConfigService } from './config/config.service';
import { ExpressRequest, ExpressResponse } from './interfaces/logger.interface';
import { LogLevel } from './logger.constants';

export type LoggerModuleOptions = {
  exclude?: string[];
};

@Module({})
export class LoggerModule {
  static init(options?: LoggerModuleOptions) {
    return {
      global: true,
      module: LoggerModule,
      imports: [
        PinoLoggerModule.forRootAsync({
          imports: [LoggerConfigModule],
          inject: [LoggerConfigService],
          useFactory: (config: LoggerConfigService) => ({
            pinoHttp: this.generatePinoHttpOptions(config),
            exclude: options ? options.exclude : undefined,
          }),
        }),
      ],
    };
  }

  static generatePinoHttpOptions(config: LoggerConfigService): Options {
    const isLocal = config.isLocal;
    const isProduction = config.isProduction;

    const genReqId = (req, res) => {
      const existingID = req.id ?? req.headers['x-request-id'];
      if (existingID) return existingID;

      const nanoid = customAlphabet('1234567890abcdef', 16);
      const id = nanoid();
      res.setHeader('X-Request-Id', id);

      return id;
    };

    const serializers = {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    };

    const customSuccessMessage = (
      req: ExpressRequest,
      res: ExpressResponse,
    ) => {
      if (res.statusCode === 404) {
        return 'resource not found';
      }
      if (res.statusCode >= 500) {
        return 'unhandled error';
      }
      return `${req.method} completed`;
    };

    const customReceivedMessage = (
      req: ExpressRequest,
      _res: ExpressResponse,
    ) => {
      return 'request received: ' + req.method;
    };

    const customErrorMessage = (
      _req: ExpressRequest,
      res: ExpressResponse,
      _err,
    ) => {
      return 'request errored with status code: ' + res.statusCode;
    };

    const customAttributeKeys = {
      req: 'request',
      res: 'response',
      err: 'error',
      responseTime: 'timeTaken',
      reqId: 'requestId',
    };

    return {
      enabled: !config.isTest,
      level: isProduction ? LogLevel.Info : config.level,
      transport: isLocal ? { target: 'pino-pretty' } : undefined,
      genReqId,
      serializers,
      customSuccessMessage,
      customReceivedMessage,
      customErrorMessage,
      customAttributeKeys,
      quietReqLogger: isLocal,
    };
  }
}
