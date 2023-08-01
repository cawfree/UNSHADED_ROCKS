import './Relaunch.DVD.css';

import * as React from 'react';
import {clsx} from 'clsx';

import {RocksViewer} from '@/rocks/components';
import {useRandomSimpleRock} from '@/rocks/hooks';

export const RelaunchDVD = React.memo(
  function RelaunchDVD({
    children,
    onHoldEnd,
    onHoldStart,
    disabled = false,
  }: React.PropsWithChildren<{
    readonly onHoldStart?: () => void;
    readonly onHoldEnd?: () => void;
    readonly disabled?: boolean;
  }>): JSX.Element {
    const [paused, setPaused] = React.useState<boolean>(false);
    const rock = useRandomSimpleRock();
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="box-box-box">
          <div className="absolute inset-0">
            {children}
          </div>
          <div
            className={clsx(
              'boing-boing-boing',
              !disabled && 'pointer-events-auto',
            )}
            style={{
              ...paused ? {
                animationPlayState: 'paused',
              } : null,
            }}
            onPointerDown={React.useCallback(
              () => Boolean(setPaused(true)) || onHoldStart?.(),
              [onHoldStart]
            )}
            onPointerUp={React.useCallback(
              () => Boolean(setPaused(false)) || onHoldEnd?.(),
              [onHoldEnd]
            )}
          >
            <RocksViewer
              rotationEnabled
              rock={rock}
              cameraControls
              style={{width: '100%', height: '100%'}}
            />
          </div>
        </div>
      </div>
    );
  }
);
