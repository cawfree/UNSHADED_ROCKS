import {colors} from '@/tailwind/assets';

export type ThemeContextValue = {
  readonly primaryColorSelection: keyof typeof colors;
  readonly letterformDisabled: boolean;
};
