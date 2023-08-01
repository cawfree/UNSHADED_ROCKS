import * as React from 'react';
import {clsx} from 'clsx';

import {MintProgress, MintStatistics} from '@/mint/components';

export const RocksRecentHeader = React.memo(
  function RocksRecentHeader({
    className,
    showRemaining,
  }: {
    readonly className?: string;
    readonly showRemaining: boolean;
  }): JSX.Element {
    return (
      <div className={clsx('flex', className)}>
        <MintStatistics />
        {showRemaining && <MintProgress className="pl-4" />}
      </div>
    );
  }
);
