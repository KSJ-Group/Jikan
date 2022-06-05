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
    const { changeBackground } = useContext(BackgroundContext);

    useEffect(() => {
        let search = localStorage.getItem("youtubesearch");
        if (search) {
          setTerms(search);
        } else {
          setTerms("");
        }

        if (settings) {
            settings.scrollTo({top: 450, behavior: 'smooth'});
          }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
          isInitialMount.current = false;
        }
        localStorage.setItem("youtubesearch", terms);
    }, [terms]);

    const submitForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        fetchVideos(terms);
      }

    const changeTerms = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setTerms(event.target.value);
    };

    const fetchVideos = (searchTerms: string) => {
        axios
            .get(`/api/videos?terms=${searchTerms}`)
            .then((data) => {
                processData(data.data.items);
                if (settings) {
                    settings.scrollTo({top: 520, behavior: 'smooth'});
                }
            })
            .catch((err) => {
                console.log('Err', err);
            })
    };  

    const processData = (data: any) => {
        let processed: any = [];
        data.forEach(video => {
            processed.push({
                videoId: video.id.videoId,
                thumbnail: video.snippet.thumbnails.high.url,
                title: video.snippet.title.replace(' &amp;', ''),
                channelTitle: video.snippet.channelTitle
            });
        })
        console.log(processed);
        setVideos(processed);
    }

    const selectVideo = (id: string) => {
        console.log('ID:', id);
        changeBackground(id);
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchTitle}>Search YouTube</div>
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
                {videos.map((video: any )=> {
                    return(
                        <div className={styles.videoResult} key={video.videoId} onClick={() => selectVideo(video.videoId)}>
                            <div className={styles.imgWrapper}>
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