export interface IMovieService {
  getAllIds(): Promise<string[]>;

  countAll(): Promise<number>;
}
