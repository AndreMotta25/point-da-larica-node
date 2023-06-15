interface ITransaction {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollBackTransaction(): Promise<void>;
}
export { ITransaction };
