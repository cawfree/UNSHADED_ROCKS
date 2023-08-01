import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {useRocksTotalSupply} from '@/rocks/hooks';
import {ThemeDigitize} from '@/theme/components';

export const MintProgress = React.memo(
  function RocksMintProgress({
    className,
  }: {
    readonly className?: string;
  }): JSX.Element {
    //const {data: currentSupply} = useRocksTokenCounter();
    //const {data: maximumSupply} = useRocksMaxNumberOfPieces();
    const {data: totalSupply} = useRocksTotalSupply();
    //const {primaryColorSelection} = useThemeContext();
    return (
      <div className={clsx('flex', className)}>
        <SpanLetterformUpright
          className={`text-secondary font-black text-3xl select-none animate-fade-down`}>
          <ThemeDigitize
            // HACK: The amount to be minted is less than the maximum supply
            //       since some are whitelisted.
            children={totalSupply ? `${totalSupply}` : ''}
          />
        </SpanLetterformUpright>
        <SpanLetterformUpright
          className={`text-secondary font-black text-3xl select-none animate-fade-up`}>
          <ThemeDigitize children="MINTED" />
        </SpanLetterformUpright>
      </div>
    );
  }
);
