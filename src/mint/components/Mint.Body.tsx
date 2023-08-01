import * as React from 'react';
import {useAccount} from 'wagmi';

import {BasketControls} from '@/basket/components';
import {SortDirection, SortMode} from '@/browse/@types';
import {useBrowseSort} from '@/browse/hooks';
import {MintLimits, MintPricePerUnit} from '@/mint/components';
import {RocksViewer} from '@/rocks/components';
import {useRocksInfinite} from '@/rocks/hooks';
import {useBreakpoint} from '@/tailwind/hooks';

const rockContainerStyle = {
  height: '100%',
  width: '100%',
  marginTop: -60,
};

const rockStyle = {
  width: '90%',
  height: '90%',
};

export const MintBody = React.memo(
  function MintBody(): JSX.Element {
    const {isConnected} = useAccount();

    const shouldRenderControls = useBreakpoint('lg');

    // HACK: Prioritize simpler rocks.
    const {items} = useRocksInfinite({
        rocksPerPage: 100,
        sort: useBrowseSort({
          selectedSortDirection: SortDirection.ASC,
          selectedSortMode: SortMode.VERTICES,
        }),
    });

    const randomRock = React.useMemo(() => (
      items[Math.floor(Math.random () * items.length)]
    ), [items]);

    return (
      <div className="w-full h-full">
        <div className="absolute inset-0">
          <div
            className="flex items-center justify-center pointer-events-none blur-md"
            style={rockContainerStyle}>
            <RocksViewer
              rotationEnabled
              style={rockStyle}
              rock={randomRock}
              cameraControls={false}
            />
          </div>
          <div className="absolute inset-0 flex flex-col pb-8">
            <div className="flex-1" />
            <div className="flex flex-col items-center justify-center">
              {isConnected ? (
                <React.Fragment>
                  {shouldRenderControls && <BasketControls />}
                </React.Fragment>
              ) : (
                <>
                  <MintPricePerUnit />
                  <MintLimits />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
