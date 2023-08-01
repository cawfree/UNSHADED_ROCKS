import * as React from 'react';

import {ThemeContextValue} from '@/theme/@types';

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export const ThemeContextProvider = ThemeContext.Provider;

export function useThemeContext(): ThemeContextValue {
  const maybeContext = React.useContext(ThemeContext);

  if (!maybeContext) throw new Error('Missing <ThemeContextProvider />!');

  return maybeContext;
}
