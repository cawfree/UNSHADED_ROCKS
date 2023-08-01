import * as React from 'react';

import {BrowseBase} from '@/browse/components';
import {rocks} from '@/rocks/assets';

export const Browse = React.memo(
  function Browse(): JSX.Element {
    return <BrowseBase forRocks={rocks} title="BROWSE" />;
  }
);
