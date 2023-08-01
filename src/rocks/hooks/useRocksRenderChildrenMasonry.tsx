import * as React from 'react';

import {RenderChildrenCallback} from '@/rocks/@types';
import {RocksScrollMasonry} from '@/rocks/components/Rocks.Scroll.Masonry';

export function useRocksRenderChildrenMasonry({
  columnBreakPoints,
  gutter,
}: {
  readonly columnBreakPoints?: Record<string, number>;
  readonly gutter?: string;
} = {}): RenderChildrenCallback {
  return React.useCallback(({
    children,
  }: React.PropsWithChildren) => (
    <RocksScrollMasonry
      children={children}
      gutter={gutter}
      columnBreakPoints={columnBreakPoints}
    />
  ), [gutter, columnBreakPoints]);
}

