import * as React from 'react';

import {ThemeOptionButton} from '@/theme/components';

export const ThemeCopyButton = React.memo(
  function ThemeCopyButton({
    className,
    textToCopy,
  }: {
    readonly className?: string;
    readonly textToCopy: string;
  }): JSX.Element {
    const [copied, setCopied] = React.useState<boolean>(false);
    return (
      <ThemeOptionButton
        className={className}
        title={copied ? 'COPIED' : 'SHARE LINK'}
        onClick={React.useCallback(
          async () => {
            try {
              await navigator.clipboard.writeText(textToCopy);
              setCopied(true);
            } catch (e) {
              console.error(e);
            }
          },
          [textToCopy]
        )}
      />
    );
  }
);
