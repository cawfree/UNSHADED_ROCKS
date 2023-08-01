import * as React from 'react';
import useIsInViewport from 'use-is-in-viewport';

import {RocksScrollCard} from '@/rocks/components';
import {RockV2} from '@/rocks/@types';

const style = {width: '100%', aspectRatio: 1};

export const RocksScrollCardContainer = React.memo(
  function RocksScrollCardContainer({
    cameraControlsEnabled,
    rock,
    renderOnlyWithinViewport,
    rotationEnabled,
    rockBasisPoints,
  }: {
    readonly cameraControlsEnabled?: boolean;
    readonly rock: RockV2;
    readonly renderOnlyWithinViewport: boolean;
    readonly rotationEnabled: boolean;
    readonly rockBasisPoints: string;
  }): JSX.Element {
    const ref = React.useRef(null);

    const [inViewport, wrappedTargetRef] = useIsInViewport({
      target: ref,
      threshold: Number.EPSILON,
    });

    const visible = !renderOnlyWithinViewport || inViewport;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <div style={style} ref={wrappedTargetRef}>
        {visible && (
          <RocksScrollCard
            rock={rock}
            cameraControlsEnabled={cameraControlsEnabled}
            rotationEnabled={rotationEnabled}
            rockBasisPoints={rockBasisPoints}
          />
        )}
      </div>
    );
  }
);
