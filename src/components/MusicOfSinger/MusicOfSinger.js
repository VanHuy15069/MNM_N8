import classNames from 'classnames/bind';
import styles from './MusicOfSinger.module.scss';
import { useNavigate } from 'react-router-dom';
import { Context } from '~/Provider/Provider';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import { saveAs } from 'file-saver';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicOfSinger({ music, time = false, favorite = false, index, list, hotSong = false }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isHeart, setIsHeart] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId] = useContext(Context);
    const formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const handleLoad = (e) => {
        const audio = e.target;
        const audioDuration = audio.duration;
        if (!isNaN(audioDuration)) {
            setMinute(Math.floor(audioDuration / 60));
            setSecond(Math.round(audioDuration % 60));
        }
    };
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    const handleAddSong = () => {
        const newList = [...list];
        const index = list.indexOf(music);
        const afterList = newList.slice(index);
        newList.splice(index, newList.length - index);
        const listMusic = afterList.concat(newList);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    const handleDownLoad = (e) => {
        e.stopPropagation();
        const src = music.link;
        const fileName = `${music.musicName}.mp3`;
        saveAs(src, fileName);
    };
    return (
        <div
            className={cx('wrapper', { curentSong: songId === music.id, favorite: favorite, hotSong: hotSong })}
            onClick={handleAddSong}
        >
            {music.link && <audio src={music.link} onLoadedMetadata={handleLoad} />}
            {index && (
                <span className={cx('number', { one: index === 1, two: index === 2, three: index === 3 })}>
                    {index}
                </span>
            )}
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('music-avata')}>
                        <div className={cx('image')}>
                            <img src={music.image} alt="" />
                        </div>
                        <div className={cx('music-info')}>
                            <div className={cx('music-name')}>
                                <div className={cx('name')}>{music.musicName}</div>
                                {music.vip && <div className={cx('vip')}>Premium</div>}
                            </div>
                            <div
                                className={cx('singer', 'link-singer')}
                                onClick={(e) => {
                                    navigate(`/singer/${music.singerId}`);
                                    e.stopPropagation();
                                }}
                            >
                                {music.singerName}
                            </div>
                        </div>
                    </div>
                    {favorite && (
                        <div className={cx('heart')}>
                            {isHeart ? (
                                <span className={cx('icon', 'added')}>{<FontAwesomeIcon icon={heartSolid} />}</span>
                            ) : (
                                <span className={cx('icon')}>{<FontAwesomeIcon icon={faHeart} />}</span>
                            )}
                        </div>
                    )}
                    <div className={cx('duration')}>
                        {minute >= 10 ? minute : '0' + minute}:{second >= 10 ? second : '0' + second}
                    </div>

                    <div className={cx('action')}>
                        {isHeart ? (
                            <span className={cx('icon', 'added')}>{<FontAwesomeIcon icon={heartSolid} />}</span>
                        ) : (
                            <span className={cx('icon')}>{<FontAwesomeIcon icon={faHeart} />}</span>
                        )}
                        <span className={cx('icon')} onClick={handleDownLoad}>
                            <FontAwesomeIcon icon={faDownload} />
                        </span>
                    </div>
                </div>
            </div>
            {showMSG && (
                <div
                    className={cx('msg')}
                    onClick={(e) => {
                        setShowMSG(false);
                        e.stopPropagation();
                    }}
                >
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
        </div>
    );
}
export default MusicOfSinger;
