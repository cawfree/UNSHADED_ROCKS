import * as React from 'react';
import {clsx} from 'clsx';

import {LayoutFooter} from './Layout.Footer';
import {LayoutForcedDimensions} from './Layout.Forced.Dimensions';
import {LayoutHeader} from './Layout.Header';
import {useBreakpoint} from "@/tailwind/hooks";

const defaultRender = () => <></>;

type LayoutProps = {
  readonly renderHeader?: () => JSX.Element;
  readonly renderFooter?: () => JSX.Element;
  readonly renderBody?: () => JSX.Element;
  readonly renderBodySm?: boolean;
};

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({
     renderFooter= defaultRender,
     renderBody = defaultRender,
     renderHeader = defaultRender,
     renderBodySm = false,
   }, ref): JSX.Element => {
    const shouldRenderBody = useBreakpoint('sm') || renderBodySm;
    return (
      <div className="w-screen h-screen" ref={ref}>
        <div className="absolute w-screen h-screen pointer-events-none flex items-center">
          <div className={clsx('w-screen h-screen', 'flex flex-row', 'pointer-events-auto')}>
            <div className="h-full flex items-center justify-center pr-8">
              <LayoutForcedDimensions>
                <LayoutHeader children={renderHeader?.()} />
              </LayoutForcedDimensions>
            </div>
             {shouldRenderBody ? (
               <div className="relative flex-1" children={renderBody?.()} />
             ) : (
               <div className="relative flex-1" />
             )}
            <div className="h-full flex items-center justify-center pl-4">
              <LayoutForcedDimensions>
                <LayoutFooter children={renderFooter?.()} />
              </LayoutForcedDimensions>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
