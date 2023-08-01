import * as React from 'react';

import {RenderChildrenCallback} from '@/rocks/@types';

export function useRocksRenderChildrenSingular({
  width,
  height,
}: {
  readonly width: number;
  readonly height: number;
}) {
  const size = Math.min(width, height);

  const renderChildren: RenderChildrenCallback = React.useCallback(({
    children,
  }: React.PropsWithChildren) => (
      <>
        {React.Children.toArray(children).map(
          (child, i) => (
            <div key={String(i)} className="flex items-center justify-center" style={{width: size, height: width}}>
              <div style={{width: size, height: size}} children={child} />
            </div>
          ),
        )}
      </>
  ), [width, height, size]);

  return {renderChildren};
}

