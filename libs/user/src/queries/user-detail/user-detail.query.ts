import { QueryBase } from '@app/shared/cqrs/query.base';

type UserDetailsQueryProps = {
  id: string;
};

export class UserDetailsQuery extends QueryBase<UserDetailsQueryProps> {
  constructor(props: UserDetailsQueryProps) {
    super(props);
  }
}
