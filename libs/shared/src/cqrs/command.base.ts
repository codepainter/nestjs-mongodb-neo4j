import { ICommand } from '@nestjs/cqrs';

export class CommandBase<T> implements ICommand {
  readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
