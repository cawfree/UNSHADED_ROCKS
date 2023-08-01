import {useAccount, useContractRead} from 'wagmi';

import {useConfig} from '@/config/hooks';
import {Rocks721} from '@/rocks/abi';

export function useRocksBalance({
  address: maybeAddress,
}: {
  readonly address?: string;
} = {}) {
  const {address: maybeAccountAddress} = useAccount();

  const address = maybeAddress || maybeAccountAddress;

  const {rocksContractAddress} = useConfig();
  return useContractRead({
    address: rocksContractAddress,
    abi: Rocks721,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(typeof address === 'string' && address.length),
  });
}
