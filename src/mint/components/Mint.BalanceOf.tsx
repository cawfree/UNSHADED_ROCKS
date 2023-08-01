import * as React from 'react';
import {useAccount, useBalance} from 'wagmi';
import {ethers} from 'ethers';
import {clsx} from 'clsx';

import {SpanLetterformUpright} from '@/letterform/components';
import {useRocksBalance} from '@/rocks/hooks';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const MintBalanceOf = React.memo(
  function MintBalanceOf({
    address: defaultAddress,
    ...props
  }: Omit<React.HTMLProps<HTMLDivElement>, 'children'> & {
    readonly address?: `0x${string}`;
  }): JSX.Element {
    const {address: accountAddress} = useAccount();
    const {primaryColorSelection} = useThemeContext();

    const address = defaultAddress || accountAddress;

    const {data: maybeRocksBalance} = useRocksBalance({
      address,
    });

    const {data} = useBalance({
      address,
    });

    const hasPluralRocks = (maybeRocksBalance !== undefined && maybeRocksBalance as bigint > 1);

    return (
      <div {...props}>
        <div className="text-accent flex select-none">
          <div
            className={clsx(
              'flex',
              (
                     maybeRocksBalance !== undefined
                  && maybeRocksBalance as bigint > 0n
              ) ? 'animate-fade-right' : 'invisible'
            )}>
            <SpanLetterformUpright className={`text-sm text-${primaryColorSelection}`}>
              <ThemeDigitize children={String(maybeRocksBalance || 0n)} />
              {" "}
              <ThemeDigitize children={hasPluralRocks ? 'ROCKS' : 'ROCK'} />
            </SpanLetterformUpright>
          </div>
          <div className="flex animate-fade-up">
            <SpanLetterformUpright className="text-sm pr-2">
              <ThemeDigitize
                children={data?.value ? `${Number(ethers.formatEther(data.value)).toFixed(2)}` : ' ?'}
              />
              {" "}
              <ThemeDigitize children="ETH" />
            </SpanLetterformUpright>
          </div>
          <div className="flex animate-fade-down">
            <SpanLetterformUpright className="text-sm">
              <ThemeDigitize children={address?.substring(0, 20) || '?'} />
            </SpanLetterformUpright>
          </div>
        </div>
      </div>
    );
  }
);
