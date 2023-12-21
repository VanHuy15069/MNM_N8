import Header from '~/components/Header/header';
import SideBar from '~/components/SideBar/SideBar';
import Audio from '~/components/Audio/Audio';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const listMusic = JSON.parse(localStorage.getItem('listMusic'));
    const [isList, setIsList] = useState(false);
    const [isRender] = useContext(Context);
    useEffect(() => {
        if (listMusic) setIsList(true);
        else setIsList(false);
        // eslint-disable-next-line
    }, [isRender]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <SideBar />
                </div>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Header />
                    </div>
                    <div className={cx('main', { notAudio: !isList })}>{children}</div>
                </div>
            </div>
            {isList && (
                <div className={cx('audio')}>
                    <Audio />
                </div>
            )}
        </div>
    );
}
export default DefaultLayout;
