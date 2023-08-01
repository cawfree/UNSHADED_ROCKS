import * as React from 'react';
import {clsx} from 'clsx';

import {NavigatorModalPicker} from '@/navigation/components';
import {NAVIGATOR_TRANSITION_DELAY} from '@/navigation/constants';
import {useNavigatorModalContext} from '@/navigation/contexts';
import {$enum} from "ts-enum-util";
import {NavigatorRoute} from "@/navigation/@types";

export const NavigatorModal = React.memo(
  function NavigatorModal({
    children,
  }: React.PropsWithChildren): JSX.Element {
    const context = useNavigatorModalContext();
    const {visible, onRequestClose} = context;
    const [active, setActive] = React.useState<boolean>(false);

    React.useEffect(
      () => void setTimeout(
        () => setActive(true),
        NAVIGATOR_TRANSITION_DELAY * 3,
      ),
      []
    );

    const routesToRender = React.useMemo(
      () => [...$enum(NavigatorRoute).values()].sort((a, b) => String(a).length - String(b).length),
      []
    );

    return (
      <div className="absolute inset-0">
        <div
          className={clsx(
            'absolute inset-0',
            visible && 'blur-md pointer-events-none'
          )}>
          {children}
        </div>
         <div
           onClick={onRequestClose}
           className={clsx(
             'absolute inset-0',
             visible ? 'pointer-events-auto' : 'pointer-events-none',
             visible ? 'animate-fade-up' : `animate-fade-down animate-reverse animate-duration-${
               NAVIGATOR_TRANSITION_DELAY
             }`,
             'flex items-center justify-center',
             !active && 'invisible'
           )}
         >
           <NavigatorModalPicker
             {...context}
             renderClose={false}
             className="text-4xl"
             routesToRender={routesToRender}
           />
         </div>
      </div>
    );
  }
);
