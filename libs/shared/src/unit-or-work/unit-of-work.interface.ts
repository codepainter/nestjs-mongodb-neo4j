export interface IUnitOfWork {
  start(): Promise<void>;
  complete(work: () => void): Promise<void>;
}

export interface IUnitOfWorkFactory {
  makeUnitOfWork(name: string): IUnitOfWork;
}
