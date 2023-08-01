import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {TransactionReceipt} from 'viem';

//import {useBasketContext} from '@/basket/contexts';
import {getActivityForMintType, MintType} from '@/mint/@types';
import {useMintContext} from '@/mint/contexts';
import {useWaitForRocksTransactionToComplete} from '@/mint/hooks/useWaitForRocksTransactionToComplete';
import {NavigatorRoute} from '@/navigation/@types';

//const TEST_CLAIM: OnTransactionHashReceivedCallbackProps = {
//  transactionHash: '0xbad15ef3f382a5e54000397c99c75afde3e482de39ecc72abd780f0dee78cdcf',
//  type: MintType.CLAIM,
//};

export function useNavigateOnCompletedTransaction({
  type,
}: {
  readonly type: MintType;
}) {
    const navigate = useNavigate();
    //const {clearBasket} = useBasketContext();
    const {onFinishMint} = useMintContext();

    useWaitForRocksTransactionToComplete({
      watch: getActivityForMintType(type),
      onMintComplete: React.useCallback(
        ({transactionHash}: TransactionReceipt) => {
          // Navigate to the reveal screen.
          navigate(String(NavigatorRoute.REVEAL).replace(':transactionHash', transactionHash));
          //// Ensure that our basket is reset since the transaction went through successfully.
          //clearBasket();
          // Mark the mint as complete (allow the UI to resume normally).
          onFinishMint();
        },
        [navigate, onFinishMint, type]
      ),
    });

}
