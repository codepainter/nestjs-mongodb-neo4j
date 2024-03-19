import { Strategy } from 'passport-local';

import { UserVM } from '@app/user/vms/user.vm';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AUTH_SERVICE } from '../auth.constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserVM> {
    return this.authService.validateUser(email, password);
  }
}
