import { CommandBase } from '@app/shared/cqrs/command.base';

type CreateUserCommandProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  coachName?: string;
  coachPhone?: string;
  platinumName?: string;
};

export class CreateUserCommand extends CommandBase<CreateUserCommandProps> {
  constructor(props: CreateUserCommandProps) {
    super(props);
  }
}
