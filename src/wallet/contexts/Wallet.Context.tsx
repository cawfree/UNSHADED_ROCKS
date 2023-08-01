import * as React from 'react';

import {WalletContextValue} from '@/wallet/@types';

const WalletContext = React.createContext<WalletContextValue | null>(null);

export const WalletContextProvider = WalletContext.Provider;

export function useWalletContext(): WalletContextValue {

  const maybeContext = React.useContext(WalletContext);

  if (!maybeContext) throw new Error('Missing <WalletProvider />!');

  return maybeContext;
}
