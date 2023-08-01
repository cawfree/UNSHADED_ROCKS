import * as React from 'react';

import {RockSelectionContextValue} from '@/rocks/@types';
import {RockSelectionContextProvider} from '@/rocks/contexts/Rocks.Selection.Context';

export const RocksSelectionProvider = React.memo(
  function RocksSelectionProvider({
    children,
    initiallySelectedRockId = null,
  }: React.PropsWithChildren<{
    readonly initiallySelectedRockId: number | null;
  }>): JSX.Element {
    const [selectedRockId, setSelectedRockId] = React.useState<
      number | null
    >(initiallySelectedRockId);
    return (
      <RockSelectionContextProvider
        children={children}
        value={React.useMemo<RockSelectionContextValue>(
          () => ({selectedRockId, setSelectedRockId}),
          [selectedRockId, setSelectedRockId],
        )}
      />
    );
  }
);
