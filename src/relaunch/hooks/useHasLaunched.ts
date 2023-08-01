import useLocalStorage from 'use-local-storage';

export function useHasLaunched() {
  return useLocalStorage<boolean | null>('ethereum.disabled', null);
}
