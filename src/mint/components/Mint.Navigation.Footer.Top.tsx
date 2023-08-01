import * as React from 'react';
import {clsx} from 'clsx';
import {useAccount} from 'wagmi';

import {BasketIndicator} from '@/basket/components';
import {MintButton} from '@/mint/components/Mint.Button';
import {MintBalanceOf} from '@/mint/components/Mint.BalanceOf';
import {MintNetworkFees} from '@/mint/components/Mint.NetworkFees';
import {useBreakpoint} from '@/tailwind/hooks';
import {WalletButton} from '@/wallet/components';

export const MintNavigationFooterTop = React.memo(
  function MintNavigationFooterTop({
    onClickMint,
    mintText = 'MINT',
    numberOfRocksInBasket,
    units,
  }: {
    readonly mintText?: string;
    readonly onClickMint: () => void;
    readonly numberOfRocksInBasket?: number;
    readonly units?: string;
  }): JSX.Element {
    const {isConnected} = useAccount();
    const shouldRenderBalance = useBreakpoint('sm');
    return (
      <div className="pt-8 flex pr-4">
        <div className="pr-4">
          {isConnected
            ? <MintButton onClick={onClickMint} children={mintText} />
            : <WalletButton />}
        </div>
        <div className={clsx(!isConnected && 'invisible', 'flex pr-4')}>
          <BasketIndicator
            className="pr-4"
            numberOfRocksInBasket={numberOfRocksInBasket}
            units={units}
          />
          <MintNetworkFees className="pr-2" />
          {shouldRenderBalance && <MintBalanceOf />}
        </div>
      </div>
    );
  }
);

