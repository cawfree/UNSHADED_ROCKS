import '@rainbow-me/rainbowkit/styles.css';
import './index.css'

import * as ReactDOM from 'react-dom/client'
import {SWRConfig} from 'swr';

import {BasketProvider} from '@/basket/components';
import {EthereumProvider, WagmiProvider} from '@/ethereum/components';
import {GalleryProvider} from '@/gallery/components';
import {MintProvider} from '@/mint/components';
import {Navigator} from '@/navigation/components';
import {ReapersGambitProvider} from '@/reapers-gambit/components';
import {ThemeProvider} from '@/theme/components';
import {WalletProvider} from '@/wallet/components';

//{/* @ts-ignore */}
//value={{provider: localStorageProvider}}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SWRConfig>
    <WagmiProvider>
      <EthereumProvider>
        <WalletProvider>
          <ReapersGambitProvider>
            <ThemeProvider letterformDisabled>
              <GalleryProvider>
                <BasketProvider>
                  <MintProvider>
                    {/* HACK: Force vite to respect custom fonts; it has a hard time detecting dynamic usage. */}
                    <div className="TheyEmbodyTheEssenceOfAnObjectExistingBetweenTheRealmOfManufacturedAndNaturalEntities">
                      <div className="bg-primary text-primary hover:bg-dead hover:text-dead" />
                      <div className="bg-dead text-dead hover:bg-primary hover:text-primary" />
                      <p className="font-mono" />
                      <h1 className="font-LetterformVariations00 invisible" children="Hello, world!" />
                      <h1 className="font-LetterformVariations01 invisible" children="Hello, world!" />
                    </div>
                    {/* __App__ */}
                    <Navigator />
                  </MintProvider>
                </BasketProvider>
              </GalleryProvider>
            </ThemeProvider>
          </ReapersGambitProvider>
        </WalletProvider>
      </EthereumProvider>
    </WagmiProvider>
  </SWRConfig>
);

console.log('The journey of these rocks is as extensive as their collectors take them. We encourage independent initiatives.');
