import classNames from 'classnames/bind';
import styles from './TopNewMusic.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function TopNewMusic() {
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    useEffect(() => {
        const list = [];
        music.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
        music.forEach((song) => {
            if (list.length < 100) {
                list.push(song);
            }
        });
        list.sort((a, b) => {
            if (a.view > b.view) return -1;
            if (a.view < b.view) return 1;
            return 0;
        });
        setMusics(list);
    }, [navigate]);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>BXH Nhạc Mới</h3>
            <div className={cx('container')}>
                {musics.map((music, index) => {
                    return <MusicOfSinger key={index} music={music} index={index + 1} list={musics} />;
                })}
            </div>
        </div>
    );
}
export default TopNewMusic;
