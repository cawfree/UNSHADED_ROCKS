import * as React from 'react';

import {getRocksByTokenIds} from '@/rocks/utils';

export function useRocksForTokenIds({
  tokenIds,
}: {
    readonly tokenIds: readonly string[];
}) {
    return React.useMemo(
      () => getRocksByTokenIds({tokenIds}),
      [tokenIds]
    );
}
