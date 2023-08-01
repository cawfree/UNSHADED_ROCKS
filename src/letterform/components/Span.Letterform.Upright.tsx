import * as React from 'react';
import {clsx} from 'clsx';

import {useLetterform} from '@/letterform/hooks';

import {SpanLetterform} from './Span.Letterform'

export const SpanLetterformUpright = React.memo(
  function SpanLetterformUpright({
    children,
    className,
    onClick,
  }: Parameters<typeof SpanLetterform>[0]): JSX.Element {
    const {px, fontSize, supportsNativeRendering} = useLetterform(className);
    if (supportsNativeRendering) {
      return (
        <SpanLetterform
          children={children}
          className={clsx(className, 'letterform-vertical-rl uppercase')}
          onClick={onClick}
          style={{
            fontFeatureSettings: '"calt" 1',
            textOrientation: 'upright',
            //...(browser.name === 'safari' && {textOrientation: 'upright'}),
          }}
        />
      );
    }

    return (
      <div className={clsx('letterform-bold', className)} onClick={onClick}>
        <div
          className="font-LetterformVariations00"
          style={{
            fontSize,
            width: `${px * 1.5}px`,
            lineHeight: `${px * 1.6}px`,
            wordWrap: 'break-word',
            writingMode: 'vertical-rl',
          }}>
          <span style={{fontSize: `${px}px`}} children={children} />
        </div>
      </div>
    );

  }
);
