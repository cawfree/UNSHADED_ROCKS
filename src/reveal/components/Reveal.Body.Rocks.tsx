import * as React from 'react';

import {RevealScrollContainer} from '@/reveal/components';
import {PaginatedRocks, RenderContainerCallbackProps} from '@/rocks/@types';
import {RocksScroll} from '@/rocks/components';
import {COLUMN_BREAK_POINTS_LOW} from '@/rocks/constants';
import {useRocksRenderChildrenMasonry} from '@/rocks/hooks';

export const RevealBodyRocks = React.memo(
  function RevealBodyRocks({
    className,
    ...rocksStream
  }: PaginatedRocks & {
    readonly className?: string;
  }): JSX.Element {
    const renderChildren = useRocksRenderChildrenMasonry({
      columnBreakPoints: COLUMN_BREAK_POINTS_LOW,
      gutter: '25px',
    });
    const renderContainer = React.useCallback(
      ({children, rock}: RenderContainerCallbackProps) => (
        <RevealScrollContainer
          rock={rock}
          children={children}
        />
      ),
      []
    );
    return (
      <RocksScroll
        {...rocksStream}
        renderContainer={renderContainer}
        className={className}
        renderChildren={renderChildren}
        rotationEnabled
        rockBasisPoints="100%"
      />
    );
  }
);
