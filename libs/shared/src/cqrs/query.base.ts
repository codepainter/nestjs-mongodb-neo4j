import { IQuery } from '@nestjs/cqrs';

export class QueryBase<T> implements IQuery {
  readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
