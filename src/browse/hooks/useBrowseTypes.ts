import * as React from 'react';

import {RockV2} from '@/rocks/@types';

export function useBrowseTypes({
  forRocks,
}: {
  readonly forRocks: readonly RockV2[];
}): readonly number[] {
  return React.useMemo(() => [...new Set(forRocks.map(({type}) => type))], [forRocks]);
}
