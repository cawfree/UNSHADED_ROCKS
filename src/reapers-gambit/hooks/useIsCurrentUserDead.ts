import {useAccount} from 'wagmi';

import {useReapersGambitContext} from '@/reapers-gambit/contexts';
import {isDead} from '@/reapers-gambit/hooks/useReapersGambitKnowDeathOf';

export function useIsCurrentUserDead() {
  const {isConnected} = useAccount();
  return (
    isDead(useReapersGambitContext()) && isConnected
  );
}
