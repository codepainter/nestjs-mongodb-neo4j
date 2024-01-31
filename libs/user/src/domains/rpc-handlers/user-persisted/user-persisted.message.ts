import { MessageBase } from '@app/shared/rabbit-mq/message.base';

import { UserProps } from '../../user.aggregate';

export type UserPersistedMessageProps = Pick<
  UserProps,
  'id' | 'name' | 'email' | 'createdAt'
>;

export class UserPersistedMessage extends MessageBase<UserPersistedMessageProps> {
  constructor(props: UserPersistedMessageProps) {
    super(props);
  }
}
