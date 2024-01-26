import { CommandBase } from '@app/shared/cqrs/command.base';

type CreateUserCommandProps = {
  firstName: string;
  lastName: string;
  bio: string;
};

export class CreateUserCommand extends CommandBase<CreateUserCommandProps> {
  constructor(props: CreateUserCommandProps) {
    super(props);
  }
}
