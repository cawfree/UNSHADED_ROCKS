import {useContractWrite} from 'wagmi';

import {useConfig} from '@/config/hooks';
import {Rocks721} from '@/rocks/abi';

export function useMint() {
  const {rocksContractAddress} = useConfig()
  return useContractWrite({
    address: rocksContractAddress,
    abi: Rocks721,
    functionName: 'mint',
  });
}
