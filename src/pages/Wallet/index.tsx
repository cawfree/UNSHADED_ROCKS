import * as React from 'react';
import {useParams} from 'react-router-dom';

import {Layout} from '@/layout/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {MintBalanceOf} from '@/mint/components';
import {NavigatorRouteFooter, NavigatorHomeButton} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {RevealBodyRocks} from '@/reveal/components';
import {RocksAttributesIndicator, RocksSelectionProvider} from '@/rocks/components';
import {getRocksForAddress, useRocksForWallet} from '@/rocks/hooks';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';
import {GalleryButton} from "@/gallery/components";

export const Wallet = React.memo(
  function Wallet(): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const {walletAddress} = useParams();
    const rocksForAddress = getRocksForAddress(useRocksForWallet({
      walletAddress,
    }));
    const [maybeFirstRock] = rocksForAddress;
    const {
      renderBottom,
    } = useNavigationFooterBottom({minify: true});

    return (
      <RocksSelectionProvider initiallySelectedRockId={maybeFirstRock?.id || null}>
        <Layout
          renderHeader={React.useCallback(
            () => (
              <div className="flex flex-col h-full select-none pt-8 pl-5">
                <SpanLetterformUpright className={`text-${primaryColorSelection} text-5xl`}>
                  <ThemeDigitize children="WALLET" />
                </SpanLetterformUpright>
                  <div className="flex-1" />
                <div className="flex w-full justify-end pb-8" style={{marginLeft: -5}}>
                  <NavigatorHomeButton className="pl-4" />
                </div>
              </div>
            ),
            [primaryColorSelection],
          )}
          renderBody={() => (
            <RevealBodyRocks
              items={rocksForAddress}
              fetchNextPage={Promise.reject}
              hasNext={false}
              className="w-full h-full pt-8 pb-8"
            />
          )}
          renderFooter={React.useCallback(
              () => (
                <NavigatorRouteFooter
                  renderBottom={renderBottom}
                  renderTop={() => (
                    <div className="pt-8">
                      <div className="flex">
                        <div className="flex">
                          <RocksAttributesIndicator
                            className="h-full flex flex-col"
                            renderButtons={false}
                          />
                          <MintBalanceOf className="pl-2" address={walletAddress as `0x${string}` | undefined} />
                        </div>
                      </div>
                      <div className="flex">
                        <GalleryButton className="mr-4" />
                        <div className="flex-1" />
                      </div>
                    </div>
                  )}
                />
              ),
            [renderBottom],
          )}
        />
      </RocksSelectionProvider>
    );
  }
);
