import { IEvent } from '@nestjs/cqrs';

export abstract class IntegrationPublisherBase<T> implements IEvent {
  readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
