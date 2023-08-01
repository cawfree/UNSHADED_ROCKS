import * as React from 'react';
import {clsx} from 'clsx';

import {InfoLink, InfoSection} from '@/info/components';
import {SpanLetterform, SpanLetterformUpright} from '@/letterform/components';
import {Layout, LayoutBodyScroll} from '@/layout/components';
import {NavigatorHomeButton, NavigatorRouteFooter} from '@/navigation/components';
import {useNavigationFooterBottom} from '@/navigation/hooks';
import {fontSize} from '@/tailwind/assets';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

const style = Object.freeze({lineHeight: 2});

export const Info = React.memo(
  function Info({
    className = 'pb-4',
    textSize: defaultTextSize = 'sm',
  }: {
    readonly textSize?: keyof typeof fontSize;
    readonly className?: string;
  }): JSX.Element {
    const {primaryColorSelection} = useThemeContext();
    const textSize = `text-${String(defaultTextSize)}`;
    const {renderBottom} = useNavigationFooterBottom();
    const renderBody = React.useCallback(
      () => (
        <LayoutBodyScroll className="pr-8">
          <InfoSection
            textSize={textSize}
            title=""
            className={className}
            description="UNSHADED ROCKS is a collection of 10,000 tridimensional primitive assets. They possess form yet remain untouched. Existing between two speculative states—beyond nature, products of the digitized hand. Each contains multitudes of what was and what's to come."
            baseTextColor="secondary-darker"
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title=""
            className={className}
            description={`All assets are unique and procedurally generated, offering 37 different types, each with varying levels of surrealism and rarity. These rocks are intentionally "unshaded" devoid of colour or texture. What you see is the foundational material of all digital 3D objects: polygons. Their appearance is dynamic, adapting to their surroundings and rendering context.`}
            baseTextColor="secondary-darker"
            style={style}
          />
          <InfoSection
            title="CREATORS"
            textSize={textSize}
            className={className}
            description={null}
            style={style}
          />
          <div className="pb-4" style={{...style, marginTop: -15}}>
            <span>
              <SpanLetterform
                className={clsx(textSize, 'text-secondary')}
                children={'Artworks by '}
              />
              <a href="https://www.figure31.com/" target="_blank">
                <SpanLetterform
                  className={clsx(textSize, `text-${primaryColorSelection} underline`)}
                  children={'Figure31'}
                />
              </a>
              <SpanLetterform
                className={clsx(textSize, 'text-secondary')}
                children={', contract by '}
              />
              <a href="https://jonathanchomko.com/" target="_blank">
                <SpanLetterform
                  className={clsx(textSize, `text-${primaryColorSelection} underline`)}
                  children={'Jonathan Chomko'}
                />
              </a>
              <SpanLetterform
                className={clsx(textSize, 'text-secondary')}
                children={', site by '}
              />
              <a href="https://ethereum.org/en/whitepaper/" target="_blank">
                <SpanLetterform className={clsx(textSize, 'text-secondary-darker')}>
                  <ThemeDigitize infinite children="*******" />
                </SpanLetterform>
              </a>
              <SpanLetterform
                className={clsx(textSize, 'text-secondary')}
                children={'.'}
              />
            </span>
          </div>
          <InfoSection
            textSize={textSize}
            title="INTENTIONS"
            className={className}
            highlights={['manufactured', 'natural', 'creative', 'building']}
            description={`They embody the essence of an object, existing between the realm of manufactured and natural entities. They simulate nature while devoid of its innate characteristics. As elemental assets, they serve as minimalist creations or building blocks. As a collector, you can utilize your rocks according to your creative vision.`}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title=""
            className={className}
            description={`If you're looking for inspiration, try the AR app, download the 3D files to incorporate them into your virtual world, or even 3D print them. These assets are versatile. We invite collectors to embrace their unique nature as both digital and potentially physical manifestations.`}
            highlights={['embrace', 'unique', 'AR', 'virtual']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title="WHERE IS IT GOING?"
            className={className}
            description={`The journey of these rocks is as extensive as their collectors take them. We encourage independent initiatives, and you can explore our vision on the ROCKMAP.`}
            highlights={['journey', 'vision']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title="MA55"
            className={className}
            description={`MA55, or MASS, refers to a set of 55 broken rocks within the collection. These rocks feature altered polygons, twisted vertices, or inverted faces. These anomalies emerged from the generative process and were intentionally preserved. All broken ROCKS were individually pre-minted and subsequently removed from circulation.`}
            highlights={['altered', 'twisted', 'inverted']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title=""
            className={className}
            description={`As technology evolves and digital worlds expand, new challenges will emerge. These will differ from the concerns of two-dimensional mediums. One day, power may rise from inadequacy.`}
            highlights={['digital', 'worlds', 'power']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title="ORIGINS"
            className={className}
            description={`The collection was initially introduced in 2021. The collection served as an artistic response to the prevailing 10K PFP business model and the oversaturation of marketplaces. The original intention was to deconstruct the language of such projects and lay it out openly.`}
            highlights={['response', '10K', 'PFP', 'deconstruct', 'projects']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title=""
            className={className}
            description={`The initial collection lacked a dedicated website, asset attributes, and minting was only feasible through direct interaction with the smart contract. Minting occurred sequentially, and the majority of the collection remained unminted.`}
            highlights={['dedicated', 'direct', 'interaction']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title="UPDATE"
            className={className}
            description={`The recent update aims to enhance the collector experience while paying homage to this historical project and achieving complete mint. These assets now feature updated metadata accompanied by high-quality preview images and detailed attributes, encompassing type, polygons, vertices, XYZ dimensions, and volume. Furthermore, we've introduced a dedicated project website. Notably, we've implemented a significant price reduction and randomized the minting process to make the acquisition more accessible and engaging.`}
            highlights={['enhance', 'metadata', 'significant', 'randomized']}
            style={style}
          />
          <InfoSection
            textSize={textSize}
            title="AIRDROP"
            className={className}
            description={`A snapshot was taken of addresses that minted before 11/08/2023. These addresses can claim a designated quantity of ROCKS, based on the original mint price versus the revised rate. The deadline for claims is 01/10/2023.`}
            highlights={['snapshot', 'claim']}
            style={style}
          />
        </LayoutBodyScroll>
      ),
      [className, primaryColorSelection]
    );

    const renderHeader = React.useCallback(
      () => (
        <div className="flex flex-col h-full pb-8 pt-8 pl-5">
          <div className="flex">
            <SpanLetterformUpright
              className={`text-4xl text-${primaryColorSelection}`}
              children="INFO"
            />
          </div>
          <div className="flex-1" />
          <div className="w-full flex">
            <NavigatorHomeButton className="pl-4" />
          </div>
        </div>
      ),
      [primaryColorSelection],
    );

    const renderFooter = React.useCallback(
      () => (
        <NavigatorRouteFooter
          renderBottom={renderBottom}
          renderTop={() => (
            <div className="pt-8 pb-8 flex items-end flex-col pr-4">
              <InfoLink
                // TODO: should be environment specific (export url from gallery-sdk client)
                href="https://gallery.so/Figure31/2RosJHmjiPG163wj2oS4B1cq80n"
                children="GALLERY"
                alt="Show your collection to the world."
              />
              <br />
              <InfoLink
                href="https://twitter.com/figure31_"
                children="TWITTER"
                alt="Follow on Twitter"
              />
                {false && (
                  <>
                    <br />
                    <InfoLink
                      href="https://twitter.com/figure31_"
                      children="TELEGRAM"
                      alt="Join Telegram"
                      disabled
                    />
                  </>
                 )}
                <br />
                <InfoLink
                    href="https://etherscan.io/token/0xfda1d24e927f8da58f86f653e976cb1f7e6cc9b7#code"
                    children="ETHERSCAN"
                    alt="View Smart Contract"
                />
                {false && (
                  <>
                    <br />
                    <InfoLink
                      href="https://opensea.io/collection/unshaded-rocks"
                      disabled
                      children="COLLECTION"
                      alt="Browse the Collection"
                    />
                  </>
                )}
                <br />
                <InfoLink
                    href="https://opensea.io/collection/unshaded-rocks"
                    children="COLLECT"
                    alt="Collect on Secondary"
                />
                <br />
                {false && (
                  <InfoLink
                    href="https://www.figure31.com/unshaded?about"
                    children="ESSAY"
                    alt="Read About UNSHADED ROCKS"
                  />
                )}
                {false && (
                  <>
                    <br />
                    <InfoLink
                      href="https://twitter.com/figure31_"
                      children="PRESS"
                      alt="Read About UNSHADED ROCKS"
                      disabled
                    />
                  </>
                )}
            </div>
          )}
        />
      ),
      [renderBottom],
    );

    return (
      <Layout
        renderBody={renderBody}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    );
  }
);
