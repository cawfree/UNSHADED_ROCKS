import {RockV2} from '@/rocks/@types';
import {rocks} from '@/rocks/assets';

export function useMaybeRockById(id: string | number | null | undefined): RockV2 | undefined {

    if (typeof id === 'string') return rocks.find((e) => String(e.id) === id);
    if (typeof id === 'number') return rocks.find((e) => e.id === id);

    return undefined;
}
