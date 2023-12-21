import classNames from 'classnames/bind';
import styles from './SingerItem.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import music from '~/GetAll';

const cx = classNames.bind(styles);
function SingerItem({ image, singer, onClick }) {
    const navigate = useNavigate();
    const [follows, setFollows] = useState();
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('img')} src={image} alt="" />
            <div className={cx('content')}>
                <div className={cx('singer')}>{singer.singerName}</div>
                <div className={cx('follow')}>
                    <div className={cx('text')}>Ca sĩ</div>
                    <span className={cx('dot')}>•</span>
                    <div className={cx('text')}>{singer.follow} quan tâm</div>
                </div>
            </div>
        </div>
    );
}
export default SingerItem;
