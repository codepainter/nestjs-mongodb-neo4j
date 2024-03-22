export interface IMovieMongoReadRepository {
  getAllIds(): Promise<string[]>;
  countAll(): Promise<number>;
}
