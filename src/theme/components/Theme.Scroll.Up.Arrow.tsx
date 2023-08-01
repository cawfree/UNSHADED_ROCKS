import * as React from 'react';

import {colors} from '@/tailwind/assets';

export const ThemeScrollUpArrow = React.memo(
  function ThemeScrollUpArrow({
      fill = colors.secondary,
  }: {
    readonly fill?: string;
  }): JSX.Element {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.49 39.46">
          <g><path fill={fill} d="m15.27,25.46c0-.85-.42-1.27-1.27-1.27H0s0-5.94,0-5.94h14c.85,0,1.27-.42,1.27-1.27v-5.51s-5.52,5.52-5.52,5.52l-4.24-4.24L18.24,0l12.73,12.73-4.24,4.24-5.52-5.52v5.52c0,.85.42,1.27,1.27,1.27h14s0,5.94,0,5.94h-14c-.85,0-1.27.42-1.27,1.27v14s-5.94,0-5.94,0v-14Z"/></g>
        </svg>
      </div>
    );
  }
);

