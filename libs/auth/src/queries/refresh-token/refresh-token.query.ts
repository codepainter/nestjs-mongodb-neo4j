import { QueryBase } from '@app/shared/cqrs/query.base';

export type RefreshTokenQueryProps = {
  id: string;
  refreshToken: string;
};

export class RefreshTokenQuery extends QueryBase<RefreshTokenQueryProps> {
  constructor(props: RefreshTokenQueryProps) {
    super(props);
  }
}
