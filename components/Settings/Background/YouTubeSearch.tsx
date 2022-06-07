import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../../styles/Settings/Background/YouTubeSearch/YouTubeSearch.module.css";
import axios from "axios";
import { BackgroundContext } from "../../BackgroundContext";

interface Video {
    videoId: String
    thumbnail: String,
    title: String,
    channelTitle: String
}

const Videos: Video[] = [];

const YouTubeSearch = () => {
    const [terms, setTerms] = useState<string>("");

    const isInitialMount = useRef<boolean>(true);
    const [videos, setVideos] = useState<typeof Videos>([]);
    const settings: any = document.getElementById('settings-body');
    const { changeBackground, isOnlyMusic, setIsOnlyMusic, eventType, setEventType } = useContext(BackgroundContext);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        let search = localStorage.getItem("youtubesearch");
        if (search) {
            setTerms(search);
        } else {
            setTerms("");
        }

        if (settings) {
            settings.scrollTo({ top: 450, behavior: 'smooth' });
        }

        const checkbox = document.getElementById('musicCheckbox') as HTMLInputElement;
        isOnlyMusic ? checkbox.checked = true : checkbox.checked = false;

        const checkbox2 = document.getElementById('liveCheckbox') as HTMLInputElement;
        eventType === 'live' ? checkbox2.checked = true : checkbox2.checked = false;

    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        localStorage.setItem("youtubesearch", terms);
    }, [terms]);

    const submitForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        fetchVideos(terms, eventType);
    }

    const changeTerms = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setTerms(event.target.value);
    };

    const fetchVideos = (searchTerms: string, eventType: string) => {
        if (isOnlyMusic) {
            if (!searchTerms.includes("music")) {
                searchTerms = searchTerms + " music";
            }
        }

        axios
            .get(`/api/videos?terms=${searchTerms}&eventType=${eventType}`)
            .then((data) => {
                setIsError(false);
                processData(data.data.items);
                if (settings) {
                    settings.scrollTo({ top: 520, behavior: 'smooth' });
                }
            })
            .catch((err) => {
                console.log('Err', err);
                setIsError(true);
            })
    };

    const processData = (data: any) => {
        let processed: any = [];
        data.forEach(video => {
            processed.push({
                live: video.snippet.liveBroadcastContent,
                videoId: video.id.videoId,
                thumbnail: video.snippet.thumbnails.high.url,
                title: video.snippet.title.replace(' &amp;', ''),
                channelTitle: video.snippet.channelTitle
            });
        })
        setVideos(processed);
    }

    const selectVideo = (id: string) => {
        changeBackground(id);
    }

    const chooseSuggestion = (e, term) => {
        e.preventDefault();
        setTerms(term);
        // fetchVideos(term, eventType);
    }

    const radioChangeHandler = (e: any) => {
        e.target.checked ? setIsOnlyMusic(true) : setIsOnlyMusic(false);
        setVideos([]);
    };

    const checboxChangeHandler = (e: any) => {
        e.target.checked ? setEventType('live') : setEventType('completed');
        setVideos([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchTitle}>Search YouTube</div>
            <div className={styles.formsWrapper}>
                <form className={styles.checkboxWrapper} onChange={(e: any) => radioChangeHandler(e)}>
                    <input className={styles.checkbox} type="checkbox" id="musicCheckbox" name="filter" value="Music Only" defaultChecked />
                    <label className={styles.checkboxLabel} htmlFor="musicCheckbox">Music Only</label>
                </form>
                <form className={styles.checkboxWrapper} onChange={(e: any) => checboxChangeHandler(e)}>
                    <input className={styles.checkbox} type="checkbox" id="liveCheckbox" name="live" value="Live" defaultChecked />
                    <label className={styles.checkboxLabel} htmlFor="liveCheckbox">Live Stream</label>
                </form>
            </div>
            <div className={styles.suggestionWrapper}>
                <span className={styles.text}>Suggestions:</span>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Lo-Fi')}>Lo-Fi</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Jazz')}>Jazz</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Soft Pop')}>Soft Pop</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Anime')}>Anime</button>
                <button className={styles.suggestionBtn} onClick={(e: any) => chooseSuggestion(e, 'Video Game')}>Video Game</button>
            </div>
            <form className={styles.form} onSubmit={(e: any) => submitForm(e)}>
                <input
                    type="text"
                    value={terms}
                    className={styles.searchInput}
                    placeholder="Lofi, Study, Cafe, Jazz, Anime, etc."
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
                {videos.map((video: any) => {
                    return (
                        <div className={styles.videoResult} key={video.videoId} onClick={() => selectVideo(video.videoId)}>
                            <div className={styles.imgWrapper}>
                                {video.live === 'live' && <span className={styles.liveIndicator}>◉ LIVE</span>}
                                <img className={styles.thumbnail} src={video.thumbnail} />
                            </div>
                            <div className={styles.textWrapper}>
                                <span className={styles.title}>{video.title}</span>
                                <span className={styles.channel}>{video.channelTitle}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default YouTubeSearch;