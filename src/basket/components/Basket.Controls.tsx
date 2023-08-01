import * as React from 'react';

import {useBasketContext} from '@/basket/contexts';
import {isActivelyTransacting} from '@/mint/@types';
import {useMintContext} from '@/mint/contexts';
import {ThemeButton} from '@/theme/components';

export const BasketControls = React.memo(
  function BasketControls(): JSX.Element {
    const {
      addRockToBasket,
      removeRockFromBasket,
      numberOfRocksInBasket,
    } = useBasketContext();

    const children = numberOfRocksInBasket < 10
      ? `0${numberOfRocksInBasket}`
      : String(numberOfRocksInBasket);

    const {state} = useMintContext();
    const disabled = isActivelyTransacting(state);

    return (
      <div>
        <div className="flex">
          <ThemeButton
            disabled={disabled}
            children="-"
            onClick={removeRockFromBasket}
            className="pt-2"
          />
          <ThemeButton
            disabled={disabled}
            className="cursor-pointer pt-2"
            children={children}
          />
          <ThemeButton
            className="pt-2"
            children="+"
            // HACK: Enforce two digits.
            disabled={numberOfRocksInBasket >= 99 || disabled}
            onClick={addRockToBasket}
          />
        </div>
      </div>
    );
  }
);
