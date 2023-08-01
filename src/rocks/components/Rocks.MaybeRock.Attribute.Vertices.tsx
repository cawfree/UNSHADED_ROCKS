import {RocksMaybeRockAttribute} from './Rocks.MaybeRock.Attribute';

export const RocksMaybeRockAttributeVertices = (
  props: Omit<Parameters<typeof RocksMaybeRockAttribute>[0], 'defaultValue' | 'attributeName'>
) => (
  <RocksMaybeRockAttribute
    {...props}
    attributeName="vertices"
    defaultValue="????"
  />
);
