import * as React from 'react';

import {PurchaseTransactionResult} from '@/reveal/@types';
import {
  getAnimationStateForCounter,
  getTotalRocks,
} from '@/reveal/utils';

export function useCounterAnimation({
  counter,
  maybePurchase,
}: {
  readonly counter: number;
  readonly maybePurchase: PurchaseTransactionResult | null | undefined;
}) {

  const {length: totalRocks} = getTotalRocks(maybePurchase);

  return React.useMemo(
    () => getAnimationStateForCounter({counter, totalRocks}),
    [
      counter,
      totalRocks,
    ]);
}
