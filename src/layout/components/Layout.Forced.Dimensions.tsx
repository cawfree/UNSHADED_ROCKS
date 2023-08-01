import * as React from 'react';
import {clsx} from 'clsx';

import {LayoutForcedHeight} from '@/layout/components/Layout.Forced.Height';

export const LayoutForcedDimensions = React.memo(
  function LayoutForcedDimensions({
    className,
    children,
  }: React.PropsWithChildren<{
    readonly className?: string;
  }>): JSX.Element {
    return (
      <div className={clsx('relative', className)}>
        {/* HACK: Force dimensions. */}
        <div className="w-full h-full flex items-center justify-center">
          <LayoutForcedHeight children={children} />
        </div>
      </div>
    );
  }
);
