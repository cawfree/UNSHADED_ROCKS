import * as React from 'react';
import {useThemeContext} from '@/theme/contexts';

export function useLetterFormFontFamily() {
  const {letterformDisabled} = useThemeContext();
  const fontFamily = letterformDisabled ? `LetterformVariations01` : 'LetterformVariations00';
  const tailwindFontFamily = `font-${fontFamily}`;
  return React.useMemo(
    () => ({fontFamily, tailwindFontFamily}),
    [fontFamily, tailwindFontFamily]
  );
}
