import * as React from 'react';
import {useMeasure} from 'react-use';
import {useParams} from 'react-router-dom';
import {clsx} from 'clsx';
//import {useAccount} from 'wagmi';

//import {getAuthNonce} from '@/gallery/utils';
import {Layout} from '@/layout/components';
import {SpanLetterform, SpanLetterformUpright} from '@/letterform/components';
import {NavigatorCloseButton, NavigatorHomeButton} from '@/navigation/components';
import {useHasLaunched} from '@/relaunch/hooks';
import {RockV2} from '@/rocks/@types';
import {RocksScroll, RocksSingleAssetView} from '@/rocks/components';
import {useRocksInfinite, useRocksRenderChildrenSingular} from '@/rocks/hooks';
import {ThemePrompt, ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';
import {useBreakpoint} from "@/tailwind/hooks";

export const Rock = React.memo(
  function Rock(): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const {rockId} = useParams();
    const [ref, {width, height}] = useMeasure();
    const {renderChildren} = useRocksRenderChildrenSingular({
      width,
      height,
    });
    const {fetchNextPage, hasNext, items} = useRocksInfinite({
      filter: React.useCallback((rock: RockV2) => String(rock.id) === rockId, [rockId]),
    });
    const [hasLaunched] = useHasLaunched();

    //const {address} = useAccount();

    //React.useEffect(() => void (async () => {
    //  try {
    //    if (!address) return;

    //    await getAuthNonce({address});

    //  } catch (e) {
    //    console.error(e);
    //  }
    //})(), [address])

    const isNotMobile = useBreakpoint('sm');

    return (
      <Layout
        renderBodySm
        renderHeader={React.useCallback(
          () => isNotMobile ? (
            <div className="flex flex-col h-full select-none pt-8 pl-5">
              <div>
                <SpanLetterformUpright className={`text-${primaryColorSelection} text-5xl`}>
                  <ThemeDigitize children="ROCK" />
                </SpanLetterformUpright>
              </div>
              <div className="flex-1" />
              <div className={clsx('flex w-full pb-8', !hasLaunched && 'invisible')}>
                <NavigatorHomeButton className="pl-4" />
              </div>
            </div>
          ) : <React.Fragment />,
          [rockId, primaryColorSelection, hasLaunched, isNotMobile],
        )}
        renderBody={React.useCallback(
          () => (
            <div className="flex flex-col w-full h-full pb-8 pt-8">
              {/* @ts-expect-error mistyped-ref */}
              <div className="flex-1" ref={ref}>
                <RocksScroll
                  rockBasisPoints="100%"
                  rotationEnabled
                  horizontal
                  className="w-full h-full overflow-hidden"
                  items={items}
                  fetchNextPage={fetchNextPage}
                  renderOnlyWithinViewport
                  renderChildren={renderChildren}
                  hasNext={hasNext}
                  renderContainer={(props) => (
                    <RocksSingleAssetView
                      {...props}
                      style={{
                        transform: 'rotate(90deg)',
                        transformOrigin: 'center',
                      }}
                    />
                  )}
                />
              </div>
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                <SpanLetterform
                  className={`text-4xl text-${primaryColorSelection} pb-4`}
                  children={String(rockId)}
                />
              </div>
            </div>
          ),
          [hasNext, fetchNextPage, items, renderChildren, ref, rockId, primaryColorSelection],
        )}
        renderFooter={React.useCallback(
          () => isNotMobile ? (
            <div className={clsx('flex flex-col pt-8 pr-8 h-full', !hasLaunched && 'invisible')}>
              <ThemePrompt
                optionStyle
                children="COLLECT"
                onClick={() => window?.open?.(`https://opensea.io/assets/ethereum/0xfda1d24e927f8da58f86f653e976cb1f7e6cc9b7/${rockId}`, '_blank')?.focus?.()}
              />
              <div className="flex flex-1" />
              <div className="pb-5 ml-4 w-full flex justify-end">
                <NavigatorCloseButton />
              </div>
            </div>
          ) : <React.Fragment />,
          [rockId, hasLaunched, isNotMobile],
        )}
      />
    );
  }
);
