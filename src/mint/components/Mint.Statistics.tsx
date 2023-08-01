import * as React from 'react';

import {
  MintStatisticsRecentMints,
  MintStatisticsTopMinters,
} from '@/mint/components';

import {useMintStatistics, getMaybeMintStatistics} from '@/mint/hooks';

const ARRAY_DEFAULT_EMPTY = Object.freeze([]);

export const MintStatistics = React.memo(
  function MintStatistics({
    className,
  }: {
    readonly className?: string;
  }): JSX.Element {
    const maybeMintStatistics = getMaybeMintStatistics(useMintStatistics());
    return (
      <div className={className}>
        <MintStatisticsTopMinters
          className="pb-10"
          topMinters={maybeMintStatistics?.topHolders || ARRAY_DEFAULT_EMPTY}
        />
        <MintStatisticsRecentMints
          recentMints={maybeMintStatistics?.recentPurchases || ARRAY_DEFAULT_EMPTY}
        />
      </div>
    );
  }
);
