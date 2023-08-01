// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react';

import {rocks} from '@/rocks/assets';

const volumes = rocks.map(e => e.volume);

const maxVolume = Math.max(...volumes);
const minVolume = Math.min(...volumes);

import {RockV2} from '@/rocks/@types';

export const RocksViewer = React.memo(
  function RocksViewer({
    rotationEnabled,
    className,
    rock,
    style,
    cameraControls,
  }: {
    readonly rotationEnabled: boolean;
    readonly className?: string;
    readonly rock: RockV2;
    readonly style?: React.CSSProperties;
    readonly cameraControls: boolean;
  }): JSX.Element {

    const rotation = React.useMemo(() => {

      if (!rotationEnabled) return '0deg';

      const r = (maxVolume - rock.volume) / (maxVolume - minVolume);
      const rot = Math.round((r * 50)) + 1;

      return `${rot}deg`;
    }, [rock, rotationEnabled]);

    return (
      <model-viewer
        style={style}
        className={className}
        src={rock.animation_url}
        ar-status="not-presenting"
        disable-zoom="true"
        interaction-prompt="none"
        auto-rotate="true"
        disable-tap="true"
        rotation-per-second={rotation}
        auto-rotate-delay="0"
        poster-color="transparent"
        reveal="auto"
        {...cameraControls ? {'camera-controls': true} : null}
      />
    );
  }
);
