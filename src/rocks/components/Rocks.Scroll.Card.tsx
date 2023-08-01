import * as React from 'react';
import {clsx} from 'clsx';
import {useNavigate} from 'react-router-dom';

import {RockV2} from '@/rocks/@types';
import {RocksViewer} from '@/rocks/components';
import {NavigatorRoute} from "@/navigation/@types";

const style = {aspectRatio: 1};

export const RocksScrollCard = React.memo(
  function RocksScrollCard({
    cameraControlsEnabled = true,
    rotationEnabled,
    rock,
    rockBasisPoints,
    navigateOnDoubleClick = true,
  }: {
    readonly cameraControlsEnabled?: boolean;
    readonly rotationEnabled: boolean;
    readonly rock: RockV2;
    readonly rockBasisPoints: string;
    readonly navigateOnDoubleClick?: boolean;
  }): JSX.Element {
    const navigate = useNavigate();

    const onDoubleClick = React.useCallback(
      () => void (
        navigateOnDoubleClick && navigate(NavigatorRoute.ROCK.replace(':rockId', String(rock?.id)))
      ),
      [navigate, rock?.id, navigateOnDoubleClick]
    );

    return (
      <div
        className="overflow-visible"
        style={style}
        onDoubleClick={onDoubleClick}>
        <div className={clsx('relative w-full h-full', !cameraControlsEnabled && 'cursor-pointer')}>
          <RocksViewer
            rotationEnabled={rotationEnabled}
            rock={rock}
            style={{height: rockBasisPoints, width: rockBasisPoints}}
            cameraControls={Boolean(cameraControlsEnabled)}
          />
        </div>
      </div>
    );
  }
);
