import * as React from 'react';

import {RockEthscriptionState, RockV2} from '@/rocks/@types';
import {useRocksEthscribe} from '@/rocks/hooks';
import {ThemeOptionButton} from '@/theme/components';
import {useIsRockInWallet} from '@/wallet/hooks';

export const RocksEthscribe = React.memo(
  function RocksEthscribe({
    className,
    maybeRock,
  }: {
    readonly className?: string;
    readonly maybeRock?: RockV2;
  }): JSX.Element {
    const {ethscribe, state, hash} = useRocksEthscribe({maybeRock});

    const isRockInWallet = useIsRockInWallet({maybeRock});

    return (
      <div className={className}>
        <ThemeOptionButton
          key={String(maybeRock?.id)}
          title={
            state === RockEthscriptionState.NOT_ATTEMPTED
              ? 'ETHSCRIBE'
              : state === RockEthscriptionState.LOADING
              ? 'LOADING'
              : state === RockEthscriptionState.SUCCESS
              ? 'ETHSCRIPTION'
              : 'RETRY'}
          disabled={!isRockInWallet}
          //obfuscateOnDisabled={false}
          onClick={React.useCallback(
            async () => {
                try {
                  if (state === RockEthscriptionState.SUCCESS && hash)
                    return window?.open?.(
                      `https://ethscriptions.com/ethscriptions/${hash}`,
                      '_blank',
                    )?.focus();

                  await ethscribe();
                } catch (e) {
                    console.error(e);
                }
            },
            [state, ethscribe, hash],
          )}
        />
      </div>
    );
  }
);
