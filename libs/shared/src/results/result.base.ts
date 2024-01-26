import { IQueryResult } from '@nestjs/cqrs';

export abstract class ResultBase<T> implements IQueryResult {
  readonly code: number | string;

  readonly message: string;

  readonly data: T;

  readonly metadata?: object;

  constructor(data: T, metadata?: object) {
    this.data = data;
    this.metadata = metadata;
  }
}
