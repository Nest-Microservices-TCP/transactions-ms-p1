export interface IUnitForWork {
  start(): Promise<void>;
  complete(work: () => Promise<void>): Promise<void>;
}
