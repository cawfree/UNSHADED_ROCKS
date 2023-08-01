import * as React from 'react';

import {ThemeDigitize} from '@/theme/components/Theme.Digitize';

export const ThemeDigitizeArray = React.memo(
  function ThemeDigitizeArray({
    children,
    timeout = 1000,
    ...extras
  }: Omit<Parameters<typeof ThemeDigitize>[0], 'children'> & {
      readonly timeout?: number;
      readonly children: readonly string[];
  }): JSX.Element {

    const [state, setState] = React.useState<number>(0);

    React.useEffect(() => {
      const i = setInterval(
        () => setState(e => e + 1),
        timeout,
      );
      return () => void clearInterval(i);
    }, [timeout]);

    return <ThemeDigitize {...extras} children={children?.[state % children.length] || ''} />
  }
);
