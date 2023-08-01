import * as React from 'react';
import {toBigInt} from 'ethers';

import {useBasketContext} from '@/basket/contexts';
import {SpanLetterformUpright} from '@/letterform/components';
import {MintPriceSpan} from '@/mint/components';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const BasketIndicator = React.memo(
  function BasketIndicator({
    className,
    disabled = false,
    // Permit the indicator value to be overridden.
    numberOfRocksInBasket: defaultNumberOfRocksInBasket,
    units = 'ETH',
  }: {
    readonly className?: string;
    readonly disabled?: boolean;
    readonly numberOfRocksInBasket?: number;
    readonly units?: string;
  }): JSX.Element {
    const {numberOfRocksInBasket: maybeNumberOfRocksInBasket} = useBasketContext();
    const numberOfRocksInBasket = defaultNumberOfRocksInBasket ?? maybeNumberOfRocksInBasket;
    const {primaryColorSelection} = useThemeContext();
    return (
      <div className={className}>
        <div>
          <div className="flex">
            <SpanLetterformUpright className={`text-${primaryColorSelection} font-black text-2xl select-none`}>
              <MintPriceSpan
                infinite={disabled}
                multiple={toBigInt(numberOfRocksInBasket)}
              />
            </SpanLetterformUpright>
            <SpanLetterformUpright className={`text-${primaryColorSelection} font-black text-2xl select-none`}>
              <ThemeDigitize infinite={disabled}>
                {String(numberOfRocksInBasket)}
              </ThemeDigitize>
            </SpanLetterformUpright>
          </div>
          <div className="flex pt-4">
            <SpanLetterformUpright className="text-accent font-black text-2xl select-none">
              <ThemeDigitize infinite={disabled} children={units} />
            </SpanLetterformUpright>
            <SpanLetterformUpright className="text-accent font-black text-2xl select-none">
              <ThemeDigitize infinite={disabled}>
                ROCKS
              </ThemeDigitize>
            </SpanLetterformUpright>
          </div>
        </div>
      </div>
    );
  }
);
