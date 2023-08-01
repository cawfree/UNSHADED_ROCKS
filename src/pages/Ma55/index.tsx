import * as React from 'react';

import {Layout, LayoutForcedHeight} from '@/layout/components';
import {SpanLetterformUpright} from '@/letterform/components';
import {MassDescription} from '@/ma55/components';
import {useMa55RocksStream} from '@/ma55/hooks';
import {chunk} from '@/ma55/utils';
import {NavigatorRouteFooter, NavigatorHomeButton} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {RockV2} from '@/rocks/@types';
import {
  RocksAttributesIndicator,
  RocksScrollCardContainer,
  RocksSelectionConsumer,
  RocksSelectionProvider
} from '@/rocks/components';
import {useBreakpoint} from '@/tailwind/hooks';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const Ma55 = React.memo(
  function Ma55(): JSX.Element {
    const {items} = useMa55RocksStream();
    const shouldRenderRocks = useBreakpoint('sm');
    const {primaryColorSelection} = useThemeContext();

    // HACK: Create an equal number of rows.
    const chunks = React.useMemo(
      () => chunk({arr: items, chunkSize: 11}),
      [items]
    );

    const {renderBottom} = useNavigationFooterBottom();

    const [maybeFirstRock] = items;

    return (
      <RocksSelectionProvider initiallySelectedRockId={maybeFirstRock?.id || null}>
        <Layout
          renderBodySm
          renderHeader={React.useCallback(
            () => (
              <div className="flex flex-col h-full w-full pl-5">
                <div className="flex flex-col h-full pt-8 pb-8">
                  <div>
                    <SpanLetterformUpright className={`text-${primaryColorSelection} text-5xl`}>
                      <ThemeDigitize children="MA55" />
                    </SpanLetterformUpright>
                  </div>
                  <div className="flex-1" />
                  <NavigatorHomeButton className="pl-4"/>
                </div>
              </div>
            ),
            [primaryColorSelection],
          )}
          renderBody={() => (
            <div className="w-full h-full flex flex-col">
              {shouldRenderRocks ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1" />
                  <LayoutForcedHeight className="relative flex-0">
                    <div className="absolute inset-0 flex flex-col pt-8">
                      {chunks.map((rocksInRow: readonly RockV2[], i) => (
                        <div key={String(i)} className="flex-1 flex">
                          {rocksInRow.map((rock) => (
                            <div key={rock.id} className="h-full flex-1">
                              <RocksSelectionConsumer
                                className="w-full h-full"
                                rock={rock}
                                renderSelectable={() => (
                                  <RocksScrollCardContainer
                                    rockBasisPoints="100%"
                                    rotationEnabled
                                    cameraControlsEnabled
                                    rock={rock}
                                    renderOnlyWithinViewport={false}
                                  />
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="flex-0 pt-4 pb-8">
                        <MassDescription className="text-xl opacity-70" />
                      </div>
                    </div>
                  </LayoutForcedHeight>
                  <div className="flex-1" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center">
                  <LayoutForcedHeight className="w-full h-full">
                    <div className="w-full h-full overflow-scroll">
                      <div className="py-8">
                        <MassDescription className="text-xl" />
                      </div>
                    </div>
                  </LayoutForcedHeight>
                </div>
              )}
            </div>
          )}
          renderFooter={React.useCallback(
            () => (
              <NavigatorRouteFooter
                renderBottom={renderBottom}
                renderTop={() => shouldRenderRocks
                  ? <RocksAttributesIndicator className="pl-4 pt-8 pr-4" />
                  : <></>}
              />
            ),
            [shouldRenderRocks, renderBottom],
          )}
        />
      </RocksSelectionProvider>
    );
  }
);
