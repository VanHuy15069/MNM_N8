import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { saveAs } from 'file-saver';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HeaderProfile from '~/components/HeaderProfile/HeaderProfile';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHeart as heartSolid, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import ListSinger from '~/components/ListSinger/ListSinger';
import PlayIcon from '~/components/PlayIcon/PlayIcon';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import PoperWrapper from '~/components/PoperWrapper/PoperWrapper';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function Singer() {
    const params = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [msg, setMsg] = useState('');
    const [singer, setSinger] = useState({});
    const [singerRandom, setSingerRandom] = useState([]);
    const [newMusic, setNewMusic] = useState({});
    const [outstandingMusic, setOutstandingMusic] = useState([]);
    const [follow, setFollow] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    const [render, setRender] = useState(false);
    let formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
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
        if (newMusic) {
            if (user && newMusic.id) {
                axios
                    .get('http://localhost:4000/api/favorite/isFavorite', {
                        params: {
                            userId: user.id,
                            musicId: newMusic.id,
                        },
                    })
                    .then((res) => setIsFavorite(res.data.response))
                    .catch(() => navigate('/error'));
            }
        }
        // eslint-disable-next-line
    }, [navigate, renderFavorite, newMusic]);
    useEffect(() => {
        music.forEach((item) => {
            if (item.singerId == params.id) {
                setSinger(item);
                return;
            }
        });
    }, [navigate, params.id]);
    useEffect(() => {
        music.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
        });
        music.forEach((song) => {
            if (song.singerId == params.id) {
                console.log(song);
                setNewMusic(song);
                return 0;
            }
        });
    }, [params.id, navigate]);
    useEffect(() => {
        const list = [];
        music.sort((a, b) => {
            if (a.view > b.view) return -1;
            if (a.view < b.view) return 1;
            return 0;
        });
        music.forEach((song) => {
            if (song.singerId == params.id && list.length <= 6) {
                list.push(song);
            }
        });
        setOutstandingMusic(list);
    }, [params.id, navigate]);
    const handleAddSongNew = (song) => {
        const newList = [...outstandingMusic];
        const index = outstandingMusic.findIndex((obj) => obj.id === song.id);
        if (index !== -1) {
            const afterList = newList.slice(index);
            newList.splice(index, newList.length - index);
            const listMusic = afterList.concat(newList);
            const musicsNotVip = listMusic.filter((item) => item.vip === false);
            localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
        } else {
            const musicsNotVip = newList.filter((item) => item.vip === false);
            musicsNotVip.unshift(song);
            localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
        }
        setIsRender(!isRender);
    };
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: newMusic.id })
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
                    musicId: newMusic.id,
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
        const src = newMusic.link;
        const fileName = `${newMusic.musicName}.mp3`;
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
            <div className={cx('header')}>
                <HeaderProfile
                    singer
                    image={singer.singerImage}
                    isFollow={isFollow}
                    name={singer.singerName}
                    follows={singer.follow}
                />
            </div>
            <div className={cx('container')}>
                {newMusic && Object.keys(newMusic).length > 0 && (
                    <div className={cx('new')}>
                        <div className={cx('title')}>Mới phát hành</div>
                        <div
                            className={cx('content', { active: newMusic.id === songId && isPlay })}
                            onClick={() => handleAddSongNew(newMusic)}
                        >
                            <div className={cx('image-box')}>
                                {newMusic.image && <img className={cx('img')} src={newMusic.image} alt="" />}
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
                                        {songId === newMusic.id && isPlay ? (
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
                            <div className={cx('music-info')}>
                                <div className={cx('name')}>{newMusic.musicName}</div>
                                <p className={cx('singer')}>{newMusic.singerName}</p>
                            </div>
                        </div>
                    </div>
                )}
                {outstandingMusic.length > 0 && (
                    <div className={cx('outstanding')}>
                        <div className={cx('heading')}>
                            <div className={cx('outstanding-title')}>Bài hát nổi bật</div>
                            <Link to={`/singer/${params.id}/song`}>
                                <div className={cx('navigation')}>
                                    <p className={cx('text')}>Tất cả</p>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('list-music')}>
                            {outstandingMusic.map((music, index) => {
                                return (
                                    <div key={index} className={cx('item')}>
                                        <MusicOfSinger music={music} list={outstandingMusic} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('info')}>
                <div className={cx('title')}>Về {singer.singerName}</div>
                <div className={cx('content-desc')}>
                    {singer.image && (
                        <div className={cx('image')}>
                            <img className={cx('img')} src={singer.singerImage} alt="" />
                        </div>
                    )}
                    <div className={cx('right-content')}>
                        <div className={cx('desc')}>{singer.description}</div>
                        <div className={cx('follow')}>{singer.follow}</div>
                        <p className={cx('desc')}>Người quan tâm</p>
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
            {showBox && <PoperWrapper onClickHide={() => setShowBox(false)} onClickBtn={handleUpgrade} />}
        </div>
    );
}
export default Singer;
