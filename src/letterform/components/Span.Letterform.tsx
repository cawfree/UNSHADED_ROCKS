import * as React from 'react';
import {clsx} from 'clsx';

import {useLetterFormFontFamily} from '@/letterform/hooks';

export const SpanLetterform = React.memo(
  function SpanLetterform({
    children,
    className: defaultClassName,
    onClick,
    style,
  }: React.PropsWithChildren<{
    readonly onClick?: React.HTMLProps<HTMLSpanElement>['onClick'];
    readonly className: string;
    readonly style?: React.CSSProperties;
  }>): JSX.Element {
    const {tailwindFontFamily} = useLetterFormFontFamily();
    return (
      <span
        style={style}
        onClick={onClick}
        className={clsx('letterform-bold uppercase', tailwindFontFamily, defaultClassName)}>
        {children}
      </span>
    );
  }
);
