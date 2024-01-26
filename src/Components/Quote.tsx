import React, { useContext, useEffect, useState } from 'react'
import { SettingsContext } from "../contexts/SettingsContext";
import styles from '../styles/Settings/Quote/Quote.module.css';

type Props = {}

const Quote = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const {
    showQuote,
    quote,
    setQuote
  } = useContext(SettingsContext);

  useEffect(() => {
    if (showQuote && isDayPassed()) {
      getNewQuote();
    } else {
      const lsQuote = localStorage.getItem("quote");
      if (lsQuote) {
        setQuote(lsQuote);
        setLoading(false);
      } else {
        getNewQuote();
      }
    }
  }, [showQuote])

  const isDayPassed = () => {
    const lastRefreshedString = localStorage.getItem('lastFetchedQuote');
    if (!lastRefreshedString) return true;

    const lastRefreshed = new Date(lastRefreshedString);
    const currentTime = new Date();
    const timeDifference = currentTime.valueOf() - lastRefreshed.valueOf();
    return timeDifference > 86400000;
  }

  const getNewQuote = async () => {
    try {
      const response = await fetch("/api/getQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      setQuote(data.result.content);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (quote) console.log(quote);
  }, [quote])

  if (loading || !showQuote) return null;

  return (
    <div className={styles.quoteWrapper}>
      <span className={styles.quote}>
        {quote}
      </span>
    </div>
  )
}

export default Quote