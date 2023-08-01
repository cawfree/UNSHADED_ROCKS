import * as React from 'react';

import {NavigatorModalContextValue} from '@/navigation/@types';

const NavigatorModalContext = React.createContext<
  NavigatorModalContextValue | null
>(null);

export const NavigatorModalContextProvider = NavigatorModalContext.Provider;

export function useNavigatorModalContext(): NavigatorModalContextValue {
  const maybeContext = React.useContext(NavigatorModalContext);

  if (!maybeContext)
    throw new Error('Missing <NavigatorModalContextProvider />!');

  return maybeContext;
}

