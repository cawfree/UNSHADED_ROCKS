import * as React from 'react';
import {clsx} from 'clsx';
import {useNavigate} from 'react-router-dom';

import {ArButton} from '@/ar/components';
import {GalleryShareButton} from '@/gallery/components';
import {SpanLetterform} from '@/letterform/components';
import {RenderRockSelectableCallbackProps, RockV2} from '@/rocks/@types';
import {
  RocksDownloadGLTF,
  RocksMaybeRockAttributeCoordinate,
  RocksMaybeRockAttributeType,
  RocksMaybeRockAttributePolygons,
  RocksMaybeRockAttributeVertices,
  RocksMaybeRockAttributeVolume,
  RocksSelectionConsumer,
  RocksEthscribe,
  RocksViewButton,
} from '@/rocks/components';
import {useThemeContext} from '@/theme/contexts';

export const RevealScrollContainer = React.memo(
  function RevealScrollContainer({
    children,
    rock,
  }: React.PropsWithChildren<{
    readonly rock: RockV2;
  }>): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const navigate = useNavigate();

    //const shouldRenderGalleryShareButton = React.useMemo(
    //  () => Boolean((rocksForAddress || []).find((e) => e.id === rock?.id)),
    //  [rocksForAddress, rock]
    //);

    const renderSelectable = React.useCallback(
      ({isSelected, rock}: RenderRockSelectableCallbackProps) => {
        const className = clsx('text-sm', isSelected ? 'text-accent' : 'text-secondary');
        return (
          <div className="flex flex-col">
            <div className="relative flex-1">
              {children}
            </div>
            <div className="w-full flex pt-2 cursor-pointer">
              <div className="flex-1">
                <div className="invisible">
                  <SpanLetterform
                    className={className}
                    children="nada"
                  />
                </div>
                <div>
                  <SpanLetterform className={className} children="TYPE" />
                </div>
                <div>
                  <SpanLetterform className={className} children="POLYGONS" />
                </div>
                <div>
                  <SpanLetterform className={className} children="VERTICES" />
                </div>
                <div>
                  <SpanLetterform className={className} children="X" />
                </div>
                <div>
                  <SpanLetterform className={className} children="Y" />
                </div>
                <div>
                  <SpanLetterform className={className} children="Z" />
                </div>
                <div>
                  <SpanLetterform className={className} children="VOLUME" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-right">
                  <SpanLetterform
                    className={clsx(`text-${isSelected ? 'accent' : primaryColorSelection} text-2xl`)}
                    children={String(rock.id)}
                  />
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeType maybeRock={rock} />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributePolygons maybeRock={rock} />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeVertices maybeRock={rock} />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="x" />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="y" />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeCoordinate maybeRock={rock} coordinate="z" />
                  </SpanLetterform>
                </div>
                <div className="text-right">
                  <SpanLetterform className={className}>
                    <RocksMaybeRockAttributeVolume maybeRock={rock} />
                  </SpanLetterform>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex">
                <ArButton className="w-full mt-2" maybeRock={rock} />
                <div className="p-2" />
                <RocksViewButton className="w-full mt-2" maybeRock={rock} />
              </div>
              {false && (
                <GalleryShareButton maybeRock={rock} className="mt-2" />
              )}
              <RocksDownloadGLTF className="w-full mt-2" maybeRock={rock} />
              <RocksEthscribe className="w-full mt-2" maybeRock={rock} />
            </div>
          </div>
        );
      },
      [children, rock, navigate, primaryColorSelection]
    );
    return (
      <RocksSelectionConsumer
        rock={rock}
        className="w-full"
        renderSelectable={renderSelectable}
        focusImplementation="onHover"
      />
    );
  }
);
