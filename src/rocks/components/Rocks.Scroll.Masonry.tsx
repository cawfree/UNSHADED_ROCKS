import * as React from 'react';
import {useWindowSize} from 'react-use';

import {chunk} from '@/ma55/utils';

import {COLUMN_BREAK_POINTS_HIGH} from '@/rocks/constants';

export const RocksScrollMasonry = React.memo(
  function RocksScrollMasonry({
    columnBreakPoints = COLUMN_BREAK_POINTS_HIGH,
    gutter = '0px',
    children,
  }: React.PropsWithChildren<{
    readonly gutter?: string;
    readonly columnBreakPoints?: Record<string, number>;
  }>): JSX.Element {
    const {width} = useWindowSize();

    const columns = Object.entries(columnBreakPoints)
      .reduce(
          (bp, [min_width, nbp]) =>
            width >= parseInt(min_width) && nbp >= bp ? nbp : bp,
          Math.min(...Object.values(columnBreakPoints), 0),
      );

    const chunkedItems = chunk({
      arr: React.Children.toArray(children),
      chunkSize: columns,
    });

    return (
      <React.Fragment
        children={chunkedItems.map((items, i) => (
          <div className="w-full flex flex-row" key={String(i)}>
            {[...Array(columns)].flatMap((_, j) => [
              <div className="flex-1" key={String(j)} children={items[j] || null} />,
              Boolean(j < columns - 1 && gutter) && (
                <div key={`${j}_g`} style={{width: gutter}} />
              ),
            ]).filter(e => e)}
          </div>
        ))}
      />
    );
  }
);
