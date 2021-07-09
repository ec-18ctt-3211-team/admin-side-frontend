import React, { useState } from 'react';
import Layout from 'components/common/layout';
import DivPx from 'components/common/divpx';
import { ImageSlider, ImageTag } from 'components/common/image-slider';
import { IMAGES, GIFTS, ROOMS } from 'constants/images.const';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function Main(props: Props): JSX.Element {
  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
      allowSearch
    >
      <ImageTag data={{ src: '/images/welcome.jpg' }} width={100} />
      <DivPx size={32} />
      <div className="px-32 text-lg">Welcome to 3211,</div>
      {!props.isAuthorized && (
        <div className="px-32 text-lg">
          Please login or sign up to explore more!
        </div>
      )}
      <DivPx size={48} />
      <ImageSlider
        title="SIGNIFICANT PLACES TO STAY"
        limit={5}
        images={IMAGES}
        isLink={true}
      />
      <DivPx size={48} />
      <ImageSlider title="PREFRENTIAL" limit={3} images={GIFTS} isLink={true} />
      <DivPx size={48} />
      <ImageSlider
        title="RECOMMENDED By 3211"
        limit={4}
        images={ROOMS}
        isLink={true}
      />
    </Layout>
  );
}
