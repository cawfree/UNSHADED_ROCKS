import * as React from 'react';

import {RockSelectionContextValue} from '@/rocks/@types';

const RocksSelectionContext = React.createContext<RockSelectionContextValue | null>(
    null
);

export const RockSelectionContextProvider = RocksSelectionContext.Provider;

export function useRockSelectionContext(): RockSelectionContextValue {
  const maybeContext = React.useContext(RocksSelectionContext);

  if (!maybeContext) throw new Error('Missing <RockSelectionContextProvider />!')

  return maybeContext;
}
