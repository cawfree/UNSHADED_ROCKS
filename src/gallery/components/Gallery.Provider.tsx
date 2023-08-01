import * as React from 'react';

import {GalleryContextProvider} from '@/gallery/contexts';
import {useCreateGalleryContext} from '@/gallery/hooks';

export const GalleryProvider = React.memo(
  function GalleryProvider({
    children,
  }: React.PropsWithChildren): JSX.Element {
    return (
      <GalleryContextProvider
        children={children}
        value={useCreateGalleryContext()}
      />
    );
  }
);
