import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {fontSize} from '@/tailwind/assets';
import {useThemeContext} from "@/theme/contexts";

export const ThemeButton = React.memo(
  function ThemeButton({
    children,
    textSize = '4xl',
    className,
    ...extras
  }: Omit<React.HTMLProps<HTMLDivElement>, 'children'> & {
    readonly textSize?: keyof typeof fontSize;
    readonly children: string;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    return (
      <div {...extras} className={clsx(`bg-${primaryColorSelection} cursor-pointer`, className)}>
        <div className="flex pointer-events-none">
          {children.split('').map((e, i) => (
            <div key={String(i)} className="flex p-5 justify-center items-center">
              <SpanLetterformUpright
                children={e}
                className={clsx(
                  `text-${textSize}`,
                  `text-accent font-black background-${primaryColorSelection} select-none`
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
