import { CommandBase } from '@app/shared/cqrs/command.base';

type LoginCommandProps = {
  email?: string;
  phone?: string;
  password: string;
};

export class LoginCommand extends CommandBase<LoginCommandProps> {
  constructor(props: LoginCommandProps) {
    super(props);
  }
}
