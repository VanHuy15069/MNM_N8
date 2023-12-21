import classNames from 'classnames/bind';
import styles from './HeaderProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCrown, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { userImg } from '~/Images';
const cx = classNames.bind(styles);
function HeaderProfile({
    image,
    name,
    follows,
    isFollow = false,
    ClickAddFollows,
    ClickUnFollows,
    singer = false,
    vip = false,
}) {
    const [avata, setAvata] = useState(userImg);
    useEffect(() => {
        if (image) setAvata(image);
    }, [image]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={avata} alt="" />
                <div className={cx('info')}>
                    <div className={cx('avata')}>
                        <img className={cx('avata-img')} src={avata} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-name')}>
                            <h1 className={cx('name')}>{name}</h1>
                            {vip && (
                                <span className={cx('vip')}>
                                    <FontAwesomeIcon icon={faCrown} />
                                </span>
                            )}
                        </div>
                        {singer && (
                            <div className={cx('follows')}>
                                <p className={cx('quantity')}>{follows} người quan tâm</p>
                                {isFollow ? (
                                    <button className={cx('btn')} onClick={ClickUnFollows}>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <p className={cx('text')}>Đã quan tâm</p>
                                    </button>
                                ) : (
                                    <button className={cx('btn')} onClick={ClickAddFollows}>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faUserPlus} />
                                        </span>
                                        <p className={cx('text')}>Quan tâm</p>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeaderProfile;
