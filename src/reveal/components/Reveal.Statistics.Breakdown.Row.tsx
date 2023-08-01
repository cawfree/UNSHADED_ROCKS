import * as React from 'react';

import {SpanLetterform} from '@/letterform/components';
import {RockV2} from '@/rocks/@types';
import {
  RocksMaybeRockAttributeType,
  RocksMaybeRockAttributeCoordinate,
  RocksMaybeRockAttributePolygons,
  RocksMaybeRockAttributeVertices,
  RocksMaybeRockAttributeVolume,
} from '@/rocks/components';
import {ThemeDigitize} from '@/theme/components';

export const RevealStatisticsBreakdownRow = React.memo(
  function RevealStatisticsRock({
    className,
    rock,
  }: {
    readonly className: string;
    readonly rock: RockV2;
  }): JSX.Element {
    return (
      <>
        <tr>
          <td>
            <SpanLetterform className={className}>
              <ThemeDigitize children={String(rock.id)} />
            </SpanLetterform>
          </td>
          <td>
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeType maybeRock={rock} />
            </SpanLetterform>
          </td>
          <td>
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributePolygons maybeRock={rock} />
            </SpanLetterform>
          </td>
          <td>
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeVertices maybeRock={rock} />
            </SpanLetterform>
          </td>
          <td className="pr-8">
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="x" imposeCharacterLimit />
            </SpanLetterform>
          </td>
          <td className="pr-8">
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="y" imposeCharacterLimit />
            </SpanLetterform>
          </td>
          <td className="pr-8">
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="z" imposeCharacterLimit />
            </SpanLetterform>
          </td>
          <td>
            <SpanLetterform className={className}>
              <RocksMaybeRockAttributeVolume maybeRock={rock} imposeCharacterLimit />
            </SpanLetterform>
          </td>
        </tr>
      </>
    );
  }
);
