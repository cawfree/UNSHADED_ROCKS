import * as React from 'react';

import {
  EthereumContextValue,
  OnHandleTransactionHashCallback,
  OnHandleTransactionHashCallbackParams,
} from '@/ethereum/@types';
import {EthereumContextProvider} from '@/ethereum/contexts';

export const EthereumProvider = React.memo(
  function EthereumProvider({
    children,
  }: React.PropsWithChildren): JSX.Element {
    const [
      transactionHashes,
      setTransactionHashes,
    ] = React.useState<readonly string[]>([]);

    const onHandleTransactionHash: OnHandleTransactionHashCallback = React.useCallback(
      ({
         transactionHash,
       }: OnHandleTransactionHashCallbackParams) => setTransactionHashes(
         current => [...new Set([...current, transactionHash])]
      ),
      []
    );
    return (
      <EthereumContextProvider
        children={children}
        value={React.useMemo<EthereumContextValue>(
          () => ({
            transactionHashes,
            onHandleTransactionHash,
          }),
          [transactionHashes, onHandleTransactionHash]
        )}
      />
    );
  }
);
