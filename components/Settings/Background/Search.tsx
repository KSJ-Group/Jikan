import React, { useState, useEffect, useRef, useContext } from "react";
import type { NextPage } from "next";
import axios from "axios";
import styles from "../../../styles/Settings/Background/Search/Search.module.css";
import PhotoTile from "./PhotoTile";
import Page from "../Page";

interface Photo {
  url: string;
  avg_color: string;
  src: {
    original: string;
    medium: string;
  };
}

const photos: Photo[] = [];

const Search: NextPage = () => {
  const [terms, setTerms] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<typeof photos>([]);
  const [maxPages, setMaxPages] = useState<number>(0);
  const isInitialMount = useRef<boolean>(true);

  const settings: any = document.getElementById('settings-body');

  useEffect(() => {
    let search = localStorage.getItem("search");
    if (search) {
      setTerms(search);
    } else {
      setTerms("");
    }
    if (settings) {
      settings.scrollTo({ top: 450, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    localStorage.setItem("search", terms);
  }, [terms, page]);

  const changeTerms = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTerms(event.target.value);
    setPage(1);
  };

  const submitForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    fetchImages(terms, page);
  }

  const fetchImages = (searchTerms: string, pageNumber: number): void => {
    axios
      .get(`/api/images?terms=${searchTerms}&page=${pageNumber}`)
      .then((data) => {
        setImages(data.data.photos);
        setMaxPages(Math.ceil(data.data.total_results / 12));
        if (settings) {
          settings.scrollTo({ top: 850, behavior: 'smooth' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePage = (direction: boolean): void => {
    let newPage = page;
    direction ? newPage++ : newPage--;
    setPage(newPage);
  };

  const chooseSuggestion = (e, term) => {
    e.preventDefault();
    setTerms(term);
    fetchImages(term, 1);
  }

  useEffect(() => {
    if (terms.length) {
      fetchImages(terms, page);
    }
  }, [page])

  return (
    <div className={styles.search}>
      <div className={styles.searchTitle}>Search Images from Pexel</div>
      <div className={styles.suggestionWrapper}>
        <span className={styles.text}>Suggestions:</span>
        <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Nature')}>Nature</button>
        <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Animals')}>Animals</button>
        <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Cute')}>Cute</button>
        <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Abstract')}>Abstract</button>
        <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Sports')}>Sports</button>
      </div>
      <form className={styles.form} onSubmit={(e: any) => submitForm(e)}>
        <input
          type="text"
          value={terms}
          className={styles.searchInput}
          placeholder="Mountains, cars, animals, dark, etc."
          onChange={(event: any) => {
            changeTerms(event);
          }}
        />
        <input
          className={styles.searchBtn}
          type="button"
          value="Search"
          onClick={(e: any) => submitForm(e)}
        />
      </form>
      <div className={styles.images}>
        {images.map((image) => {
          return (
            <PhotoTile
              key={image.url}
              url={image.url}
              avg_color={image.avg_color}
              src={image.src}
            />
          );
        })}
      </div>
      <Page changePage={changePage} page={page} maxPages={maxPages} />
    </div>
  );
};

export default Search;
