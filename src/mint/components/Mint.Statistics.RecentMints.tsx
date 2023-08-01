import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {Purchase} from '@/mint/@types';
import {STATISTIC_ADDRESS_LENGTH} from '@/mint/constants';
import {ThemeDigitize} from '@/theme/components';

const DEFAULT_RECENT_MINT: Purchase = {
  address: [...Array(STATISTIC_ADDRESS_LENGTH).fill('?')].join(''),
  price: '?.??',
  blockNumber: '?????????',
  tokenIds: [],
};

export const MintStatisticsRecentMints = React.memo(
  function MintStatisticsRecentMints({
    className,
    recentMints: maybeRecentMints,
  }: {
    readonly className?: string;
    readonly recentMints: readonly Purchase[];
  }): JSX.Element {

    const recentMints = React.useMemo<readonly Purchase[]>(
      () => {
        if (!maybeRecentMints?.length) return [...Array(5).fill(DEFAULT_RECENT_MINT)];

        return maybeRecentMints.filter((_, i) => i < 5).reverse();
      },
      [maybeRecentMints]
    );

    return (
      <div className={clsx('flex text-secondary select-none', className)}>
        <SpanLetterformUpright className="text-base pr-2">
          <ThemeDigitize children="RECENT MINTS" />
        </SpanLetterformUpright>
        <div className="px-2" key={String(maybeRecentMints?.length)}>
          <div className="flex">
            {recentMints.map(({address}: Purchase, i: number) => {
              return (
                <SpanLetterformUpright key={String(i)} className="text-base">
                  <ThemeDigitize
                    children={address.substring(0, STATISTIC_ADDRESS_LENGTH)}
                  />
                </SpanLetterformUpright>
              );
            })}
          </div>
          <div className="flex pt-2">
            {recentMints.map(({tokenIds}: Purchase, i: number) => (
              <SpanLetterformUpright key={String(i)} className="text-base">
                <ThemeDigitize children={String(tokenIds.length)} />
              </SpanLetterformUpright>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
