import {RocksMaybeRockAttribute} from './Rocks.MaybeRock.Attribute';

export const RocksMaybeRockAttributeType = (
  props: Omit<Parameters<typeof RocksMaybeRockAttribute>[0], 'defaultValue' | 'attributeName'>
) => (
  <RocksMaybeRockAttribute
    {...props}
    attributeName="type"
    defaultValue="N/A"
  />
);
