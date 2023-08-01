import * as React from 'react';

import {RockV2} from '@/rocks/@types';
import {ThemeDigitize} from '@/theme/components';

export const RocksMaybeRockAttribute = React.memo(
  function RocksMaybeRockAttribute({
    maybeRock,
    attributeName,
    defaultValue,
    infinite: defaultInfinite,
    imposeCharacterLimit = false,
  }: {
    readonly maybeRock?: RockV2;
    readonly attributeName: keyof RockV2;
    readonly defaultValue: string;
    readonly infinite?: boolean;
    readonly imposeCharacterLimit?: boolean;
  }): JSX.Element {
    //const excluded = maybeRock?.excluded;
    const infinite = defaultInfinite;// || Boolean(excluded);

    const children = String(maybeRock?.[attributeName] || defaultValue);
    return (
      <ThemeDigitize
        children={(infinite || !imposeCharacterLimit) ? children : children.substring(0, 4)}
        infinite={infinite}
      />
    );
  }
);
