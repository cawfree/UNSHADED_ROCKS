import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {colors} from '@/tailwind/assets';

export const NavigatorPlusButton = React.memo(
  function NavigatorPlusButton({
    className,
    textColor,
    hoverTextColor,
    onClick,
  }: {
    readonly className?: string;
    readonly textColor: keyof typeof colors;
    readonly hoverTextColor: keyof typeof colors;
    readonly onClick?: () => void;
  }): JSX.Element {
    return (
      <div
        style={{height: 70, width: 80, paddingTop: 10, overflow: 'hidden'}}
        className={clsx('relative cursor-pointer', className)}
        onClick={onClick}
      >
        <SpanLetterform
          className={clsx(`text-4xl text-${textColor} hover:text-${hoverTextColor}`)}
          children="+"
        />
      </div>
    );
  }
);

