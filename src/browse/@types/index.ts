export type SelectedType = number | null;

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortMode {
  VERTICES = 'VERTICES',
  VOLUME = 'VOLUME',
  POLYGONS = 'POLYGONS',
}

export type SelectedSortDirection = SortDirection | null;
export type SelectedSortMode = SortMode | null;
