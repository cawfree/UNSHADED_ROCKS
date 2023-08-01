import * as React from 'react';

import {NavigatorPlusButton} from '@/navigation/components/Navigator.Plus.Button';
import {useNavigatorModalContext} from '@/navigation/contexts';

export const NavigatorPlusButtonRoutesMinified = React.memo(
  function NavigatorPlusButtonRoutesMinified({
    className = "pb-8",
  }: {
    readonly className?: string;
  }): JSX.Element {
    const {onRequestOpen} = useNavigatorModalContext();
    return (
      <div className={className}>
        <NavigatorPlusButton
          textColor="secondary"
          hoverTextColor="accent"
          onClick={onRequestOpen}
        />
      </div>
    );
  }
);

