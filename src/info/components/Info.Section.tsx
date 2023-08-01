import * as React from 'react';
import {LoremIpsum} from 'lorem-ipsum';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {colors} from '@/tailwind/assets';

const defaultHighlights: readonly string[] = [];

export const InfoSection = React.memo(
  function InfoSection({
    className,
    title = '',
    textSize,
    description: maybeDescription,
    highlights = defaultHighlights,
    style,
    baseTextColor = 'secondary',
  }: {
    readonly textSize: string;
    readonly className?: string;
    readonly title: string;
    readonly description?: string | null;
    readonly highlights?: readonly string[];
    readonly style: React.CSSProperties;
    readonly baseTextColor?: keyof typeof colors;
  }): JSX.Element {
    const description = React.useMemo<string>(
      () => {
        if (typeof maybeDescription === 'string') return maybeDescription;

        if (maybeDescription === null) return '';

        const lorem = new LoremIpsum({
          sentencesPerParagraph: {max: 4, min: 2},
          wordsPerSentence: {max: 16, min: 4},
        });

        return lorem.generateParagraphs(1);
      },
      [maybeDescription]
    );

    return (
      <div className={clsx('flex flex-col', className)}>
        {typeof title === 'string' && Boolean(title.length) && (
          <SpanLetterform
            className="text-2xl text-accent pb-2"
            children={title}
          />
        )}
        {typeof description === 'string' && Boolean(description.length) && (
          <div style={style}>
            <span>
              {description.split(' ').flatMap(
                (children, i, orig) => {
                  const highlighted = highlights.includes(children);
                  const content = (
                    <SpanLetterform
                      key={String(i)}
                      className={clsx(textSize, highlighted ? 'text-secondary-darker' : `text-${baseTextColor}`)}
                      children={`${children}${i < orig.length - 1 ? ' ' : ''}`}
                    />
                  );
                  return [content];
                },
              )}
              </span>
          </div>
        )}
      </div>
    );
  }
);
