import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCompactDisc, faMusic, faStreetView } from '@fortawesome/free-solid-svg-icons';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import ListSinger from '~/components/ListSinger/ListSinger';
import MusicItemSearch from '~/components/MusicItemSearch/MusicItemSearch';
import music from '~/GetAll';
const cx = classNames.bind(styles);
function SearchPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    const [singers, setSingers] = useState([]);
    const [name, setName] = useState('views');
    const [action, setAction] = useState({
        all: true,
        music: false,
        singer: false,
    });
    let limit = 5;
    if (window.innerWidth <= 1231) limit = 4;
    useEffect(() => {
        const songResult = music.filter((song) => song.musicName.includes(params.key));
        const singerResut = music.filter((singer) => singer.singerName.includes(params.key));
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

        setMusics(songResult);
        setSingers(listSort);
    }, [params.key, navigate, name]);
    const handleAll = () => {
        setAction({ all: true, music: false, singer: false });
        setName('views');
    };
    const handleMusic = () => {
        setAction({ all: false, music: true, singer: false });
        setName('createdAt');
    };
    const handleSinger = () => {
        setAction({ all: false, music: false, singer: true });
    };
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('menu')}>
                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <h3>Kết Qủa Tìm Kiếm</h3>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('menu-item', { action: action.all })} onClick={handleAll}>
                            Tất cả
                        </div>
                        <div className={cx('menu-item', { action: action.music })} onClick={handleMusic}>
                            Bài hát
                        </div>
                        <div className={cx('menu-item', { action: action.singer })} onClick={handleSinger}>
                            Nghệ sĩ
                        </div>
                    </div>
                </div>
            </nav>
            <div className={cx('container')}>
                {action.all && (
                    <div className={cx('all')}>
                        {musics.length === 0 && singers.length === 0 ? (
                            <div className={cx('no-item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCompactDisc} />
                                </span>
                                <p>Không có kết quả được tìm thấy</p>
                            </div>
                        ) : (
                            <div className={cx('all-key')}>
                                {musics.length > 0 && (
                                    <div className={cx('content')}>
                                        <div className={cx('title')}>Nổi bật</div>
                                        <div className={cx('list-music')}>
                                            {musics.slice(0, 3).map((music, index) => {
                                                return (
                                                    <div className={cx('music-item')} key={index}>
                                                        <MusicItemSearch music={music} list={musics} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {musics.length > 0 && (
                                    <div className={cx('item-all')}>
                                        <div className={cx('title')}>
                                            <div className={cx('text')}>Bài Hát</div>
                                            <div className={cx('navigation')} onClick={handleMusic}>
                                                <p>Tất cả</p>
                                                <span className={cx('icon-arrow')}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('list-music')}>
                                            {musics.slice(0, 6).map((music, index) => {
                                                return (
                                                    <div className={cx('item')} key={index}>
                                                        <MusicOfSinger music={music} list={musics} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {singers.length > 0 && (
                                    <div className={cx('item-all')}>
                                        <div className={cx('title')}>
                                            <div className={cx('text')}>Nghệ sĩ</div>
                                            <div className={cx('navigation')} onClick={handleSinger}>
                                                <p>Tất cả</p>
                                                <span className={cx('icon-arrow')}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </span>
                                            </div>
                                        </div>
                                        <ListSinger singer={singers.slice(0, 5)} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {action.music && (
                    <div className={cx('musics')}>
                        {musics.length > 0 ? (
                            <div className={cx('wrap')}>
                                <div className={cx('title')}>Bài hát</div>
                                <div className={cx('music')}>
                                    {musics.map((music, index) => {
                                        return <MusicOfSinger key={index} music={music} list={musics} time />;
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('no-item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faMusic} />
                                </span>
                                <p>Không có bài hát được tìm thấy</p>
                            </div>
                        )}
                    </div>
                )}
                {action.singer && (
                    <div className={cx('singers')}>
                        {singers.length > 0 ? (
                            <div className={cx('wrap')}>
                                <div className={cx('title')}>Nghệ sĩ</div>
                                <div className={cx('singer')}>
                                    <ListSinger singer={singers} />
                                </div>
                            </div>
                        ) : (
                            <div className={cx('no-item')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faStreetView} />
                                </span>
                                <p>Không có nghệ sĩ được tìm thấy</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
export default SearchPage;
