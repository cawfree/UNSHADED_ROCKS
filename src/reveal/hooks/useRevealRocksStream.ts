import * as React from 'react';

import {PaginatedRocks} from '@/rocks/@types';
import {PurchaseTransactionResult} from '@/reveal/@types';
import {getTotalRocks} from '@/reveal/utils';
import {useRocksForTokenIds} from '@/rocks/hooks';

export function useRevealRocksStream({
  maybePurchase,
}: {
  readonly maybePurchase: PurchaseTransactionResult | null | undefined
}): PaginatedRocks {

    const tokenIds = React.useMemo(
      () => getTotalRocks(maybePurchase).map(String),
      [maybePurchase]
    );

    return {
        fetchNextPage: Promise.reject,
        hasNext: false,
        items: useRocksForTokenIds({tokenIds}),
    };
}
