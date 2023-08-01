import * as React from 'react';

import {PaginatedRocks, RockV2} from '@/rocks/@types';
import {useRocksInfinite} from '@/rocks/hooks';

export function useMa55RocksStream(): PaginatedRocks {
  return useRocksInfinite({
    filter: React.useCallback((rock: RockV2) => rock.broken, []),
  });
}
