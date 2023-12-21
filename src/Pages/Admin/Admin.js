import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from '~/components/Chart/Chart';
import ChartCircel from '~/components/PieChart/PieChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function Admin() {
    const navigate = useNavigate();
    const date = new Date();
    const [users, setUsers] = useState(0);
    const [musics, setMusics] = useState(0);
    const [singers, setSingers] = useState(0);
    const [api, setApi] = useState('countNation');
    const [data, setData] = useState([]);
    const [topMusics, setTopMusics] = useState([]);
    const [statisticalMuiscs, setStatisticalMusics] = useState([]);
    const [month, setMonth] = useState(date.getMonth() + 1);
    useEffect(() => {
        const list = [];
        music.forEach((item) => {
            list.push(item.singerId);
        });
        const count = new Set(list);
        setSingers(count.size);
    }, []);
    useEffect(() => {
        music.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
        setStatisticalMusics(music.slice(0, 9));
    }, [navigate]);
    useEffect(() => {
        music.sort((a, b) => {
            if (a.view > b.view) return -1;
            if (a.view < b.view) return 1;
            return 0;
        });
        setTopMusics(music.slice(0, 10));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-cart')}>
                <div className={cx('item')}>
                    <div className={cx('cart')}>
                        <h2>{music.length} bài hát</h2>
                    </div>
                </div>
                <div className={cx('item')}>
                    <div className={cx('cart', 'red')}>
                        <h2>{singers} ca sĩ</h2>
                    </div>
                </div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('title')}>
                    <h3>Xu hướng gần đây</h3>
                </div>
                <Chart data={statisticalMuiscs} />
            </div>
            <div className={cx('container')}>
                {/* <div className={cx('pie-chart')}>
                    <div className={cx('header')}>
                        <div
                            className={cx('header-item', { active: api === 'countNation' })}
                            onClick={() => setApi('countNation')}
                        >
                            Quốc gia
                        </div>
                        <div
                            className={cx('header-item', { active: api === 'countTopic' })}
                            onClick={() => setApi('countTopic')}
                        >
                            Chủ đề
                        </div>
                        <div
                            className={cx('header-item', { active: api === 'countCategory' })}
                            onClick={() => setApi('countCategory')}
                        >
                            Thể loại
                        </div>
                    </div>
                    <ChartCircel data={data} />
                </div> */}
                <div className={cx('top-music')}>
                    <h3>Bài hát nổi bật</h3>
                    {topMusics.map((song, index) => {
                        return (
                            <div key={index} className={cx('music-item')}>
                                <div className={cx('info')}>
                                    <img className={cx('img')} src={song.image} alt="" />
                                    <div className={cx('song-info')}>
                                        <p className={cx('music-name')}>{song.musicName}</p>
                                        <p>{song.singerName}</p>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <span className={cx('icon', 'views')}>
                                        <FontAwesomeIcon icon={faHeadphones} />
                                        <p>{song.view}</p>
                                    </span>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>{song.favorite}</p>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Admin;
