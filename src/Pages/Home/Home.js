import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';
import ListMusic from '~/components/ListMusic/ListMusic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MusicItemSmall from '~/components/MusicItemSmall/MusicItemSmall';
import PopularItem from '~/components/PopularItem/PopularItem';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import PoperWrapper from '~/components/PoperWrapper/PoperWrapper';
import music from '~/GetAll';

const musicNew = [];
music.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
});
music.forEach((song) => {
    if (musicNew.length < 15) {
        musicNew.push(song);
    }
});

const cx = classNames.bind(styles);
function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [numberSlide, setNumberSlide] = useState(3);
    const [muiscLimit, setMusicLimit] = useState(12);
    const [sliers, setSliders] = useState([]);
    const [topMusics, setTopMusics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [firsTopic, setFirstTopic] = useState([]);
    const [secondTopic, setSecondTopic] = useState([]);
    const [thirtTopic, setThirtTopic] = useState([]);
    const [foreTopic, setForeTopic] = useState([]);
    const [newMusicAll, setNewMusicAll] = useState([]);
    const [newMusicVN, setNewMusicVN] = useState([]);
    const [newMusics, setNewMusics] = useState([...musicNew]);
    const [newMusicQT, setNewMusicQT] = useState([]);
    const [singerPopular, setSingerPopular] = useState([]);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [showBox, setShowBox] = useState(false);
    const [isRender, setIsRender] = useContext(Context);
    const [list, setList] = useState([]);
    const [active, setActive] = useState({
        all: true,
        vn: false,
        qt: false,
    });
    useEffect(() => {
        const listSinger = [];
        music.forEach((item) => {
            listSinger.push(item.singerId);
        });
        const listSort = [];
        const list = new Set(listSinger);
        for (const value of list) {
            const singers = music.filter((item) => item.singerId === value);
            if (singers.length > 0) {
                listSort.push(singers[0]);
            } else {
                listSort.push(singers);
            }
        }
        listSort.sort((a, b) => {
            if (a.follow > b.follow) return -1;
            if (a.follow < b.follow) return 1;
            return 0;
        });
        setList(listSort.slice(0, 5));
    }, []);
    useEffect(() => {
        const musicNew = [];
        music.forEach((song) => {
            if (musicNew.length < 15) {
                musicNew.push(song);
            }
        });
        setNewMusicAll(musicNew);
    }, []);
    useEffect(() => {
        const musicNew = [];
        music.forEach((song) => {
            if (musicNew.length < 15 && song.quocGia === 'Việt Nam') {
                musicNew.push(song);
            }
        });
        setNewMusicVN(musicNew);
    }, []);
    useEffect(() => {
        const musicNew = [];
        music.forEach((song) => {
            if (musicNew.length < 15 && song.quocGia !== 'Việt Nam') {
                musicNew.push(song);
            }
        });
        setNewMusicQT(musicNew);
    }, []);
    useEffect(() => {
        music.sort((a, b) => {
            if (a.view > b.view) return -1;
            if (a.view < b.view) return 1;
            return 0;
        });
        const topMS = [];
        topMS.push(music[0]);
        topMS.push(music[1]);
        topMS.push(music[2]);
        topMS.push(music[3]);
        topMS.push(music[4]);
        setTopMusics(topMS);
    }, []);
    useEffect(() => {
        const first = [];
        music.forEach((song) => {
            if (song.topic === 'Thư giãn' && first.length < 5) {
                first.push(song);
            }
        });
        setFirstTopic(first);
    }, []);
    useEffect(() => {
        const first = [];
        music.forEach((song) => {
            if (song.topic === 'Tình yêu' && first.length < 5) {
                first.push(song);
            }
        });
        setSecondTopic(first);
    }, []);
    useEffect(() => {
        const first = [];
        music.forEach((song) => {
            if (song.topic === 'Sôi động' && first.length < 5) {
                first.push(song);
            }
        });
        setThirtTopic(first);
    }, []);
    useEffect(() => {
        const first = [];
        music.forEach((song) => {
            if (song.topic === 'Giai điệu buồn' && first.length < 5) {
                first.push(song);
            }
        });
        setForeTopic(first);
    }, []);
    const getAll = () => {
        setNewMusics(newMusicAll);
        setActive({ all: true, vn: false, qt: false });
    };
    const getVN = () => {
        setNewMusics(newMusicVN);
        setActive({ all: false, vn: true, qt: false });
    };
    const getQT = () => {
        setNewMusics(newMusicQT);
        setActive({ all: false, vn: false, qt: true });
    };
    const handleAddSong = (music) => {
        const newList = [...newMusics];
        const index = newList.indexOf(music);
        const afterList = newList.slice(index);
        newList.splice(index, newList.length - index);
        const listMusic = afterList.concat(newList);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                {sliers && (
                    <Swiper
                        slidesPerView={numberSlide}
                        spaceBetween={20}
                        loop={true}
                        speed={900}
                        rewind={false}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="wrapper-slider"
                    >
                        <SwiperSlide>
                            <img
                                className={cx('img-slider')}
                                src={require('../../Images/maxresdefault (1).jpg')}
                                alt=""
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                className={cx('img-slider')}
                                src={require('../../Images/hinh-nen-lol-yasumo.jpg')}
                                alt=""
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className={cx('img-slider')} src={require('../../Images/seraphine-kda.jpg')} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                className={cx('img-slider')}
                                src={require('../../Images/maxresdefault (3).jpg')}
                                alt=""
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                className={cx('img-slider')}
                                src={require('../../Images/chill-la-gi-co-y-nghia-gi-cac-truong-hop-dung-chill-dung-nhat.webp')}
                                alt=""
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                className={cx('img-slider')}
                                src={require('../../Images/maxresdefault (2).jpg')}
                                alt=""
                            />
                        </SwiperSlide>
                    </Swiper>
                )}
            </div>
            <div className={cx('list-music')}>
                <ListMusic title={'Có thể bạn muốn nghe'} music={topMusics} />
            </div>
            <div className={cx('top-music')}>
                <h3 className={cx('title')}>Mới phát hành</h3>
                <div className={cx('control')}>
                    <div className={cx('button')}>
                        <button className={cx('btn', { active: active.all })} onClick={getAll}>
                            Tất cả
                        </button>
                        <button className={cx('btn', { active: active.vn })} onClick={getVN}>
                            Việt Nam
                        </button>
                        <button className={cx('btn', { active: active.qt })} onClick={getQT}>
                            Quốc Tế
                        </button>
                    </div>
                    <div className={cx('navigation')} onClick={() => navigate('/newMusic')}>
                        <p className={cx('text')}>Tất cả</p>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </div>
                </div>
                <div className={cx('list')}>
                    {newMusics.map((music, index) => {
                        return (
                            <div key={index} className={cx('item')}>
                                <MusicItemSmall music={music} onClick={() => handleAddSong(music)} />
                            </div>
                        );
                    })}
                </div>
            </div>
            {firsTopic.length > 0 && (
                <div className={cx('list-music')}>
                    <ListMusic title={firsTopic[0].topic} music={firsTopic} />
                </div>
            )}

            {secondTopic.length > 0 && (
                <div className={cx('list-music')}>
                    <ListMusic title={secondTopic[0].topic} music={secondTopic} />
                </div>
            )}
            {thirtTopic.length > 0 && (
                <div className={cx('list-music')}>
                    <ListMusic title={thirtTopic[0].topic} music={thirtTopic} />
                </div>
            )}
            {foreTopic.length > 0 && (
                <div className={cx('list-music')}>
                    <ListMusic title={foreTopic[0].topic} music={foreTopic} />
                </div>
            )}
            {list.length > 0 && (
                <div className={cx('singer')}>
                    <div className={cx('title')}>Nghệ Sĩ Thịnh Hành</div>
                    <div className={cx('list-singer')}>
                        {list.map((item, index) => {
                            return (
                                <PopularItem
                                    key={index}
                                    image={item.singerImage}
                                    desc={`Top những bài hát hay nhất của ${item.singerName}`}
                                    link={`/singer/${item.singerId}/song`}
                                />
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
export default Home;
