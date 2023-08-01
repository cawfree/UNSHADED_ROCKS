import * as React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {clsx} from 'clsx';
import {useAccount} from 'wagmi';

import {GalleryButton} from '@/gallery/components';
import {Layout} from '@/layout/components';
import {MintBalanceOf, MintButton} from '@/mint/components';
import {NavigatorRoute} from '@/navigation/@types';
import {NavigatorRouteFooter, NavigatorHomeButton} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {NotFound} from '@/pages/NotFound';
import {RevealBody, RevealButton} from '@/reveal/components';
import {getMaybePurchaseTransaction, usePurchaseTransaction} from '@/reveal/hooks';
import {getAnimationStateForCounter, getTotalRocks} from '@/reveal/utils';
import {RocksAttributesIndicator, RocksRecentHeader, RocksSelectionProvider} from '@/rocks/components';
import {ThemeCopyButton} from '@/theme/components';

export const Reveal = React.memo(
  function Reveal(): JSX.Element {

    const {transactionHash: maybeTransactionHash} = useParams();

    const navigate = useNavigate();
    const {isConnected} = useAccount();

    const {renderBottom} = useNavigationFooterBottom();

    const onClickMintAgain = React.useCallback(
      () => navigate(NavigatorRoute.MINT),
      [navigate]
    );

    const maybePurchase = getMaybePurchaseTransaction(
      usePurchaseTransaction({
        purchaseTransactionHash: maybeTransactionHash || null,
      }),
    );

    // TODO: count maximum
    const [counter, setCounter] = React.useState<number>(0);
    const [showRocks, setShowRocks] = React.useState<boolean>(false);

    React.useEffect(
      () => {
        if (!maybePurchase) return;

        setCounter(0);

        const {length: totalRocks} = getTotalRocks(maybePurchase);

        let internalCount = 0;

        const i = setInterval(
          () => {
            setCounter(++internalCount);

            const {
              renderRevealButton,
            } = getAnimationStateForCounter({
              counter: internalCount,
              totalRocks,
            });

            if (renderRevealButton) clearInterval(i);
          },
          250,
        );

        return () => void clearInterval(i);
      },
      [maybePurchase]
    );

    const renderHeader = React.useCallback(
      () => (
        <div className="flex h-full flex-col pt-8 pb-8 pl-5">
          <RocksRecentHeader showRemaining className="pl-8" />
          <div className="flex-1" />
          <div className="w-full flex">
            <NavigatorHomeButton className="pl-4" />
          </div>
        </div>
      ),
      [],
    );

    const renderFooter = React.useCallback(
      () => (
        <NavigatorRouteFooter
          renderBottom={renderBottom}
          renderTop={() => (
            <div>
              <div className="flex">
                <div className="pt-8 flex pr-4">
                  {
                    Boolean(showRocks) ? (
                      <React.Fragment>
                        {false && <MintButton onClick={onClickMintAgain} />}
                      </React.Fragment>
                    ) : (
                      <RevealButton
                        className="mr-2"
                        onClick={() => setShowRocks(true)}
                      />
                    )
                  }
                  <MintBalanceOf className="" />
                  {false && (
                    <div className={clsx(!showRocks && 'invisible')}>
                      <RocksAttributesIndicator
                        className={clsx(showRocks && 'animate-fade-left', 'h-full pl-8 flex flex-col')}
                        renderButtons={false}
                      />
                    </div>
                  )}
                  <div className="flex-1" />
                </div>
              </div>
              <div className="flex">
                {showRocks && <GalleryButton className="mt-8" />}
                <div className="flex-1" />
              </div>
              {false && <ThemeCopyButton textToCopy={window.location.href} className="mt-8" />}
            </div>
          )}
        />
      ),
      [showRocks, onClickMintAgain, renderBottom, isConnected]
    );

    const renderBody = React.useCallback(
      () => (
        <RevealBody
          maybePurchase={maybePurchase}
          counter={counter}
          showRocks={showRocks}
        />
      ),
      [maybePurchase, counter, showRocks]
    );

    if (!maybeTransactionHash) return <NotFound />;

    return (
      <RocksSelectionProvider initiallySelectedRockId={null}>
        <Layout
          renderHeader={renderHeader}
          renderBody={renderBody}
          renderFooter={renderFooter}
        />
      </RocksSelectionProvider>
    );
  }
);
