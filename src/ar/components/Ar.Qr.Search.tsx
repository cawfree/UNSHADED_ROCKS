import * as React from 'react';
import {useWindowSize} from 'react-use';
import {QRCodeCanvas} from 'qrcode.react';
import {useNavigate, useParams} from 'react-router-dom';
import {clsx} from 'clsx';

import {useAutomaticallyOpenAr} from '@/ar/hooks';
import {BrowseSearch} from '@/browse/components';
import {SpanLetterform} from '@/letterform/components';
import {NavigatorRoute} from '@/navigation/@types';
import {RocksViewer} from '@/rocks/components';
import {useMaybeRockById} from '@/rocks/hooks';
import {colors} from '@/tailwind/assets';
import {useBreakpoint} from '@/tailwind/hooks';

// HACK: This component encapsulates dangerous/page-level navigation.
//       We should refactor to perform this on the change itself.
export const ArQrSearch = React.memo(
  function ArQrSearch({
    searchWidth = 65,
    searchMargin = 12,
  }: {
    readonly searchWidth?: number;
    readonly searchMargin?: number;
  }): JSX.Element {

    const {rockId: dangerousRockId = ''} = useParams();

    const maybeRockId = String(dangerousRockId).replace(/[^0-9]/g, '');

    const {width, height} = useWindowSize();
    const size = Math.min(width, height) * 0.5;
    const navigate = useNavigate();

    const getPathForSearchText = React.useCallback(
      (searchText: string) => NavigatorRoute.AR.replace(':rockId', searchText),
      []
    );

    const onChange = React.useCallback(
      (str: string) => {
        navigate(getPathForSearchText(str));
        //setSearchText(str);
      },
      [navigate, getPathForSearchText],
    );

    const {renderAutomaticArOpener} = useAutomaticallyOpenAr({forRockId: maybeRockId});

    const shouldRenderText = useBreakpoint('sm');

    const maybeRock = useMaybeRockById(maybeRockId);

    return (
      <div className="absolute inset-0">
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col">
              <div className="flex">
                <BrowseSearch
                  className="animate-fade-right"
                  autoFocus
                  onChange={onChange}
                  searchText={maybeRockId}
                  textSize="3xl"
                  width={searchWidth}
                  prefixHeight={0}
                  inputHeight={size}
                  placeholder="ROCK #"
                />
                <div style={{width: searchMargin}} />
                <div className="relative" style={{width: size, height: size}}>
                  <div className="absolute inset-0">
                    {Boolean(maybeRock) && (
                      <RocksViewer
                        rotationEnabled
                        style={{width: size, height: size}}
                        rock={maybeRock!}
                        cameraControls={false}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 animate-fade-down">
                    <div>
                      <QRCodeCanvas
                        value={window.location.href}
                        fgColor={colors.secondary}
                        bgColor="transparent"
                        size={size}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {shouldRenderText && (
                <div
                  className="w-full pt-8 animate-fade-up"
                  style={{width: size + searchWidth + searchMargin}}>
                  <div>
                    <SpanLetterform
                      children="SCAN THE QR CODE WITH YOUR PHONE CAMERA TO VIEW ROCKS IN AUGMENTED REALITY"
                      className={clsx('text-2xl text-secondary')}
                    />
                  </div>
                </div>
              )}
            </div>
        </div>
        {renderAutomaticArOpener()}
      </div>
    );
  }
);
