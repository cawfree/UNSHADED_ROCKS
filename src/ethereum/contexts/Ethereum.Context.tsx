import * as React from 'react';

import {EthereumContextValue} from '@/ethereum/@types';

const EthereumContext = React.createContext<EthereumContextValue | null>(null);

export const EthereumContextProvider = EthereumContext.Provider;

export function useEthereumContext() {
  const maybeContext = React.useContext(EthereumContext);

  if (!maybeContext) throw new Error('Missing <EthereumContextProvider />!');

  return maybeContext;
}

