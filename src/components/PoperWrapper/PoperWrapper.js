import classNames from 'classnames/bind';
import styles from './PoperWrapper.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function PoperWrapper({ onClickHide, onClickBtn }) {
    return (
        <div className={cx('wrapper')} onClick={onClickHide}>
            <div className={cx('box')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('cancle')} onClick={onClickHide}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faX} />
                    </span>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Dành Cho Tài Khoản VIP</div>
                    <div className={cx('msg')}>Bạn hãy nâng cấp tài khoản PREMIUM để sử dụng tính năng này</div>
                    <div className={cx('button')} onClick={onClickBtn}>
                        Nâng cấp tài khoản
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PoperWrapper;
