import { UserModule } from '@app/user';
import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AUTH_SERVICE } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginCommandHandler } from './commands/login/login.command-handler';
import { AuthConfigModule } from './config/config.module';
import { AuthConfigService } from './config/config.service';
import { LoginController } from './controllers/login/login.controller';
import { AuthErrorInterceptor } from './interceptors/auth.error-interceptor';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const CommandHandlers: Provider[] = [LoginCommandHandler];

const Services = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
];

const Strategies: Provider[] = [LocalStrategy, JwtStrategy];

const Interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: AuthErrorInterceptor,
  },
];

@Module({
  controllers: [LoginController],
  imports: [
    CqrsModule,
    PassportModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (config: AuthConfigService) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
    }),
    UserModule,
  ],
  providers: [...Strategies, ...CommandHandlers, ...Services, ...Interceptors],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
