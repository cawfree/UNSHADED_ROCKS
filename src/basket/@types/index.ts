export type BasketContextValue = {
  readonly numberOfRocksInBasket: number;
  readonly addRockToBasket: () => void;
  readonly removeRockFromBasket: () => void;
  readonly clearBasket: () => void;
  readonly onRequestSetNumberRocksInBasket:
    (nextNumberOfItemsInBasket: number) => void;
  readonly maximumNumberOfRocksInBasket: number;
};
