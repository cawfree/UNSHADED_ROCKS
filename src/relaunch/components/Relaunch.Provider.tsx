import * as React from 'react';

import {RelaunchModal} from '@/relaunch/components';
import {RelaunchContextProvider} from '@/relaunch/contexts';
import {useCreateRelaunchContext, useIsRelaunched} from '@/relaunch/hooks';

export const RelaunchProvider = React.memo(
  function RelaunchProvider({
    children,
    isCurrentlyBeingBypassed,
  }: React.PropsWithChildren<{
    readonly isCurrentlyBeingBypassed: boolean;
  }>): JSX.Element {
    const value = useCreateRelaunchContext({
      isCurrentlyBeingBypassed,
    });
    return (
      <RelaunchContextProvider value={value}>
        {children}
        <RelaunchModal visible={!useIsRelaunched(value) && !isCurrentlyBeingBypassed} />
      </RelaunchContextProvider>
    );
  }
);
