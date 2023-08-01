import * as React from 'react';

import {MintContextValue} from '@/mint/@types';

const MintContext = React.createContext<MintContextValue | null>(null);

export const MintContextProvider = MintContext.Provider;

export const getMaybeTransactionHash = (value: MintContextValue): string | null => {
  if (!('transactionHash' in value)) return null;

  return value.transactionHash;
}

export function useMintContext(): MintContextValue {
  const maybeContext = React.useContext(MintContext);

  if (!maybeContext) throw new Error(`Missing <MintContextProvider />!`);

  return maybeContext;
}
