import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import MusicItem from '../MusicItem/MusicItem';
import SingerItem from '../SingerItem/SingerItem';
const cx = classNames.bind(styles);
function Search({ music, singer, ...props }) {
    const handleSinger = (item) => {
        props.onData(item);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {music && (
                    <div className={cx('box')}>
                        <div className={cx('title')}>Bài hát</div>
                        <div className={cx('item-search')}>
                            <MusicItem
                                music={'Anh Huy Đẹp Zai'}
                                singer={'Văn Huy'}
                                image={'https://i.pinimg.com/550x/9c/bc/af/9cbcafccdbd1995937772a047437ceb9.jpg'}
                            />
                        </div>
                    </div>
                )}
                {music && singer && <div className={cx('line')}></div>}
                {singer && (
                    <div className={cx('box')}>
                        <div className={cx('title')}>Ca sĩ</div>
                        {singer.map((item, index) => {
                            return (
                                <div className={cx('item-search')} key={index} onClick={() => handleSinger(item)}>
                                    <SingerItem singer={item} image={`http://localhost:4000/src/${item.image}`} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
export default Search;
