import * as React from 'react';

import {SortDirection, SortMode} from '@/browse/@types';
import {useBrowseSort} from '@/browse/hooks';
import {RockV2} from '@/rocks/@types';
import {useRocksInfinite} from '@/rocks/hooks/useRocksInfinite';

const ENABLED_FAMILIES = [15, 17, 18];

export function useRandomSimpleRock() {
  const {items} = useRocksInfinite({
    // Only render rocks from the selected family.
    filter: React.useCallback((rock: RockV2) => ENABLED_FAMILIES.includes(rock.type), []),
    // HACK: Avoid rendering super complex rocks on the main page.
    sort: useBrowseSort({
      selectedSortDirection: SortDirection.ASC,
      selectedSortMode: SortMode.VERTICES,
    }),
  });

  return React.useMemo(
    () => items[Math.floor(Math.random() * items.length)],
    [items]
  );
}
