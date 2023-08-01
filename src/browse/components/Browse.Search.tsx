import * as React from 'react';
import {clsx} from 'clsx';

import {colors, fontSize} from '@/tailwind/assets';
import {ThemeRotate} from '@/theme/components';

export const BrowseSearch = React.memo(
  function BrowseSearch({
    className,
    onChange,
    searchText,
    width = 29,
    textSize = '2xl',
    prefixHeight = 160,
    inputHeight = 125,
    placeholder = '####',
    autoFocus = false,
  }: {
    readonly textSize?: keyof typeof fontSize;
    readonly className?: string;
    readonly onChange: (nextSearchText: string) => void;
    readonly searchText: string;
    readonly width?: number;
    readonly prefixHeight?: number;
    readonly inputHeight?: number;
    readonly placeholder?: string;
    readonly autoFocus?: boolean;
  }): JSX.Element {

    const ref = React.useRef<HTMLInputElement | null>(null);
    const totalHeight = prefixHeight + inputHeight;

    return (
      <div
        className={clsx(
          'flex items-center justify-center bg-secondary',
          className,
        )}
        style={{width: width + 10}}>
        <div
          className="flex flex-col pr-8 pt-2 pb-2"
          style={{
            width,
            height: totalHeight,
            backgroundColor: colors.secondary,
          }}
        >
          <div className="cursor-pointer" onClick={() => ref?.current?.focus?.()}>
            <ThemeRotate width={width} height={prefixHeight}>
              <span
                className={clsx(
                  prefixHeight <= 0 && 'invisible',
                  "text-background font-LetterformVariations00 letterform-bold select-none",
                  `text-${textSize}`,
                )}
                style={{height: width, width: prefixHeight}}
                children="SEARCH"
              />
            </ThemeRotate>
          </div>
          <ThemeRotate width={width} height={inputHeight}>
            <input
              ref={ref}
              autoFocus={autoFocus}
              type="text"
              maxLength={4}
              value={searchText}
              onChange={React.useCallback(
                (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value.replace(/[^0-9]/g, '')),
                [onChange]
              )}
              placeholder={placeholder}
              className={clsx(
                `text-${textSize}`,
                "text-accent font-LetterformVariations00 letterform-bold"
              )}
              // TODO: note this, abstract it through render cbk
              style={{paddingLeft: 10, width: inputHeight, height: width, background: 'transparent'}}
            />
          </ThemeRotate>
        </div>
      </div>
    );
  }
);
