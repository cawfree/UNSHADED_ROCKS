import * as React from 'react';
import {clsx} from 'clsx';
import {useAccount} from 'wagmi';

import {useConfig} from '@/config/hooks';
import {SpanLetterformUpright} from '@/letterform/components';
import {useIsCurrentUserDead} from '@/reapers-gambit/hooks';
import {RelaunchCountdownIndicator, RelaunchDVD, RelaunchMarquee} from '@/relaunch/components';
import {useRelaunchContext} from '@/relaunch/contexts';
import {useBlocksUntilRelaunch, useIsSmallRelaunch} from '@/relaunch/hooks';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';
import {WalletButton} from '@/wallet/components';

const threshold = 0.90;

const HEADER_MARQUEE_CONTENT = [
  'Unshaded Rocks Relaunch:',
  'Metadata upgrades',
  'High quality previews',
  'New attributes',
  'Fresh website',
  'Gallery Social App Collab',
  'Lowered price',
  'Airdrop for OG collectors',
];

const HEADER_MARQUEE_DEAD_CONTENT = [
  'You cannot cheat the reaper',
  'You should have listened'
];

export const RelaunchModal = React.memo(
  function RelaunchModal({
    holdTimeForTriggerEasterEgg = 500,
    visible,
  }: {
    readonly holdTimeForTriggerEasterEgg?: number;
    readonly visible: boolean;
  }): JSX.Element {

    const blocksUntilRelaunch = useBlocksUntilRelaunch(useRelaunchContext());

    // Avoids the initial animation if relaunch already happened.
    const [initiallyHidden] = React.useState<boolean>(!visible);
    const [holdStartTime, setHoldStartTime] = React.useState<number>(0);
    const [holdEndTime, setHoldEndTime] = React.useState<number>(0);

    const {isConnected} = useAccount();

    const [key, setKey] = React.useState(String(Math.random()));

    React.useEffect(() => {
      if (Number(blocksUntilRelaunch) % 3 !== 0) return;

      setKey(String(Math.random()))

    }, [blocksUntilRelaunch]);

    const shouldShowCountdownTimer = blocksUntilRelaunch <= 999n && blocksUntilRelaunch >= 0n;
    const {relaunchDate} = useConfig();

    const footerMarqueeContent = React.useMemo<readonly string[]>(() => (
      // TODO: this wouldn't format correctly in time
      //[moment(relaunchDate).format('D MMMM YYYY HH:mm [EST]').toUpperCase()]
      [
        '26 SEPTEMBER 2023 13:00 EST',
        '0.011 ETH/ROCK',
      ]
    ), [relaunchDate]);

    const shouldShowConnect = (isConnected && !shouldShowCountdownTimer) || !shouldShowCountdownTimer && (
      holdEndTime > holdStartTime + holdTimeForTriggerEasterEgg
    );

    const onHoldStart = React.useCallback(
      () => {
        // Lock the connect button for extra drags.
        if (shouldShowConnect) return;

        setHoldStartTime(Date.now());
      },
      [shouldShowConnect]
    );
    const onHoldEnd = React.useCallback(
      () => {
        setHoldEndTime(Date.now());
      },
      []
    );

    const isCurrentUserDead = useIsCurrentUserDead();
    const shouldRenderDeadEffects = (isCurrentUserDead && shouldShowConnect) || false;

    const {primaryColorSelection} = useThemeContext();

    const [showSecret, setShowSecret] = React.useState(false);

    const onClickTopBanner = React.useCallback(
      () => {
        console.log('iykyk for reward');
        setShowSecret(true)
      },
      []
    );

    const shouldShowSecret = isConnected && showSecret;

    const {isSmall} = useIsSmallRelaunch();

    return (
      <div
        className={clsx(
          'absolute inset-0 bg-background flex items-center justify-center select-none',
          visible ? 'pointer-events-auto' : 'pointer-events-none',
          !visible && !initiallyHidden && 'animate-fade-down animate-reverse',
          !visible && initiallyHidden && 'opacity-0',
        )}>
        <div>
          <div className="absolute flex flex-col inset-0">
            <div
              className={clsx('flex pt-4', isConnected && 'cursor-pointer')}
              onClick={isConnected ? onClickTopBanner : undefined}>
              <RelaunchMarquee
                pauseOnHover={!isConnected}
                speed={isSmall ? 100 : 200}
                threshold={threshold}
                className={clsx(shouldShowCountdownTimer && 'invisible')}
                children={shouldRenderDeadEffects
                  ? HEADER_MARQUEE_DEAD_CONTENT
                  : HEADER_MARQUEE_CONTENT}
              />
            </div>
            <div className="relative flex flex-1">
              {shouldShowConnect && (
                <div
                  className={clsx(
                    'absolute inset-0 flex items-center justify-center',
                     'animate-fade-left',
                  )}>
                  <div className="flex">
                    <WalletButton />
                    {shouldShowSecret && (
                      <div className="animate-fade-left flex pl-4">
                        <SpanLetterformUpright className="text-4xl text-accent">
                          <ThemeDigitize disabled={false} children="0x6DA" threshold={0.95} />
                        </SpanLetterformUpright>
                        <SpanLetterformUpright className="text-4xl text-accent">
                          <ThemeDigitize disabled={false} children="6BAD0" threshold={0.95} />
                        </SpanLetterformUpright>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <RelaunchDVD
                disabled={!visible}
                onHoldStart={onHoldStart}
                onHoldEnd={onHoldEnd}>
                {shouldShowCountdownTimer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RelaunchCountdownIndicator key={key} threshold={threshold} />
                  </div>
                )}
              </RelaunchDVD>
            </div>
            <div className="flex justify-center pb-4">
              <RelaunchMarquee
                speed={100}
                color={primaryColorSelection}
                threshold={threshold}
                className={clsx(shouldShowCountdownTimer && 'invisible')}
                children={footerMarqueeContent}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

//<RelaunchDVD>
//  {shouldShowCountdownTimer ? (
//      <div className="absolute inset-0 flex items-center justify-center">
//        <RelaunchCountdownIndicator key={key} threshold={threshold} />
//      </div>
//  ) : (
//      <div className="absolute flex flex-col inset-0">
//        <div className="flex w-full justify-center pt-4">
//          <RelaunchMarquee threshold={threshold} />
//        </div>
//        <div className="flex-1"/>
//        <div className="flex w-full justify-center pb-4">

//        </div>
//      </div>
//  )}
//</RelaunchDVD>

