import * as React from 'react';

import {Layout} from '@/layout/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {NavigatorRouteFooter, NavigatorHomeButton} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {ThemeDigitize} from '@/theme/components';

export const NotFound = React.memo(
  function NotFound(): JSX.Element {
    const {renderBottom} = useNavigationFooterBottom();
    return (
      <Layout
        renderHeader={React.useCallback(
          () => (
            <div className="flex flex-col h-full select-none pt-8 pl-5">
              <div>
                <SpanLetterformUpright className="text-secondary text-5xl">
                  <ThemeDigitize children="404" />
                </SpanLetterformUpright>
              </div>
              <div className="flex-1" />
              <div className="flex w-full pb-8">
                <NavigatorHomeButton className="pl-4" />
              </div>
            </div>
          ),
          [],
        )}
        renderBody={() => <></>}
        renderFooter={React.useCallback(
          () => <NavigatorRouteFooter renderBottom={renderBottom} />,
          [renderBottom],
        )}
      />
    );
  }
);
