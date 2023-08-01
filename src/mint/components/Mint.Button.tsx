import * as React from 'react';

import {isActivelyTransacting} from '@/mint/@types';
import {useMintContext} from '@/mint/contexts';
import {ThemeDigitize, ThemePrompt} from '@/theme/components';

export const MintButton = React.memo(
  function MintButton({
    onClick,
    children,
    disabled,
    ...extras
  }: Omit<Parameters<typeof ThemePrompt>[0],  'children'> & {
    readonly children?: string;
  }): JSX.Element {
    const {state} = useMintContext();
    return (
      <ThemePrompt
        {...extras}
        onClick={onClick}
        disabled={disabled || isActivelyTransacting(state)}>
        <ThemeDigitize
          children={children || "MINT"}
          infinite={isActivelyTransacting(state)}
        />
      </ThemePrompt>
    );
  }
);
