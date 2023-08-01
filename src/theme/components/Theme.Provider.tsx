import * as React from 'react';

import {useIsCurrentUserDead} from '@/reapers-gambit/hooks';
import {ThemeContextValue} from '@/theme/@types';
import {ThemeContextProvider} from '@/theme/contexts';

export const ThemeProvider = React.memo(
  function ThemeProvider({
    children,
    letterformDisabled = false,
  }: React.PropsWithChildren<{
    readonly letterformDisabled?: boolean;
  }>): JSX.Element {
    const isDead = useIsCurrentUserDead();
    return (
      <ThemeContextProvider
        children={children}
        value={React.useMemo<ThemeContextValue>(
          () => ({
            letterformDisabled,
            primaryColorSelection: isDead ? 'dead': 'primary',
          }),
          [letterformDisabled, isDead],
        )}
      />
    );
  }
);
