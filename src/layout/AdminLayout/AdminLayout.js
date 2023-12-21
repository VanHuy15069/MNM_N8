import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import AdminHeader from '~/components/AdminHeaderr/AdminHeader';
import AdminSideBar from '~/components/AdminSideBar/AdminSideBar';
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <AdminHeader />
            </div>
            <div className={cx('sideBar')}>
                <AdminSideBar />
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}
export default AdminLayout;
