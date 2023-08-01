import * as React from 'react';

// etc
const RANDOM_CHARACTERS = '*%#@10zZOo&^';

export const ThemeDigitize = React.memo(
  function ThemeDigitize({
    children,
    interval = 120,
    threshold = 0.25,
    infinite = false,
    disabled = !infinite,
  }: {
    readonly children: string;
    readonly interval?: number;
    readonly threshold?: number;
    readonly infinite?: boolean;
    readonly disabled?: boolean;
  }): JSX.Element {

    const randomCharacter = React.useCallback(
      () => RANDOM_CHARACTERS[Math.floor(Math.random() * RANDOM_CHARACTERS.length)],
      []
    );

    const randomize = React.useCallback(
      () => disabled ? children : children.split('').map(randomCharacter).join(''),
      [children, randomCharacter, disabled],
    );

    const resolve = React.useCallback(
      (currentValue: string): string => {

        if (currentValue.length < children.length || infinite)
          return randomize();

        return currentValue
          .split('')
          .map(
            (e, i) => {
              if (e === children[i]) return e;
              return Math.random() > threshold ? children[i] : randomCharacter();
            },
          )
          .join('');
      },
      [children, randomize, randomCharacter, threshold, infinite]
    );

    const [state, setState] = React.useState<string>(randomize);

    React.useEffect(
      () => {
        setState(randomize);

        const i = setInterval(
          () => setState(
            currentValue => {
              if (currentValue === children && !infinite) {
                clearInterval(i);
                return currentValue;
              }
              return resolve(currentValue);
            }
          ),
          interval,
        );

        return () => void clearInterval(i);
      },
      [children, randomize, interval, resolve, infinite]
    );

    return <React.Fragment children={state} />;
  }
);
