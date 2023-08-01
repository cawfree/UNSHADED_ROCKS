import * as React from 'react';

import {ReapersGambitContextProvider} from '@/reapers-gambit/contexts';
import {useReapersGambitKnowDeathOf} from '@/reapers-gambit/hooks';

export const ReapersGambitProvider = React.memo(
  function ReapersGambitProvider({
    children,
  }: React.PropsWithChildren): JSX.Element {
    return (
      <ReapersGambitContextProvider
        // Track the state of the current wallet.
        value={useReapersGambitKnowDeathOf({
          //address: '0xdbe998e7d1d59d4ef4c9574a65b6aeb5f5319ae2' /* dead */,
        })}
        children={children}
      />
    );
  }
);
