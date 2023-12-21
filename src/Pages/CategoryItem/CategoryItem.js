import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListMusic from '~/components/ListMusic/ListMusic';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import SingerRandomItem from '~/components/SingerRandomItem/SingerRandomItem';
const cx = classNames.bind(styles);
function CategoryItem() {
    const user = JSON.parse(localStorage.getItem('user'));
    const params = useParams();
    const navigate = useNavigate();
    const [newMusics, setNewMusics] = useState([]);
    const [hotSongs, setHotSongs] = useState([]);
    const [singers, setSingers] = useState([]);
    const [category, setCategory] = useState({});
    const [suggestMusic, setSuggestMusic] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/category/getOne/${params.id}`)
            .then((res) => setCategory(res.data.response))
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/music/getByCategory/${params.id}`, {
                params: {
                    limit: limit,
                    name: 'createdAt',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setNewMusics(res.data.response.rows);
            })
            .catch((err) => console.log(err));
    }, [params.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getByCategory/${params.id}`, {
                params: {
                    limit: 15,
                    name: 'views',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setHotSongs(res.data.response.rows);
            })
            .catch((err) => console.log(err));
    }, [params.id]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/singer/getByCategory/${params.id}`, {
                params: {
                    limit: limit,
                },
            })
            .then((res) => setSingers(res.data.response))
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    useEffect(() => {
        if (user) {
            let limit = 5;
            if (window.innerWidth <= 1231) limit = 4;
            axios
                .get('http://localhost:4000/api/music/randomMusic', {
                    params: {
                        limit: limit,
                        userId: user.id,
                        categoryId: params.id,
                    },
                })
                .then((res) => setSuggestMusic(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [params.id, navigate]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                {category.image && <img src={`http://localhost:4000/src/${category.image}`} alt="" />}
            </div>
            <div className={cx('container')}>
                <div className={cx('list')}>
                    <ListMusic music={newMusics} title={'Mới Nhất'} />
                </div>
                <div className={cx('list')}>
                    <div className={cx('title')}>Hot songs</div>
                    <div className={cx('hot-songs')}>
                        {hotSongs.map((song, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <MusicOfSinger music={song} list={hotSongs} hotSong />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {user && suggestMusic.length > 0 && (
                    <div className={cx('list')}>
                        <ListMusic title={'Gợi ý cho bạn'} music={suggestMusic} />
                    </div>
                )}
                <div className={cx('list')}>
                    <div className={cx('title')}>Nghệ Sĩ</div>
                    <div className={cx('list-singer')}>
                        {singers.map((singer, index) => {
                            return (
                                <div key={index} className={cx('item-singer')}>
                                    <SingerRandomItem singer={singer} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoryItem;
