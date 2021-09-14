import React, { useState, useEffect } from 'react';
import styles from '../styles/Search.module.css';

const Search = () => {
  const [terms, setTerms] = useState<string>('')

  useEffect(() => {
    requestPexel()
  },[terms])

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setTerms(event.target.value)
  }

  const requestPexel = () => {

  }


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