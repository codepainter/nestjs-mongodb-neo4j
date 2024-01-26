import { Expose } from 'class-transformer';

export class IdVM {
  @Expose({ name: 'id' })
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
