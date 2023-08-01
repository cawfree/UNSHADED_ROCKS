import * as React from 'react';
import {useAccount} from 'wagmi';

import {useRocksForWallet} from '@/rocks/hooks';
import {WalletContextProvider} from '@/wallet/contexts';

export const WalletProvider = React.memo(
  function WalletProvider({children}: React.PropsWithChildren): JSX.Element {
    const {address: walletAddress} = useAccount();
    return (
      <WalletContextProvider
        children={children}
        value={useRocksForWallet({walletAddress})}
      />
    );
  }
);

