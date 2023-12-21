import classNames from 'classnames/bind';
import styles from './BoxMSG.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function BoxMSG({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
        </div>
    );
}
export default BoxMSG;
