import * as React from 'react';
import './style.scss'

import MapComponnet from '../shared/component/map-component/MapComponent.jsx';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            width: 1200,
            height: 800,
            map: 'hubei',
            options: {
                visualMap: [{
                    type: 'piecewise',
                    pieces: [
                        {value: 0},
                        {gt: 3000, lte: 5000},
                        {gt: 5000, lte: 8000},
                        {gt: 8000}
                    ],
                    realtime: false,
                    calculable: false,
                    show: false,
                    inRange: {
                        color: ['#A1CFF3', 'lightgreen', 'yellow', 'red']
                    }
                }],
                series: [
                    {
                        name: 'map',
                        type: 'map',
                        map: 'hubei', // 自定义扩展图表类型
                        roam: 'scale',    // 无需拖动,只需缩放
                        itemStyle: {
                            normal: {label: {show: true}},
                            emphasis: {
                                label: {show: true},
                                borderColor: '#000000',
                                areaColor: 'rgba(255, 255, 255, 1)',
                                borderWidth: 1,
                                shadowBlur: 15,
                                shadowOffsetY: 10,
                                opacity: 1,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: [
                            {name: '恩施土家族苗族自治州', value: 1000, id: 11},
                            {name: '十堰市', value: 2000, id: 12},
                            {name: '宜昌市', value: 3000, id: 13},
                            {name: '襄樊市', value: 4000, id: 14},
                            {name: '黄冈市', value: 5000, id: 15},
                            {name: '荆州市', value: 6000, id: 17},
                            {name: '荆门市', value: 7000, id: 18},
                            {name: '咸宁市', value: 8000, id: 19},
                            {name: '随州市', value: 9000, id: 20},
                            {name: '孝感市', value: 1000, id: 21},
                            {name: '武汉市', value: 2000, id: 22},
                            {name: '黄石市', value: 3000, id: 23},
                            {name: '神农架林区', value: 4000, id: 24},
                            {name: '天门市', value: 5000, id: 25},
                            {name: '仙桃市', value: 6000, id: 26},
                            {name: '潜江市', value: 7000, id: 27},
                            {name: '鄂州市', value: 8000, id: 28}
                        ],
                        scaleLimit: {
                            min: 0.5,
                            max: 5
                        }
                    }
                ]
            }
        };
    }

    render() {
        return (
            <div className="map-area">
                <MapComponnet {...this.options}></MapComponnet>
            </div>
        );
    }
}

export default Detail;
