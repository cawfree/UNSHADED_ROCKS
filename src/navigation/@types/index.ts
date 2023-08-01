export enum NavigatorRoute {
  ROOT = '/',
  MINT = '/mint',
  REVEAL = '/reveal/:transactionHash',
  AR = '/ar/:rockId',
  AR_WITHOUT_ROCK = '/ar',
  INFO = '/info',
  MA55 = '/ma55',
  CLAIM = '/claim',
  BROWSE = '/browse',
  WALLET = '/wallet/:walletAddress',
  ROCKMAP = '/rockmap',
  ROCK = '/rock/:rockId',
}

export type NavigatorModalContextValue = {
  readonly visible: boolean;
  readonly onRequestOpen: () => void;
  readonly onRequestClose: () => void;
};
