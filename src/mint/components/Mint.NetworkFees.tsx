import * as React from 'react';
import {ethers} from 'ethers';

import {SpanLetterformUpright} from '@/letterform/components';
import {getMaybeFeeSuggestions, useFeeSuggestions} from '@/mint/hooks';
import {ThemeDigitize} from '@/theme/components';

export const MintNetworkFees = React.memo(
  function MintNetworkFees(props: Omit<React.HTMLProps<HTMLDivElement>, 'children'>): JSX.Element {
    const maybeFeeSuggestions = getMaybeFeeSuggestions(useFeeSuggestions());

    const {low, average, high} = React.useMemo(() => {
      if (!maybeFeeSuggestions)
          return {low: '?', average: '?', high: '?'};

      const {
        maxPriorityFeeSuggestions: {
          normal,
          fast,
          urgent,
        }
      } = maybeFeeSuggestions;

      return {
        low: ethers.formatUnits(normal, 'gwei'),
        average: ethers.formatUnits(fast, 'gwei'),
        high: ethers.formatUnits(urgent, 'gwei'),
      };
    }, [maybeFeeSuggestions]);

    return (
      <div {...props}>
        <div className="text-secondary select-none">
          <div className="flex animate-fade-down">
            <SpanLetterformUpright className="text-sm">
              <ThemeDigitize children="GAS" />
            </SpanLetterformUpright>
            <SpanLetterformUpright className="text-sm">
              <ThemeDigitize children="LOW" />
            </SpanLetterformUpright>
            <SpanLetterformUpright className="text-sm">
              <ThemeDigitize children="AVG" />
            </SpanLetterformUpright>
            <SpanLetterformUpright className="text-sm">
              <ThemeDigitize children="HIGH" />
            </SpanLetterformUpright>
          </div>
          <div className="flex animate-fade-up pt-4">
            <div className="flex">
               <SpanLetterformUpright className="text-sm">
                 <ThemeDigitize children="-" />
               </SpanLetterformUpright>
                <SpanLetterformUpright className="text-sm">
                 <ThemeDigitize children={low} />
               </SpanLetterformUpright>
               <SpanLetterformUpright className="text-sm">
                 <ThemeDigitize children={average} />
               </SpanLetterformUpright>
               <SpanLetterformUpright className="text-sm">
                 <ThemeDigitize children={high} />
               </SpanLetterformUpright>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
