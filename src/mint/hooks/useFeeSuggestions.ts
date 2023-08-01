import * as React from 'react';
import {suggestFees} from '@rainbow-me/fee-suggestions';
import {usePublicClient} from 'wagmi';
import {ethers} from 'ethers';

import {useConfig} from '@/config/hooks';

type State = Readonly<
  | {loading: true}
  | {loading: false, data: Awaited<ReturnType<typeof suggestFees>>}
  | {loading: false, error: Error}
>;

const loadingState = (): State => ({loading: true});

export const getMaybeFeeSuggestions = (state: State) => {
  if (state.loading || !('data' in state)) return undefined;

  return state.data;
}

export function useFeeSuggestions(): State {
  const {rpcUrl} = useConfig();
  const [state, setState] = React.useState<State>(loadingState);
  const publicClient = usePublicClient();

  React.useEffect(() => void (async () => {
    try {

     setState(loadingState);

     const provider = new ethers.JsonRpcProvider(rpcUrl);

     // @ts-expect-error library_version
     setState({loading: false, data: await suggestFees(provider)});

    } catch (cause) {
      setState({
        loading: false,
        // @ts-expect-error language_version
        error: new Error('Failed to fetch fee suggestions.', {cause}),
      });
    }
  })(), [publicClient, rpcUrl]);

  return state;
}
