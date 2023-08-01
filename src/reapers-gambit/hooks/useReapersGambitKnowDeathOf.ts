import * as React from 'react';
import {ethers} from 'ethers';
import {useAccount, useContractRead, useBlockNumber} from 'wagmi';

import {useConfig} from '@/config/hooks';
import {ReapersGambit} from '@/rocks/abi';
import {ReapersGambitState} from '@/reapers-gambit/@types';

export const isDead = (state: ReapersGambitState): boolean => {
  if (state.loading || !('isDead' in state)) return false;

  return state.isDead;
}

export function useReapersGambitKnowDeathOf({
  address: defaultAddress,
}: {
  readonly address?: `0x${string}` | null | undefined;
} = {}): ReapersGambitState {
  const {reapersGambitContractAddress} = useConfig()
  const {address: maybeCurrentAddress} = useAccount();

  const address = typeof defaultAddress === 'string'
    ? defaultAddress
    : maybeCurrentAddress;

  const enabled = ethers.isAddress(address);

  const {
    data: maybeKnowDeath,
    isLoading: isLoadingKnowDeath,
    error: errorKnowDeath,
  } = useContractRead({
    address: reapersGambitContractAddress,
    abi: ReapersGambit,
    functionName: 'KnowDeath',
    args: [address],
    enabled,
    watch: false,
  });

  const {
    data: maybeBlockNumber,
    isLoading: isLoadingBlockNumber,
    error: errorBlockNumber,
  } = useBlockNumber({
    watch: false,
  });

  return React.useMemo<ReapersGambitState>(
    () => {
      // TODO: When an address isn't dead, it is '0n', which looks falsey.
      //       Looks like we're permanently "loading"
      if (isLoadingBlockNumber || isLoadingKnowDeath || !maybeKnowDeath || !maybeBlockNumber)
        return {loading: true};

      if (errorKnowDeath) return {loading: false, error: errorKnowDeath};
      if (errorBlockNumber) return {loading: false, error: errorBlockNumber};

      const deathBlock = maybeKnowDeath as bigint;
      const blockNumber = maybeBlockNumber as bigint;

      return {
        loading: false,
        deathBlock,
        blockNumber,
        isDead: blockNumber > deathBlock,
      }
    },
    [
      maybeKnowDeath,
      isLoadingKnowDeath,
      errorKnowDeath,
      maybeBlockNumber,
      isLoadingBlockNumber,
      errorBlockNumber,
    ]
  );
}
