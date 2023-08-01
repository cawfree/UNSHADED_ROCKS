import * as React from 'react';

import {NavigatorModalContextValue} from '@/navigation/@types';
import {NavigatorModalContextProvider} from '@/navigation/contexts';
import {NavigatorModal} from "@/navigation/components/Navigator.Modal";

export const NavigatorModalProvider = React.memo(
  function NavigatorModalProvider({
    visible,
    onRequestOpen,
    onRequestClose,
    children,
  }: React.PropsWithChildren<NavigatorModalContextValue>): JSX.Element {
    return (
      <NavigatorModalContextProvider
        value={React.useMemo<NavigatorModalContextValue>(
          () => ({
            visible,
            onRequestClose,
            onRequestOpen,
          }),
          [visible, onRequestClose, onRequestOpen]
        )}>
        <NavigatorModal children={children} />
      </NavigatorModalContextProvider>
    );
  }
);
