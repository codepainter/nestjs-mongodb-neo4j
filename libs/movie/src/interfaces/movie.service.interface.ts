export interface IMovieService {
  getAllMongoIds(): Promise<string[]>;

  countAllMongo(): Promise<number>;

  getAllNeo4jIds(): Promise<string[]>;

  countAllNeo4j(): Promise<number>;

  syncData(): Promise<void>;
}
