import * as React from 'react';
import {useHoverDirty} from 'react-use';

import {
  RenderRockSelectableCallback,
  RockV2,
} from '@/rocks/@types';
import {useRockSelectionContext} from '@/rocks/contexts';

export const RocksSelectionConsumer = React.memo(
  function RocksSelectionConsumer({
    rock,
    renderSelectable,
    focusImplementation = 'onClick',
    ...extras
  }: Omit<
    React.HTMLProps<HTMLDivElement> & {
      readonly rock: RockV2;
      readonly renderSelectable: RenderRockSelectableCallback;
      readonly focusImplementation?: 'onClick' | 'onHover';
    },
   'children' | 'onClick'
  >): JSX.Element {
    const {
      selectedRockId,
      setSelectedRockId,
    } = useRockSelectionContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const isSelected = typeof rock?.id === 'number' && selectedRockId === rock.id;
    const isHovering = useHoverDirty(ref);

    React.useEffect(() => {
        const maybeRockId = rock?.id;

        if (!isHovering || typeof maybeRockId !== 'number' || focusImplementation !== 'onHover')
            return;

        setSelectedRockId(maybeRockId);

    }, [isHovering, setSelectedRockId, rock?.id, focusImplementation]);

    return (
      <div
        ref={ref}
        children={renderSelectable({rock, isSelected})}
        onClick={React.useCallback(
          () => typeof rock?.id === 'number' && focusImplementation === 'onClick' && setSelectedRockId(rock.id),
          [setSelectedRockId, rock?.id, focusImplementation]
        )}
        {...extras}
      />
    );
  }
);
