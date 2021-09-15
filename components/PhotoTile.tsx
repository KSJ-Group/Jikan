import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

type ButtonProps = {
  url: string,
  avg_color: string,
  src: {
    large: string
  },
  changeBackground: (event: React.MouseEvent, url:string) => void
}

const PhotoTile: NextPage<ButtonProps>= ({url, avg_color, src, changeBackground}) => {
  return (
    <div>
      <Image src={src.large} alt={url} width={200} height={150} onClick={(event)=>{changeBackground(event, src.large)}}/>
    </div>
  )

}

export default PhotoTile;