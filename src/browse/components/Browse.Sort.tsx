import * as React from 'react';
import {clsx} from 'clsx';

import {SelectedSortDirection, SelectedSortMode, SortDirection, SortMode} from '@/browse/@types';
import {SpanLetterformUpright} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const BrowseSort = React.memo(
  function BrowseSort({
    className: defaultClassName = 'text-base select-none',
    sortDirection,
    sortMode,
    setSortMode,
    setSortDirection,
  }: {
    readonly className?: string;
    readonly setSortDirection: React.Dispatch<React.SetStateAction<SelectedSortDirection>>;
    readonly sortDirection: SelectedSortDirection;
    readonly setSortMode: React.Dispatch<React.SetStateAction<SelectedSortMode>>;
    readonly sortMode: SelectedSortMode;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    return (
      <div className="flex flex-row p-2">
        <div className="flex flex-col">
          <div className="flex pb-4">
            <SpanLetterformUpright className={clsx(`select-none text-base pr-2 text-${primaryColorSelection}`)}>
              <ThemeDigitize children="SORT" />
            </SpanLetterformUpright>
            <SpanLetterformUpright
              onClick={() => setSortDirection(SortDirection.ASC)}
              className={clsx(
                defaultClassName,
                'pr-2 cursor-pointer',
                sortDirection === SortDirection.ASC ? 'text-accent' : 'text-secondary',
              )}>
              <ThemeDigitize children="ASC" />
            </SpanLetterformUpright>
            <SpanLetterformUpright
              onClick={() => setSortDirection(SortDirection.DESC)}
              className={clsx(
                defaultClassName,
                'pr-2 cursor-pointer',
                sortDirection === SortDirection.DESC ? 'text-accent' : 'text-secondary',
              )}>
              <ThemeDigitize children="DESC" />
            </SpanLetterformUpright>
          </div>
          <div className="flex">
            <SpanLetterformUpright
              onClick={() => setSortMode(SortMode.VERTICES)}
              className={clsx(
                defaultClassName,
                'pr-2 cursor-pointer',
                sortMode === SortMode.VERTICES ? 'text-accent' : 'text-secondary',
              )}>
              <ThemeDigitize children="VERTICES" />
            </SpanLetterformUpright>
            <SpanLetterformUpright
              onClick={() => setSortMode(SortMode.POLYGONS)}
              className={clsx(
                defaultClassName,
                'pr-2 cursor-pointer',
                sortMode === SortMode.POLYGONS ? 'text-accent' : 'text-secondary',
              )}>
              <ThemeDigitize children="POLYGONS" />
            </SpanLetterformUpright>
            <SpanLetterformUpright
              onClick={() => setSortMode(SortMode.VOLUME)}
              className={clsx(
                defaultClassName,
                'pr-2 cursor-pointer',
                sortMode === SortMode.VOLUME ? 'text-accent' : 'text-secondary',
              )}>
              <ThemeDigitize children="VOLUME" />
            </SpanLetterformUpright>
          </div>
        </div>
      </div>
    );
  }
);
