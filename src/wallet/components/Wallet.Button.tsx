import * as React from 'react';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount, useDisconnect} from 'wagmi';
import {useHoverDirty} from 'react-use';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const WalletButton = React.memo(
  function WalletButton(): JSX.Element {
    const {isConnected} = useAccount();
    const {disconnect} = useDisconnect();

    const ref0 = React.useRef<HTMLDivElement | null>(null);
    const ref1 = React.useRef<HTMLDivElement | null>(null);

    const hover0 = useHoverDirty(ref0);
    const hover1 = useHoverDirty(ref1);

    const firstLine = isConnected ? 'DIS': 'CONNECT';
    const secondLine = isConnected ? 'CONNECT': 'WALLET';

    const isHovered = hover0 || hover1;

    const {primaryColorSelection} = useThemeContext();

    const className = clsx(
      'text-4xl pt-4 pb-2 pl-2 pr-0 cursor-pointer',
      isHovered
        ? `${isConnected ? 'bg-secondary-darker' : 'bg-accent'} ${isConnected ? 'text-accent' : `text-${primaryColorSelection}`}`
        : `${isConnected ? 'bg-secondary' : `bg-${primaryColorSelection}`} ${isConnected ? 'text-secondary-darker' : 'text-accent'}`,
    );

    const shouldDisconnect = React.useCallback(
      () => disconnect?.(),
      [disconnect],
    );


    return (
      <ConnectButton.Custom>
        {({openConnectModal}) => (
          <div className="flex items-end">
            <div ref={ref0} onClick={isConnected ? shouldDisconnect : openConnectModal}>
              <SpanLetterformUpright className={className}>
                <ThemeDigitize children={firstLine} />
              </SpanLetterformUpright>
            </div>
            <div ref={ref1} onClick={isConnected ? shouldDisconnect : openConnectModal}>
              <SpanLetterformUpright className={className}>
                <ThemeDigitize children={secondLine} />
              </SpanLetterformUpright>
            </div>
          </div>
        )}
      </ConnectButton.Custom>
    );
  }
);
