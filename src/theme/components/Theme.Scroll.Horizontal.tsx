import * as React from 'react';
import {useMeasure} from 'react-use';

import {ThemeRotate, ThemeScroll} from '@/theme/components';

export const ThemeScrollHorizontal = React.memo(
  function ThemeScrollHorizontal({
    children,
    ...extras
  }: Parameters<typeof ThemeScroll>[0]): JSX.Element {
    const [ref, {width, height}] = useMeasure();
    return (
      // @ts-expect-error unsuitable_ref
      <div className="relative w-full h-full" ref={ref}>
        <ThemeRotate width={width} height={height} direction="-90deg">
          <ThemeScroll {...extras} scrollBarPosition="left">
            {children}
          </ThemeScroll>
        </ThemeRotate>
      </div>
    );
  }
);
