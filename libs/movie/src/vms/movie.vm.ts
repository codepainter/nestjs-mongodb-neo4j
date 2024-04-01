import { Expose } from 'class-transformer';

export class MovieVM {
  @Expose()
  readonly id: string;

  @Expose()
  readonly title: string;

  constructor(props: MovieVM) {
    Object.assign(this, props);
  }
}
