import { UserModule } from '@app/user';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AUTH_SERVICE } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginCommandHandler } from './commands/login/login.command-handler';
import { AuthConfigModule } from './config/config.module';
import { AuthConfigService } from './config/config.service';
import { LoginController } from './controllers/login/login.controller';
import { RefreshTokenController } from './controllers/refresh-token/refresh-token.controller';
import { RefreshTokenQueryHandler } from './queries/refresh-token/refresh-token.query-handler';
import { JwtStrategy } from './strategies/jwt.strategy';

const CommandHandlers: Provider[] = [LoginCommandHandler];

const QueryHandlers: Provider[] = [RefreshTokenQueryHandler];

const Services: Provider[] = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
];

const Strategies: Provider[] = [JwtStrategy];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (config: AuthConfigService) => ({
        secret: config.secret,
      }),
    }),
    UserModule,
  ],
  providers: [...CommandHandlers, ...QueryHandlers, ...Services, ...Strategies],
  controllers: [LoginController, RefreshTokenController],
  exports: [],
})
export class AuthModule {}
