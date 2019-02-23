import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import './style.scss';
// 子组件
import AddDialog from './add-dialog/AddDialog.jsx';
import DropDownFilterCell from '../shared/component/dropdown-filter-cell/DropDownFilterCell.jsx';
// 全局常量
import { CategoryInfo } from '../shared/const/index.jsx';

let filterRow = null;

const filter = {
    logic: 'and',
    filters: []
};

class GridInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                gId: 1,
                gName: "CX-5",
                category: '紧凑型SUV',
                price: 18.99,
                quantity: 2000
            }],
            showFilterRow: false,
            showDialog: false,
            gridCondition: {
                sort: [],
                filter: filter
            },
            dropDownFilter: null
        };
        this.dropdownFiltercell = DropDownFilterCell({
            data: this.state.dropDownFilter,
            onChange: this.gridFilterChange
        });
    }

    componentDidMount() {
        //获取DOM元素
        filterRow = document.querySelector('.k-filter-row');
        filterRow.style.display = 'none';
    }

    /**
     * 新增按钮事件
     * @param {} event 
     */
    onAddBtn(event) {
        this.setState({ showDialog: true });
    }

    /**
     * 新增按钮事件
     * @param {*} newCar 
     */
    addGoods(newCar) {
        const carList = this.state.data;
        this.setState({
            data: carList.concat(newCar),
            showDialog: false
        });
    }

    /**
     * 表格过滤按钮事件
     * @param {*} event 
     */
    onFilterBtn(event) {
        filterRow.style.display = this.state.showFilterRow ? 'none' : 'table-row';
        this.setState((prevState) => {
            this.state.showFilterRow = !prevState.showFilterRow;
            // 如果过滤行折叠，则还原过滤条件
            if (!this.state.showFilterRow) {
                this.setState({
                    gridCondition: {
                        filter: filter
                    }
                });
            }
        });
        // 此方法也行
        // this.setState({
        //     showFilterRow: !this.state.showFilterRow
        // });
    }

    /**
     * 表格刷新数据
     * @param {*} event 
     */
    onFreshBtn(event) {
        console.log("刷新");
    }

    closeDialog() {
        this.setState({
            showDialog: false
        });
    }

    /**
     * 表格过滤监听
     */
    gridFilterChange(e) {
        this.setState({
            gridCondition: {
                filter: e.filter
            }
        });
    }

    render() {
        return (
            <div className="main">
                <div className="left-btn-group">
                    <i className="iconfont" onClick={this.onAddBtn.bind(this)} title="新建">&#xe7fb;</i>
                    <i className="iconfont" onClick={this.onFilterBtn.bind(this)} title="过滤">&#xe6e2;</i>
                    <i className="iconfont" onClick={this.onFreshBtn.bind(this)} title="刷新">&#xe66d;</i>
                </div>
                <div className="goods-content">
                    <Grid data={filterBy(this.state.data, this.state.gridCondition.filter)}
                        filterable
                        filter={this.state.gridCondition.filter}
                        onFilterChange={this.gridFilterChange.bind(this)}>
                        <Column field="gId" title="ID" filterable={false}></Column>
                        <Column field="gName" title="型号"></Column>
                        <Column field="category" title="类型" filterCell={this.dropdownFiltercell}></Column>
                        <Column field="price" title="单价" filter="numeric" format="{0:c}"></Column>
                        <Column field="quantity" title="数量" filter="numeric" format="{0:n0}"></Column>
                    </Grid>
                </div>
                {this.state.showDialog &&
                    <AddDialog
                        goods={this.state.data}
                        close={this.closeDialog.bind(this)}
                        add={this.addGoods.bind(this)}>
                    </AddDialog>
                }
            </div>
        )
    }
}

export default GridInfo;