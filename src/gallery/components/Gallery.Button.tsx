import * as React from 'react';
import {useHoverDirty} from 'react-use';
import {clsx} from 'clsx';
import {GalleryChainId} from 'gallery-sdk';

import {useConfig} from '@/config/hooks';
import {useGalleryContext} from '@/gallery/contexts';
import {GalleryLogo} from '@/gallery/components/Gallery.Logo';
import {SpanLetterformUpright} from '@/letterform/components';
import {colors} from '@/tailwind/assets';
import {ThemeDigitize} from '@/theme/components';

export const GalleryButton = React.memo(
  function GalleryButton({
    className,
    disabled = false,
  }: {
    readonly className?: string;
    readonly disabled?: boolean;
  }): JSX.Element {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const isHovering = useHoverDirty(ref);

    const {galleryClient, isLoggedIn} = useGalleryContext();

    //const [nonce, setNonce] = React.useState<
    //  UseCreateNonceMutation | null
    //>(null);

    //const {data: maybeSignature, signMessage} = useSignMessage();

    //// Clicked Gallery button and requested a nonce since they weren't logged in.
    //React.useEffect(() => void (async () => {
    //  try {
    //    if (!nonce || isLoggedIn || !address || !signMessage) return;

    //    const {frontendUrl} = getConfig({galleryEnvironment});

    //    const userExists = nonce.data.getAuthNonce.userExists;

    //    // If there isn't a user for this account, then just redirect them to gallery.
    //    if (!userExists) {
    //      setNonce(null);
    //      return window.open(frontendUrl,'_newtab');
    //    }

    //    // If there isn't a signature but there is a user, get them to sign.
    //    if (!maybeSignature)
    //      return signMessage({message: nonce.data.getAuthNonce.nonce});

    //    // The user has signed the nonce! Let's reset it now we've latched it into
    //    // the scope of this function body.
    //    setNonce(null);

    //    /* NOTICE: Here, we have both a nonce and a signature for that nonce. */
    //    // Try to sign in.
    //    const {didLogin} = await galleryClient.useLoginOrRedirectToOnboardingMutation({
    //      chain: GalleryChainId.ETHEREUM,
    //      address,
    //      nonce: nonce.data.getAuthNonce.nonce,
    //      signature: maybeSignature,
    //    });

    //    // XXX: In Node, we had to pass the cookies manually.
    //    //      Here, the browser should support it naturally.
    //    if (!didLogin) throw new Error('Failed to login!');

    //    setIsLoggedIn(true);

    //  } catch (e) {
    //    setNonce(null);
    //    console.error(e);
    //  }

    //})(), [
    //  nonce,
    //  maybeSignature,
    //  galleryEnvironment,
    //  signMessage,
    //  address,
    //  isLoggedIn,
    //  setIsLoggedIn,
    //]);
    const {rocksContractAddress} = useConfig();

    const onClick = React.useCallback(
      () => {

        const CAPTIONS: readonly string[] = [
          'This? This is a rock.',
          'Your eyes deceive you! For this is not, actually, a rock.',
          'This is a whole lot more than a digital rock.',
          'This rock, right here? Why, this rock is everything.',
          'If you squint hard enough, all objects are rocks.',
          'Oh, how I long for the sweet embrace of rock.',
          'I could skip this rock into infinity.',
        ];

        const caption = CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];

        const url = galleryClient.generateGalleryRedirectUrl({
          chain: GalleryChainId.ETHEREUM,
          contractAddress: rocksContractAddress,
          caption,
          collectionTitle: 'UNSHADED ROCKS',
        });

        return window.open(url, '_newtab');
      },
      [galleryClient, rocksContractAddress]
      //async () => {
      //  if (disabled) return;

      //  try {

      //    if (!address) throw new Error('Missing address.');

      //    console.log('got', isLoggedIn)

      //    if (isLoggedIn) {

      //      // @ts-expect-error explicit_cookies
      //      void galleryClient.useLogoutMutation({});
      //      void setIsLoggedIn(false);

      //      return;
      //    }

      //    // Fetch nonce to initialize the login process.
      //    setNonce(
      //      await galleryClient.useCreateNonceMutation({
      //        address,
      //        chain: GalleryChainId.ETHEREUM,
      //      })
      //    );

      //  } catch (e) {
      //    console.error(e);
      //    setNonce(null);
      //  }
      //},
      //[
      //  setNonce,
      //  disabled,
      //  isLoggedIn,
      //  galleryClient,
      //  address,
      //  galleryEnvironment,
      //  signMessage,
      //  isLoggedIn,
      //  setIsLoggedIn,
      //]
    );
    return (
      <div className={className}>
        <div
          onClick={onClick}
          ref={ref}
          className={clsx(
            'flex items-center justify-center',
            isHovering ? 'bg-gallery-white' : 'bg-gallery-black',
            isHovering ? 'text-gallery-black' : 'text-gallery-white',
            !disabled && 'cursor-pointer',
            'pt-3 pb-0 pl-1 pr-2',
          )}
          style={{
            borderRadius: '2px',
            overflow: 'hidden',
            fontWeight: isHovering ? '900' : '700',
        }}>
          <div className="flex flex-col items-center">
            {false && (
              <GalleryLogo
                color={isHovering ? colors["gallery-black"]: colors["gallery-white"]}
                className={clsx(isHovering && 'animate-fade-left')}
                size={20}
              />
            )}
            <div style={{paddingLeft: 8}} className="pt-2 pb-2">
              <SpanLetterformUpright className="text-3xl">
                <ThemeDigitize
                  disabled={!isHovering}
                  threshold={0.90}
                  children="GALLERY"
                />
              </SpanLetterformUpright>
            </div>
            {false && (
              <GalleryLogo
                color={isHovering ? colors["gallery-black"]: colors["gallery-white"]}
                className={clsx(isHovering && 'animate-fade-right')}
                size={20}
              />
            )}
            {false && (
                <span
                    className={clsx(
                        'font-LetterformVariations01 pointer-events-none',
                        isHovering && 'animate-fade-right',
                    )}
                    style={{fontSize: '12px'}}>
              {isLoggedIn ? 'Sign out' : 'Connect to gallery'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
