import * as React from 'react';

import {SelectedSortDirection, SelectedSortMode, SortDirection, SortMode,} from '@/browse/@types';
import {RockV2} from '@/rocks/@types';

export function useBrowseSort({
  selectedSortMode,
  selectedSortDirection,
}: {
  readonly selectedSortDirection: SelectedSortDirection;
  readonly selectedSortMode: SelectedSortMode;
}) {

  return React.useCallback(
    (a: RockV2, b: RockV2): number  => {

      if (!selectedSortMode || !selectedSortDirection) return 0;

      const dir = selectedSortDirection === SortDirection.DESC ? -1 : 1;

      if (selectedSortMode === SortMode.VERTICES) {
        return dir * (a.vertices - b.vertices);
      } else if (selectedSortMode === SortMode.VOLUME) {
        return dir * (a.volume - b.volume);
      } else if (selectedSortMode === SortMode.POLYGONS) {
        return dir * (a.polygons - b.polygons);
      }
      throw new Error(`Encountered unsupported sortMode, "${selectedSortMode}".`);
    },
    [selectedSortDirection, selectedSortMode]
  );
}
