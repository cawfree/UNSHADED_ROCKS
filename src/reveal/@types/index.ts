export type Purchase = {
  readonly price: bigint;
  readonly tokenIds: readonly bigint[];
};

export type PurchaseTransactionResult = {
  readonly transactionHash: string;
  readonly gasUsed: bigint;
  readonly effectiveGasPrice: bigint;
  readonly purchases: readonly Purchase[];
  readonly value: bigint;
};
