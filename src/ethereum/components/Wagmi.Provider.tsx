import * as React from 'react';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {mainnet, localhost} from 'wagmi/chains';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import {injectedWallet} from '@rainbow-me/rainbowkit/wallets';
import {connectorsForWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';

import {getConfig} from '@/config/utils';

const {rpcUrl} = getConfig();

const isLocalHost = rpcUrl.includes('localhost');

const {chains, publicClient} = isLocalHost
  ? configureChains([localhost], [
      jsonRpcProvider({
        rpc: () => ({http: rpcUrl}),
      }),
    ])
  : configureChains([mainnet], [
      alchemyProvider({
        apiKey: rpcUrl.substring(rpcUrl.lastIndexOf('/') + 1),
      }),
    ]);

const connectors = connectorsForWallets([{
  groupName: 'Rocks Mainnet',
  wallets: [injectedWallet({chains})],
}]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const WagmiProvider = React.memo(
  function WagmiProvider({children}: React.PropsWithChildren): JSX.Element {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode children={children} />
      </WagmiConfig>
    );
  }
);
