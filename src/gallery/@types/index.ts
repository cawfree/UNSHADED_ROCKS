import {
  GalleryClient,
  GalleryEnvironment,
  UseSyncTokensCollectedMutation,
} from 'gallery-sdk';

export type GalleryContextValue = {
  readonly galleryEnvironment: GalleryEnvironment;
  readonly isLoggedIn: boolean;
  readonly setIsLoggedIn: (isLoggedIn: boolean) => void;
  readonly galleryClient: GalleryClient;
  // TODO: it would be useful to add loading functionality for better support
  readonly currentUserGalleryTokens: UseSyncTokensCollectedMutation | null;
};
