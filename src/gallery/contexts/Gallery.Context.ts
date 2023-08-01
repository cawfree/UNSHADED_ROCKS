import * as React from 'react';

import {GalleryContextValue} from '@/gallery/@types';

const GalleryContext = React.createContext<GalleryContextValue | null>(null);

export const GalleryContextProvider = GalleryContext.Provider;

export function useGalleryContext(): GalleryContextValue {
  const maybeContext = React.useContext(GalleryContext);

  if (!maybeContext)
    throw new Error('Missing <GalleryContextProvider />!');

  return maybeContext;
}
