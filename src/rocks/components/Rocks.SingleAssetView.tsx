import * as React from 'react';
import {clsx} from 'clsx';

import {RenderContainerCallbackProps} from '@/rocks/@types';

export const RocksSingleAssetView = React.memo(
  function RockSingleAssetView({
    //rock,
    className,
    children,
    style,
  }: RenderContainerCallbackProps & {
    readonly className?: string;
    readonly style?: React.CSSProperties;
  }): JSX.Element {
    return (
      <div className={clsx('relative w-full h-full select-none', className)} style={style}>
        <div className="w-full h-full">
          <div className="w-full h-full pb-8">
            <div className="relative w-full h-full flex items-center justify-center">
              <div style={{width: '90%', height: '90%',marginTop: '-15%'}}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

//{children}
