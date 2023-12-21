import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faDownload,
    faForwardStep,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faVolumeXmark,
    faHeart as heartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, memo, useEffect, useCallback, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import { faCirclePause, faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import { saveAs } from 'file-saver';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);

function Audio() {
    const user = JSON.parse(localStorage.getItem('user'));
    const playList = JSON.parse(localStorage.getItem('listMusic'));
    const navigate = useNavigate();
    const [render, setRender, , , renderFavorite, setRenderFavorite, , setSongId, isPlay, setIsPlay] =
        useContext(Context);
    const audioRef = useRef();
    const volumRef = useRef();
    const musicRef = useRef();
    const [listMusic, setListMusic] = useState([]);
    const [isVolum, setIsVolum] = useState(true);
    const [currentSong, setCurrentSong] = useState({});
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isViewed, setIsViewed] = useState(false);
    const [viewLoop, setViewLoop] = useState(false);
    const [isHeart, setIsHeart] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [showBox, setShowBox] = useState(false);
    const handleLoad = (e) => {
        const audio = e.target;
        const audioDuration = audio.duration;
        if (!isNaN(audioDuration)) {
            setMinute(Math.floor(audioDuration / 60));
            setSecond(Math.round(audioDuration % 60));
            setCurrentTime(audio.currentTime);
        }
        musicRef.current.autoplay = true;
        setTimeout(() => {
            if (musicRef.current.paused) setIsPlay(false);
            else setIsPlay(true);
        }, 100);
    };
    const handleInputSong = useCallback(() => {
        musicRef.current.currentTime = (audioRef.current.value * musicRef.current.duration) / 100;
        if (!isPlay) musicRef.current.pause();
    }, [isPlay]);
    const handleUpdate = useCallback(() => {
        if (musicRef.current.duration) {
            const progressPercent = (musicRef.current.currentTime / musicRef.current.duration) * 100;
            audioRef.current.value = progressPercent;
            setCurrentTime(musicRef.current.currentTime);
            if (musicRef.current.currentTime >= musicRef.current.duration - 0.5) {
                setViewLoop(!viewLoop);
            }
        }
    }, [viewLoop]);
    const handlePlay = () => {
        setIsPlay(true);
        setIsViewed(true);
        musicRef.current.play();
    };
    const handlePuse = () => {
        setIsPlay(false);
        musicRef.current.pause();
    };
    const handleMute = () => {
        setIsVolum(false);
        volumRef.current.value = 0;
        musicRef.current.volume = 0;
    };
    const handleOnVolum = () => {
        setIsVolum(true);
        volumRef.current.value = 1;
        musicRef.current.volume = 1;
    };
    const handleVolum = () => {
        const volumValue = volumRef.current.value;
        volumRef.current.value = volumValue;
        if (volumValue > 0) setIsVolum(true);
        else setIsVolum(false);
        musicRef.current.volume = volumRef.current.value;
    };
    const handleNext = () => {
        const songIndex = listMusic.indexOf(currentSong);
        setIsViewed(true);
        if (listMusic.length === 1) {
            setRender(!render);
        } else {
            if (!isRandom) {
                if (songIndex === listMusic.length - 1) {
                    setCurrentSong(listMusic[0]);
                } else setCurrentSong(listMusic[songIndex + 1]);
            } else {
                let randomIndex = 0;
                do {
                    randomIndex = Math.floor(Math.random() * listMusic.length);
                } while (randomIndex === songIndex);
                setCurrentSong(listMusic[randomIndex]);
            }
        }
    };
    const handlePrev = () => {
        setIsViewed(true);
        const songIndex = listMusic.indexOf(currentSong);
        if (songIndex === 0) setCurrentSong(listMusic[listMusic.length - 1]);
        else setCurrentSong(listMusic[songIndex - 1]);
    };
    const handleEnd = () => {
        if (!isLoop) handleNext();
    };
    const handleActiceLoop = () => {
        setIsLoop(true);
    };
    const handleUnLoop = () => {
        setIsLoop(false);
    };
    const handleActiveRandom = () => {
        setIsRandom(true);
    };
    const handleUnRandom = () => {
        setIsRandom(false);
    };
    const handleAddFavorite = () => {
        axios
            .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: currentSong.id })
            .then(() => {
                setRenderFavorite(!renderFavorite);
                setShowMSG(true);
                setMsg('Đã thêm bài hát vào thư viện');
            })
            .catch(() => navigate('/error'));
    };
    const handleDownLoad = () => {
        const src = currentSong.link;
        const fileName = `${currentSong.musicName}.mp3`;
        saveAs(src, fileName);
    };
    const handleUnFavorite = () => {
        axios
            .delete('http://localhost:4000/api/favorite/delete', {
                params: {
                    userId: user.id,
                    musicId: currentSong.id,
                },
            })
            .then(() => {
                setRenderFavorite(!renderFavorite);
                setShowMSG(true);
                setMsg('Đã xóa bài hát khỏi vào thư viện');
            })
            .catch(() => navigate('/error'));
    };
    const handleUpgrade = () => {
        if (user) {
            axios
                .patch(`http://localhost:4000/api/user/upgrade/${user.id}`)
                .then((res) => {
                    setShowBox(false);
                    setShowMSG(true);
                    setMsg('Tài khoản đã được nâng cấp');
                    console.log(res.data.response);
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    useEffect(() => {
        if (musicRef.current) {
            if (isPlay) musicRef.current.play();
            else musicRef.current.pause();
        }
    }, [isPlay, render]);
    useEffect(() => {
        if (playList) {
            setCurrentSong(playList[0]);
            setListMusic(playList);
        }
        // eslint-disable-next-line
    }, [render]);
    useEffect(() => {
        if (Object.keys(currentSong).length > 0 && user !== null) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: currentSong.id,
                    },
                })
                .then((res) => setIsHeart(res.data.response))
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line
    }, [currentSong, navigate, renderFavorite]);
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 6000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    useEffect(() => {
        setSongId(currentSong.id);
    }, [currentSong, setSongId]);
    return (
        <div className={cx('wrapper')}>
            {currentSong.link && (
                <audio
                    src={currentSong.link}
                    ref={musicRef}
                    onLoadedMetadata={handleLoad}
                    onTimeUpdate={handleUpdate}
                    loop={isLoop}
                    onEnded={handleEnd}
                />
            )}
            <div className={cx('conatiner')}>
                <div className={cx('music-info')}>
                    <div className={cx('image')} onClick={() => navigate(`/song/${currentSong.id}`)}>
                        {currentSong.image && <img src={currentSong.image} alt="" />}
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('music')} onClick={() => navigate(`/song/${currentSong.id}`)}>
                            {currentSong.musicName}
                        </div>
                        {currentSong.singerId && (
                            <div className={cx('singer')} onClick={() => navigate(`/singer/${currentSong.singerId}`)}>
                                {currentSong.singerName}
                            </div>
                        )}
                    </div>
                    <div className={cx('icon-media')}>
                        {user && (
                            <div>
                                {isHeart ? (
                                    <div className={cx('heart')} onClick={handleUnFavorite}>
                                        <span className={cx('heart-icon', 'added')}>
                                            <FontAwesomeIcon icon={heartSolid} />
                                        </span>
                                    </div>
                                ) : (
                                    <div className={cx('heart')} onClick={handleAddFavorite}>
                                        <span className={cx('heart-icon')}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={cx('download')} onClick={handleDownLoad}>
                            <span className={cx('downLoad-icon')}>
                                <FontAwesomeIcon icon={faDownload} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('control')}>
                    <div className={cx('btn')}>
                        {isRandom ? (
                            <span className={cx('icon', 'active-icon')} onClick={handleUnRandom}>
                                <FontAwesomeIcon icon={faShuffle} />
                            </span>
                        ) : (
                            <span className={cx('icon')} onClick={handleActiveRandom}>
                                <FontAwesomeIcon icon={faShuffle} />
                            </span>
                        )}
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faBackwardStep} onClick={handlePrev} />
                        </span>
                        {!isPlay ? (
                            <span className={cx('icon', 'play')} onClick={handlePlay}>
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </span>
                        ) : (
                            <span className={cx('icon', 'play')} onClick={handlePuse}>
                                <FontAwesomeIcon icon={faCirclePause} />
                            </span>
                        )}
                        <span className={cx('icon')} onClick={handleNext}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </span>
                        {isLoop ? (
                            <span className={cx('icon', 'active-icon')} onClick={handleUnLoop}>
                                <FontAwesomeIcon icon={faRepeat} />
                            </span>
                        ) : (
                            <span className={cx('icon')} onClick={handleActiceLoop}>
                                <FontAwesomeIcon icon={faRepeat} />
                            </span>
                        )}
                    </div>
                    <div className={cx('input')}>
                        <p>
                            {Math.floor(currentTime / 60) >= 10
                                ? Math.floor(currentTime / 60)
                                : '0' + Math.floor(currentTime / 60)}
                            :
                            {Math.round(currentTime % 60) >= 10
                                ? Math.round(currentTime % 60)
                                : '0' + Math.round(currentTime % 60)}
                        </p>
                        <input
                            className={cx('range')}
                            type="range"
                            defaultValue={0}
                            min={0}
                            max={100}
                            step={0.1}
                            onInput={handleInputSong}
                            ref={audioRef}
                        />
                        <p>
                            {minute >= 10 ? minute : '0' + minute}:{second >= 10 ? second : '0' + second}
                        </p>
                    </div>
                </div>
                <div className={cx('volum')}>
                    {isVolum ? (
                        <span className={cx('icon', 'volum-icon')} onClick={handleMute}>
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        </span>
                    ) : (
                        <span className={cx('icon', 'volum-icon')} onClick={handleOnVolum}>
                            <FontAwesomeIcon icon={faVolumeXmark} />
                        </span>
                    )}
                    <input
                        className={cx('range', 'volum-range')}
                        type="range"
                        defaultValue={100}
                        min={0}
                        max={1}
                        step={0.1}
                        onInput={handleVolum}
                        ref={volumRef}
                    />
                </div>
            </div>
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBox && <PoperWrapper onClickHide={() => setShowBox(false)} onClickBtn={handleUpgrade} />}
        </div>
    );
}
export default memo(Audio);
