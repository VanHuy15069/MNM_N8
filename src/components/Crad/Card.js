import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Card({ link, image, content }) {
    return (
        <Link to={link} className={cx('wrapper')}>
            <div className={cx('item')}>
                <img src={image} alt="" />
                <div className={cx('content')}>{content}</div>
            </div>
        </Link>
    );
}
export default Card;
