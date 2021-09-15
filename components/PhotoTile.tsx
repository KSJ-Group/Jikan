import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

type ButtonProps = {
  url: string,
  avg_color: string,
  src: {
    large: string
  }
}

const PhotoTile: NextPage<ButtonProps>= ({url, avg_color, src}) => {
  return (
    <div>
      <Image src={src.large} alt={url} width={200} height={150}/>
    </div>
  )

}

export default PhotoTile;