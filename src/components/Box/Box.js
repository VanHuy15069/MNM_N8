import classNames from 'classnames/bind';
import styles from './Box.module.scss';
const cx = classNames.bind(styles);
function Box({ children, onclickOK, onclickCancle, type, check, title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-box')}>
                <div className={cx('box')}>
                    <h2 className={cx('title')}>{title}</h2>
                    <div className={cx('content')}>{children}</div>
                    <div className={cx('control')}>
                        <button className={cx('btn', 'btn-ok')} type={type} onClick={onclickOK}>
                            Xác nhận
                        </button>
                        <button className={cx('btn', 'btn-cancle')} onClick={onclickCancle}>
                            Hủy bỏ
                        </button>
                    </div>
                </div>
                {check && <p className={cx('msg')}>{check}</p>}
            </div>
        </div>
    );
}
export default Box;
