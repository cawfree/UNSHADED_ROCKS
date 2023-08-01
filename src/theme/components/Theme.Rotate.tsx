import * as React from 'react';

export const ThemeRotate = React.memo(
  function ThemeRotate({
    children,
    width,
    height,
    direction = '90deg',
  }: React.PropsWithChildren<{
    readonly width: number;
    readonly height: number;
    readonly direction?: '-90deg' | '90deg',
  }>): JSX.Element {
    return (
      <div className="relative" style={{width, height}}>
        <div
          className="absolute flex items-center justify-center"
          style={{width, height, transform: `rotate(${direction})`}}>
          <div style={{width: height, height: width}} children={children} />
        </div>
      </div>
    );
  }
);
