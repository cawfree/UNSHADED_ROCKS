export type RelaunchResult = {
  readonly isCurrentlyBeingBypassed: boolean;
  readonly isRelaunched: boolean;
  readonly blocksUntilRelaunch: bigint;
};

// HACK: Note "loading" in this instance means
// whether we're waiting the initial fetch value,
// which will control an application-level
// obscuring modal (the waiting room).
// Whilst not launched, the value will be polled.
export type RelaunchContextValue = Readonly<
  | {loading: true}
  | {loading: false; result: RelaunchResult}
  | {loading: false; error: Error}
>;
