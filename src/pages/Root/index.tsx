import * as React from 'react';
import {useAccount} from 'wagmi';
import {useNavigate} from 'react-router-dom';

import {Layout} from '@/layout/components';
import {ROCK_SCROLL_BASIS_POINTS_DENSE_LAYOUT} from '@/rocks/constants';
import {
  RocksAttributesIndicator,
  RocksScroll,
  RocksSelectionConsumer,
  RocksSelectionProvider,
} from '@/rocks/components';
import {useRandomFamily, useRocksRenderChildrenMasonry} from '@/rocks/hooks';
import {MintButton} from '@/mint/components';
import {NavigatorRoute} from '@/navigation/@types';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {useBreakpoint} from '@/tailwind/hooks';
import {ThemeTitle} from '@/theme/components';
import {WalletButton} from '@/wallet/components';


export const Root = React.memo(
  function Root(): JSX.Element {
    const navigate = useNavigate();
    const {isConnected} = useAccount();
    const shouldShowAttributeIndicator = useBreakpoint('sm');
    const renderChildren = useRocksRenderChildrenMasonry({});

    const {items: baseItems, fetchNextPage, hasNext} = useRandomFamily();

    // @figure_31 would prefer we render a fixed grid of 5 * 6 rocks.
    const items = React.useMemo(() => baseItems.filter(
      (_, i) => i < 5 * 6),
      [baseItems]
    );

    const {renderBottom} = useNavigationFooterBottom({
        renderMint: false,
        minify: false,
    });

    const [maybeFirstRock] = items;

    return (
      <RocksSelectionProvider initiallySelectedRockId={maybeFirstRock?.id || null}>
        <Layout
          renderHeader={React.useCallback(
            () => (
              <div className="flex flex-col pt-8 pl-5">
                <ThemeTitle className="cursor-pointer" onClick={() => location.reload()}>
                  <NavigatorHomeButton className="pl-4 mb-4" />
                </ThemeTitle>
              </div>
            ),
            [],
          )}
          renderBody={React.useCallback(
            () => (
              <div className="flex flex-col h-full pb-8 pt-8">
                <RocksScroll
                  rockBasisPoints={ROCK_SCROLL_BASIS_POINTS_DENSE_LAYOUT}
                  className="flex-1 overflow-hidden"
                  items={items}
                  fetchNextPage={fetchNextPage}
                  hasNext={hasNext}
                  renderChildren={renderChildren}
                  renderContainer={({children, rock}) => (
                    <RocksSelectionConsumer
                      rock={rock}
                      renderSelectable={() => <React.Fragment children={children} />}
                      className="w-full h-full"
                    />
                  )}
                  rotationEnabled
                />
              </div>
            ),
            [hasNext, fetchNextPage, items, renderChildren],
          )}
          renderFooter={React.useCallback(
              () => (
                <NavigatorRouteFooter
                  renderBottom={renderBottom}
                  renderTop={() => (
                    <div className="flex w-full pr-5">
                      <div className="pt-8 flex w-full">
                          {isConnected ? (
                            <>
                              <MintButton onClick={() => navigate(NavigatorRoute.MINT)} />
                              <div className="flex-1" />
                              {shouldShowAttributeIndicator
                                ? <RocksAttributesIndicator className="h-full flex flex-col" />
                                : <></>}
                            </>
                          ) : (
                            <WalletButton />
                          )}
                      </div>
                    </div>
                  )}
                />
              ),
              [isConnected, navigate, shouldShowAttributeIndicator, renderBottom],
          )}
        />
      </RocksSelectionProvider>
    );
  }
);

