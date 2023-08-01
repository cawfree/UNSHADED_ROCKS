import * as React from 'react';
import {useAccount} from 'wagmi';
import {useNavigate} from 'react-router-dom';
import {NavigatorRoute} from '@/navigation/@types';

export const NavigatorRedirect = React.memo(
  function NavigatorRedirect({
    children,
    to = NavigatorRoute.ROOT,
  }: React.PropsWithChildren<{
    readonly to?: NavigatorRoute;
  }>): JSX.Element {
    const {isConnected} = useAccount();
    const navigate = useNavigate();

    if (!isConnected) navigate(String(to));

    return (
      <React.Fragment children={isConnected ? children : []} />
    );
  }
);
