import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {Holder} from '@/mint/@types';
import {STATISTIC_ADDRESS_LENGTH} from '@/mint/constants';
import {ThemeDigitize} from '@/theme/components';

const DEFAULT_TOP_MINTER: Holder = {
  address: [...Array(STATISTIC_ADDRESS_LENGTH).fill('?')].join(''),
  count: '-1',
};

export const MintStatisticsTopMinters = React.memo(
  function MintStatisticsTopMinters({
    className,
    topMinters: maybeTopMinters,
  }: {
    readonly className?: string;
    readonly topMinters: readonly Holder[];
  }): JSX.Element {
    const topMinters = React.useMemo(
      () => {
        if (!maybeTopMinters.length)
            return [...Array(5).fill(DEFAULT_TOP_MINTER)];

        return maybeTopMinters.filter((_, i) => i < 5).reverse();
      },
      [maybeTopMinters],
    );

    return (
      <div className={clsx('flex text-secondary select-none', className)}>
        <SpanLetterformUpright className="text-base pr-2">
          <ThemeDigitize children="TOP MINTERS" />
        </SpanLetterformUpright>
        <div className="pl-2">
          <div className="flex">
            {topMinters.map(({address}: Holder, i: number) => (
              <SpanLetterformUpright key={String(i)} className="text-base">
                <ThemeDigitize children={address.substring(0, STATISTIC_ADDRESS_LENGTH)} />
              </SpanLetterformUpright>
            ))}
          </div>
          <div className="flex pt-2">
            {topMinters.map(({count}: Holder, i: number) => (
              <SpanLetterformUpright key={String(i)} className="text-base">
                <ThemeDigitize children={String(count)} />
              </SpanLetterformUpright>
            ))}
          </div>
        </div>

      </div>
    );
  }
);
