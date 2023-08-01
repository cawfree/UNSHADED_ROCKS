import * as React from 'react';
import {ethers} from 'ethers';
import pluralize from 'pluralize';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {PurchaseTransactionResult} from '@/reveal/@types';
import {useCounterAnimation} from '@/reveal/hooks';
import {getTotalRocks} from '@/reveal/utils';
import {ThemeDigitize} from '@/theme/components';

const style = {width: 120};

export const RevealStatistics = React.memo(
  function RevealStatistics({
    counter,
    maybePurchase,
  }: {
    readonly counter: number;
    readonly maybePurchase: PurchaseTransactionResult | null | undefined;
  }): JSX.Element {
    const infinite = !maybePurchase;

    const {length: numberOfRocksPurchased} = getTotalRocks(maybePurchase);

    const {
      renderRocksAcquired,
      renderTx,
      renderGwei,
      renderFee,
      renderMint,
      renderTotal,
    } = useCounterAnimation({
      counter,
      maybePurchase,
    });

    return (
      <div>
        <div>
          <SpanLetterform className={
            clsx(
              'text-accent text-xl',
              !renderRocksAcquired && 'invisible'
            )}>
            <ThemeDigitize
              children={`${numberOfRocksPurchased} ${pluralize('rock', numberOfRocksPurchased)} acquired`}
              infinite={infinite}
            />
          </SpanLetterform>
        </div>
        <br />
        <div className="flex">
          <div>
            {/* TODO: use a table instead idiot */}
            <div style={style} className={clsx(!renderTx && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize children="TX" infinite={infinite} />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderGwei && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize children="GWEI" infinite={infinite} />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderFee && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize children="FEE" infinite={infinite} />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderMint && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize children="MINT" infinite={infinite} />
              </SpanLetterform>
            </div>
          </div>
          <div>
            <div className={clsx(!renderTx && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize
                  children={(maybePurchase?.transactionHash || ethers.ZeroAddress).substring(0, 15)}
                  infinite={infinite}
                />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderGwei && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize
                  children={Number(ethers.formatUnits((maybePurchase?.effectiveGasPrice || 0n), 'gwei')).toFixed(2)}
                  infinite={infinite}
                />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderFee && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize
                  children={Number(ethers.formatEther((maybePurchase?.gasUsed || 0n))).toFixed(5)}
                  infinite={infinite}
                />
              </SpanLetterform>
            </div>
            <div className={clsx(!renderMint && 'invisible')}>
              <SpanLetterform className="text-accent text-xl">
                <ThemeDigitize
                  children={Number(ethers.formatEther((maybePurchase?.value || 0n))).toFixed(2)}
                  infinite={infinite}
                />
              </SpanLetterform>
            </div>
          </div>
        </div>
        <br />
        <div className="flex">
          <div style={style} className={clsx(!renderTotal && 'invisible')}>
            <SpanLetterform className="text-accent text-xl">
              <ThemeDigitize children="TOTAL" infinite={infinite} />
            </SpanLetterform>
          </div>
          <div className={clsx(!renderTotal && 'invisible')}>
            <SpanLetterform className="text-accent text-xl">
              <ThemeDigitize
                children={Number(
                  ethers.formatEther(
                    (maybePurchase?.value || 0n) + (maybePurchase?.gasUsed || 0n)
                  )
                ).toFixed(5)}
                infinite={infinite}
              />
            </SpanLetterform>
          </div>
        </div>
      </div>
    );
  }
);
