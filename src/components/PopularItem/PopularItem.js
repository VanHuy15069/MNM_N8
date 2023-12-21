import classNames from 'classnames/bind';
import styles from './PopularItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function PopularItem({ image, desc, bold = false, link }) {
    return (
        <div className={cx('singer-item')}>
            <Link to={link}>
                <div className={cx('avata')}>
                    <img className={cx('img')} src={image} alt="" />
                </div>
            </Link>
            <div className={cx('name', { bold })}>{desc}</div>
        </div>
    );
}
export default PopularItem;
