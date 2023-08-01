import * as React from 'react';
import useMouse from '@react-hook/mouse-position';

export const BasketPyramidCell = React.memo(
  function BasketPyramidCell({
    onMouseDraggedOver,
   ...extras
  }: React.HTMLProps<HTMLDivElement> & {
    readonly onMouseDraggedOver: () => void;
  }): JSX.Element {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const mouse = useMouse(ref);

    const {isDown} = mouse;

    React.useEffect(
      () => void (isDown && onMouseDraggedOver?.()),
      [onMouseDraggedOver, isDown],
    );

    return <div {...extras} ref={ref} />;
  }
);
