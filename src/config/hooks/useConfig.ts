import * as React from 'react';

import {getConfig} from '@/config/utils';

export function useConfig() {
  return React.useMemo(getConfig, []);
}
