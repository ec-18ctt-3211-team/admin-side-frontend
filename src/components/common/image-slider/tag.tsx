import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { IImageTag } from 'interfaces/image-tag.interface';

interface Props {
  data: IImageTag;
  width: number;
  isLink?: boolean;
}

const Wrapper = (props: {
  children: React.ReactNode;
  width: number;
  isLink?: boolean;
}): JSX.Element => {
  return (
    <div className="px-2 relative" style={{ width: `${props.width}%` }}>
      {props.isLink ? (
        <Link className="cursor-pointer" to={SITE_PAGES.MAIN.path}>
          {props.children}
        </Link>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
};

export default function ImageTag(props: Props): JSX.Element {
  return (
    <Wrapper width={props.width} isLink={props.isLink}>
      <img
        src={props.data.src}
        className={[
          'h-80 w-full rounded-xl shadow bg-brown-200 object-cover',
          props.data.href
            ? 'opacity-80 hover:shadow-2xl hover:opacity-100'
            : 'opacity-90',
        ].join(' ')}
      />
      <span className="absolute bottom-4 left-5 text-l text-white font-bold uppercase drop-shadow-xl">
        {props.data.name}
      </span>
    </Wrapper>
  );
}
