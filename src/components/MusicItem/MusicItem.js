import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function MusicItem({ image, music, singer, id }) {
    return (
        <Link to={`/song/${id}`}>
            <div className={cx('wrapper')}>
                <img className={cx('img')} src={image} alt="" />
                <div className={cx('content')}>
                    <div className={cx('music')}>{music}</div>
                    <div className={cx('singer')}>{singer}</div>
                </div>
            </div>
        </Link>
    );
}
export default MusicItem;
