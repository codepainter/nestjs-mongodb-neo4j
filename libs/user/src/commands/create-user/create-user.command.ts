import { CommandBase } from '@app/shared/cqrs/command.base';

type CreateUserCommandProps = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserCommand extends CommandBase<CreateUserCommandProps> {
  constructor(props: CreateUserCommandProps) {
    super(props);
  }
}
