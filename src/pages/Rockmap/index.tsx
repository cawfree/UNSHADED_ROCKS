import * as React from 'react';

import {Layout} from '@/layout/components';
import {SpanLetterform, SpanLetterformUpright} from '@/letterform/components';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {RockmapText} from '@/rockmap/components';
import {ThemeDigitize, ThemeDigitizeArray} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const Rockmap = React.memo(
  function Rockmap(): JSX.Element {
    const {renderBottom} = useNavigationFooterBottom();
    const {primaryColorSelection} = useThemeContext();
    return (
      <Layout
        renderHeader={React.useCallback(
          () => (
            <div className="flex flex-col h-full select-none pt-8 pl-5">
              <div>
                <SpanLetterformUpright className={`text-${primaryColorSelection} text-5xl`}>
                  <ThemeDigitize children="ROCKMAP" />
                </SpanLetterformUpright>
              </div>
              <div className="flex-1" />
              <div className="flex w-full pb-8">
                <NavigatorHomeButton className="pl-4" />
              </div>
            </div>
          ),
          [primaryColorSelection],
        )}
        renderBody={() => (
          <div className="absolute flex flex-col w-full h-full pt-8">
            <div className="w-full flex flex-1 items-center justify-center pl-4 pr-4">
              <RockmapText />
            </div>
            <div className="w-full flex-0 pb-8 flex items-center justify-center">
              <SpanLetterform className="text-3xl text-accent">
                <ThemeDigitizeArray
                  disabled={false}
                  children={['price change', 'randomized mint', 'early collectors comp', 'ma55 assembly']}
                  threshold={0.75}
                  timeout={2500}
                />
              </SpanLetterform>
            </div>
          </div>
        )}
        renderFooter={React.useCallback(
          () => (
            <NavigatorRouteFooter
              renderBottom={renderBottom}
              renderTop={() => (
                <div style={{marginLeft: -10}}>
                  <SpanLetterformUpright
                    className="text-4xl text-secondary pt-8"
                    children="RE-LAUNCH"
                  />
                </div>
              )}
            />
          ),
          [renderBottom],
        )}
      />
    );
  }
);
