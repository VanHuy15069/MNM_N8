import classNames from 'classnames/bind';
import styles from './ListSinger.module.scss';
import SingerRandomItem from '../SingerRandomItem/SingerRandomItem';
const cx = classNames.bind(styles);
function ListSinger({ singer, title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('list')}>
                {singer.map((item, index) => {
                    return (
                        <div className={cx('item')} key={index}>
                            <SingerRandomItem singer={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ListSinger;
