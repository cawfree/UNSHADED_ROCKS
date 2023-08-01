import * as React from 'react';
import {ethers} from 'ethers';

import {useConfig} from '@/config/hooks';

const fetchTokenIds = async ({
  walletAddress,
  first,
  skip,
  subgraphUrl,
}: {
  readonly first: number;
  readonly skip: number;
  readonly walletAddress: string;
  readonly subgraphUrl: string;
}): Promise<readonly number[]> => {
  const address = ethers.getAddress(walletAddress);

  const result = await fetch(subgraphUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `{\n  tokens (where: { holder: ${JSON.stringify(address)}}, first: ${first}, skip: ${skip}) {\n    id\n    tokenId\n  }\n}`,
      variables: null,
      extensions: {
        headers: null,
      },
    }),
  });
  const {data} = await result.json();

  return Array.from(data.tokens)
    // @ts-expect-error lacking_types
    .map((e) => parseInt(String(e.tokenId)))
};

export function useFetchTokenIdsByWalletAddress({
  pageSize: first = 1000,
}: {
  readonly pageSize?: number;
} = {}) {
  const {subgraphUrl} = useConfig();

  const fetchRocksByWalletAddress = React.useCallback(
    async (walletAddress: string | null | undefined): Promise<readonly number[]> => {

      const tokenIds: number[] = [];

      if (typeof walletAddress !== 'string')
        throw new Error(`Expected string walletAddress, encountered "${
            String(walletAddress)
        }".`);

      if (first <= 0) throw new Error('Must request at least a single token.');

      // HACK: Accumulate all tokenIds.
      while (true) {

        const nextTokenIds = await fetchTokenIds({
          walletAddress,
          first,
          skip: tokenIds.length,
          subgraphUrl,
        });

        tokenIds.push(...nextTokenIds);

        // Iterate until maximum.
        if (nextTokenIds.length !== first) break;

      }

      return tokenIds;
    },
    [first, subgraphUrl],
  );

  return {fetchRocksByWalletAddress};
}
