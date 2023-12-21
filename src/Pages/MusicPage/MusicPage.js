import classNames from 'classnames/bind';
import styles from './MusicPage.module.scss';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPause, faPlay, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { faHeart, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import PlayIcon from '~/components/PlayIcon/PlayIcon';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import PoperWrapper from '~/components/PoperWrapper/PoperWrapper';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import SingerRandomItem from '~/components/SingerRandomItem/SingerRandomItem';
import MusicItemHome from '~/components/MusicItemHome/MusicItemHome';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function MusicPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [musics, setMusics] = useState({});
    const [musicOfSinger, setMusicOfSinger] = useState([]);
    const [countFavorite, setCountFavorite] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [listMusic, setListMusic] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [reRender, setReRender] = useState(false);
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
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
        const songResult = music.filter((song) => song.id == params.id);
        const list = music.filter(
            (song) => song.topic === songResult[0].topic || song.theLoai === songResult[0].theLoai,
        );
        const singerResut = music.filter((singer) => singer.singerId === songResult[0].singerId);
        singerResut.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
        setMusicOfSinger(singerResut);
        const index = list.indexOf(...songResult);
        list.splice(index, 1);
        list.unshift(...songResult);
        setMusics(...songResult);
        setListMusic(list);
        // eslint-disable-next-line
    }, [params.id, navigate]);
    const handleAddSong = () => {
        if (songId === musics.id) {
            setIsPlay(!isPlay);
        } else setIsPlay(true);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    const handleDownLoad = (e) => {
        e.stopPropagation();
        const src = musics.link;
        const fileName = `${musics.musicName}.mp3`;
        saveAs(src, fileName);
    };
    const handleAddMusic = (music) => {
        const newList = [...musicOfSinger];
        const index = newList.indexOf(music);
        const afterList = newList.slice(index);
        newList.splice(index, newList.length - index);
        const listMusic = afterList.concat(newList);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('music-single')}>
                    <div className={cx('image', { active: isPlay && musics.id === songId })} onClick={handleAddSong}>
                        {musics.image && <img src={musics.image} alt="" />}
                        <div className={cx('overlay')}>
                            {isPlay && musics.id === songId ? (
                                <div className={cx('play')}>
                                    <PlayIcon />
                                </div>
                            ) : (
                                <span className={cx('pause')}>
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('info')}>
                            <h3 className={cx('music-name')}>{musics.musicName}</h3>
                            <div className={cx('singer')}>
                                <Link to={`/singer/${musics.singerId}`} className={cx('singer-name')}>
                                    {musics.singerName}
                                </Link>
                            </div>
                            <p className={cx('count-favorite')}>
                                {musics.favorite > 1000
                                    ? (musics.favorite / 1000).toFixed(1) + 'K' + ' người yêu thích'
                                    : musics.favorite + 'Người yêu thích'}
                            </p>
                        </div>
                        <div className={cx('wrap-btn')}>
                            {isPlay && musics.id === songId ? (
                                <button className={cx('button')} onClick={() => setIsPlay(false)}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPause} />
                                    </span>
                                    <p>Tạm dừng</p>
                                </button>
                            ) : (
                                <button className={cx('button')} onClick={handleAddSong}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </span>
                                    <p>Phát bài hát</p>
                                </button>
                            )}
                            <div className={cx('action')}>
                                <div className={cx('wrap-icon')}>
                                    {isFavorite ? (
                                        <span className={cx('heart', 'added')}>
                                            <FontAwesomeIcon icon={heartSolid} />
                                        </span>
                                    ) : (
                                        <span className={cx('heart')}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    )}
                                </div>
                                <div className={cx('wrap-icon')} onClick={handleDownLoad}>
                                    <span className={cx('icon-download')}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('list-music')}>
                    <div className={cx('header-list')}>
                        <p>Bài hát</p>
                        <p>Thời gian</p>
                    </div>
                    {listMusic.map((music, index) => {
                        return <MusicOfSinger key={index} music={music} list={listMusic} />;
                    })}
                </div>
            </div>
            {musics.singerId && (
                <div className={cx('listOfSinger')}>
                    <div className={cx('title')}>Nhạc của {musics.singerName}</div>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <SingerRandomItem singer={musics} control={false} />
                        </div>
                        {musicOfSinger.map((song, index) => {
                            return (
                                <div className={cx('item')} key={index}>
                                    <MusicItemHome song={song} onClick={() => handleAddMusic(song)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
export default MusicPage;
