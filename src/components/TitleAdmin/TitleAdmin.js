import classNames from 'classnames/bind';
import styles from './TitleAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function TitleAdmin({ icon, title, add = false, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                <h2 className={cx('text')}>{title}</h2>
            </div>
            {add && (
                <div className={cx('add')} onClick={onClick}>
                    <span className={cx('add-icon')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </div>
            )}
        </div>
    );
}
export default TitleAdmin;
