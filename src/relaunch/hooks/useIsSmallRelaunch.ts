import {useWindowSize} from 'react-use';

export function useIsSmallRelaunch() {
  const {width} = useWindowSize();
  // TODO: Shared with Relaunch.DVD.css
  const isSmall = width <= 768;

  return {isSmall};
}
