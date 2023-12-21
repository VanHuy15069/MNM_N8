import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const cx = classNames.bind(styles);
function Chart({ data }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={cx('custom-tooltip')}>
                    <div className={cx('title')}>
                        <img className={cx('img')} src={payload[0].payload.image} alt="" />
                        <div className={cx('info')}>
                            <p className={cx('music')}>{label}</p>
                            <p className={cx('singer')}>{payload[0].payload.singerName}</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div style={{ marginRight: '4px' }}>Lượt nghe:</div>
                        <div style={{ color: payload[0].fill }}>{payload[0].value}</div>
                    </div>
                    <div className={cx('item')}>
                        <div style={{ marginRight: '4px' }}>Lượt thích:</div>
                        <div style={{ color: payload[1].fill }}>{payload[1].value}</div>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <LineChart
            width={1220}
            height={500}
            data={data}
            margin={{
                top: 5,
                right: 40,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="musicName" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="view" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="favorite" stroke="#82ca9d" />
        </LineChart>
    );
}
export default Chart;
