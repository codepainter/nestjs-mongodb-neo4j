import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';

export type MovieRequiredProps = Required<{
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type MovieOptionalProps = Partial<{
  deletedAt: Date;
}>;

export type MovieProps = MovieRequiredProps & MovieOptionalProps;

export type CreateMovieProps = Omit<
  MovieProps,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface Movie {
  props: () => MovieProps;
  commit: () => void;
}

export class MovieAggregate extends AggregateRootBase implements Movie {
  private readonly id: string;
  private title: string;

  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: MovieProps) {
    super();
    Object.assign(this, props);
  }

  props(): MovieProps {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
