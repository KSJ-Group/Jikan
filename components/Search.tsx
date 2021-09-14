import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Search.module.css';

interface Photo {
  url: string,
  avg_color: string,
}

const photos: Photo[] = [];

const Search = () => {
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

console.log(images)
  return (
    <div className={styles.search}>
      <form>
        <input type='text' onChange={(event)=>{search(event)}}/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default Search;