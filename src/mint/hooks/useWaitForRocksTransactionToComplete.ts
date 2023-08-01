import * as React from 'react';
import {useWaitForTransaction} from 'wagmi';
import {TransactionReceipt} from 'viem';

import {getMaybeTransactionHash, useMintContext} from '@/mint/contexts';
import {MintState} from '@/mint/@types';
import {useWalletContext} from '@/wallet/contexts';

export function useWaitForRocksTransactionToComplete({
  watch: type,
  onMintComplete,
}: {
  readonly watch: MintState.PERFORMING_MINT | MintState.PERFORMING_CLAIM;
  readonly onMintComplete: (receipt: TransactionReceipt) => void;
}) {
  const context = useMintContext();
  const {refetch} = useWalletContext();
  const {state} = context;
  const maybeTransactionHash = getMaybeTransactionHash(context);
  const disabled = typeof maybeTransactionHash !== 'string';

  const {isSuccess, data} = useWaitForTransaction({
    hash: maybeTransactionHash as `0x${string}`,
    enabled: !disabled,
  });

  React.useEffect(
    () => {
      if (!isSuccess || !data || state !== type) return;

      // HACK: Update the user's wallet balance via the subgraph
      //       so we can update conditionally-enabled flows.
      return void refetch()
        .then(() => onMintComplete(data))
        .catch((e) => {
          console.error(e); return onMintComplete(data);
        });
    },
    [isSuccess, data, onMintComplete, state, type, refetch]
  );

}
