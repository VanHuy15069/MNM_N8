import classNames from 'classnames/bind';
import styles from './PlayIcon.module.scss';
const cx = classNames.bind(styles);
function PlayIcon() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('col', 'col-1')}></div>
            <div className={cx('col', 'col-2')}></div>
            <div className={cx('col', 'col-3')}></div>
            <div className={cx('col', 'col-4')}></div>
        </div>
    );
}
export default PlayIcon;
