import * as React from 'react';

import {BasketContextValue} from '@/basket/@types';

const BasketContext = React.createContext<BasketContextValue | null>(null);

export const BasketContextProvider = BasketContext.Provider;

export function useBasketContext(): BasketContextValue {
  const maybeContext = React.useContext(BasketContext);

  if (!maybeContext) throw new Error('Missing <BasketContextProvider />!');

  return maybeContext;
}
