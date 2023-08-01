import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import {NavigatorRoute} from '@/navigation/@types';
import {RockV2} from '@/rocks/@types';
import {ThemeOptionButton} from '@/theme/components';

export const ArButton = React.memo(
  function ArButton({
    className,
    maybeRock,
  }: {
    readonly className?: string;
    readonly maybeRock?: RockV2;
  }): JSX.Element {
    const navigate = useNavigate();
    return (
      <div className={className}>
        <ThemeOptionButton
          title="AR"
          key={String(maybeRock)}
          disabled={!maybeRock}
          onClick={React.useCallback(
            () => navigate(String(NavigatorRoute.AR).replace(':rockId', String(maybeRock?.id))),
            [navigate, maybeRock?.id],
          )}
        />
      </div>
    );
  }
);
