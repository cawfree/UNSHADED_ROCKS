import 'react-custom-scroll/dist/customScroll.css';
import './Theme.Scroll.css';

import * as React from 'react';
import CustomScroll from 'react-custom-scroll';
import {clsx} from 'clsx';

import {colors} from '@/tailwind/assets';
import {ThemeScrollDownArrow, ThemeScrollUpArrow} from '@/theme/components';

export const ThemeScroll = React.memo(
  function ThemeScroll({
    hideScrollBar = false,
    children: defaultChildren,
    scrollBarPosition = 'right',
    scrollTo = 0,
    className,
  }: React.PropsWithChildren<{
    readonly hideScrollBar?: boolean;
    readonly scrollBarPosition?: 'left' | 'right';
    readonly scrollTo?: number | undefined;
    readonly className?: string;
  }>): JSX.Element {
    const scrollBarColor = hideScrollBar ? 'transparent' : colors.secondary;
    const children = (
      <div
        className={clsx('pl-2 pr-2', className)}
        children={defaultChildren}
      />
    );
    return (
      <div className="relative w-full h-full">
        <div className="with-icon w-full h-full">
          {!hideScrollBar ? (
            <CustomScroll
              allowOuterScroll
              scrollTo={scrollTo}
              heightRelativeToParent="100%"
              // @ts-expect-error custom_interface
              scrollBarPosition={scrollBarPosition}
              children={children}
            />
          ) : children}
        </div>
        <div
          style={{
            position: 'absolute',
            ...(scrollBarPosition === 'right' ? {right: '0px'} : {left: '0px'}),
            top: '0px',
            width: '20px',
            height: '20px',
          }}>
          <ThemeScrollUpArrow fill={scrollBarColor} />
        </div>
        <div
          style={{
            position: 'absolute',
            ...(scrollBarPosition === 'right' ? {right: '8.5px'} : {left: '8.5px'}),
            top: '27px',
            bottom: '27px',
            width: '3px',
            backgroundColor: scrollBarColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            ...(scrollBarPosition === 'right' ? {right: '0px'} : {left: '0px'}),
            bottom: '0px',
            width: '20px',
            height: '20px',
          }}>
          <ThemeScrollDownArrow fill={scrollBarColor} />
        </div>
      </div>
    );
  }
);
