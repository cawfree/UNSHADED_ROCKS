import * as React from 'react';
import {clsx} from 'clsx';

import {LayoutForcedHeight} from '@/layout/components';
import {ThemeScroll} from '@/theme/components';

export const LayoutBodyScroll = React.memo(
  function LayoutBodyScroll({
    children,
    className = 'pl-4',
  }: React.PropsWithChildren<{
    readonly className?: string;
  }>): JSX.Element {
    return (
      <div
        className={clsx(
          'flex items-center h-full w-full',
          className,
        )}>
        <LayoutForcedHeight className="relative w-full">
          <div className="absolute inset-0 pt-8 pb-8">
            <ThemeScroll children={children} className="pr-8" />
          </div>
        </LayoutForcedHeight>
      </div>
    );
  }
);
