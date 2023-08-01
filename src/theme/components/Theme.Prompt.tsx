import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {useThemeContext} from '@/theme/contexts';

export const ThemePrompt = React.memo(
  function ThemePrompt({
    onClick,
    children,
    disabled = false,
    className,
    optionStyle,
  }: React.PropsWithChildren<{
    readonly onClick?: React.HTMLProps<HTMLDivElement>['onClick'];
    readonly className?: string
    readonly disabled?: boolean;
    readonly optionStyle?: boolean;
  }>): JSX.Element {

    const {primaryColorSelection} = useThemeContext();

    // TODO: extract code share Theme.Option.Button / Theme.Prompt styling
    const colorStyle = optionStyle ? clsx(
      disabled ? 'text-accent bg-secondary opacity-50' : 'bg-secondary text-accent',
      !disabled && `cursor-pointer hover:bg-accent hover:text-${primaryColorSelection}`,
    ) : clsx(
      !disabled && `bg-${primaryColorSelection}`,
      `text-${disabled ? primaryColorSelection : 'accent'}`,
      !disabled && 'hover:bg-accent',
      !disabled && `hover:text-${primaryColorSelection}`,
    );

    return (
      <div onClick={disabled ? undefined : onClick}>
        <div className="flex flex-row items-start">
          <SpanLetterformUpright
            className={clsx(
              'pt-5 pr-2 pl-4 pb-2',
              !disabled && !!onClick && 'cursor-pointer',
              'font-black text-4xl select-none',
              colorStyle,
              className,
            )}
            children={children}
          />
        </div>
      </div>
    );
  }
);
