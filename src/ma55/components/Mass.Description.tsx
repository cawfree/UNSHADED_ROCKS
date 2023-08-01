import * as React from 'react';

import {InfoSection} from '@/info/components/Info.Section';
import {fontSize} from "@/tailwind/assets";

// Info.tsx
const style = Object.freeze({lineHeight: 2});

export const MassDescription = React.memo(
  function MassDescription({
    // Info.tsx
    className = 'pb-4',
    // Info.tsx
    textSize: defaultTextSize = 'sm',
  }: {
    readonly textSize?: keyof typeof fontSize;
    readonly className?: string;
  }): JSX.Element {
    // Info.tsx
    const textSize = `text-${String(defaultTextSize)}`;
    return (
      <InfoSection
        textSize={textSize}
        title=""
        className={className}
        description={"MA55 IS A SET OF 55 broken rocks in the unshaded rocks collection. These rocks feature broken polygon faces, twisted vertices, or inverted faces. They are the result of DEFECTS in the generative process and were kept in the collection purposefully. All broken rocks were individually premined and taken out the collection.".toUpperCase()}
        highlights={['55', 'DEFECTS', 'PREMINED']}
        style={style}
      />
    );
  }
);
