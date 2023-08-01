import * as React from 'react';

import {colors} from '@/tailwind/assets';

export const ThemeScrollDownArrow = React.memo(
  function ThemeScrollDownArrow({
      fill = colors.secondary,
  }: {
    readonly fill?: string;
  }): JSX.Element {
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.49 39.46">
          <g><path fill={fill} d="m21.21,14c0,.85.42,1.27,1.27,1.27h14s0,5.94,0,5.94h-14c-.85,0-1.27.42-1.27,1.27v5.51s5.52-5.52,5.52-5.52l4.24,4.24-12.73,12.73-12.73-12.73,4.24-4.24,5.52,5.52v-5.52c0-.85-.42-1.27-1.27-1.27H0s0-5.94,0-5.94h14c.85,0,1.27-.42,1.27-1.27V0s5.94,0,5.94,0v14Z"/></g>
        </svg>
      </>
    );
  }
);

