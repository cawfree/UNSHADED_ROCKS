import {RockV2} from '@/rocks/@types';
import {getRocksForAddress} from '@/rocks/hooks';
import {useWalletContext} from '@/wallet/contexts';

export function useIsRockInWallet({
  maybeRock,
}: {
  readonly maybeRock?: RockV2 | null | undefined;
}): boolean {
  const rocksForAddress = getRocksForAddress(useWalletContext());
  return Boolean(maybeRock) && Boolean(rocksForAddress.find(e => e.tokenId === maybeRock?.tokenId));
}
