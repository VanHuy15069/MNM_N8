import classNames from 'classnames/bind';
import styles from './SingerMusic.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function SingerMusic() {
    const params = useParams();
    const navigate = useNavigate();
    const boxRef = useRef();
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Nổi bật');
    const [singer, setSinger] = useState({});
    const [musics, setNewMusics] = useState([]);
    const [sort, setSort] = useState('views');
    useEffect(() => {
        const sing = [];
        music.forEach((item) => {
            if (item.singerId == params.id) {
                sing.push(item);
                return;
            }
        });
        setSinger(...sing);
        console.log(sing);
    }, [navigate, params.id]);
    useEffect(() => {
        const listMusic = music.filter((song) => song.singerId == params.id);
        listMusic.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
        setNewMusics(listMusic);
    }, [params.id, navigate, sort]);
    const handleShowBox = () => {
        setShow(!show);
    };
    const handleSortView = () => {
        setText('Nổi bật');
        setSort('views');
        setShow(false);
    };
    const handleSortCreatedAt = () => {
        setText('Mới nhất');
        setSort('createdAt');
        setShow(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) setShow(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('singer')}>{singer.singerName} - Tất Cả Bài Hát</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <p>Bài hát</p>
                    <p>Thời gian</p>
                </div>
                <div className={cx('list-music')}>
                    {musics.map((music, index) => {
                        return (
                            <div key={index} className={cx('item-music')}>
                                <MusicOfSinger music={music} time list={musics} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default SingerMusic;
