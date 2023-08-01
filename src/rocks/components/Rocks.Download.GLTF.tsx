import * as React from 'react';

import {RockV2} from '@/rocks/@types';
import {ThemeOptionButton} from '@/theme/components';

export const RocksDownloadGLTF = React.memo(
  function RocksDownloadGLTF({
    className,
    maybeRock,
  }: {
    readonly className?: string;
    readonly maybeRock?: RockV2;
  }): JSX.Element {
    return (
      <div className={className}>
        <ThemeOptionButton
          key={String(maybeRock?.id)}
          title="DOWNLOAD"
          disabled={!maybeRock}
          onClick={React.useCallback(
            () => Boolean(maybeRock?.animation_url) && window.open(maybeRock!.animation_url),
            [],
          )}
        />
      </div>
    );
  }
);
