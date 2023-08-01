import {BrowserInfo, detect} from 'detect-browser';
import toPx from 'to-px';

import {fontSize} from '@/tailwind/assets';

const browser = detect();
const browserName: string | undefined = browser?.name;

const SUPPORTED_BROWSERS: readonly (BrowserInfo['name'])[] = ['safari', 'chrome'];

export function useLetterform(
  className: string
) {
  const [
    maybeFontSize,
  ] = Object
    .keys(fontSize)
    .filter((e) => className?.includes(`text-${e}`))
    .reverse();

  if (!maybeFontSize)
    throw new Error(`Expected fontSize, encountered "${maybeFontSize}".`);

  if (!(maybeFontSize in fontSize))
    throw new Error(`Unable to find fontSize for "${maybeFontSize}".`);

  const _fontSize = fontSize[maybeFontSize as keyof typeof fontSize];

  const supportsNativeRendering =
      typeof browserName === 'string'
      && SUPPORTED_BROWSERS.map(String).includes(browserName);

  return {
    textSize: `text-${maybeFontSize}`,
    fontSize: _fontSize,
    px: Number(toPx(_fontSize)),
    supportsNativeRendering,
  };
}
