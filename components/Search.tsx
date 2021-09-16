import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import styles from '../styles/Search.module.css';
import PhotoTile from './PhotoTile';
import Page from './Page';

interface Photo {
  url: string,
  avg_color: string,
  src: {
    original: string,
    medium: string
  }
}

interface searchProps {
  changeBackground: (event: React.MouseEvent, url:string) => void;
}

const photos: Photo[] = [];

const Search: NextPage<searchProps> = ({ changeBackground }) => {
  const [terms, setTerms] = useState<string>('')
  const [page, setPage] = useState<number>(1)  // this should increment when user wants to see next set of images
  const [images, setImages] = useState<typeof photos>([])
  const [maxPages, setMaxPages] = useState<number>(0)
  useEffect(() => {
    fetchImages(terms, page);
  },[terms, page])

  const search = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTerms(event.target.value);
  }

  const fetchImages = (searchTerms: string, pageNumber: number): void => {
    axios.get(`/api/images?terms=${searchTerms}&page=${pageNumber}`)
      .then((data) => {
        setImages(data.data.photos);
        setMaxPages(Math.ceil(data.data.total_results/12));
      })
      .catch((error) => {console.log(error);})
  }

  const changePage = (direction: boolean) => {
    let newPage = page;
    direction ? newPage++: newPage--;
    setPage(newPage);
  }

  return (
    <div className={styles.search}>
      <form>
        <input type='text' onChange={(event: any)=>{search(event)}}/>
      </form>
      <div className={styles.images}>
      {images.map((image) => {
        return (
          <PhotoTile url={image.url} avg_color={image.avg_color} src={image.src} changeBackground={changeBackground} />
        )})}
      </div>
      <Page changePage={changePage} page={page} maxPages={maxPages}/>
    </div>
  )
}

export default Search;