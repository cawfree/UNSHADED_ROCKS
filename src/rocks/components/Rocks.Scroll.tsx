import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {clsx} from 'clsx';

import {
  PaginatedRocks,
  RenderChildrenCallback,
  RenderContainerCallback,
  RenderContainerCallbackProps,
} from '@/rocks/@types';
import {RocksScrollCardContainer} from '@/rocks/components';
import {ThemeScroll, ThemeScrollHorizontal} from '@/theme/components';

const defaultRenderContainer: RenderContainerCallback = ({
  children,
}: RenderContainerCallbackProps) => (
  <React.Fragment children={children} />
);

export const RocksScroll = ({
  className,
  renderContainer = defaultRenderContainer,
  items,
  hasNext,
  fetchNextPage,
  horizontal = false,
  renderChildren,
  cameraControlsEnabled,
  renderOnlyWithinViewport = false,
  scrollTo = 0,
  rotationEnabled,
  rockBasisPoints,
}: PaginatedRocks & {
  readonly className?: string;
  readonly renderContainer?: RenderContainerCallback;
  readonly cameraControlsEnabled?: boolean;
  readonly horizontal?: boolean;
  readonly renderChildren: RenderChildrenCallback;
  readonly renderOnlyWithinViewport?: boolean;
  readonly scrollTo?: number;
  readonly rotationEnabled: boolean;
  readonly rockBasisPoints: string;
}) => {

  const hideScrollBar = String(className).includes('overflow-hidden');

  const Component = horizontal ? ThemeScrollHorizontal : ThemeScroll;

  const children = (items || []).map((rock) => (
    <React.Fragment key={rock.id}>
      {renderContainer?.({
        rock,
        children: (
          <RocksScrollCardContainer
            rock={rock}
            cameraControlsEnabled={cameraControlsEnabled}
            renderOnlyWithinViewport={!!renderOnlyWithinViewport}
            rotationEnabled={rotationEnabled}
            rockBasisPoints={rockBasisPoints}
          />
        ),
      })}
    </React.Fragment>
  ));

  return (
    <div className={clsx('flex flex-1', className)}>
      <div className="relative flex flex-1">
        <div className="absolute inset-0">
          <Component scrollTo={scrollTo} hideScrollBar={hideScrollBar}>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchNextPage}
              hasMore={hasNext}
              loader={<React.Fragment />}
              scrollableTarget="scrollableTarget"
              children={renderChildren({children})}
            />
          </Component>
        </div>
      </div>
    </div>
  );
};
