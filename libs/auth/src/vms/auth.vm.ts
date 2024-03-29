import { Expose } from 'class-transformer';

export class AuthVM {
  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  constructor(props: AuthVM) {
    Object.assign(this, props);
  }
}
