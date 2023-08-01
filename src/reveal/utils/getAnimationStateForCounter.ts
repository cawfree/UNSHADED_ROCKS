export const getAnimationStateForCounter = ({
  counter,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  totalRocks,
}: {
  readonly counter: number;
  readonly totalRocks: number;
}) => ({
  // Base properties
  renderRocksAcquired: counter >= 1,
  renderTx: counter >= 2,
  renderGwei: counter >= 3,
  renderFee: counter >= 4,
  renderMint: counter >= 5,
  renderTotal: counter >= 6,

  //renderRock: (i: number) => counter >= i + 7,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  renderRock: (i: number) => counter >= 7,

  //renderRevealButton: counter > 7 + totalRocks,
  renderRevealButton: counter >= 7,
})
