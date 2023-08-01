import * as React from 'react';

import {useEthereumContext} from '@/ethereum/contexts';
import {
    MintContextState,
    MintContextValue,
    MintState,
    MintType,
    OnRequestMintCallback,
    OnRequestMintCallbackProps,
    OnRequestMintCallbackResult,
} from '@/mint/@types';
import {MintContextProvider} from '@/mint/contexts';
import {useClaimGift, useMint} from '@/mint/hooks';
import {useRocksPricePerPiece} from '@/rocks/hooks';

export const MintProvider = React.memo(
  function MintProvider({children}: React.PropsWithChildren): JSX.Element {

    const {writeAsync: shouldMint} = useMint();
    const {writeAsync: shouldClaimGift} = useClaimGift();
    const {data: maybePricePerPiece} = useRocksPricePerPiece();
    const {onHandleTransactionHash} = useEthereumContext();

    const [state, setState] = React.useState<MintContextState>({
      state: MintState.UNINITIALIZED,
    });

    const onRequestMint: OnRequestMintCallback = React.useCallback(
      async (props: OnRequestMintCallbackProps): Promise<OnRequestMintCallbackResult> => {
        try {
          const {type} = props;

          if (type === MintType.MINT) {

              if (!shouldMint) throw new Error('Mint function was not ready.');

              if (!maybePricePerPiece) throw new Error('Missing price per piece.');

              setState({state: MintState.PERFORMING_MINT, transactionHash: null});

              const {numberOfItemsToMint} = props;
              const value = (maybePricePerPiece as bigint) * BigInt(numberOfItemsToMint);

              const {hash: transactionHash} = await shouldMint({value});

              onHandleTransactionHash({transactionHash});

              setState({state: MintState.PERFORMING_MINT, transactionHash});
          } else if (type  === MintType.CLAIM) {

              if (!shouldClaimGift) throw new Error('Claim gift function was not ready.');

              setState({state: MintState.PERFORMING_CLAIM, transactionHash: null});

              const {hash: transactionHash} = await shouldClaimGift();

              onHandleTransactionHash({transactionHash});

              setState({state: MintState.PERFORMING_CLAIM, transactionHash});
          } else {
              throw new Error(`Encountered unexpected MintType, "${type}".`);
          }


        } catch (cause) {
          console.error(cause);
          // If an error happens here, the transaction was probably invalid.
          setState({state: MintState.UNINITIALIZED});
        }
      },
      [shouldMint, shouldClaimGift, maybePricePerPiece, onHandleTransactionHash]
    );

    const onFinishMint = React.useCallback(
      () => setState({state: MintState.UNINITIALIZED}),
      []
    );

    return (
      <MintContextProvider
        children={children}
        value={React.useMemo<MintContextValue>(() => ({
          ...state,
          onRequestMint,
          onFinishMint,
        }), [state, onRequestMint, onFinishMint])}
      />
    );
  }
);
