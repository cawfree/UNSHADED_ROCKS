import * as React from 'react';
import {clsx} from 'clsx';

import {SpanLetterform} from '@/letterform/components';
import {PurchaseTransactionResult} from '@/reveal/@types';
import {RevealStatisticsBreakdownRow} from '@/reveal/components';
import {useCounterAnimation} from '@/reveal/hooks';
import {useRocksForTokenIds} from '@/rocks/hooks';
import {fontSize} from '@/tailwind/assets';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const RevealStatisticsBreakdown = React.memo(
  function RevealStatisticsBreakdown({
    counter,
    textSize = 'base',
    maybePurchase,
  }: {
    readonly counter: number;
    readonly textSize?: keyof typeof fontSize;
    readonly maybePurchase: PurchaseTransactionResult | null | undefined;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const {renderRock} = useCounterAnimation({
      counter,
      maybePurchase,
    });

    // TODO: getTotalRocks can do this
    const tokenIds = React.useMemo<readonly string[]>(
      () => [
        ...new Set(maybePurchase?.purchases?.flatMap?.(({tokenIds}) => tokenIds)?.map?.(String) || [])
      ],
      [maybePurchase],
    );

    const rocks = useRocksForTokenIds({tokenIds});

    const infinite = !maybePurchase;

    const className = `text-${textSize} text-${primaryColorSelection}`;

    return (
      <div>
        <table className={clsx(!renderRock(0) && 'invisible')}>
          <tr>
            <th className="pr-8">
              <SpanLetterform className={className}>
                <ThemeDigitize children="ID" infinite={infinite} />
              </SpanLetterform>
            </th>
            <th className="pr-8">
              <SpanLetterform className={className}>
                <ThemeDigitize children="TYPE" infinite={infinite} />
              </SpanLetterform>
            </th>
            <th className="pr-8">
              <SpanLetterform className={className}>
                <ThemeDigitize children="POLYS" infinite={infinite} />
              </SpanLetterform>
            </th>
            <th className="pr-8">
              <SpanLetterform className={className}>
                <ThemeDigitize children="VERTS" infinite={infinite} />
              </SpanLetterform>
            </th>
            <th className="pr-8">
              <div className="flex">
                <SpanLetterform className={className}>
                  <ThemeDigitize children="X" infinite={infinite} />
                </SpanLetterform>
              </div>
            </th>
            <th>
              <div className="flex">
                <SpanLetterform className={className}>
                  <ThemeDigitize children="Y" infinite={infinite} />
                </SpanLetterform>
              </div>
            </th>
            <th>
              <div className="flex">
                <SpanLetterform className={className}>
                  <ThemeDigitize children="Z" infinite={infinite} />
                </SpanLetterform>
              </div>
            </th>
            <th>
              <SpanLetterform className={className}>
                <ThemeDigitize children="VOL." infinite={infinite} />
              </SpanLetterform>
            </th>
          </tr>
          <br />
          {rocks.map((rock, i) => (
            <RevealStatisticsBreakdownRow
              className={clsx(className, !renderRock(i) && 'invisible')}
              key={String(rock.id)}
              rock={rock}
            />
          ))}
        </table>
      </div>
    );
  }
);
