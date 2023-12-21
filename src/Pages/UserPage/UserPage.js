import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import HeaderProfile from '~/components/HeaderProfile/HeaderProfile';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { userImg } from '~/Images';
const cx = classNames.bind(styles);
function UserPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [, , renderAvata, setRenderAvata] = useContext(Context);
    const navigate = useNavigate();
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [imgUpload, setImgUpload] = useState();
    const [changed, setChanged] = useState(false);
    const [image, setImage] = useState();
    const [check, setCheck] = useState('');
    const [active, setActive] = useState({
        infor: true,
        avata: false,
        password: false,
    });
    const [data, setData] = useState({
        fullName: user.fullName,
        email: user.email,
    });
    const { fullName, email } = data;
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
    });
    const { oldPassword, newPassword, checkPassword } = password;
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setChanged(true);
    };
    const handleChangePassword = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleChangeInfo = () => {
        axios
            .put(`http://localhost:4000/api/user/${user.id}`, data)
            .then((res) => {
                setShowMSG(true);
                setMsg('Thay đổi thông tin thành công');
                localStorage.setItem('user', JSON.stringify(res.data.response));
            })
            .catch(() => navigate('/error'));
    };
    const handleChangeAvata = () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            axios
                .patch(`http://localhost:4000/api/user//updateImg/${user.id}`, formData)
                .then((res) => {
                    setShowMSG(true);
                    setMsg('Thay đổi ảnh đại diện thành công');
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                    setRenderAvata(!renderAvata);
                })
                .catch(() => navigate('/error'));
        }
    };
    const handleUpdatePassword = () => {
        if (password.newPassword.length < 8) {
            setCheck('Mật khẩu phải trên 8 ký tự');
        } else if (password.newPassword !== password.checkPassword) {
            setCheck('Mật khẩu xác nhận không đúng');
        } else {
            axios
                .patch(`http://localhost:4000/api/user//updatePassword/${user.id}`, password)
                .then((res) => {
                    if (res.data.err === 3) {
                        setCheck('Mật khẩu cũ chưa chính xác');
                    }
                    if (res.data.err === 0) {
                        setCheck('');
                        setShowMSG(true);
                        setMsg('Thay đổi mật khẩu thành công');
                        localStorage.setItem('user', JSON.stringify(res.data.response));
                        setPassword({
                            oldPassword: '',
                            newPassword: '',
                            checkPassword: '',
                        });
                    }
                })
                .catch(() => navigate('/error'));
        }
    };
    useEffect(() => {
        if (!user.image) {
            setImgUpload(userImg);
        } else setImgUpload(`http://localhost:4000/src/${user.image}`);
    }, [user.image]);
    useEffect(() => {
        return () => URL.revokeObjectURL(imgUpload);
    }, [imgUpload]);
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderProfile image={user.image} name={user.fullName} vip={user.vip} />
            </div>
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <div
                        className={cx('item', { active: active.infor })}
                        onClick={() =>
                            setActive({
                                infor: true,
                                avata: false,
                                password: false,
                            })
                        }
                    >
                        Thông tin cá nhân
                    </div>
                    <div
                        className={cx('item', { active: active.avata })}
                        onClick={() =>
                            setActive({
                                infor: false,
                                avata: true,
                                password: false,
                            })
                        }
                    >
                        Ảnh đại diện
                    </div>
                    <div
                        className={cx('item', { active: active.password })}
                        onClick={() =>
                            setActive({
                                infor: false,
                                avata: false,
                                password: true,
                            })
                        }
                    >
                        Đổi mật khẩu
                    </div>
                </div>
                <div className={cx('content')}>
                    {active.infor && (
                        <div className={cx('info')}>
                            <div className={cx('row')}>
                                <div className={cx('text')}>Tên người dùng:</div>
                                <input
                                    className={cx('text-input')}
                                    type="text"
                                    value={fullName}
                                    onChange={handleChange}
                                    name="fullName"
                                />
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('text')}>Email:</div>
                                <input
                                    className={cx('text-input')}
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    name="email"
                                />
                            </div>
                            {changed ? (
                                <div className={cx('button')} onClick={handleChangeInfo}>
                                    Thay đổi thông tin
                                </div>
                            ) : (
                                <div className={cx('button', 'old')}>Thay đổi thông tin</div>
                            )}
                        </div>
                    )}
                    {active.avata && (
                        <div className={cx('box-avata')}>
                            <div className={cx('avata')}>
                                <div className={cx('upload')}>
                                    <img className={cx('img')} src={imgUpload} alt="" />
                                </div>
                                <input type="file" id="file" className={cx('inputfile')} onChange={handleChangeImage} />
                                <label htmlFor="file">
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </span>
                                    <span>Chọn file</span>
                                </label>
                            </div>
                            <div className={cx('button')} onClick={handleChangeAvata}>
                                Thay đổi ảnh đại diện
                            </div>
                        </div>
                    )}
                    {active.password && (
                        <div className={cx('box-password')}>
                            <div className={cx('row')}>
                                <div className={cx('text')}>Mật khẩu cũ:</div>
                                <input
                                    className={cx('text-input')}
                                    type="password"
                                    name="oldPassword"
                                    onChange={handleChangePassword}
                                    value={oldPassword}
                                />
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('text')}>Mật khẩu mới:</div>
                                <input
                                    className={cx('text-input')}
                                    type="password"
                                    name="newPassword"
                                    onChange={handleChangePassword}
                                    value={newPassword}
                                />
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('text')}>Xác nhận mật khẩu:</div>
                                <input
                                    className={cx('text-input')}
                                    type="password"
                                    name="checkPassword"
                                    onChange={handleChangePassword}
                                    value={checkPassword}
                                />
                            </div>
                            <div className={cx('button')} onClick={handleUpdatePassword}>
                                Thay đổi mật khẩu
                            </div>
                            {check && <p className={cx('check')}>{check}</p>}
                        </div>
                    )}
                </div>
            </div>
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
        </div>
    );
}
export default UserPage;
