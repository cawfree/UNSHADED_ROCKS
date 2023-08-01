import * as React from 'react';
import {clsx} from 'clsx';

import {LayoutForcedHeight} from '@/layout/components';

const defaultRenderSeparator = () => (
  <div className="flex flex-1" />
);

export const NavigatorRouteFooter = React.memo(
  function NavigatorRouteFooter({
    className,
    renderTop,
    renderBottom,
    renderSeparator = defaultRenderSeparator,
    bottomClassName,
  }: {
    readonly className?: string;
    readonly renderTop?: () => JSX.Element;
    readonly renderBottom: () => JSX.Element;
    readonly renderSeparator?: () => JSX.Element;
    readonly bottomClassName?: string;
  }): JSX.Element {

    return (
      <div className={clsx('flex flex-col h-full pr-2', className)}>
        <LayoutForcedHeight className="flex-1 pb-8 pt-8">
          <div className="flex flex-col flex-1">
            {Boolean(renderTop) && (
              <div className="flex" children={renderTop?.()} />
            )}
            {renderSeparator?.()}
            <div className={bottomClassName} children={renderBottom()} />
          </div>
        </LayoutForcedHeight>
      </div>
    );
  }
);
