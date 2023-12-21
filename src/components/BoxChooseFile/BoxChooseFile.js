import classNames from 'classnames/bind';
import styles from './BoxChooseFile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function BoxChooseFile({ onclickOK, onclickCancle, name, onChange, image, check }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <div className={cx('upload')}>{image && <img className={cx('img')} src={image} alt="" />}</div>
                <input type="file" name={name} id="file" className={cx('inputfile')} onChange={onChange} />
                <label htmlFor="file">
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <span>Chọn file</span>
                </label>
                {check && <p className={cx('msg')}>{check}</p>}
                <div className={cx('control')}>
                    <button className={cx('btn', 'btn-ok')} onClick={onclickOK}>
                        Xác nhận
                    </button>
                    <button className={cx('btn', 'btn-cancle')} onClick={onclickCancle}>
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BoxChooseFile;
