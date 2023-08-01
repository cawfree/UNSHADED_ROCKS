import * as React from 'react';

import {BasketContextValue} from '@/basket/@types';
import {BasketContextProvider} from '@/basket/contexts';
import {useConfig} from '@/config/hooks';
import {useRocksMaxNumberOfPieces, useRocksPricePerPiece, useRocksTokenCounter} from "@/rocks/hooks";

const MINIMUM_ROCKS_IN_BASKET = 1;
const PREFERRED_ROCKS_IN_BASKET = 10;

export const BasketProvider = React.memo(
  function BasketProvider({children}: React.PropsWithChildren): JSX.Element {

    // TODO: Serialization?
    const [
      numberOfRocksInBasket,
      setNumberOfRocksInBasket,
    ] = React.useState<number>(PREFERRED_ROCKS_IN_BASKET);

    const {maximumFeePerMint} = useConfig();
    const {data: maybeRocksPricePerPiece} = useRocksPricePerPiece();
    const {data: maybeRocksTokenCounter} = useRocksTokenCounter();
    const {data: maybeMaxNumberOfPieces} = useRocksMaxNumberOfPieces();

    const maximumNumberOfRocksInBasket = Number(
      maybeRocksTokenCounter && maybeRocksPricePerPiece && maybeMaxNumberOfPieces
        ? (() => {
          const rocksRemanining = (maybeMaxNumberOfPieces as bigint) - (maybeRocksTokenCounter as bigint);
          const maxmimumMintSize = maximumFeePerMint / (maybeRocksPricePerPiece! as bigint);
          return rocksRemanining >= maxmimumMintSize ? maxmimumMintSize : rocksRemanining
        })()
        : 0n
    );

    // HACK: Prevent erroneous default selections when interacting with a scarce supply.
    React.useEffect(() => {
      if (numberOfRocksInBasket <= maximumNumberOfRocksInBasket) return;

      setNumberOfRocksInBasket(maximumNumberOfRocksInBasket);
    }, [numberOfRocksInBasket, maximumNumberOfRocksInBasket]);

    const addRockToBasket = React.useCallback(
      () => setNumberOfRocksInBasket(
        e => Math.min(e + 1, maximumNumberOfRocksInBasket)
      ),
      [maximumNumberOfRocksInBasket]
    );

    const removeRockFromBasket = React.useCallback(
      () => setNumberOfRocksInBasket(
        e => Math.max(MINIMUM_ROCKS_IN_BASKET, e - 1)
      ),
      []
    );

    const clearBasket = React.useCallback(
      () => setNumberOfRocksInBasket(MINIMUM_ROCKS_IN_BASKET),
      []
    );

    const onRequestSetNumberRocksInBasket = React.useCallback(
      (nextNumberOfItemsInBasket: number) => {

        if (nextNumberOfItemsInBasket > maximumNumberOfRocksInBasket)
          throw new Error(`Attempted to set nextNumberOfItemsInBasket ${
            nextNumberOfItemsInBasket
          }, but the maximum is ${
            maximumNumberOfRocksInBasket
          }.`);

        return setNumberOfRocksInBasket(nextNumberOfItemsInBasket);
      },
      [maximumNumberOfRocksInBasket]
    );

    return (
      <BasketContextProvider
        children={children}
        value={React.useMemo<BasketContextValue>(
          () => ({
            numberOfRocksInBasket,
            maximumNumberOfRocksInBasket,
            clearBasket,
            addRockToBasket,
            removeRockFromBasket,
            onRequestSetNumberRocksInBasket,
          }),
          [
            numberOfRocksInBasket,
            maximumNumberOfRocksInBasket,
            clearBasket,
            addRockToBasket,
            removeRockFromBasket,
            onRequestSetNumberRocksInBasket,
          ],
        )}
      />
    );
  }
);
