import * as React from 'react';

import {SortDirection, SortMode} from '@/browse/@types';
import {useBrowseSort} from '@/browse/hooks';
import {RockV2} from '@/rocks/@types';
import {useRocksInfinite} from '@/rocks/hooks/useRocksInfinite';

// Types 1 -> 18 should load fairly quickly.
const WHITELIST_FAMILIES: readonly number[] = [...Array(18)]
  .map((_, i) => i + 1);

export function useRandomFamily() {
  const selectedFamily = React.useMemo(() => WHITELIST_FAMILIES[Math.floor(Math.random() * WHITELIST_FAMILIES.length)], []);

  return useRocksInfinite({
    // Only render rocks from the selected family.
    filter: React.useCallback(
      (rock: RockV2) => rock.type === selectedFamily,
      [selectedFamily]
    ),
    // HACK: Avoid rendering super complex rocks on the main page.
    sort: useBrowseSort({
        selectedSortDirection: SortDirection.ASC,
        selectedSortMode: SortMode.VERTICES,
    }),
  });
}
