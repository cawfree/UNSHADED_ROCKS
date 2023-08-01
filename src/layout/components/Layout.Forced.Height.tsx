import * as React from 'react';
import {clsx} from 'clsx';

import {ThemeTitle} from '@/theme/components';

export const LayoutForcedHeight = React.memo(
  function LayoutForcedHeight({
    className,
    children,
  }: React.PropsWithChildren<{
    readonly className?: string;
  }>): JSX.Element {
    return (
      <div className={clsx('flex', className)}>
        <div style={{width: 0}}>
          <ThemeTitle className="invisible" />
        </div>
        {children}
      </div>
    );
  }
);
