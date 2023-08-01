import * as React from 'react';
import {clsx} from 'clsx';

import {ArButton} from '@/ar/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {
  RocksViewButton,
  RocksMaybeRockAttributeCoordinate,
  RocksMaybeRockAttributeType,
  RocksMaybeRockAttributePolygons,
  RocksMaybeRockAttributeVertices,
  RocksMaybeRockAttributeVolume,
  RocksMaybeRockAttributeVersion,
  RocksEthscribe,
} from '@/rocks/components';
import {useMaybeRockById} from '@/rocks/hooks';
import {useRockSelectionContext} from '@/rocks/contexts';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';
import {useIsRockInWallet} from '@/wallet/hooks';

export const RocksAttributesIndicator = React.memo(
  function RocksAttributesIndicator({
    renderButtons = true,
    ...extras
  }: Omit<React.HTMLProps<HTMLDivElement>, 'children'> & {
    readonly renderButtons?: boolean;
  }): JSX.Element {
    const {selectedRockId} = useRockSelectionContext();
    const {primaryColorSelection} = useThemeContext();

    const maybeRock = useMaybeRockById(selectedRockId);

    const key = String(maybeRock?.id);

    const className = clsx('select-none text-sm', maybeRock?.excluded ? `text-${primaryColorSelection}` : 'text-accent');

    const isRockInWallet = useIsRockInWallet({maybeRock});

    return (
      <div {...extras}>
        <div className="flex flex-col">
          <div className="flex animate-fade-down">
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Rock" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Version" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Type" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Polygons" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Vertices" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Volume" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="X" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Y" />
            <SpanLetterformUpright className="select-none text-accent text-sm" children="Z" />
          </div>
          <div className="flex animate-fade-up pt-4">
            <div className="flex" key={key}>
              <SpanLetterformUpright className="select-none text-accent text-sm">
                <ThemeDigitize children={maybeRock?.id ? String(maybeRock.id) : '?????'} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className="select-none text-accent text-sm">
                <RocksMaybeRockAttributeVersion maybeRock={maybeRock} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeType maybeRock={maybeRock} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributePolygons maybeRock={maybeRock} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeVertices maybeRock={maybeRock} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeVolume maybeRock={maybeRock} />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeCoordinate maybeRock={maybeRock} coordinate="x" />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeCoordinate maybeRock={maybeRock} coordinate="y" />
              </SpanLetterformUpright>
              <SpanLetterformUpright className={className}>
                <RocksMaybeRockAttributeCoordinate maybeRock={maybeRock} coordinate="z" />
              </SpanLetterformUpright>
            </div>
          </div>
        </div>
        <div className="flex-1" />
        {Boolean(renderButtons) && (
          <>
            <RocksViewButton className="w-full mt-2" maybeRock={maybeRock} />
            <ArButton className="w-full mt-2" maybeRock={maybeRock} />
            {isRockInWallet && (
                <RocksEthscribe className="w-full mt-2" maybeRock={maybeRock} />
            )}
          </>
        )}
      </div>
    );
  }
);
