import * as React from 'react';
import {useWindowSize} from 'react-use';

const getDistanceFromViewportCenter = (element: HTMLElement | null) => {

  if (!element) return Number.POSITIVE_INFINITY;

  const elementRect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  const elementCenterX = elementRect.left + elementRect.width / 2;
  const elementCenterY = elementRect.top + elementRect.height / 2;

  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;

  const distanceX = Math.abs(elementCenterX - viewportCenterX);
  const distanceY = Math.abs(elementCenterY - viewportCenterY);

  return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

export function useRadialIntersection<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>
) {
  const {width, height} = useWindowSize();

  const size = Math.max(width, height);
  const threshold = size * 3;

  const isWithinView = React.useCallback(
    () => getDistanceFromViewportCenter(ref.current) < threshold,
    [threshold, ref],
  );

  const [inView, setInView] = React.useState<boolean>(isWithinView);

  React.useEffect(
    () => {
      const i = setInterval(() => setInView(isWithinView), 250);
      return () => void clearInterval(i);
    },
    [isWithinView]
  );

  return inView;
}
