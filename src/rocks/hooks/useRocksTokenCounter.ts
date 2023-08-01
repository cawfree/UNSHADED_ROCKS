import {useContractRead} from 'wagmi';

import {useConfig} from '@/config/hooks';
import {Rocks721} from '@/rocks/abi';

export function useRocksTokenCounter() {
  const {rocksContractAddress} = useConfig();
  return useContractRead({
    address: rocksContractAddress,
    abi: Rocks721,
    functionName: 'tokenCounter',
  });
}
