import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const InfoLink = React.memo(
  function InfoLink({
    children: defaultChildren,
    alt: title,
    href,
    disabled,
  }: {
    readonly children: string;
    readonly alt: string;
    readonly href: string;
    readonly disabled?: boolean;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const children = (
      <div>
        <SpanLetterform className="text-xl">
          <ThemeDigitize children={defaultChildren} />
        </SpanLetterform>
      </div>
    );
    return (
      <div
        className={clsx(
          'cursor-pointer',
            `text-${primaryColorSelection}`,
            !disabled && 'hover:text-accent',
        )}>
        {disabled
          ? children
          : <a href={href} title={title} target="_blank" children={children} />}
      </div>
    );
  }
);

