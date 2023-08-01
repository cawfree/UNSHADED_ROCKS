import * as React from 'react';

import {SelectedType} from '@/browse/@types';
import {RockV2} from '@/rocks/@types';

export function useBrowseFilter({
  selectedType,
  searchText: maybeSearchText,
}: {
  readonly selectedType: SelectedType;
  readonly searchText: string;
}) {
  const searchText = (maybeSearchText || '').trim();
  return React.useCallback(
    (rock: RockV2) => {

      // If search text is defined?
      if (typeof searchText === 'string' && searchText.length) {
          // Only return rocks whose identifiers match the search string.
          if (!String(rock.id).includes(searchText)) return false;
      }

      if (selectedType === null) return true;

      // Excluded rocks don't have types.
      //if (rock.excluded) return false;

      return rock.type === selectedType;
    },
    [selectedType, searchText],
  );
}
