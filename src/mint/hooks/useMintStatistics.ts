import * as React from 'react';

import {useConfig} from '@/config/hooks';

import {Holder, Purchase} from '@/mint/@types';

type Result = Readonly<{
  readonly topHolders: readonly Holder[];
  readonly recentPurchases: readonly Purchase[];
}>;

type State = Readonly<
  | {loading: true}
  | {loading: false; result: Result}
  | {loading: false; error: Error}
>;

const loadingState = (): State => ({loading: true});

export const getMaybeMintStatistics = (state: State) => {
  if (state.loading || !('result' in state)) return undefined;

  return state.result;
}

export function useMintStatistics() {
  const [state, setState] = React.useState<State>(loadingState);
  const {subgraphUrl, burnAddress} = useConfig();

  React.useEffect(() => void (async () => {
    try {
      setState(loadingState);

      const result = await fetch(subgraphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: "{\n  holders(orderBy: count, orderDirection: desc, first: 11) {\n    id\n    count\n  }\n  purchases(orderBy: blockTimestamp, orderDirection: desc, first: 11) {\n    id\n    blockNumber\n    tokenIds\n    price\n  }\n}",
          variables: null,
          extensions: {
            headers: null,
          },
        }),
      });

      const {data} = await result.json();

      const holders: readonly Holder[] = Array.from(data.holders)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .map(({id, count}): Holder => ({
          address: id,
          count,
        }));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const topHolders = holders.filter(({address}) => address !== burnAddress);

      const recentPurchases: readonly Purchase[] = Array.from(data.purchases)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .map(({id, price, blockNumber, tokenIds}): Purchase => ({
          address: id,
          price,
          blockNumber,
          tokenIds,
        }))

      setState({loading: false, result: {topHolders, recentPurchases}});

    } catch (cause) {
      setState({
        loading: false,
        // @ts-expect-error language_version
        error: new Error('Unable to fetch mint statistics.', {cause}),
      })
    }

  })(), [subgraphUrl, burnAddress]);

  return state;
}
