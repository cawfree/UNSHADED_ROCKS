import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {useConfig} from '@/config/hooks';
import {NavigatorModalContextValue, NavigatorRoute,} from '@/navigation/@types';
import {NavigatorModalProvider} from '@/navigation/components';
import {Ar, Browse, Claim, Info, Ma55, Mint, NotFound, Reveal, Rock, Rockmap, Root, Wallet,} from '@/pages/';
import {RelaunchNavigationConditional} from "@/relaunch/components";

const routes: {readonly [key in NavigatorRoute]: React.FC} = {
  [NavigatorRoute.ROOT]: Root,
  [NavigatorRoute.MINT]: Mint,
  [NavigatorRoute.REVEAL]:Reveal,
  [NavigatorRoute.AR]: Ar,
  [NavigatorRoute.AR_WITHOUT_ROCK]: Ar,
  [NavigatorRoute.INFO]: Info,
  [NavigatorRoute.MA55]: Ma55,
  [NavigatorRoute.CLAIM]: Claim,
  [NavigatorRoute.BROWSE]: Browse,
  [NavigatorRoute.WALLET]: Wallet,
  [NavigatorRoute.ROCKMAP]: Rockmap,
  [NavigatorRoute.ROCK]: Rock,
};

const PAGES_ENABLED_DURING_RELAUNCH: readonly string[] = [
  NavigatorRoute.ROCK,
];

export const Navigator = React.memo(
  function Navigator(): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false);

    const onRequestOpen = React.useCallback(
      () => setVisible(true),
      []
    );

    const onRequestClose = React.useCallback(
      () => setVisible(false),
      []
    );
    const value = React.useMemo<NavigatorModalContextValue>(
      () => ({
        visible,
        onRequestClose,
        onRequestOpen,
      }),
      [visible, onRequestClose, onRequestOpen]
    );
    const {siteBaseName} = useConfig()
    return (
      <div className="w-screen h-screen">
        <div className="w-screen h-screen">
          <BrowserRouter basename={siteBaseName}>
            <Routes>
              {Object.entries(routes).map(([path, Component]) => {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <NavigatorModalProvider {...value}>
                        <RelaunchNavigationConditional
                          shouldBypassRelaunch={PAGES_ENABLED_DURING_RELAUNCH.includes(path)}>
                          <Component />
                        </RelaunchNavigationConditional>
                      </NavigatorModalProvider>
                    }
                  />
                );
              })}
              <Route
                path="*"
                element={
                  <NavigatorModalProvider {...value}>
                    <NotFound />
                  </NavigatorModalProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
);
