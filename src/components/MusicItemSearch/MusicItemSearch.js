import classNames from 'classnames/bind';
import styles from './MusicItemSearch.module.scss';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlay, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '~/Provider/Provider';
import PlayIcon from '../PlayIcon/PlayIcon';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicItemSearch({ music, list }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    const handleAddSong = (music) => {
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
            className={cx('wrap-music', {
                active: music.id === songId && isPlay,
            })}
            onClick={() => handleAddSong(music)}
        >
            <div className={cx('img')}>
                <img src={music.image} alt="" />
                <div className={cx('overlay')}>
                    {music.id === songId && isPlay ? (
                        <div className={cx('play')} onClick={() => setIsPlay(false)}>
                            <PlayIcon />
                        </div>
                    ) : (
                        <span className={cx('pause')} onClick={() => setIsPlay(true)}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    )}
                </div>
            </div>
            <div className={cx('info')}>
                <p className={cx('music-title')}>Bài hát</p>
                <p className={cx('music-name')}>{music.musicName}</p>
                <p
                    className={cx('singer-name')}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/singer/${music.singerId}`);
                    }}
                >
                    {music.singerName}
                </p>
            </div>
            <div className={cx('action')}>
                <div className={cx('action-icon')}>
                    {isFavorite ? (
                        <span className={cx('icon-item', 'added')}>
                            <FontAwesomeIcon icon={heartSolid} />
                        </span>
                    ) : (
                        <span className={cx('icon-item')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    )}
                </div>
                <div className={cx('action-icon')}>
                    <span className={cx('icon-item')} onClick={handleDownLoad}>
                        <FontAwesomeIcon icon={faDownload} />
                    </span>
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
export default MusicItemSearch;
