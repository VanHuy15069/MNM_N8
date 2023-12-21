import classNames from 'classnames/bind';
import styles from './BoxDelete.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);
function BoxDelete({ msg, onClickOK, onClickCancle }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <div className={cx('icon')}>
                    <div className={cx('iconX')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                    <p className={cx('text')}>{msg}</p>
                </div>
                <div className={cx('control')}>
                    <button className={cx('btn', 'btn-ok')} onClick={onClickOK}>
                        Xác nhận
                    </button>
                    <button className={cx('btn', 'btn-cancle')} onClick={onClickCancle}>
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BoxDelete;
