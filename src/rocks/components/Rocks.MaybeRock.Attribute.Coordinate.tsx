import {RocksMaybeRockAttribute} from './Rocks.MaybeRock.Attribute';

export const RocksMaybeRockAttributeCoordinate = ({
  coordinate,
  ...extras
}: Omit<Parameters<typeof RocksMaybeRockAttribute>[0], 'defaultValue' | 'attributeName'> & {
  readonly coordinate: 'x' | 'y' | 'z';
}) => (
  <RocksMaybeRockAttribute
    {...extras}
    attributeName={coordinate}
    defaultValue="?.??"
  />
);
