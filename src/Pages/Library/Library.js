import classNames from 'classnames/bind';
import styles from './Library.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function Library() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [singers, setSingers] = useState([]);
    const [musics, setMusics] = useState([]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/follow/getSinger/${user.id}`, {
                params: {
                    limit: limit,
                },
            })
            .then((res) => {
                setSingers(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getMusicFavorite/${user.id}`)
            .then((res) => {
                setMusics(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    const favoriteMusic = musics.sort((a, b) => a.musicName.localeCompare(b.musicName));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thư Viện</div>
            <div className={cx('container')}>
                <div className={cx('list-singer')}>
                    {singers.map((singer, index) => {
                        return (
                            <div key={index} className={cx('singer-item')}>
                                <div className={cx('img')}>
                                    <Link to={`/singer/${singer.singerInfo.id}`}>
                                        <img src={`http://localhost:4000/src/${singer.singerInfo.image}`} alt="" />
                                    </Link>
                                </div>
                                <Link to={`/singer/${singer.singerInfo.id}`}>
                                    <div className={cx('singer-name')}>{singer.singerInfo.singerName}</div>
                                </Link>
                            </div>
                        );
                    })}
                    {singers.length > 0 && (
                        <div className={cx('singer-item')}>
                            <div className={cx('box')} onClick={() => navigate('/library/singer')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </div>
                            <div className={cx('singer-name', 'all')}>Xem tất cả</div>
                        </div>
                    )}
                </div>
                <div className={cx('music-favorite')}>
                    <div className={cx('header')}>
                        <p>Bài hát</p>
                        <p>Thời gian</p>
                    </div>
                    <div className={cx('list-music')}>
                        {favoriteMusic.map((music, index) => {
                            return <MusicOfSinger key={index} music={music} list={favoriteMusic} favorite />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Library;
