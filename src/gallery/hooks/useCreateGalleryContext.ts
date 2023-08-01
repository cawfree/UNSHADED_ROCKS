import * as React from 'react';
import useLocalStorage from 'use-local-storage';
import {useAccount} from 'wagmi';
import {GalleryChainId, GalleryClient, UseSyncTokensCollectedMutation} from 'gallery-sdk';

import {useConfig} from '@/config/hooks';
import {keccakString} from '@/ethereum/utils';
import {GalleryContextValue} from '@/gallery/@types'

export function useCreateGalleryContext(): GalleryContextValue {
  const {address, isConnected} = useAccount();
  const {galleryEnvironment} = useConfig();

  const galleryClient = React.useMemo(
    () => new GalleryClient({
      galleryEnvironment,
    }),
    [galleryEnvironment]
  );

  // Confirms gallery works independently of CORS.
  //React.useEffect(() => {
  //  console.log('EG is', galleryEnvironment);
  //  // @ts-ignore
  //  Object.assign(window, {__GE__: galleryClient});
  //}, [galleryClient]);

  const [
    isLoggedIn,
    setIsLoggedIn,
  ] = useLocalStorage<boolean | null>(
    React.useMemo(
      () => keccakString(`GalleryCookies:${String(address)}`),
      [address]
    ),
    null,
  );

  const [
    currentUserGalleryTokens,
    setCurrentUserGalleryTokens,
  ] = React.useState<UseSyncTokensCollectedMutation | null>(null);

  React.useEffect(() => void (async () => {
    try {

      if (!isLoggedIn || !address) return setCurrentUserGalleryTokens(null);

      // @ts-expect-error implict_cookies
      const currentUserGalleryTokens = await galleryClient.useSyncTokensCollectedMutation({
        chain: GalleryChainId.ETHEREUM,
      });

      setCurrentUserGalleryTokens(currentUserGalleryTokens);
    } catch (e) {
      console.error(e);
      setCurrentUserGalleryTokens(null);
    }
  })(), [isLoggedIn, address, galleryClient]);

  React.useEffect(() => {
    if (!currentUserGalleryTokens) return;

    // TODO: we need the jwt... thoughts?
    console.log(currentUserGalleryTokens);
  }, [currentUserGalleryTokens]);

  return React.useMemo<GalleryContextValue>(() => ({
    isLoggedIn: Boolean(isLoggedIn),
    //cookies: galleryCookies,
    currentUserGalleryTokens,

    //requestLogin: async () => {
    //  const cookies: readonly string[] = [];

    //  if (!isConnected || !isAddress(address))
    //    throw new Error('You must be connected to a wallet to log into Gallery.');

    //  if (Math.random() >= 0) throw new Error('Not yet implemented!');

    //  //// Try to sign message.
    //  //const authNonce = await getAuthNonce({
    //  //  address,
    //  //});

    //  //console.log('got auth nonce', authNonce);

    //  // HACK: Side-effectful cache for next login.
    //  setGalleryCookies(cookies);

    //  return {cookies};
    //},

    galleryEnvironment,
    galleryClient,
    setIsLoggedIn,
  }), [
    isConnected,
    currentUserGalleryTokens,
    address,
    galleryClient,
    galleryEnvironment,
    isLoggedIn,
  ]);
}
