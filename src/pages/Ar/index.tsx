import * as React from 'react';
import {useParams} from 'react-router-dom';

import {ArQrSearch} from '@/ar/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {Layout} from '@/layout/components';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {useMaybeRockById} from '@/rocks/hooks';
import {useBreakpoint} from '@/tailwind/hooks';
import {useThemeContext} from '@/theme/contexts';

export const Ar = React.memo(
  function Ar(): JSX.Element {
    const {rockId: maybeRockId} = useParams();
    const {primaryColorSelection} = useThemeContext();

    const maybeRock = useMaybeRockById(maybeRockId);
    const shouldRenderText = useBreakpoint('sm');

    const renderBody = React.useCallback(
      () => (
        <div>
          <ArQrSearch />
        </div>
      ),
      [maybeRock?.animation_url, shouldRenderText]
    );

    const renderHeader = React.useCallback(
      () => (
        <div className="flex flex-col h-full pt-8 pl-5 pb-8">
          <div className="w-full">
            <SpanLetterformUpright
              className={`text-4xl text-${primaryColorSelection}`}
              children="AR"
            />
          </div>
          <div className="flex-1" />
          <div className="w-full flex">
            <NavigatorHomeButton className="pl-4" />
          </div>
        </div>
      ),
      [primaryColorSelection],
    );

    const {renderBottom} = useNavigationFooterBottom();

    const renderFooter = React.useCallback(
      () => <NavigatorRouteFooter renderBottom={renderBottom} />,
      [renderBottom]
    );

    return (
      <Layout
        renderBodySm
        renderBody={renderBody}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    );
  }
);
