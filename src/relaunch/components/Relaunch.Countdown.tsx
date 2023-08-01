import * as React from 'react';
import {useBlocksUntilRelaunch} from '@/relaunch/hooks';
import {SpanLetterformUpright} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {useRelaunchContext} from '@/relaunch/contexts';

export const RelaunchCountdown = React.memo(
  function RelaunchCountdown(): JSX.Element {
    const blocksUntilRelaunch = useBlocksUntilRelaunch(useRelaunchContext());
    const asText = blocksUntilRelaunch < 0
      ? '---'
      : blocksUntilRelaunch >= 999
      ? 'O1k'
      : Number(blocksUntilRelaunch).toString().padStart(3, '0');
    return (
      <div className="w-full flex items-center justify-center">
        {asText.split('').map((e, i) => (
          <SpanLetterformUpright key={i} className="text-3xl text-accent text-center">
            <ThemeDigitize children={e} key={String(blocksUntilRelaunch)} />
          </SpanLetterformUpright>
        ))}
      </div>
    );
  }
);

