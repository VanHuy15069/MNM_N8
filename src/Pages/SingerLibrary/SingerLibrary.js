import classNames from 'classnames/bind';
import styles from './SingerLibrary.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SingerRandomItem from '~/components/SingerRandomItem/SingerRandomItem';
const cx = classNames.bind(styles);
function SingerLibrary() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [singers, setSingers] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/follow/getSinger/${user.id}`)
            .then((res) => {
                setSingers(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [user.id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('content')}>Nghệ sĩ</h3>
            </div>
            <div className={cx('list-singer')}>
                {singers.map((singer, index) => {
                    return (
                        <div key={index} className={cx('item')}>
                            <SingerRandomItem singer={singer.singerInfo} key={index} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default SingerLibrary;
