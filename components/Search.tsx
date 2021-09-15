import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import styles from '../styles/Search.module.css';
import PhotoTile from './PhotoTile';

interface Photo {
  url: string,
  avg_color: string,
  src: {
    large: string
  }
}

const photos: Photo[] = [];

const Search: NextPage = () => {
  const [terms, setTerms] = useState<string>('')
  const [page, setPage] = useState<number>(1)  // this should increment when user wants to see next set of images
  const [images, setImages] = useState<typeof photos>([])

  useEffect(() => {
    fetchImages(terms, page)
  },[terms])

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setTerms(event.target.value)
  }

  const fetchImages = (searchTerms: string, pageNumber: number) => {
    axios.get(`/api/images?terms=${searchTerms}&page=${page}`)
      .then((data) => {
        setImages(data.data)
      })
      .catch((error) => {console.log(error)})
  }

  return (
    <div className={styles.search}>
      <form>
        <input type='text' onChange={(event)=>{search(event)}}/>
        <input type='submit'/>
      </form>
      {images.map((image) => {
        return (
          <PhotoTile url={image.url} avg_color={image.avg_color} src={image.src} />
        )})}
    </div>
  )
}

export default Search;