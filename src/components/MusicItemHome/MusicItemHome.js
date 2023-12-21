import classNames from 'classnames/bind';
import styles from './MusicItemHome.module.scss';
import { saveAs } from 'file-saver';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PlayIcon from '../PlayIcon/PlayIcon';
import BoxMSG from '../BoxMSG/BoxMSG';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicItemHome({ song, onClick }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [, , , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] = useContext(Context);
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
    useEffect(() => {
        if (user) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: song.id,
                    },
                })
                .then((res) => setIsFavorite(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [navigate, song.id, renderFavorite]);
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: song.id })
                .then(() => {
                    setRenderFavorite(!renderFavorite);
                    setShowMSG(true);
                    setMsg('Đã thêm bài hát vào thư viện');
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    const handleUnFavorite = (e) => {
        e.stopPropagation();
        axios
            .delete('http://localhost:4000/api/favorite/delete', {
                params: {
                    userId: user.id,
                    musicId: song.id,
                },
            })
            .then(() => {
                setRenderFavorite(!renderFavorite);
                setShowMSG(true);
                setMsg('Đã xóa bài hát khỏi vào thư viện');
            })
            .catch(() => navigate('/error'));
    };
    const handleDownLoad = (e) => {
        e.stopPropagation();
        const src = `http://localhost:4000/src/${song.musicLink}`;
        const fileName = `${song.musicName}.mp3`;
        saveAs(src, fileName);
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image', { active: songId === song.id && isPlay })} onClick={onClick}>
                <img className={cx('img')} src={song.image} alt="" />
                <div className={cx('overlay')}>
                    <div className={cx('favorite')}>
                        {isFavorite ? (
                            <span className={cx('heart', 'added')} onClick={handleUnFavorite}>
                                <FontAwesomeIcon icon={heartSolid} />
                            </span>
                        ) : (
                            <span className={cx('heart')} onClick={handleAddFavorite}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        )}
                    </div>
                    <div className={cx('play')}>
                        {songId === song.id && isPlay ? (
                            <div className={cx('play-icon')} onClick={() => setIsPlay(false)}>
                                <PlayIcon />
                            </div>
                        ) : (
                            <span className={cx('pause')} onClick={() => setIsPlay(true)}>
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </span>
                        )}
                    </div>
                    <div className={cx('download')} onClick={handleDownLoad}>
                        <FontAwesomeIcon icon={faDownload} />
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <p className={cx('title')} onClick={() => navigate(`/song/${song.id}`)}>
                    {song.musicName}
                </p>
                <Link to={`/singer/${song.singerId}`}>
                    <p className={cx('singer')}>{song.singerName}</p>
                </Link>
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
            {showBox && <PoperWrapper onClickHide={() => setShowBox(false)} onClickBtn={handleUpgrade} />}
        </div>
    );
}
export default MusicItemHome;
