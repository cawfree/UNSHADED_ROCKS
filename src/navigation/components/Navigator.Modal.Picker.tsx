import * as React from 'react';
import {clsx} from 'clsx';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAccount} from 'wagmi';

import {SpanLetterform} from '@/letterform/components';
import {NavigatorRoute} from '@/navigation/@types';
import {useBreakpoint} from '@/tailwind/hooks';
import {useWalletContext} from "@/wallet/contexts";
import {getRocksForAddress} from "@/rocks/hooks";

const disabledRoutes: readonly NavigatorRoute[] = [
  NavigatorRoute.REVEAL,
  NavigatorRoute.ROCK,
  NavigatorRoute.AR,
];

const mobileRoutes: readonly NavigatorRoute[] = [
  NavigatorRoute.ROOT,
  NavigatorRoute.MINT,
  NavigatorRoute.INFO,
];

const routeToString = (e: NavigatorRoute): string => (e === NavigatorRoute.ROOT
  ? '/'
  : e === NavigatorRoute.WALLET
  ? 'wallet'
  : e.replace('/', '')
).toUpperCase()

export const NavigatorModalPicker = React.memo(
  function NavigatorModalPicker({
    className,
    visible,
    onRequestClose,
    renderClose,
    //renderRoot,
    //renderMass,
    //renderWallet,
    //renderMint,
    //renderRockmap,
    routesToRender,
  }: {
    readonly className: string;
    readonly onRequestClose: () => void;
    readonly visible: boolean;
    readonly renderClose: boolean;
    //readonly renderRoot: boolean;
    //readonly renderMass: boolean;
    //readonly renderWallet: boolean;
    //readonly renderMint: boolean;
    //readonly renderRockmap: boolean;
    readonly routesToRender: readonly NavigatorRoute[];
  }): JSX.Element {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {address} = useAccount();
    const rocksForAddress = getRocksForAddress(useWalletContext());

    const onClickRoute = React.useCallback(
      (route: NavigatorRoute) => {
        onRequestClose();

        if (route === NavigatorRoute.WALLET)
          return navigate(String(route).replace(':walletAddress', String(address)));

        navigate(route);
      },
      [
        navigate,
        onRequestClose,
        address,
      ]
    );

    const isDesktop = useBreakpoint('sm');

    return (
      <div className={clsx('flex flex-col items-end')}>
        {renderClose && (
          <div className={clsx(visible && 'cursor-pointer')} onClick={onRequestClose}>
            <SpanLetterform
              className={clsx(
                'text-accent',
                visible && 'hover:text-accent',
                className,
              )}
              children="-"
            />
          </div>
        )}
        {routesToRender
          .filter(e => !disabledRoutes.includes(e))
          .filter(e => {
            if (isDesktop)  return true;

            return mobileRoutes.includes(e);
          })
          .filter((e) => {
            //if (e === NavigatorRoute.MINT) return renderMint;
            //if (e === NavigatorRoute.MA55) return renderMass;
            if (e === NavigatorRoute.WALLET) return (Boolean(rocksForAddress.length));
            //if (e === NavigatorRoute.ROOT) return renderRoot;

            return true;
          })
          //.sort((a, b) => routeToString(a).length - routeToString(b).length)
          .map(
            (e: NavigatorRoute) => (
              <div
                key={e}
                className={clsx(visible && 'cursor-pointer')}
                onClick={() => onClickRoute(e)}>
                <SpanLetterform
                  className={clsx(
                    visible && 'hover:text-accent',
                    pathname === e ? 'text-accent' : 'text-secondary',
                    className,
                  )}
                  children={routeToString(e)}
                />
              </div>
            )
        )}
      </div>
    );
  }
);
