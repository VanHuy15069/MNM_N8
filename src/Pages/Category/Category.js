import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Image from '~/Images';
import ListMusic from '~/components/ListMusic/ListMusic';
import Card from '~/components/Crad/Card';
const cx = classNames.bind(styles);
function Category() {
    const navigate = useNavigate();
    const [showBtn, setShowBtn] = useState(true);
    const [categories, setCategories] = useState([]);
    const [topics, setTopic] = useState([]);
    const [topicAll, setTopicAll] = useState([]);
    const [idBanner, setIdBanner] = useState([0]);
    const [nations, setNations] = useState([]);
    useEffect(() => {
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get('http://localhost:4000/api/category/getCategory', {
                params: {
                    limit: limit,
                },
            })
            .then((res) => {
                setCategories(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getAll')
            .then((res) => {
                setNations(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        let limit = 8;
        if (window.innerWidth <= 1231) limit = 6;
        axios
            .get('http://localhost:4000/api/topic/getAll', {
                params: {
                    topicLimit: limit,
                },
            })
            .then((res) => {
                setTopic(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/topic/getAll')
            .then((res) => {
                setTopicAll(res.data.response.rows);
                setIdBanner(Math.floor(Math.random() * res.data.response.count));
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    const handleMore = () => {
        setTopic([...topicAll]);
        setShowBtn(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                {topicAll.length > 0 && (
                    <img src={require('../../Images/pngtree-music-festival-picture-image_1012032.jpg')} alt="" />
                )}
            </div>
            <div className={cx('container')}>
                <div className={cx('cards')}>
                    <h3>Nổi bật</h3>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <Card image={Image.topNewMusic} content={'BXH Nhạc Mới'} link={'/rating'} />
                        </div>
                        <div className={cx('item')}>
                            <Card image={Image.top100} content={'Top 100'} link={'/'} />
                        </div>
                        {topicAll.length > 0 && (
                            <div className={cx('item')}>
                                <Card
                                    image={`http://localhost:4000/src/${topicAll[0].image}`}
                                    content={topicAll[0].title}
                                    link={`/topic/${topicAll[0].id}`}
                                />
                            </div>
                        )}
                        {topicAll.length > 0 && (
                            <div className={cx('item')}>
                                <Card
                                    image={`http://localhost:4000/src/${topicAll[topicAll.length - 1].image}`}
                                    content={topicAll[topicAll.length - 1].title}
                                    link={`/topic/${topicAll[topicAll.length - 1].id}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('cards', 'nation')}>
                    <h3>Quốc Gia</h3>
                    <div className={cx('list')}>
                        {nations.map((nation, index) => {
                            if (nation.nationName === 'Trung Quốc') nation.nationName = 'Hoa Ngữ';
                            return (
                                <div key={index} className={cx('item')}>
                                    <Card
                                        image={`http://localhost:4000/src/${nation.image}`}
                                        content={`Nhạc ${nation.nationName}`}
                                        link={`/nation/${nation.id}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('topics')}>
                    <div className={cx('topic-title')}>Tâm Trạng Và Hoạt Động</div>
                    <div className={cx('list-topic')}>
                        {topics.map((topic, index) => {
                            return (
                                <div key={index} className={cx('topic-item')}>
                                    <div className={cx('topic-card')} onClick={() => navigate(`/topic/${topic.id}`)}>
                                        <img
                                            className={cx('topic-img')}
                                            src={`http://localhost:4000/src/${topic.image}`}
                                            alt=""
                                        />
                                        <div className={cx('detail')}>
                                            <h3>{topic.title}</h3>
                                            <div className={cx('image')}>
                                                {topic.musicInfo.map((music, index) => {
                                                    return (
                                                        <div key={index} className={cx('img-music')}>
                                                            <div className={cx('img')}>
                                                                <img
                                                                    src={`http://localhost:4000/src/${music.image}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {showBtn && (
                        <div className={cx('btn')}>
                            <button className={cx('btn-topic')} onClick={handleMore}>
                                Tất cả
                            </button>
                        </div>
                    )}
                </div>
                <div className={cx('list-category')}>
                    {categories.map((category, index) => {
                        return (
                            <ListMusic
                                key={index}
                                title={category.categoryName}
                                music={category.musicInfo}
                                onClick={() => navigate(`/category/${category.id}`)}
                                navigation
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Category;
