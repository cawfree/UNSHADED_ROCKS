import {useEthereumContext} from '@/ethereum/contexts';

export function useMaybeRecentTransactionHash() {
  const {transactionHashes} = useEthereumContext();

  if (!transactionHashes.length) return undefined;

  return transactionHashes[transactionHashes.length - 1];
}
