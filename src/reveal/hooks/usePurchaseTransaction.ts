import * as React from 'react';
import {useTransaction, useWaitForTransaction} from 'wagmi';
import {decodeEventLog} from 'viem';

import {PurchaseTransactionResult} from '@/reveal/@types';
import {Rocks721} from '@/rocks/abi';

type State = Readonly<
  | {loading: true}
  | {loading: false, result: PurchaseTransactionResult}
  | {loading: false, error: Error}
>;

export const getMaybePurchaseTransaction = (state: State) => {
  if (state.loading || !('result' in state)) return undefined;

  return state.result;
};

export function usePurchaseTransaction({
  //purchaseTransactionType: mintType,
  purchaseTransactionHash,
}: {
  //readonly purchaseTransactionType: MintType | null;
  readonly purchaseTransactionHash: string | null;
}): State {

  const {
    data: waitData,
    isError: waitIsError,
    error: waitError,
    isSuccess: waitIsSuccess,
  } = useWaitForTransaction({
    hash: purchaseTransactionHash as `0x${string}`,
    enabled: typeof purchaseTransactionHash === 'string',
  });

  const {
    data: txData,
    isError: txIsError,
    error: txError,
    isSuccess: txIsSuccess,
  } = useTransaction({
    hash: purchaseTransactionHash as `0x${string}`,
    enabled: typeof purchaseTransactionHash === 'string',
  })

  return React.useMemo<State>(
    () => {
      if (waitIsSuccess && txIsSuccess && waitData && txData) {

        const {value} = txData;
        const {
          logs,
          transactionHash,
          gasUsed,
          effectiveGasPrice,
        } = waitData;

        // TODO: don't use purchase use something else (naming convention is wrong)
        const purchases =
           [{
              price: 0n,
              tokenIds: [...logs.values()]
                .map((log) => decodeEventLog({
                  ...log,
                  abi: Rocks721,
                }))
                .filter(({eventName}) => eventName === 'Transfer')
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .flatMap(({args}) => [args.tokenId]),
            }];
          //: [...logs.values()]
          //    .map((log) => decodeEventLog({
          //      ...log,
          //      abi: Rocks721,
          //    }))
          //    .filter(({eventName}) => eventName === 'Purchase')
          //    .map(({args}): Purchase => ({
          //      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //      // @ts-ignore
          //      price: args.price as bigint,
          //      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //      // @ts-ignore
          //      tokenIds: args.tokenIds as readonly bigint[],
          //    }));

        return {
          loading: false,
          result: {
            purchases,
            transactionHash,
            gasUsed,
            effectiveGasPrice,
            value,
          },
        };

      } else if (waitIsError) {
        // @ts-expect-error language_version
        return {loading: false, error: new Error('Failed to await transaction.', {cause: waitError})}
      } else if (txIsError) {
        // @ts-expect-error language_version
        return {loading: false, error: new Error('Failed to load transaction.', {cause: txError})}
      }
      return {loading: true};
    },
    [
      //mintType,
      waitData,
      waitError,
      waitIsError,
      waitIsSuccess,
      txData,
      txError,
      txIsError,
      txIsSuccess,
    ]
  );
}
