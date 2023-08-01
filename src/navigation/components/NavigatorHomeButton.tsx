import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import {NavigatorRoute} from '@/navigation/@types';
import {NavigatorPlusButton} from '@/navigation/components/Navigator.Plus.Button';
import {useThemeContext} from '@/theme/contexts';

export const NavigatorHomeButton = React.memo(
  function NavigatorHomeButton({
    className,
  }: {
    readonly className?: string;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const onClick = React.useCallback(
      () => {
        if (pathname === NavigatorRoute.ROOT) {
          return location.reload();
        }

        return navigate(NavigatorRoute.ROOT);
      },
      [navigate, pathname]
    );
    return (
      <NavigatorPlusButton
        textColor={primaryColorSelection}
        hoverTextColor="accent"
        onClick={onClick}
        className={className}
      />
    );
  }
);
