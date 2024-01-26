import { useContext } from 'react';
import { BackgroundContext } from '../../../contexts/BackgroundContext';
import styles from '../../../styles/Settings/Background/PhotoTile/PhotoTile.module.css';
import { Spinner } from 'react-bootstrap';
import Image from 'next/image';

interface ButtonProps {
  url: string,
  avg_color: string,
  src: {
    original: string,
    medium: string
  },
  image: any,
  images: any,
  setImages: Function
};

const PhotoTile = ({ url, src, image, images, setImages }: ButtonProps) => {
  const { background, setBackground, changeLoadStatus, loaded, recentlySelected, setRecentlySelected, favorites, setFavorites } = useContext(BackgroundContext);

  const clickHandler = () => {
    setBackground(src.original);
    changeLoadStatus(false);
    let obj = {
      'type': 'image',
      'id': src.original,
      'favorited': false
    }
    let temp: any = recentlySelected.slice(0, 20);
    temp = temp.filter(each => {
      if (each.id !== src.original) {
        return true;
      } else {
        return false;
      }
    })
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const favoriteImage = (image: any) => {
    let temp: any = images.slice();
    temp.map((each: any) => {
      if (image.id === each.id) {
        each.favorited = true;
      }
    })
    setImages(temp);

    let obj = {
      'type': 'image',
      'id': src.original,
      'favorited': true
    }

    let temp2: any = favorites.slice();
    temp2.unshift(obj);
    setFavorites(temp2);
  }

  const unfavoriteImage = (image: any) => {
    let temp: any = images.slice();
    temp.map((each: any) => {
      if (each.id === image.id) {
        each.favorited = false;
      }
    })
    setImages(temp);


    let temp2: any = favorites.slice();
    temp2 = temp2.filter((each: any) => {
      if (each.id !== image.id) {
        return true;
      } else {
        return false;
      }
    });
    setFavorites(temp2);
  }

  return (
    <div className={styles.imageContainer}>
      {!image.favorited ?
        <span className={styles.inactiveStar} onClick={() => favoriteImage(image)}>☆</span>
        : <span className={styles.activeStar} onClick={() => unfavoriteImage(image)}>★</span>
      }
      <Image className={styles.image} src={src.medium} onClick={clickHandler} placeholder="blur" alt={url} blurDataURL={src.medium} layout="fill" />
      {!loaded && background === src.original ? <Spinner className={styles.spinner} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : null}
    </div>
  );
};

export default PhotoTile;