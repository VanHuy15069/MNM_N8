import classNames from 'classnames/bind';
import styles from './SettingBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faBrush, faCircleInfo, faLock, faPhone, faShield } from '@fortawesome/free-solid-svg-icons';
import { faAdversal } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function SettingBox() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </span>
                        <p className={cx('text')}>Trình phát nhạc</p>
                    </div>
                    <span className={cx('icon-2')}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                </div>

                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faBrush} />
                        </span>
                        <p className={cx('text')}>Giao diện</p>
                    </div>
                    <span className={cx('icon-2')}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                </div>
                {user && user.isAdmin && (
                    <Link to={'/admin'}>
                        <div className={cx('menu-item')}>
                            <div className={cx('item-right')}>
                                <span className={cx('icon-1')}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <p className={cx('text')}>Quản lý</p>
                            </div>
                            <span className={cx('icon-2')}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </div>
                    </Link>
                )}
                <div className={cx('line')}></div>

                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </span>
                        <p className={cx('text')}>Giới thiệu</p>
                    </div>
                </div>
                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <p className={cx('text')}>Liên hệ</p>
                    </div>
                </div>
                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faAdversal} />
                        </span>
                        <p className={cx('text')}>Quảng cáo</p>
                    </div>
                </div>
                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faFileLines} />
                        </span>
                        <p className={cx('text')}>Thỏa thuận sử dụng</p>
                    </div>
                </div>
                <div className={cx('menu-item')}>
                    <div className={cx('item-right')}>
                        <span className={cx('icon-1')}>
                            <FontAwesomeIcon icon={faShield} />
                        </span>
                        <p className={cx('text')}>Chính sách bảo mật</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SettingBox;
