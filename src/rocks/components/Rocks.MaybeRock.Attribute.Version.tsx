import {RockV2} from '@/rocks/@types';

export const RocksMaybeRockAttributeVersion = ({
  maybeRock,
}: {
  readonly maybeRock: RockV2 | null | undefined;
}) => (
  <span className="text-accent" children={maybeRock ? (maybeRock.excluded ? 'V1' : 'V2') : 'N/A'} />
);
