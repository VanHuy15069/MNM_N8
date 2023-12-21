import classNames from 'classnames/bind';
import styles from './BoxUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCrown, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { userImg } from '~/Images';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '~/Provider/Provider';
import BoxMSG from '../BoxMSG/BoxMSG';
import axios from 'axios';
const cx = classNames.bind(styles);
function BoxUser({ user }) {
    const navigate = useNavigate();
    const [, setIsLogin] = useContext(Context);
    const [image, setImage] = useState(userImg);
    const [showMSG, setShowMSG] = useState(false);
    useEffect(() => {
        if (user.image) setImage(`http://localhost:4000/src/${user.image}`);
    }, [user]);
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    const handleLogout = () => {
        setIsLogin(false);
        navigate('/');
        localStorage.removeItem('user');
        localStorage.removeItem('listMusic');
        window.location.reload();
    };
    const handleUpgrade = () => {
        if (user) {
            axios
                .patch(`http://localhost:4000/api/user/upgrade/${user.id}`)
                .then((res) => {
                    setShowMSG(true);
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-wrapper')}>
                <div className={cx('user')}>
                    <Link to={`/user/${user.id}`}>
                        <div className={cx('avata')}>
                            <img src={image} alt="" />
                        </div>
                    </Link>
                    <div className={cx('info')}>
                        <div className={cx('user-name')}>
                            <p className={cx('name')}>{user.fullName}</p>
                            {user.vip && (
                                <span className={cx('icon-vip')}>
                                    <FontAwesomeIcon icon={faCrown} />
                                </span>
                            )}
                        </div>
                        {user.vip ? (
                            <div className={cx('box')}>Premium</div>
                        ) : (
                            <div className={cx('box', 'basic')}>Basic</div>
                        )}
                    </div>
                </div>
                {!user.vip && (
                    <div className={cx('upgrate')} onClick={handleUpgrade}>
                        Nâng cấp tài khoản
                    </div>
                )}
            </div>
            <div className={cx('line')}></div>
            <div className={cx('user-setting')}>
                <div className={cx('title')}>Cá nhân</div>
                <Link to={`/user`}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <p className={cx('text')}>Thông tin cá nhân</p>
                    </div>
                </Link>
                <Link to={'/library'}>
                    <div className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faHeadphones} />
                        </span>
                        <p className={cx('text')}>Thư viện của bạn</p>
                    </div>
                </Link>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('menu-item')} onClick={handleLogout}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
                <p className={cx('text')}>Đăng xuất</p>
            </div>
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>Nâng cấp tài khoản thành công</BoxMSG>
                </div>
            )}
        </div>
    );
}
export default BoxUser;
