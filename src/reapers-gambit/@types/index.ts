export type ReapersGambitState = Readonly<
  | {loading: true}
  | {loading: false, deathBlock: bigint, blockNumber: bigint, isDead: boolean}
  | {loading: false, error: Error}
>;

export type ReapersGambitContextValue = ReapersGambitState;
