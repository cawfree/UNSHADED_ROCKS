import * as React from 'react';
import {useBlockNumber} from 'wagmi';

import {RelaunchContextValue} from '@/relaunch/@types';
import {useConfig} from '@/config/hooks';
import {useHasLaunched} from "@/relaunch/hooks/useHasLaunched";

export const useIsRelaunched = (state: RelaunchContextValue) => {
  if (state.loading || !('result' in state)) return false;

  return state.result.isRelaunched;
};

export const useBlocksUntilRelaunch = (state: RelaunchContextValue) => {
  if (state.loading || !('result' in state)) return -1n;

  return state.result.blocksUntilRelaunch;
};

// HACK: A common state to use when the entire launch process is long-over.
const previouslyDidLaunchState: RelaunchContextValue = {
  loading: false,
  result: {
    isRelaunched: true,
    blocksUntilRelaunch: 0n,
    isCurrentlyBeingBypassed: false,
  },
};

export function useCreateRelaunchContext({
  isCurrentlyBeingBypassed,
}: {
  readonly isCurrentlyBeingBypassed: boolean;
}): RelaunchContextValue {
  const [hasLaunched, setHasLaunched] = useHasLaunched();

  const {relaunchBlock} = useConfig();
  const isRelaunchConfigured = Boolean(relaunchBlock);

  // Prevent glitchy first render on initial load if relaunch has already occurred.
  const initialState = React.useMemo<RelaunchContextValue>(
    () => {
      if (hasLaunched || !isRelaunchConfigured) return previouslyDidLaunchState;

      return {loading: true};
    },
    [hasLaunched, relaunchBlock, isRelaunchConfigured]
  );

  const [state, setState] = React.useState<RelaunchContextValue>(initialState);

  const isCurrentlyRelaunched = useIsRelaunched(state);

  const {error, data, isLoading} = useBlockNumber({
    watch: true,
    enabled: !isCurrentlyRelaunched,
  });

  React.useEffect(() => void (async () => {

    if (isCurrentlyRelaunched || !relaunchBlock)
        return setState(previouslyDidLaunchState);

    if (error)
      return setState({
        // @ts-expect-error language_version
        error: new Error(`Failed to determine current block.`, {cause: error}),
        loading: false,
      });

    if (!data || isLoading) return setState({loading: true});

    const isRelaunched = data >= relaunchBlock;

    if (isRelaunched) {
      // HACK: Cache for next time to allow immediate mount.
      void setHasLaunched(true);
      // Countdown is over.
      return setState(previouslyDidLaunchState);
    } else {
      return setState({
        loading: false,
        //isRelaunched: false,
        result: {
          isRelaunched: false,
          blocksUntilRelaunch: relaunchBlock - data,
          isCurrentlyBeingBypassed,
        },
      });
    }
  })(), [
    data,
    error,
    isCurrentlyRelaunched,
    relaunchBlock,
    isCurrentlyBeingBypassed,
    setHasLaunched,
    isLoading,
  ]);

  return state;
}
