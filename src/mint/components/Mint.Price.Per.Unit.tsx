import * as React from 'react';

import {SpanLetterform} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {MintPriceSpan} from "@/mint/components/Mint.Price.Span";
import {useThemeContext} from '@/theme/contexts';

export const MintPricePerUnit = React.memo(
  function MintPricePerUnit(): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    return (
      <div className="flex flex-col items-center">
        <SpanLetterform className={`text-${primaryColorSelection} font-black text-md sm:text-2xl select-none text-center`}>
          <span style={{whiteSpace: 'nowrap'}}>
            <MintPriceSpan />
            <ThemeDigitize children="ETH / ROCK" />
          </span>
        </SpanLetterform>
      </div>
    );
  }
);
