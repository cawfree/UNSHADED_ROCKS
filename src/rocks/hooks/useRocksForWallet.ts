import * as React from 'react';
import {ethers} from 'ethers';

import {RockV2} from '@/rocks/@types';
import {rocks} from '@/rocks/assets';
import {useFetchTokenIdsByWalletAddress} from '@/rocks/hooks/useFetchTokenIdsByWalletAddress';

type State = Readonly<
  | {loading: true}
  | {
  loading: false;
  rocksForAddress: readonly RockV2[];
}
  | {loading: false, error: Error}
>;

const loadingState = (): State => ({loading: true});

const successState = ({
  tokenIds,
}: {
  readonly tokenIds: readonly number[];
}): State => ({
  loading: false,
  rocksForAddress: tokenIds
    .map((tokenId: number): RockV2 | undefined => rocks.find(e => e.tokenId === tokenId))
    .flatMap((e): readonly RockV2[] => e ? [e] : []),
});

const defaultRocksForWallet = Object.freeze([]);

export const getRocksForAddress = (state: State): readonly RockV2[] => {
  if (state.loading || !('rocksForAddress' in state)) return defaultRocksForWallet;

  return state.rocksForAddress;
};

type Result = State & {
  readonly refetch: () => Promise<void>;
};

// TODO: this eventually became useCreateWalletContext, refactor accordingly
export function useRocksForWallet({
  walletAddress = undefined,
  pageSize,
}: Parameters<typeof useFetchTokenIdsByWalletAddress>[0] & {
  readonly walletAddress?: string | null | undefined;
} = {}): Result {

  const [state, setState] = React.useState<State>(loadingState);

  const {fetchRocksByWalletAddress} = useFetchTokenIdsByWalletAddress({
    pageSize,
  });

  const refetch = React.useCallback(
    async () => {

      if (!ethers.isAddress(walletAddress))
        return setState(successState({
          tokenIds: [],
        }));

      try {
        // Deterimine if they died in Reaper's Gambit.
        return setState(successState({
          tokenIds: await fetchRocksByWalletAddress(walletAddress),
        }));
      } catch (cause) {
        console.error(cause);

        return setState({
          loading: false,
          // @ts-expect-error language_version
          error: new Error(`Failed to determine tokenIds.`, {cause}),
        });
      }
    },
    [walletAddress, fetchRocksByWalletAddress]
  );

  React.useEffect(() => void refetch(), [refetch]);

  return React.useMemo<Result>(
    () => ({...state, refetch}),
    [state, refetch]
  );
}
