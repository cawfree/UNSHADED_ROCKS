import * as React from 'react';
import {useDebounce} from 'use-debounce';

import {
  SelectedSortDirection,
  SelectedSortMode,
  SelectedType,
} from '@/browse/@types';
import {BrowseSearch, BrowseSort, BrowseType} from '@/browse/components';
import {useBrowseFilter, useBrowseSort, useBrowseTypes} from '@/browse/hooks';
import {Layout, LayoutForcedHeight} from '@/layout/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {NavigatorHomeButton, NavigatorPlusButtonRoutesMinified, NavigatorRouteFooter} from '@/navigation/components';
import {RockV2} from '@/rocks/@types';
import {ROCK_SCROLL_BASIS_POINTS_DENSE_LAYOUT} from '@/rocks/constants';
import {
  RocksAttributesIndicator,
  RocksScroll,
  RocksSelectionConsumer,
  RocksSelectionProvider,
} from '@/rocks/components';
import {useRocksInfinite, useRocksRenderChildrenMasonry} from '@/rocks/hooks';
import {useThemeContext} from '@/theme/contexts';

export const BrowseBase = React.memo(
  function Browse({
    title,
    forRocks,
  }: {
    readonly title: string;
    readonly forRocks: readonly RockV2[];
  }): JSX.Element {
    const types = useBrowseTypes({
      forRocks,
    });

    const renderChildren = useRocksRenderChildrenMasonry({});

    // HACK: Prioritize simple rocks for faster page loads.
    const [selectedSortMode, setSelectedSortMode] = React.useState<
      SelectedSortMode
    >(null);
    const [selectedSortDirection, setSelectedSortDirection] = React.useState<
      SelectedSortDirection
    >(null);

    const [searchText, setSearchText] = React.useState<string>('');
    const [debouncedSearchText] = useDebounce<string>(searchText, 250);
    const [selectedType, setSelectedType] = React.useState<SelectedType>(null);
    const {fetchNextPage, hasNext, items} = useRocksInfinite({
      forRocks,
      filter: useBrowseFilter({
        searchText: debouncedSearchText,
        selectedType,
      }),
      sort: useBrowseSort({selectedSortMode, selectedSortDirection}),
    });

    const [maybeFirstRock] = items;
    const initiallySelectedRockId = maybeFirstRock?.id ?? null;

    const {primaryColorSelection} = useThemeContext();

    return (
      <RocksSelectionProvider initiallySelectedRockId={initiallySelectedRockId}>
        <Layout
          renderHeader={React.useCallback(
            () => (
              <LayoutForcedHeight className="flex">
                <div className="flex">
                  <div className="flex flex-col pt-8 pb-8 pl-5 items-end">
                    <SpanLetterformUpright
                      className={`text-4xl text-${primaryColorSelection}`}
                      children={title}
                    />
                    <div className="flex-1" />
                    <div style={{marginRight: -13}}>
                      <NavigatorHomeButton className="" />
                    </div>
                  </div>
                  <div className="relative flex ml-8 flex-col" style={{width: '100px'}}>
                    <div className="absolute inset-0">
                      <div className="flex w-full h-full pt-8 pb-8">
                        <div className="flex-1 overflow-scroll">
                          <BrowseType
                            selectedType={selectedType}
                            onClick={() => setSelectedType(null)}
                            type={null}
                          />
                          {types.map((type: number) => (
                            <BrowseType
                              onClick={() => setSelectedType(type)}
                              key={String(type)}
                              selectedType={selectedType}
                              type={type}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </LayoutForcedHeight>
            ),
            [types, selectedType, setSelectedType, title, primaryColorSelection],
          )}
          renderBody={React.useCallback(
            () => (
              <div className="flex flex-col h-full pt-8 pb-8">
                <RocksScroll
                  rockBasisPoints={ROCK_SCROLL_BASIS_POINTS_DENSE_LAYOUT}
                  rotationEnabled
                  className="flex-1"
                  items={items}
                  fetchNextPage={fetchNextPage}
                  renderChildren={renderChildren}
                  hasNext={hasNext}
                  renderContainer={({children, rock}) => (
                    <RocksSelectionConsumer
                      rock={rock}
                      renderSelectable={() => <React.Fragment children={children} />}
                      className="w-full h-full"
                    />
                  )}
                />
              </div>
            ),
            [hasNext, fetchNextPage, items, renderChildren],
          )}
          renderFooter={React.useCallback(
            () => (
              <NavigatorRouteFooter
                renderSeparator={() => <div className="p-10" />}
                bottomClassName="flex flex-1"
                renderBottom={() => (
                  <div className="flex flex-1 flex-col pb-8 pt-8 pr-4">
                    <div className="flex flex-col">
                      <div className="flex">
                        <BrowseSearch onChange={setSearchText} searchText={searchText} />
                        <div className="flex flex-col items-center">
                          <BrowseSort
                            setSortDirection={setSelectedSortDirection}
                            setSortMode={setSelectedSortMode}
                            sortDirection={selectedSortDirection}
                            sortMode={selectedSortMode}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <div className="w-full flex justify-end">
                      <NavigatorPlusButtonRoutesMinified className="" />
                    </div>
                  </div>
                )}
                renderTop={() => <RocksAttributesIndicator className="pt-8" />}
              />
            ),
            [
              searchText,
              setSearchText,
              selectedSortMode,
              selectedSortDirection,
              setSelectedSortMode,
              setSelectedSortDirection,
            ],
          )}
        />
      </RocksSelectionProvider>
    );
  }
);
