import * as React from 'react';
import {useAccount} from 'wagmi';
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';
import {clsx} from 'clsx';

import {useConfig} from '@/config/hooks';
import {Layout, LayoutBodyScroll} from '@/layout/components';
import {SpanLetterform} from '@/letterform/components';
import {MintType} from '@/mint/@types';
import {MintNavigationFooterTop} from '@/mint/components';
import {useMintContext} from '@/mint/contexts';
import {useNavigateOnCompletedTransaction} from '@/mint/hooks';
import {NavigatorRoute} from '@/navigation/@types';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {airdrop} from '@/rocks/assets';
import {RocksRecentHeader} from '@/rocks/components';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const Claim = React.memo(
  function Claim(): JSX.Element {
    const {isConnected, address} = useAccount();
    const {claimSnapshotDate, claimEndDate} = useConfig();
    const {primaryColorSelection} = useThemeContext();
    const navigate = useNavigate();
    const {renderBottom} = useNavigationFooterBottom();

    const claimAmount = React.useMemo<number>(() => {

        if (!isConnected || !ethers.isAddress(address)) return 0;

        const maybeRecord = airdrop.find((e) => e.address === ethers.getAddress(address));

        if (!maybeRecord) return 0;

        return maybeRecord.amount;
    }, [isConnected, address]);

    const canClaim = Boolean(claimAmount > 0);

    const {onRequestMint} = useMintContext();

    const onClickClaim = React.useCallback(
      () => onRequestMint({type: MintType.CLAIM}),
      [onRequestMint]
    );

    const onClickMint = React.useCallback(
      () => navigate(NavigatorRoute.MINT),
      [navigate]
    );

    useNavigateOnCompletedTransaction({type: MintType.CLAIM});

    return (
      <Layout
        renderBodySm
        renderHeader={React.useCallback(
          () => (
            <div className="flex flex-1 h-full flex-col pt-8 pl-5">
              <div className="flex justify-end">
                <RocksRecentHeader showRemaining className="pl-4" />
              </div>
              <div className="flex-1"/>
              <div className="w-full flex pb-8">
                <NavigatorHomeButton className="pl-4" />
              </div>
            </div>
          ),
          [],
        )}
        renderBody={() => (
          <LayoutBodyScroll>
            <div className={clsx('pb-8 flex flex-col')}>
              {Boolean(isConnected) && (
                <div>
                  <SpanLetterform className="text-3xl text-secondary">
                    <ThemeDigitize children="YOU " />
                  </SpanLetterform>
                  <SpanLetterform className={clsx('text-3xl text-secondary')}>
                    <ThemeDigitize children={`CAN${canClaim ? '' : 'NOT'}`} />
                  </SpanLetterform>
                  <SpanLetterform className="text-3xl text-secondary">
                    <ThemeDigitize children={` CLAIM${canClaim ? ' ' : '.'}`} />
                  </SpanLetterform>
                  {canClaim && (
                    <>
                      <SpanLetterform className={`text-3xl text-${primaryColorSelection}`}>
                        <ThemeDigitize children={String(claimAmount)} />
                      </SpanLetterform>
                      <SpanLetterform className="text-3xl text-secondary">
                        <ThemeDigitize children=" ROCKS" />
                      </SpanLetterform>
                    </>
                  )}
                  <div className="pt-4"/>
                </div>
              )}
              <div className="pb-4">
                <SpanLetterform
                  className="text-xl text-accent"
                  children={'If you minted unshaded rocks before '.toUpperCase()}
                />
                <SpanLetterform
                  className={`text-xl text-${primaryColorSelection}`}
                  children={claimSnapshotDate.format('MM/DD/YYYY')}
                />
                <SpanLetterform
                  className="text-xl text-accent"
                  children={', you can claim free rocks.'.toUpperCase()}
                />
              </div>
              <div className="pb-4">
                <SpanLetterform
                  className="text-xl text-accent"
                  children={"The quantity is determined by the mint price you originally paid vs current mint price.".toUpperCase()}
                />
              </div>
              <div className="pb-4">
                <SpanLetterform
                  className="text-xl text-accent"
                  children={"Connect with the wallet you first used to mint rocks.".toUpperCase()}
                />
              </div>
              <div className="pb-4">
                <SpanLetterform
                  className="text-xl text-accent"
                  children={'You have until '.toUpperCase()}
                />
                <SpanLetterform
                  className={`text-xl text-${primaryColorSelection}`}
                  children={claimEndDate.format('MM/DD/YYYY')}
                />
                <SpanLetterform
                  className="text-xl text-accent"
                  children={' to claim.'.toUpperCase()}
                />
              </div>
            </div>
          </LayoutBodyScroll>
        )}
        renderFooter={React.useCallback(
          () => (
            <NavigatorRouteFooter
              renderBottom={renderBottom}
              renderTop={() => (
                <MintNavigationFooterTop
                  numberOfRocksInBasket={0}
                  onClickMint={canClaim ? onClickClaim : onClickMint}
                  mintText={canClaim ? 'CLAIM' : 'MINT'}
                  units="COMP"
                />
              )}
            />
          ),
          [onClickClaim, canClaim, onClickMint, renderBottom, claimAmount],
        )}
      />
    );
  }
);
