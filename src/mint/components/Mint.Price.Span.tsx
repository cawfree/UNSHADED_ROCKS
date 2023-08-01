import * as React from 'react';
import {formatEther} from 'viem';

import {useRocksPricePerPiece} from '@/rocks/hooks';
import {ThemeDigitize} from '@/theme/components';

export const MintPriceSpan = React.memo(
  function RocksMintPriceSpan({
    multiple = 1n,
    infinite = false,
    digits = 3,
  }: {
    readonly multiple?: bigint;
    readonly infinite?: boolean;
    readonly digits?: number;
  }): JSX.Element {
    const {data} = useRocksPricePerPiece();
    return (
      <span>
        <ThemeDigitize
          infinite={infinite}
          children={`${data ? Number.parseFloat(formatEther((data as bigint) * multiple)).toFixed(digits) : '?.??'}`}
        />
      </span>
    );
  }
);
