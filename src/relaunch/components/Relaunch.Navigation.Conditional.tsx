import * as React from 'react';

import {RelaunchProvider} from '@/relaunch/components';
import {useHasLaunched} from '@/relaunch/hooks';

export const RelaunchNavigationConditional = React.memo(
  function RelaunchNavigationConditional({
    children,
    shouldBypassRelaunch,
  }: React.PropsWithChildren<{
    readonly shouldBypassRelaunch?: boolean;
  }>): JSX.Element {

    const [hasLaunched] = useHasLaunched();

    const isCurrentlyBeingBypassed = !hasLaunched && shouldBypassRelaunch;

    return (
      <RelaunchProvider isCurrentlyBeingBypassed={Boolean(isCurrentlyBeingBypassed)}>
        {children}
      </RelaunchProvider>
    );
  }
);
