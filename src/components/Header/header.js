import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeftLong,
    faArrowRightLong,
    faDownload,
    faGear,
    faMagnifyingGlass,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Context } from '~/Provider/Provider';
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userImg } from '~/Images';
import SettingBox from '../SettingBox/SettingBox';
import BoxUser from '../BoxUser/BoxUser';
import Tippy from '@tippyjs/react/headless';
import MusicItem from '../MusicItem/MusicItem';
import axios from 'axios';
import SingerItem from '../SingerItem/SingerItem';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const backgroundRef = useRef();
    const ref1 = useRef();
    const ref2 = useRef();
    const inputRef = useRef();
    const [, , renderAvata] = useContext(Context);
    const [avata, setAvata] = useState(userImg);
    const [showBox, setShowBox] = useState(false);
    const [showBoxUser, setShowBoxUser] = useState(false);
    const [showBoxLogin, setShowBoxLogin] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [musics, setMusics] = useState([]);
    const [singers, setSingers] = useState([]);
    const debounce = useDebounce(searchValue, 700);
    const [showResult, setShowResult] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user && user.image) {
            setAvata(`http://localhost:4000/src/${user.image}`);
        }
        // eslint-disable-next-line
    }, [renderAvata]);
    useEffect(() => {
        setShowBoxUser(false);
        setShowBox(false);
        setShowResult(false);
    }, [location]);
    const handleShow = () => {
        if (user) {
            setShowBoxUser(!showBoxUser);
        } else {
            setShowBoxLogin(!showBoxLogin);
        }
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };
    useEffect(() => {
        if (!debounce) {
            setMusics([]);
            setSingers([]);
            return;
        } else {
            const songResult = music.filter((song) => song.musicName.includes(debounce));
            const singerResut = music.filter((singer) => singer.singerName.includes(debounce));
            const listSinger = [];
            singerResut.forEach((item) => {
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
            songResult.sort((a, b) => {
                if (a.id > b.id) return -1;
                if (a.id < b.id) return 1;
                return 0;
            });
            listSort.sort((a, b) => {
                if (a.follow > b.follow) return -1;
                if (a.follow < b.follow) return 1;
                return 0;
            });
            setMusics(songResult.slice(0, 5));
            setSingers(listSort.slice(0, 5));
        }
    }, [debounce, navigate]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref1.current && !ref1.current.contains(event.target)) setShowBox(false);
            if (ref2.current && !ref2.current.contains(event.target)) {
                setShowBoxUser(false);
                setShowBoxLogin(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            if (backgroundRef.current) {
                if (window.scrollY > 10) {
                    backgroundRef.current.style.backgroundColor = 'rgba(23,15,35,0.7)';
                } else {
                    backgroundRef.current.style.backgroundColor = 'transparent';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);
    const handleClear = () => {
        setShowResult(false);
        setSearchValue('');
        inputRef.current.focus();
    };
    const handleSearch = () => {
        if (searchValue) {
            navigate(`/search/${searchValue}`);
            inputRef.current.blur();
        }
    };
    const handleEnter = (e) => {
        if (e.keyCode === 13) handleSearch();
    };
    return (
        <div className={cx('wrapper')} ref={backgroundRef}>
            <div className={cx('left')}>
                <div className={cx('navigation')}>
                    <span className={cx('icon-prev')} onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </span>
                    <span className={cx('icon-next')} onClick={() => navigate(+1)}>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </span>
                </div>
                <Tippy
                    interactive
                    visible={showResult && debounce && (musics.length > 0 || singers.length > 0)}
                    onClickOutside={() => setShowResult(false)}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <div className={cx('box-result')}>
                                {musics.length > 0 && <p className={cx('title')}>Bài hát</p>}
                                {musics.map((music, index) => {
                                    return (
                                        <MusicItem
                                            key={index}
                                            id={music.id}
                                            music={music.musicName}
                                            singer={music.singerName}
                                            image={music.image}
                                        />
                                    );
                                })}
                                {singers.length > 0 && musics.length > 0 && <div className={cx('line')}></div>}
                                {singers.length > 0 && <p className={cx('title')}>Nghệ sĩ</p>}
                                {singers.map((singer, index) => {
                                    return (
                                        <SingerItem
                                            key={index}
                                            singer={singer}
                                            image={singer.singerImage}
                                            onClick={() => navigate(`/singer/${singer.singerId}`)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <button className={cx('icon-search')} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
                            value={searchValue}
                            ref={inputRef}
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                            onKeyDown={handleEnter}
                        />
                        {searchValue && (
                            <span className={cx('icon-clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        )}
                    </div>
                </Tippy>
            </div>
            <div className={cx('right')}>
                <div className={cx('download')}>
                    <span className={cx('icon-download')}>
                        <FontAwesomeIcon icon={faDownload} />
                    </span>
                    <p>Tải bản Windows</p>
                </div>
                <div className={cx('icon-setting')} ref={ref1}>
                    <span
                        className={cx('setting')}
                        onClick={() => {
                            setShowBox(!showBox);
                            setShowBoxUser(false);
                            setShowBoxLogin(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <div className={cx('setting-box')}>{showBox && <SettingBox />}</div>
                </div>
                <div className={cx('avata')} ref={ref2}>
                    <img className={cx('user-image')} src={avata} alt="user" onClick={handleShow} />
                    {showBoxUser && user && (
                        <div className={cx('box-user')}>
                            <BoxUser user={user} />
                        </div>
                    )}
                    {/* {showBoxLogin && !user && (
                        <div className={cx('box-login')}>
                            <div className={cx('btn-login')}>
                                <div className={cx('btn')} onClick={() => navigate('/login')}>
                                    Đăng nhập
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
export default Header;
