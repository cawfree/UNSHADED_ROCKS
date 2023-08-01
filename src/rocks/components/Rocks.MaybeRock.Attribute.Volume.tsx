import {RocksMaybeRockAttribute} from './Rocks.MaybeRock.Attribute';

export const RocksMaybeRockAttributeVolume = (
  props: Omit<Parameters<typeof RocksMaybeRockAttribute>[0], 'defaultValue' | 'attributeName'>
) => (
  <RocksMaybeRockAttribute
    {...props}
    attributeName="volume"
    defaultValue="?.??"
  />
);
