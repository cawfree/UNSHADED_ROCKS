import * as React from 'react';

export const LayoutFooter = React.memo(
  function LayoutFooter({children}: React.PropsWithChildren): JSX.Element {
    // TODO: Same for native font renderers?
    // HACK: Force alignment.
    return <div children={children} />;
  }
);
