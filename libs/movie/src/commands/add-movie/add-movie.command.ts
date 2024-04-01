import { CommandBase } from '@app/shared/cqrs/command.base';

type AddMovieCommandProps = {
  title: string;
};

export class AddMovieCommand extends CommandBase<AddMovieCommandProps> {
  constructor(props: AddMovieCommandProps) {
    super(props);
  }
}
