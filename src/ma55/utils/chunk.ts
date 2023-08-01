export function chunk<T>({
  arr,
  chunkSize,
} : {
  readonly arr: readonly T[];
  readonly chunkSize: number;
}): readonly T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
