import * as React from 'react';

import {PaginatedRocks, RockV2} from '@/rocks/@types';
import {rocks} from '@/rocks/assets';

const defaultFilter = () => true;

const defaultSort = () => 0;

export function useRocksInfinite({
  // HACK: Keep this high to support implementation on reveal page!
  forRocks = rocks,
  rocksPerPage = 100,
  filter = defaultFilter,
  sort = defaultSort,
}: {
  readonly forRocks?: readonly RockV2[];
  readonly rocksPerPage?: number;
  readonly filter?: (rock: RockV2) => boolean;
  readonly sort?: (a: RockV2, b: RockV2) => number;
} = {}): PaginatedRocks {

  const [page, setPage] = React.useState<number>(0);

  const rocksThatSatisfyFilter = React.useMemo<readonly RockV2[]>(
    () => forRocks.filter(filter),
    [filter, forRocks]
  );

  const {length: maxNumberOfRocks} = rocksThatSatisfyFilter;

  const numberOfRocks = Math.min((page + 1) * rocksPerPage, maxNumberOfRocks);

  const items = React.useMemo(
    () => [...rocksThatSatisfyFilter].sort(sort).filter((_, i) => i < numberOfRocks),
     [numberOfRocks, rocksThatSatisfyFilter, sort]
  );

  const hasNext = numberOfRocks < maxNumberOfRocks;

  const fetchNextPage = React.useCallback(
    async () => setPage(n => n + 1),
    []
  );

  return {fetchNextPage, items, hasNext};
}
