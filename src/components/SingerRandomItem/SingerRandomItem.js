import classNames from 'classnames/bind';
import styles from './SingerRandomItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function SingerRandomItem({ singer, control = true }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [follow, setFollow] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    const [render, setRender] = useState(false);
    const [isRender, setIsRender] = useContext(Context);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Link to={`/singer/${singer.singerId}`}>
                <div className={cx('avata')} onClick={handleClick}>
                    <img className={cx('img')} src={singer.singerImage} alt="" />
                </div>
            </Link>
            <div className={cx('info')}>
                <Link to={`/singer/${singer.singerId}`}>
                    <div className={cx('name')} onClick={handleClick}>
                        {singer.singerName}
                    </div>
                </Link>
                <div className={cx('follow')}>
                    {singer.follow < 1000 ? singer.follow : (singer.follow / 1000).toFixed(1) + 'K'} quan tâm
                </div>
            </div>
            {control && (
                <div className={cx('btn')}>
                    {isFollow ? (
                        <button className={cx('follow-btn', 'followed')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faShuffle} />
                            </span>
                            Góc nhạc
                        </button>
                    ) : (
                        <button className={cx('follow-btn')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </span>
                            Quan tâm
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
export default SingerRandomItem;
