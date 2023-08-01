import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {useThemeContext} from '@/theme/contexts';

export const ThemeTitle = React.memo(
  function ThemeTitle({
    className,
    children,
    onClick,
  }:  React.PropsWithChildren<{
    readonly className?: string;
    readonly onClick?: () => void;
  }>): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    return (
      <div className="flex flex-col h-screen pt-4">
        <div className="flex">
          <SpanLetterformUpright className={clsx(`text-${primaryColorSelection} select-none text-5xl`, className)} onClick={onClick}>
            UNSHADED
          </SpanLetterformUpright>
          <SpanLetterformUpright className={clsx(`text-${primaryColorSelection} select-none text-5xl`, className)} onClick={onClick}>
            ROCKS
          </SpanLetterformUpright>
        </div>
        <div className="flex-1 flex items-end pb-8">
          {children}
        </div>
      </div>
    );
  }
);
