import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { userImg } from '~/Images';
import axios from 'axios';
const cx = classNames.bind(styles);
function AdminHeader() {
    const navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem('user')).id;
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/user/userInfo/${id}`)
            .then((res) => {
                setUser(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p className={cx('title-admin')}>Dashboard</p>
            </div>
            <div className={cx('content')}>
                <div className={cx('back')} onClick={() => navigate('/')}>
                    <span className={cx('icon-back')}>
                        <FontAwesomeIcon icon={faHouse} />
                    </span>
                    <p className={cx('text')}>Website</p>
                </div>
                <div className={cx('admin')}>
                    <div className={cx('avata')}>
                        {user.image ? (
                            <img className={cx('img')} src={`http://localhost:4000/src/${user.image}`} alt="avata" />
                        ) : (
                            <img className={cx('img')} src={userImg} alt="avata" />
                        )}
                    </div>
                    <p className={cx('text')}>{user.userName}</p>
                </div>
            </div>
        </div>
    );
}
export default AdminHeader;
