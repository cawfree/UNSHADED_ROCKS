import * as React from 'react';

import {RelaunchContextValue} from '@/relaunch/@types';

const RelaunchContext = React.createContext<RelaunchContextValue | null>(null);

export const RelaunchContextProvider = RelaunchContext.Provider;

export function useRelaunchContext(): RelaunchContextValue {
  const maybeContext = React.useContext(RelaunchContext);

  if (!maybeContext)
    throw new Error(`Missing <RelaunchContextProvider />!`);

  return  maybeContext;
}
