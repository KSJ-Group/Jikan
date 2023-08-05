import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../../styles/Settings/Background/YouTubeSearch/YouTubeSearch.module.css";
import axios from "axios";
import { BackgroundContext } from "../../../contexts/BackgroundContext";
import Spinner from 'react-bootstrap/Spinner'
import { SettingsContext } from "../../../contexts/SettingsContext";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Video {
    videoId: String
    thumbnail: String,
    title: String,
    channelTitle: String
}

const Videos: Video[] = [];
let timeout;

const YouTubeSearch = () => {
    const [terms, setTerms] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [nextPageToken, setNextPageToken] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const isInitialMount = useRef<boolean>(true);

    const settings: any = document.getElementById('settings-body');
    const { setBackground, isOnlyMusic, setIsOnlyMusic, eventType, setEventType, setYoutubeResults, youtubeResults, recentlySelected, setRecentlySelected, favorites, setFavorites } = useContext(BackgroundContext);
    const { isClock } = useContext(SettingsContext);

    const scroll = () => {
        if (settings) {
            isClock ? settings.scrollTo({ top: 650, behavior: 'smooth' }) : settings.scrollTo({ top: 850, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        let search = localStorage.getItem("youtubesearch");
        search ? setTerms(search) : setTerms("");

        scroll();
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        localStorage.setItem("youtubesearch", terms);
    }, [terms]);

    const reset = () => {
        setNextPageToken('');
        setYoutubeResults([]);
    }

    const submitForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setIsLoading(true);
        timeout = setTimeout(() => {
            setIsLoading(false);
            setIsError(true);
        }, 10000)
        fetchVideos(terms, eventType);
    }

    const changeTerms = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setTerms(event.target.value);
    };

    const fetchVideos = (searchTerms: string, eventType: string) => {
        if (isOnlyMusic && !searchTerms.includes("youtube.com")) {
            if (!searchTerms.includes("music")) searchTerms = searchTerms + " music";
        }
        if (searchTerms.includes("youtube.com")) eventType = "completed";

        axios
            .get(`/api/videos?terms=${searchTerms}&eventType=${eventType}`)
            .then((data) => {
                setIsError(false);
                setNextPageToken(data.data.nextPageToken);
                processData(data.data.items, false);
                scroll();
            })
            .catch((err) => {
                console.log('Err', err);
                setIsError(true);
            })
    };

    const fetchMoreVideos = (searchTerms: string, eventType: string, pageToken: string) => {
        if (isOnlyMusic && !searchTerms.includes("youtube.com")) {
            if (!searchTerms.includes("music")) {
                searchTerms = searchTerms + " music";
            }
        }

        if (searchTerms.includes("youtube.com")) {
            eventType = "completed";
        }

        axios
            .get(`/api/videos?terms=${searchTerms}&eventType=${eventType}&pageToken=${pageToken}`)
            .then((data) => {
                setIsError(false);
                setNextPageToken(data.data.nextPageToken);
                processData(data.data.items, true);
            })
            .catch((err) => {
                console.log('Err', err);
                setIsError(true);
            })
    }

    const processData = (data: any, append: boolean) => {
        let processed: any = [];
        data.forEach(video => {
            let obj = {
                live: video.snippet.liveBroadcastContent,
                id: video.id.videoId,
                thumbnail: video.snippet.thumbnails.high.url,
                title: video.snippet.title.replace(' &amp;', ''),
                channelTitle: video.snippet.channelTitle,
                favorited: false
            };

            favorites.forEach((favorite: any) => {
                if (favorite.id === video.id.id) {
                    obj.favorited = true;
                }
            })
            processed.push(obj);
        })
        if (append) {
            let temp: any = youtubeResults.slice(0);
            temp = [...temp, ...processed];
            setYoutubeResults(temp);
            setIsLoadingMore(false);
        } else {
            setYoutubeResults(processed);
        }
    }

    useEffect(() => {
        if (youtubeResults.length) {
            setIsLoading(false);
            clearTimeout(timeout);
            setPage(youtubeResults.length / 10 - 1);
        }
    }, [youtubeResults])

    const selectVideo = (video: any) => {
        setBackground(video.id);
        let obj = {
            'type': 'video',
            'id': video.id,
            'thumbnail': video.thumbnail,
            'live': video.live,
            'title': video.title,
            'favorited': false
        }
        let temp: any = recentlySelected.slice(0, 20);
        temp = temp.filter(each => each.id !== video.id);
        temp.unshift(obj);
        setRecentlySelected(temp);
    }

    const chooseSuggestion = (e, term) => {
        e.preventDefault();
        setTerms(term);
    }

    const radioChangeHandler = (e: any) => {
        e.target.checked ? setIsOnlyMusic(true) : setIsOnlyMusic(false);
        reset();
    };

    const checkboxChangeHandler = (e: any) => {
        e.target.checked ? setEventType('live') : setEventType('completed');
        reset();
    };

    const loadMore = (e: any) => {
        e.preventDefault();
        if (page < 5) {
            fetchMoreVideos(terms, eventType, nextPageToken);
            setIsLoadingMore(true);
        }
    }

    const scrollToTop = (e: any) => {
        e.preventDefault();
        scroll();
    }

    const favoriteVideo = (video: any) => {
        let temp: any = youtubeResults.slice();
        temp.map((each: any) => {
            if (each.id === video.id) {
                each.favorited = true;
            }
        })
        setYoutubeResults(temp);

        let obj = {
            'type': 'video',
            'id': video.id,
            'thumbnail': video.thumbnail,
            'live': video.live,
            'title': video.title,
            'favorited': true
        }
        let temp2: any = favorites.slice();
        temp2.unshift(obj);
        setFavorites(temp2);
    }

    const unfavoriteVideo = (video: any) => {
        let temp: any = youtubeResults.slice();
        temp.map((each: any) => {
            if (each.id === video.id) {
                each.favorited = false;
            }
        })
        setYoutubeResults(temp);

        let temp2: any = favorites.slice();
        temp2 = temp2.filter((each: any) => each.id !== video.id);
        setFavorites(temp2);
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchTitle}>Search YouTube</div>
            <div className={styles.formsWrapper}>
                <FormGroup className={styles.formWrapper} onChange={(e: any) => radioChangeHandler(e)}>
                    <FormControlLabel className={styles.label} control={<Switch name="music" value="Music Only" checked={isOnlyMusic} />} label="Music Only" labelPlacement="end" />
                </FormGroup>
                <FormGroup className={styles.formWrapper} onChange={(e: any) => checkboxChangeHandler(e)}>
                    <FormControlLabel className={styles.label} control={<Switch name="live" value="Live Stream" checked={eventType === 'live' ? true : false} />} label="Live" labelPlacement="end" />
                </FormGroup>
            </div>
            <div className={styles.suggestionWrapper}>
                <span className={styles.text}>Suggestions:</span>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Lo-Fi')}>Lo-Fi</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Jazz')}>Jazz</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Nature')}>Nature</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Anime')}>Anime</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Video Game')}>Game</button>
            </div>
            <form className={styles.form} onSubmit={(e: any) => submitForm(e)}>
                <input
                    type="text"
                    value={terms}
                    className={styles.searchInput}
                    placeholder="Enter search query or YouTube link"
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
            <div className={styles.searchResults}>
                {isError && <span>Server cannot be reached. Please try again later.</span>}
                {isLoading &&
                    <div className={styles.loadingContainer}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                }
                {youtubeResults.map((video: any) => {
                    return (
                        <div className={styles.videoResult} key={video.id + page}>
                            <div className={styles.imgWrapper}>
                                {video.live === 'live' && <span className={styles.liveIndicator}>◉ LIVE</span>}
                                {!video.favorited ? <span className={styles.inactiveStar} onClick={() => favoriteVideo(video)}>☆</span> : <span className={styles.activeStar} onClick={() => unfavoriteVideo(video)}>★</span>}
                                <img className={styles.thumbnail} src={video.thumbnail} onClick={() => selectVideo(video)} alt='thumbnail' />
                            </div>
                            <div className={styles.textWrapper} onClick={() => selectVideo(video)}>
                                <span className={styles.title}>{video.title}</span>
                                <span className={styles.channel}>{video.channelTitle}</span>
                            </div>
                        </div>
                    )
                })}
                {youtubeResults.length ?
                    <div className={styles.btnDiv}>
                        {isLoadingMore &&
                            <div className={styles.loadingContainer}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        }
                        <button className={styles.scrollBtn} onClick={(e: any) => scrollToTop(e)}>Go ↑</button>
                        {page < 5 ? <button className={styles.loadBtn} onClick={(e: any) => loadMore(e)}>Load More</button> : null}
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default YouTubeSearch;