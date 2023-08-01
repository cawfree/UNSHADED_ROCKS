import * as React from 'react';
import {clsx} from 'clsx';
import {useNavigate} from 'react-router-dom';

import {NavigatorPlusButton} from '@/navigation/components';
import {useThemeContext} from '@/theme/contexts';

export const NavigatorCloseButton = React.memo(
  function NavigatorCloseButton({
    className,
  }: {
    readonly className?: string;
  }): JSX.Element {
    const navigate = useNavigate();
    const {primaryColorSelection} = useThemeContext();
    return (
      <NavigatorPlusButton
        textColor="accent"
        hoverTextColor={primaryColorSelection}
        className={clsx('rotate-45', className)}
        onClick={() => navigate(-1)}
      />
    );
  }
);
