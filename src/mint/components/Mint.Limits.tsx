import * as React from 'react';

import {SpanLetterform} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';

export const MintLimits = React.memo(
  function RocksMintLimits(): JSX.Element {
    return (
      <div className="flex flex-col items-center">
        <SpanLetterform className="text-accent font-black text-md sm:text-2xl select-none">
          <span style={{whiteSpace: 'nowrap'}}>
            <ThemeDigitize children="RANDOM MINT" />
          </span>
        </SpanLetterform>
        <SpanLetterform className="text-accent font-black text-md sm:text-2xl select-none">
          <span style={{whiteSpace: 'nowrap'}}>
            <ThemeDigitize children="NO LIMIT" />
          </span>
        </SpanLetterform>
      </div>
    );
  }
);
