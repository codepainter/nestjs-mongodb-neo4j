export interface IMovieNeo4jReadRepository {
  getAllIds(): Promise<string[]>;
  countAll(): Promise<number>;
}
