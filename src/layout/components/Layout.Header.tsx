import * as React from 'react';

import {LayoutForcedHeight} from './Layout.Forced.Height';

export const LayoutHeader = React.memo(
  function LayoutHeader({
    className,
    children: defaultChildren,
    //minWidth = 210,
    minWidth = undefined,
  }: React.PropsWithChildren<{
    readonly className?: string;
    readonly minWidth?: number;
  }>): JSX.Element {

    const children = (
      <LayoutForcedHeight className={className}>
        <div className="w-full">
          {defaultChildren}
        </div>
      </LayoutForcedHeight>
    );

    if (typeof minWidth === 'number') return <div style={{minWidth}} children={children} />;

    return <React.Fragment children={children} />;

  }
);

