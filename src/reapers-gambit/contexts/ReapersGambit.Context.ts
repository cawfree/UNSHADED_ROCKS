import * as React from 'react';

import {ReapersGambitContextValue} from '@/reapers-gambit/@types';

const ReapersGambitContext = React.createContext<ReapersGambitContextValue | null>(
  null
);

export const ReapersGambitContextProvider = ReapersGambitContext.Provider;

export function useReapersGambitContext(): ReapersGambitContextValue {
  const maybeContext = React.useContext(ReapersGambitContext);

  if (!maybeContext) throw new Error(`Missing <ReapersGambitContextProvider />!`);

  return maybeContext;
}
