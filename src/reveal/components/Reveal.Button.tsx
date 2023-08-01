import * as React from 'react';
import {clsx} from 'clsx';

import {ThemeDigitize, ThemePrompt} from '@/theme/components';

export const RevealButton = React.memo(
  function RevealButton(
    {
      className,
      disabled,
      infinite = disabled,
      ...extras
    }: Omit<Parameters<typeof ThemePrompt>[0], 'children'> & {
      readonly infinite?: boolean;
    }
  ): JSX.Element {
    return (
      <ThemePrompt
        {...extras}
        disabled={disabled}
        className={clsx(
          className,
          disabled && 'text-secondary'
        )}>
        <ThemeDigitize key={String(infinite)} children="REVEAL" infinite={infinite} />
      </ThemePrompt>
    );
  }
);
