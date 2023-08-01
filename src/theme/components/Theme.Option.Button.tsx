import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {colors} from '@/tailwind/assets';
import {useThemeContext} from '@/theme/contexts';

export const ThemeOptionButton = React.memo(
  function ThemeOptionButton({
    className,
    title,
    onClick,
    disabled,
    backgroundColor = 'secondary',
    digitized = false,
  }: {
    readonly className?: string;
    readonly title: string;
    readonly disabled?: boolean;
    readonly onClick?: () => void;
    readonly backgroundColor?: keyof typeof colors;
    readonly digitized?: boolean;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    return (
      <div
        onClick={!disabled ? onClick : undefined}
        className={clsx(
          'text-center pt-2 pb-1',
          disabled ? 'text-accent opacity-50' : `bg-${backgroundColor} text-accent`,
          !disabled && `cursor-pointer hover:bg-accent hover:text-${primaryColorSelection}`,
          className,
        )}>
        <SpanLetterform className="text-small select-none">
          <ThemeDigitize
            disabled={!digitized}
            children={false //disabled && obfuscateOnDisabled
              ? title.split('').map(() => '?').join('')
              : title}
            threshold={0.70}
          />
        </SpanLetterform>
      </div>
    );
  }
);

