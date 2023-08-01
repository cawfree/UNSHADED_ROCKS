import * as React from 'react';
import {clsx} from 'clsx';

import {
  RevealBodyRocks,
  RevealStatistics,
  RevealStatisticsBreakdown,
} from '@/reveal/components';
import {PurchaseTransactionResult} from '@/reveal/@types';
import {useRevealRocksStream} from '@/reveal/hooks';
import {ThemeScroll, ThemeTitle} from '@/theme/components';

export const RevealBody = React.memo(
  function RevealBody({
    counter,
    maybePurchase,
    showRocks,
  }: {
    readonly counter: number;
    readonly maybePurchase: PurchaseTransactionResult | null | undefined;
    readonly showRocks: boolean;
  }): JSX.Element {
    const rocksStream = useRevealRocksStream({maybePurchase});
    return (
      <div className="w-full h-full flex items-center">
        <div className="relative w-full bg-background">
          <ThemeTitle className="invisible" />
          {/* Breakdown */}
          <div
            className={clsx(
              'absolute inset-0 flex flex-col',
              showRocks && 'pointer-events-none animate-fade-down animate-reverse'
            )}>
            <div className="pt-8">
              <RevealStatistics
                counter={counter}
                maybePurchase={maybePurchase}
              />
            </div>
            <br />
            <div className="relative flex-1">
              <div className="absolute inset-0 pb-8">
                <ThemeScroll className="overflow-scroll">
                  <RevealStatisticsBreakdown
                    counter={counter}
                    maybePurchase={maybePurchase}
                  />
                </ThemeScroll>
              </div>
            </div>
          </div>
          {/* Scroll */}
          <div
            className={clsx(
              'absolute inset-0',
              !showRocks && 'pointer-events-none invisible',
              showRocks && 'animate-fade-down',
            )}>
            <RevealBodyRocks
              {...rocksStream}
              className="w-full h-full pt-8 pb-8"
            />
          </div>
        </div>
      </div>
    );
  }
);
