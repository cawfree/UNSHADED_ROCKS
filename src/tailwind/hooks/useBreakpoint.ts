import * as React from 'react';
import {useThrottledCallback} from 'use-debounce';

import {screens} from '../assets';

export function useBreakpoint(
  breakpoint: keyof typeof screens
) {

  const isMatchesBreakpoint = React.useCallback(
    (): boolean => window.matchMedia(
      `(min-width: ${screens[breakpoint]})`
    ).matches,
    [breakpoint]
  );

  const [match, setMatch] = React.useState<boolean>(isMatchesBreakpoint);

  const throttledSetMatch = useThrottledCallback(
    React.useCallback((isMatch: boolean) => setMatch(isMatch), []),
    1000,
    {trailing: true},
  );

  React.useEffect(
    () => {
      function checkIsMatchesBreakpoint() {
        const isMatch = isMatchesBreakpoint();
        if (isMatch !== match) throttledSetMatch(isMatch);
      }

      window.addEventListener('resize', checkIsMatchesBreakpoint);
      return () => window.removeEventListener('resize', checkIsMatchesBreakpoint);
    },
    [breakpoint, isMatchesBreakpoint, match, throttledSetMatch]
  );

  return match;
}
