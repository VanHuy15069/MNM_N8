import classNames from 'classnames/bind';
import styles from './AdminSideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AdminSideBar() {
    return (
        <div className={cx('wrapper')}>
            <NavLink to={'/admin'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faRectangleList} />
                    </span>
                    <p className={cx('text')}>Thống Kê</p>
                </div>
            </NavLink>
        </div>
    );
}
export default AdminSideBar;
