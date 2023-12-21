import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { faHeadphones, faIcons, faMusic } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function SideBar() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-logo')}>
                <Link to={'/'}>
                    <div className={cx('logo')}></div>
                </Link>
            </div>
            <div className={cx('menu')}>
                <NavLink to={'/'} end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCircleDot} />
                        </span>
                        <p className={cx('text')}>Khám Phá</p>
                    </div>
                </NavLink>
                {/* <NavLink to={'/library'} end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faHeadphones} />
                        </span>
                        <p className={cx('text')}>Thư Viện</p>
                    </div>
                </NavLink> */}
                <NavLink to={'/rating'} end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faMusic} />
                        </span>
                        <p className={cx('text')}>BXH Nhạc Mới</p>
                    </div>
                </NavLink>
                <NavLink to={'/admin'} end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faIcons} />
                        </span>
                        <p className={cx('text')}>Xu Hướng</p>
                    </div>
                </NavLink>
            </div>
            {/* {!user && (
                <div className={cx('btn')}>
                    <button className={cx('btn-login')} onClick={() => navigate('/login')}>
                        Đăng Nhập
                    </button>
                </div>
            )} */}
        </div>
    );
}
export default SideBar;
