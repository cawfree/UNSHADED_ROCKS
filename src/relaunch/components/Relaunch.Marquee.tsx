import * as React from 'react';
import Marquee from 'react-fast-marquee';

import {SpanLetterform} from '@/letterform/components';
import {colors} from '@/tailwind/assets';
import {ThemeDigitize} from '@/theme/components';
import {useIsSmallRelaunch} from '@/relaunch/hooks';

export const RelaunchMarquee = React.memo(
  function RelaunchMarquee({
    color = 'accent',
    className,
    threshold,
    children,
    speed = 200,
    pauseOnHover = true,
  }: {
   readonly color?: keyof typeof colors;
   readonly className?: string;
   readonly threshold: number;
   readonly children: readonly string[];
   readonly speed?: number;
   readonly pauseOnHover?: boolean;
  }): JSX.Element {

    // TODO: Shared with Relaunch.DVD.css
    const {isSmall} = useIsSmallRelaunch();

    return (
      <div className={className}>
        <Marquee speed={speed} pauseOnHover={pauseOnHover}>
          {children.map(e => e.toUpperCase())
           .map((children, key) => (
             <div className="flex" key={String(key)}>
               <SpanLetterform className={`text-${isSmall ? 'xl' : '4xl'} text-${color}`}>
                 <ThemeDigitize threshold={threshold} children={children} />
               </SpanLetterform>
               <div className="pl-8 pr-8">
                 <SpanLetterform
                   className={`text-${isSmall ? 'xl' : '4xl'} text-secondary`}
                   children="+"
                 />
               </div>
             </div>
           ))}
        </Marquee>
      </div>
    );
  }
);
