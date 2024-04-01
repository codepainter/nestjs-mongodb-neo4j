import { MovieVM } from '../vms/movie.vm';

export interface IMovieMongoReadRepository {
  getAllIds(): Promise<string[]>;

  countAll(): Promise<number>;

  getAll(page: number, limit: number): Promise<MovieVM[]>;
}
