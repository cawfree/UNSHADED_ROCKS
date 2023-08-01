import * as React from 'react';

import {NavigatorRoute} from '@/navigation/@types';
import {NavigatorModalPicker} from '@/navigation/components/Navigator.Modal.Picker';
import {NavigatorPlusButtonRoutesMinified} from "@/navigation/components";

export function useNavigationFooterBottom({
  renderMint = true,
  minify = true,
}: {
  readonly renderMint?: boolean;
  readonly minify?: boolean;
} = {}) {

  const routesToRender = React.useMemo(() => [
    NavigatorRoute.AR_WITHOUT_ROCK,
    NavigatorRoute.INFO,
    NavigatorRoute.MINT,
    NavigatorRoute.MA55,
    NavigatorRoute.CLAIM,
    NavigatorRoute.WALLET,
    NavigatorRoute.BROWSE,
    NavigatorRoute.ROCKMAP,
  ].filter((e) => {
    if (e === NavigatorRoute.MINT) return renderMint;
    return true;
  }), [renderMint]);

  const renderBottom = React.useCallback(
    (): JSX.Element => {

      if (minify) {
        return (
          <div className="w-full flex justify-end">
            <NavigatorPlusButtonRoutesMinified />
          </div>
        );
      }

      return (
        <div className="pb-4 pr-3">
          <NavigatorModalPicker
            visible
            onRequestClose={console.log}
            renderClose={false}
            className="text-3xl"
            routesToRender={routesToRender}
          />
        </div>
      );
    },
    [routesToRender, minify]
  );

  return {renderBottom};
}

