import {PurchaseTransactionResult} from '@/reveal/@types';

export const getTotalRocks = (
  maybePurchase: PurchaseTransactionResult | null | undefined
) => {
  return [...new Set((maybePurchase?.purchases || []).flatMap((e) => e.tokenIds))];
};
