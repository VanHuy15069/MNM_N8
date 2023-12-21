import classNames from 'classnames/bind';
import styles from './MusicItemSmall.module.scss';
import { saveAs } from 'file-saver';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '~/Provider/Provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicItemSmall({ music, onClick }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [, , , , renderFavorite, setRenderFavorite, songId] = useContext(Context);
    const navigate = useNavigate();
    const [isHeart, setIsHeart] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [showBox, setShowBox] = useState(false);
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
        if (user !== null) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: music.id,
                    },
                })
                .then((res) => setIsHeart(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [navigate, music.id, renderFavorite]);
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: music.id })
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
                    musicId: music.id,
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
        const src = `http://localhost:4000/src/${music.musicLink}`;
        const fileName = `${music.musicName}.mp3`;
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
        <div className={cx('wrapper', { curentSong: music.id === songId })} onClick={onClick}>
            <div className={cx('container')}>
                <img className={cx('img')} src={music.image} alt="" />
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <p className={cx('name')}>{music.musicName}</p>
                        {music.vip && <div className={cx('vip')}>Premium</div>}
                    </div>
                    <p className={cx('text')} onClick={(e) => e.stopPropagation()}>
                        <Link to={`/singer/${music.singerId}`} className={cx('singer')}>
                            {music.singerName}
                        </Link>
                    </p>
                </div>
            </div>
            <div className={cx('action')}>
                {isHeart ? (
                    <span className={cx('icon', 'added')} onClick={handleUnFavorite}>
                        {<FontAwesomeIcon icon={heartSolid} />}
                    </span>
                ) : (
                    <span className={cx('icon')} onClick={handleAddFavorite}>
                        {<FontAwesomeIcon icon={faHeart} />}
                    </span>
                )}
                <span className={cx('icon')} onClick={handleDownLoad}>
                    <FontAwesomeIcon icon={faDownload} />
                </span>
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
export default MusicItemSmall;
