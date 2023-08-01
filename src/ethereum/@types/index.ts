export type OnHandleTransactionHashCallbackParams = {
  readonly transactionHash: string;
};

export type OnHandleTransactionHashCallback =
  (params: OnHandleTransactionHashCallbackParams) => void;

export type EthereumContextValue = {
  readonly onHandleTransactionHash: OnHandleTransactionHashCallback;
  readonly transactionHashes: readonly string[];
};
