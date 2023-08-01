import * as React from 'react';
import {useAccount, useSendTransaction, useWaitForTransaction} from 'wagmi';
import useLocalStorage from 'use-local-storage';

import {keccakString} from '@/ethereum/utils';
import {RockEthscriptionState, RockV2} from '@/rocks/@types';

const toHexString = (e: string) => {
  let d: string[] = [];
  for (let c = e, a = 0; a < c.length; a++) {
    let b = c.charCodeAt(a).toString(16);
    d.push(b)
  }
  return `0x${d.join("")}` as `0x${string}`;
}

const toDataUrl = (url: string) => new Promise<string>(resolve => {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
});

const shouldEthscribe = async ({
  to,
  rock,
  sendTransactionAsync,
}: {
  readonly to: string;
  readonly rock: RockV2;
  readonly sendTransactionAsync: Required<ReturnType<typeof useSendTransaction>>['sendTransactionAsync'];
}): Promise<`0x${string}`> => {

  const {image: uri} = rock;

  const data = toHexString(await toDataUrl(uri));

  if (!sendTransactionAsync) throw new Error('sendTransactionAsync was not found!');

  const {hash} = await sendTransactionAsync({
    to,
    data,
    value: 0n,
  });

  return hash;
};

type Result = {
  readonly state: RockEthscriptionState;
  readonly hash?: string | null;
  readonly ethscribe: () => Promise<void>;
};

type PartialState = {
  readonly loading: boolean;
  readonly error?: Error;
};

export function useRocksEthscribe({
  maybeRock,
}: {
  readonly maybeRock?: RockV2;
}): Result {

  const rockId = String(maybeRock?.id);
  const {address: to} = useAccount();
  const {sendTransactionAsync} = useSendTransaction();

  const [transactionHash, setTransactionHash] = useLocalStorage<`0x${string}` | null>(
    React.useMemo(
      () => keccakString(`RocksEthscribe:${String(rockId)}`),
      [rockId]
    ),
    null,
  );
  const [state, setState] = React.useState<PartialState>({
    loading: false,
  });

  const ethscribe = React.useCallback(
    async (): Promise<void> => {

      if (state.loading) return console.warn('Already ethscribing...');

      try {

        if (!maybeRock?.id) throw new Error('Invalid rock.');

        if (!sendTransactionAsync) throw new Error('Not yet ready!');

        if (typeof to !== 'string' || !to.length) throw new Error('Invalid to address.');

        setState({loading: true});

        const hash = await shouldEthscribe({
          to,
          rock: maybeRock,
          sendTransactionAsync,
        });

        setTransactionHash(hash);

        setState({loading: false});

      } catch (cause) {
        setState({
          loading: false,
          // @ts-expect-error language_version
          error: new Error(`Failed to ethscribe. ${String(cause)}`, cause),
        })
      }
    },
    [maybeRock, state, to, sendTransactionAsync, setTransactionHash]
  );

  const {
    isSuccess: didSuccessfullyMineTransaction,
    isLoading,
  } = useWaitForTransaction({
    hash: transactionHash!,
    enabled: Boolean(typeof transactionHash === 'string' && transactionHash.length),
  });

  return React.useMemo<Result>(
    () => {
      if (didSuccessfullyMineTransaction && typeof transactionHash === 'string') {
        return {
          state: RockEthscriptionState.SUCCESS,
          hash: transactionHash,
          ethscribe,
        };
      } else if (state.loading || isLoading) {
        return {state: RockEthscriptionState.LOADING, ethscribe};
      } else if (state.error) {
        return {state: RockEthscriptionState.ERROR, ethscribe};
      }

      return {state: RockEthscriptionState.NOT_ATTEMPTED, ethscribe};
    },
    [
      isLoading,
      didSuccessfullyMineTransaction,
      transactionHash,
      ethscribe,
      state,
    ]
  );
}
