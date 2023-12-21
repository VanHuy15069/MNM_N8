import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [check, setCheck] = useState('');
    const [showMSG, setShowMSG] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [checkPassword, setCheckPassword] = useState('');
    const [data, setData] = useState({
        fullName: '',
        email: '',
        userName: '',
        password: '',
    });
    const { fullName, email, userName, password } = data;
    const handleChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (!data.fullName || !data.email || !data.userName || !data.password) {
            setCheck('Cần nhập đầy đủ thông tin!');
        } else if (data.userName.search(' ') > -1) {
            setCheck('Tên đăng nhập không hợp lệ!');
        } else if (data.password.length < 8) {
            setCheck('Mật khẩu cần tối thiểu 8 ký tự!');
        } else if (data.password !== checkPassword) {
            setCheck('Mật khẩu xác nhận không khớp!');
        } else {
            axios
                .post('http://localhost:4000/api/auth/register', data)
                .then((res) => {
                    if (res.data.err === 2) {
                        setCheck('Tên đăng nhập này đã tồn tại!');
                    } else {
                        setIsLoginForm(true);
                        setShowMSG(true);
                        setCheck('');
                    }
                })
                .catch(() => navigate('/error'));
        }
    };
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    const handleLogin = (e) => {
        e.preventDefault();
        if (!data.userName || !data.password) {
            setCheck('Cần nhập đầy đủ thông tin!');
        } else {
            axios
                .post('http://localhost:4000/api/auth/login', { userName: data.userName, password: data.password })
                .then((res) => {
                    if (res.data.err === 0) {
                        localStorage.setItem('user', JSON.stringify(res.data.response));
                        if (res.data.response.isAdmin) {
                            navigate('/admin');
                        } else {
                            navigate('/');
                        }
                        localStorage.removeItem('listMusic');
                        window.location.reload();
                    } else {
                        setCheck('Tên đăng nhập hoặc mật khẩu không chính xác!');
                    }
                })
                .catch(() => navigate('/error'));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                {isLoginForm ? (
                    <form onSubmit={handleLogin}>
                        <div className={cx('login-box')}>
                            <div className={cx('title')}>FORM ĐĂNG NHẬP</div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    onChange={handleChange}
                                    name="userName"
                                    value={userName}
                                    placeholder="Tên đăng nhập"
                                />
                            </div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    value={password}
                                    placeholder="Mật khẩu"
                                />
                            </div>
                            <p className={cx('text')} onClick={() => setIsLoginForm(false)}>
                                Đăng ký
                            </p>
                            <div className={cx('btn-login')}>
                                <button className={cx('btn')}>ĐĂNG NHẬP</button>
                            </div>
                            {check && <p className={cx('check')}>{check}</p>}
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className={cx('login-box')}>
                            <div className={cx('title')}>FORM ĐĂNG KÝ</div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    value={fullName}
                                    onChange={handleChange}
                                    name="fullName"
                                    type="text"
                                    placeholder="Tên đầy đủ"
                                />
                            </div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    value={email}
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    value={userName}
                                    onChange={handleChange}
                                    name="userName"
                                    type="text"
                                    placeholder="Tên đăng nhập"
                                />
                            </div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    value={password}
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    value={checkPassword}
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </div>
                            <p className={cx('text')} onClick={() => setIsLoginForm(true)}>
                                Đăng nhập
                            </p>
                            <div className={cx('btn-login')}>
                                <button className={cx('btn')} type="submit">
                                    ĐĂNG KÝ
                                </button>
                            </div>
                            {check && <p className={cx('check')}>{check}</p>}
                        </div>
                    </form>
                )}
            </div>
            <div className={cx('back')}>
                <span className={cx('icon')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </div>
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>Đăng ký thành công</BoxMSG>
                </div>
            )}
        </div>
    );
}
export default Login;
