import { Expose } from 'class-transformer';

export class AuthVM {
  @Expose({ name: 'access_token' })
  readonly accessToken: string;

  @Expose({ name: 'refresh_token' })
  readonly refreshToken?: string;

  constructor(props: AuthVM) {
    Object.assign(this, props);
  }
}
