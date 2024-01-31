import React, { useContext, useEffect, useState } from 'react'
import { SettingsContext } from "../contexts/SettingsContext";
import styles from '../styles/Settings/Quote/Quote.module.css';

type Props = {}

const Quote = (props: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const {
    showQuote,
    quote,
    setQuote
  } = useContext(SettingsContext);

  useEffect(() => {
    setLoaded(true);
  }, [])

  useEffect(() => {
    if (loaded) {
      if (showQuote) {
        if (shouldFetchNewQuote()) {
          getNewQuote();
        } else {
          const lsQuote = localStorage.getItem("quote");
          if (lsQuote) {
            setQuote(lsQuote);
          } else {
            getNewQuote();
          }
        }
      } else {
        localStorage.removeItem("lastFetchedQuote");
      }
    }
  }, [loaded, showQuote])

  const shouldFetchNewQuote = () => {
    const lastFetchedQuote = localStorage.getItem('lastFetchedQuote');
    if (!lastFetchedQuote) {
      return true;
    }

    const lastRefreshed = parseInt(lastFetchedQuote);
    const currentTime = new Date();
    const timeDifference = currentTime.valueOf() - lastRefreshed;
    return timeDifference > 86400000;
  }

  const getNewQuote = async () => {
    console.log("Getting new quote..");
    try {
      const response = await fetch("/api/getQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      setQuote(data.result.content);
      localStorage.setItem('lastFetchedQuote', JSON.stringify((new Date).getTime()));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.quoteWrapper}>
      <span className={styles.quote}>
        {quote}
      </span>
    </div>
  )
}

export default Quote