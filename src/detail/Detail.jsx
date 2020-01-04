import * as React from 'react';
import {SELLDATA} from '../shared/const/index.jsx'
import './style.scss'

import MapComponnet from '../shared/component/map-component/MapComponent.jsx';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            area: 'sichuan'
        };
    }

    // 变更区域
    setArea(e) {
        this.setState({
            area: e.target.value
        })
    }

    render() {
        const {area} = this.state

        // 地图配置
        const options = {
            width: 1200,
            height: 800,
            map: area,
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
                        map: area, // 自定义扩展图表类型
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
                        data: SELLDATA[area],
                        scaleLimit: {
                            min: 0.5,
                            max: 5
                        }
                    }
                ]
            }
        };

        return (
            <div className="map-area">
                <div className="map-select-area">
                    <label>请选择销售区域：</label>
                    <select value={area} onChange={this.setArea.bind(this)}>
                        <option value="sichuan">四川省</option>
                        <option value="hubei">湖北省</option>
                    </select>
                </div>
                <MapComponnet {...options}></MapComponnet>
            </div>
        );
    }
}

export default Detail;
