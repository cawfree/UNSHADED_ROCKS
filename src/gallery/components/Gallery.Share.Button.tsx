import * as React from 'react';
import {GalleryChainId} from 'gallery-sdk';

import {useConfig} from '@/config/hooks';
import {useGalleryContext} from '@/gallery/contexts';
import {RockV2} from '@/rocks/@types';
import {ThemeOptionButton} from '@/theme/components';

export const GalleryShareButton = React.memo(
  function GalleryShareButton({
    className,
    maybeRock,
  }: {
    readonly className?: string;
    readonly maybeRock?: RockV2;
  }): JSX.Element {
    const {rocksContractAddress} = useConfig();
    const {galleryClient} = useGalleryContext();

    return (
      <div className={className}>
        <ThemeOptionButton
          digitized
          backgroundColor="gallery-black"
          key={String(maybeRock?.id)}
          title="GALLERY"
          disabled={!maybeRock}
          onClick={React.useCallback(
            () => {
              if (!maybeRock?.tokenId) return console.error('Missing tokenId.');

              const url = galleryClient.generateGalleryRedirectUrl({
                chain: GalleryChainId.ETHEREUM,
                contractAddress: rocksContractAddress,
                //tokenId: String(maybeRock.tokenId),
                //// TODO:
                caption: 'What bear market?',
                //imageUrl: 'https://i.seadn.io/gcs/files/12345.jpg',
                collectionTitle: 'UNSHADED ROCKS',
                tokenTitle: `ROCK ${maybeRock?.id}`,
              });

              return window.open(url, '_newtab');
            },
            [galleryClient, rocksContractAddress, maybeRock?.tokenId],
          )}
        />
      </div>
    );
  }
);
