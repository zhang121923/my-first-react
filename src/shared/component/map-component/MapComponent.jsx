import * as React from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

import './style.scss'

let propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    map: PropTypes.string,
    options: PropTypes.object
};

class MapComponnet extends React.Component {
    constructor(props) {
        super(props);
        // 主样式，宽高由父节点传入数值
        this.mapStyle = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`
        }
        // 组件引用
        this.mapRefs = React.createRef();
        // map实例
        this.map = null;
    }

    componentDidMount() {
        const that = this;
        fetch(`./map/${this.props.map}.json`)
            .then(res => res.json())
            .then(data => {
                const mapDOM = that.mapRefs.current;
                that.map = echarts.init(mapDOM);
                echarts.registerMap(that.props.map, data);
                that.map.setOption(that.props.options);
            });
    }

    render() {
        return (
            <div className="map-content" style={this.mapStyle} ref={this.mapRefs}></div>
        );
    }
}

export default MapComponnet;
