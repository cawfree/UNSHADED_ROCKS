export enum MintType {
  MINT = 'MINT',
  CLAIM = 'CLAIM',
}

export type Holder = {
  readonly address: string;
  readonly count: string;
};

export type Purchase = {
  readonly address: string;
  readonly price: string;
  readonly blockNumber: string;
  readonly tokenIds: readonly string[];
};

export enum MintState {
  UNINITIALIZED = 'UNINITIALIZED',

  PERFORMING_MINT = 'PERFORMING_MINT',
  PERFORMING_CLAIM = 'PERFORMING_CLAIM',

  // TODO: I think we can remove these
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type MintContextState = Readonly<
  | {state: MintState.UNINITIALIZED}
  | {
      state: MintState.PERFORMING_MINT | MintState.PERFORMING_CLAIM;
      transactionHash: string | null;
    }
  | {
      state: MintState.ERROR;
      transactionHash: string | null;
      error: Error;
    }
  | {
      state: MintState.SUCCESS;
      transactionHash: string | null;
    }
>;

export type OnRequestMintCallbackProps = {
  readonly type: MintType.MINT,
  readonly numberOfItemsToMint: number;
} | {
  readonly type: MintType.CLAIM,
};

export type OnRequestMintCallbackResult = void;

export type OnRequestMintCallback = (props: OnRequestMintCallbackProps) => Promise<
  OnRequestMintCallbackResult
>;

export type OnFinishMintCallback = () => void;

export type MintContextValue = Readonly<
  MintContextState & {
    readonly onRequestMint: OnRequestMintCallback;
    readonly onFinishMint: OnFinishMintCallback;
  }
>;

export const isActivelyTransacting = (state: MintState) => (
  state === MintState.PERFORMING_CLAIM || state === MintState.PERFORMING_MINT
);

export const getActivityForMintType = (mintType: MintType) => {

    if (mintType === MintType.CLAIM) return MintState.PERFORMING_CLAIM;

    if (mintType === MintType.MINT) return MintState.PERFORMING_MINT;

    throw new Error(`Encountered unsupported MintType, "${
      mintType
    }".`);

}
