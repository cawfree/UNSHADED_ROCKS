import * as React from 'react';

export enum RockEthscriptionState {
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type RockV2 = {
  readonly id: number;
  readonly tokenId: number; // ffs
  readonly type: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly volume: number;
  readonly vertices: number;
  readonly polygons: number;
  readonly broken: boolean;
  readonly image: string;
  readonly animation_url: string;
  readonly excluded: boolean;
};

export type PaginatedRocks = {
  readonly items: readonly RockV2[];
  readonly fetchNextPage: () => Promise<unknown>;
  readonly hasNext: boolean;
};

export type RenderContainerCallbackProps = React.PropsWithChildren<{
  readonly rock: RockV2;
}>;

export type RenderContainerCallback = (props: RenderContainerCallbackProps) => JSX.Element;

export type RenderChildrenCallback = (props: React.PropsWithChildren) => JSX.Element;

export type RockSelectionContextValue = {
  readonly selectedRockId: number | null;
  readonly setSelectedRockId: React.Dispatch<React.SetStateAction<number | null>>;
};

export type RenderRockSelectableCallbackProps = {
  readonly rock: RockV2;
  readonly isSelected: boolean;
};

export type RenderRockSelectableCallback = (
  props: RenderRockSelectableCallbackProps
) => JSX.Element;

