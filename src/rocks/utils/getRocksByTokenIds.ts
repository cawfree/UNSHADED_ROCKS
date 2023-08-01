import {RockV2} from '@/rocks/@types';
import {rocks} from '@/rocks/assets';

export function getRocksByTokenIds({
  tokenIds,
}: {
  readonly tokenIds: readonly string[];
}): readonly RockV2[] {
    return tokenIds.map(
      (tokenId: string): RockV2 => {
          const maybeRock = rocks.find((e) => String(e.tokenId) === tokenId);

          if (!maybeRock) throw new Error(`Failed to find RockV2 for tokenId "${tokenId}".`);

          return maybeRock;
      },
    );
}
