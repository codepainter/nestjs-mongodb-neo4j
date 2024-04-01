import { CommandBase } from '@app/shared/cqrs/command.base';
import { UserVM } from '@app/user/vms/user.vm';

type LoginCommandProps = {
  user: UserVM;
};

export class LoginCommand extends CommandBase<LoginCommandProps> {
  constructor(props: LoginCommandProps) {
    super(props);
  }
}
