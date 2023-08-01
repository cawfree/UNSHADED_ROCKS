import * as React from 'react';
import {useAccount} from 'wagmi';
import {clsx} from 'clsx';

import {BasketPyramid} from '@/basket/components';
import {useBasketContext} from '@/basket/contexts';
import {Layout} from '@/layout/components';
import {MintState, MintType} from '@/mint/@types';
import {MintBody, MintNavigationFooterTop} from '@/mint/components';
import {useMintContext} from '@/mint/contexts';
import {useNavigateOnCompletedTransaction} from '@/mint/hooks';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {RocksRecentHeader} from '@/rocks/components';

export const Mint = React.memo(
  function Mint(): JSX.Element {
    const {numberOfRocksInBasket} = useBasketContext();
    const {onRequestMint, state} = useMintContext();
    const {isConnected} = useAccount();
    const disabled = state !== MintState.UNINITIALIZED;

    const onClickMint = React.useCallback(
      () => onRequestMint({
        type: MintType.MINT,
        numberOfItemsToMint: numberOfRocksInBasket,
      }),
      [onRequestMint, numberOfRocksInBasket],
    );

    useNavigateOnCompletedTransaction({type: MintType.MINT});

    return (
      <Layout
        renderHeader={React.useCallback(
          () => (
            <div className="flex flex-1 h-full flex-col pt-8 pb-8 pl-5">
              <div className="flex w-full">
                <RocksRecentHeader showRemaining className="pl-4" />
              </div>
              <div className="flex-1"/>
              <div className="flex w-full">
                <NavigatorHomeButton className="pl-4" />
              </div>
            </div>
          ),
          [],
        )}
        renderBody={React.useCallback(
          () => <MintBody />,
          [],
        )}
        renderFooter={React.useCallback(
          () => (
            <NavigatorRouteFooter
              renderTop={() => (
                <MintNavigationFooterTop onClickMint={onClickMint} />
              )}
              renderBottom={() => (
                <div className="pb-8">
                  <BasketPyramid
                    className={clsx(isConnected && !disabled
                      ? 'animate-fade-down'
                      : 'animate-fade-up animate-reverse'
                    )}
                  />
                </div>
              )}
            />
          ),
          [
            isConnected,
            disabled,
            onClickMint,
          ],
        )}
      />
    );
  }
);

