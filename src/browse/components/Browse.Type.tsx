import * as React from 'react';
import {clsx} from 'clsx';

import {SelectedType} from '@/browse/@types';
import {SpanLetterform} from '@/letterform/components';

export const BrowseType = React.memo(
  function BrowseType({
    className,
    selectedType,
    type,
    ...extras
  }: Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'type'> & {
    readonly selectedType: SelectedType;
    readonly type: SelectedType;
  }): JSX.Element {
    const selected = selectedType === type;
    return (
      <div
        {...extras}
        className={clsx(
          className,
          'select-none',
          selected ? 'text-accent' : 'text-secondary',
          'hover:text-accent',
          selected ? 'cursor-auto' : 'cursor-pointer',
        )}
      >
        <SpanLetterform
          className="text-sm"
          children={typeof type === 'number' ? `TYPE ${type}` : 'ALL'}
        />
      </div>
    );
  }
);
