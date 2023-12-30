"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartOptions,
    ChartData,
    Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend)

const LineChart = ({ data, startDate, endDate }) => {
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        },
        elements: {
            point: {
                radius: 1
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: function(value, index, ticks) {
                        const unixtime = typeof(this.getLabelForValue(value)) === 'number'
                            ? this.getLabelForValue(value) + startDate
                            : Number(this.getLabelForValue(value).replace(/,/g, "")) + startDate;
                        const dateTime = new Date(unixtime);
                        return dateTime.toLocaleDateString('ja-JP').slice(5) + ' ' + dateTime.toLocaleTimeString('ja-JP').slice(0,dateTime.toLocaleTimeString('ja-JP').length-3);
                    },
                    maxTicksLimit: (endDate-startDate)/21600000+1,
                },
                min: 0,
                max: endDate-startDate,
            }
        }
    };
    return <Line data={data} options={options}></Line>
}

export default LineChart;