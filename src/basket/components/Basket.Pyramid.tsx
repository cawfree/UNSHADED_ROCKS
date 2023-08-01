import * as React from 'react';
import {clsx} from 'clsx';

import {BasketPyramidCell} from '@/basket/components';
import {useBasketContext} from '@/basket/contexts';
import {SpanLetterformUpright} from '@/letterform/components';
import {useThemeContext} from '@/theme/contexts';

const getPyramidColumns = (
  maximumPossibleNumberOfItems: number
) => {
  const cols: number[] = [];

  for (let i = 0; i < maximumPossibleNumberOfItems; i += 1) {
    const next = i + 1;
    const current = cols.reduce((e, j) => e + j, 0);

    if (current + next > maximumPossibleNumberOfItems) break;

    cols.push(next);
  }

  return cols.map(
    (numberOfRows: number, i, orig: readonly number[]) =>
      [...Array(numberOfRows)]
        .map((_, j) => {
           const offset = orig
            .filter((_, k) => k < i)
            .reduce((e, k) => e + k, 0);
          return offset + j + 1;
        }),
  );
};


export const BasketPyramid = React.memo(
  function BasketPyramid(props: React.HTMLProps<HTMLDivElement>): JSX.Element {
    // TODO: make this sensitive to basket
    const {
      numberOfRocksInBasket,
      maximumNumberOfRocksInBasket,
      onRequestSetNumberRocksInBasket,
    } = useBasketContext();

    const cols = React.useMemo(
      () => getPyramidColumns(maximumNumberOfRocksInBasket),
      [maximumNumberOfRocksInBasket]
    );

    const {primaryColorSelection} = useThemeContext();

    return (
      <div {...props}>
        <div className="flex">
          {cols.map(
            (elements: readonly number[], i: number) => (
              <div key={String(i)} className="flex items-end flex-col pr-1">
                <div className="flex-1" />
                {[...elements]
                  .reverse()
                  .map((amount: number) => {
                    const selected = numberOfRocksInBasket === amount;
                    return (
                      <BasketPyramidCell
                        key={String(amount)}
                        className={clsx(
                           'mt-1 cursor-pointer',
                           numberOfRocksInBasket >= amount ? `bg-${primaryColorSelection}` : 'bg-accent',
                           numberOfRocksInBasket >= amount && 'border-2',
                           selected && 'animate-pulse',
                         )}
                         onMouseDraggedOver={() => onRequestSetNumberRocksInBasket(amount)}
                         style={{width: 23, height: 23}}
                      />
                    );
                  })}
              </div>
            ),
          )}
          {false && (
            <SpanLetterformUpright
              className="text-2xl text-end text-accent"
              children="BATCH"
            />
          )}
        </div>
      </div>
    );
  }
);
