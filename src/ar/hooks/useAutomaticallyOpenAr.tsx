// @ts-nocheck
import * as React from 'react';

import {useMaybeRockById} from '@/rocks/hooks';

export function useAutomaticallyOpenAr({
  forRockId,
}: {
  readonly forRockId?: string;
}) {

  const maybeRock = useMaybeRockById(forRockId);
  const ref = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(
    () => {
      if (!maybeRock?.animation_url) return;

      return void setTimeout(
        () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref?.current?.click?.();
        },
        120
      );
    },
    [maybeRock?.animation_url],
  );

  const renderAutomaticArOpener = React.useCallback(
    () => (
      <div className="absolute inset-0 invisible">
        <model-viewer
          key={String(maybeRock?.animation_url)}
          src={maybeRock?.animation_url}
          camera-controls="true"
          disable-zoom="true"
          interaction-prompt="none"
          ar=""
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate="true"
          rotation-per-second="36deg"
          auto-rotate-delay="0"
          animation-crossfade-duration="0"
          ar-status="not-presenting">
          <button slot="ar-button" className="arButton" ref={ref} />
        </model-viewer>
      </div>
    ),
    [maybeRock]
  );

  return {renderAutomaticArOpener};
}

