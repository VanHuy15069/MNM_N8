import classNames from 'classnames/bind';
import styles from './TopicPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListMusic from '~/components/ListMusic/ListMusic';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import SingerRandomItem from '~/components/SingerRandomItem/SingerRandomItem';
const cx = classNames.bind(styles);
function TopicPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const params = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState({});
    const [newMusic, setNewMusic] = useState([]);
    const [hotSongs, setHotSongs] = useState([]);
    const [singers, setSingers] = useState([]);
    const [suggestMusic, setSuggestMusic] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/topic/getOnly/${params.id}`)
            .then((res) => setTopic(res.data.response))
            .catch(() => navigate('/error'));
    }, [navigate, params.id]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/topic/getOnly/${params.id}`, {
                params: {
                    limit: limit,
                    name: 'createdAt',
                    sort: 'DESC',
                },
            })
            .then((res) => setNewMusic(res.data.response.musicInfo))
            .catch(() => navigate('/error'));
    }, [navigate, params.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/topic/getOnly/${params.id}`, {
                params: {
                    limit: 15,
                    name: 'views',
                    sort: 'DESC',
                },
            })
            .then((res) => setHotSongs(res.data.response.musicInfo))
            .catch(() => navigate('/error'));
    }, [navigate, params.id]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/singer/getByTopic/${params.id}`, {
                params: {
                    limit: limit,
                },
            })
            .then((res) => setSingers(res.data.response))
            .catch(() => navigate('/error'));
    }, [navigate, params.id]);
    useEffect(() => {
        if (user) {
            let limit = 5;
            if (window.innerWidth <= 1231) limit = 4;
            axios
                .get('http://localhost:4000/api/music/randomMusic', {
                    params: {
                        limit: limit,
                        userId: user.id,
                        topicId: params.id,
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
                {topic.image && <img src={`http://localhost:4000/src/${topic.image}`} alt="" />}
            </div>
            <div className={cx('container')}>
                <div className={cx('list')}>
                    <ListMusic title={'Mới Nhất'} music={newMusic} />
                </div>
                <div className={cx('list')}>
                    <div className={cx('title')}>Hot songs</div>
                    <div className={cx('hot-songs')}>
                        {hotSongs.map((song, index) => {
                            return (
                                <div className={cx('item')} key={index}>
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
                    <div className={cx('title')}>Nghệ sĩ</div>
                    <div className={cx('hot-songs')}>
                        {singers.map((singer, index) => {
                            return (
                                <div className={cx('item-singer')} key={index}>
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
export default TopicPage;
