import * as React from 'react';

import {SpanLetterformUpright} from '@/letterform/components';
import {RelaunchCountdown} from '@/relaunch/components/Relaunch.Countdown';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const RelaunchCountdownIndicator = React.memo(
  function RelaunchCountdownIndicator({
    threshold,
  }: {
    readonly threshold: number;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const className = `text-3xl text-${primaryColorSelection}`;
    return (
      <div className="flex flex-col">
        <div>
          <RelaunchCountdown />
        </div>
        <div>
          <SpanLetterformUpright className={className}>
            <ThemeDigitize children="UNSHADED" threshold={threshold} />
          </SpanLetterformUpright>
          <SpanLetterformUpright className={className}>
            <ThemeDigitize children="ROCKS" threshold={threshold} />
          </SpanLetterformUpright>
          <SpanLetterformUpright className={className}>
            <ThemeDigitize children="RELAUNCH" threshold={threshold} />
          </SpanLetterformUpright>
        </div>
        <div>
          <RelaunchCountdown />
        </div>
      </div>
    );
  }
);
