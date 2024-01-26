import { IEvent } from '@nestjs/cqrs';

export class EventBase<T> implements IEvent {
  readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
