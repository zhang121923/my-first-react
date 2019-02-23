import React from 'react';
import PropTypes from 'prop-types';
// 组件
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
// 全局常量
import { CarInfo, CategoryInfo } from '../../shared/const/index.jsx';
// 样式
import './style.scss';

const defaultItem = { text: '请选择...', id: 0 };

const propTypes = {
    goods: PropTypes.array,
    close: PropTypes.func,
    add: PropTypes.func
};

class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: defaultItem,
            category: defaultItem,
            carTempList: CarInfo,
            cateTempList: CategoryInfo,
            price: null,
            quantity: null,
            showError: false,
            cateDisable: false
        };
    }

    componentWillUnmount() {

    }

    /**
     * 型号下拉框变更事件
     */
    carChangeHandler(event) {
        const selectCar = event.target.value;
        if (selectCar.id === 0) {
            this.setState({
                car: defaultItem,
                category: defaultItem,
                carTempList: CarInfo,
                cateTempList: CategoryInfo,
                cateDisable: false
            });
        } else {
            const cateFilterList = CategoryInfo.filter(item => {
                return item.id === selectCar.category;
            });
            this.setState({
                car: selectCar,
                category: cateFilterList[0],
                showError: false,
                cateDisable: true
            });
        }
    };

    /**
     * 类型下拉框变更事件
     */
    categoryChangeHandler(event) {
        const selectCate = event.target.value;
        let carFilterList = CarInfo;
        if (selectCate.id !== 0) {
            carFilterList = CarInfo.filter(item => {
                return item.category === selectCate.id;
            });
        }
        this.setState({
            carTempList: carFilterList,
            category: selectCate,
            showError: false,
            cateDisable: true
        });
        if (this.state.car.id !== 0) {
            return;
        } else {
            this.setState({
                category: selectCate,
                showError: false,
                cateDisable: false
            });
        }
    };

    /**
     * 确认按钮事件，将数据传递给父组件触发父组件回调
     */
    onConfirmHandler() {
        const flag = this.state.car.id === 0 || this.state.category.close === 0 || this.state.price === null || this.state.quantity === null;
        if (flag) {
            this.setState({
                showError: true
            });
            return;
        }
        const emitObject = {
            gId: this.props.goods.length + 1,
            gName: this.state.car.text,
            category: this.state.category.text,
            price: this.state.price,
            quantity: this.state.quantity
        };
        this.props.add(emitObject);
    }

    /**
     * 关闭事件处理
     */
    onCloseHandler() {
        this.props.close();
    }

    /**
     * 价格变更
     */
    priceChange(event) {
        this.setState({
            price: event.value,
            showError: false
        });
    }

    /**
     * 数量变更
     * @param {*} event 
     */
    quantityChange(event) {
        this.setState({
            quantity: event.value,
            showError: false
        });
    }

    render() {
        return (
            <div className="dialog override">
                <Dialog title="新增商品" onClose={this.props.close.bind(this)}>
                    <div className="content">
                        <div className="input-item">
                            <span className="item-name">ID</span>
                            <input className="item-value" type="text" value={this.props.goods.length + 1} readOnly disabled></input>
                        </div>
                        <div className="input-item">
                            <span className="item-name">型号<sup>*</sup></span>
                            <DropDownList className="item-value"
                                data={this.state.carTempList}
                                value={this.state.car}
                                textField="text"
                                defaultItem={defaultItem}
                                dataItemKey="id"
                                onChange={e => { this.carChangeHandler(e) }}>
                            </DropDownList>
                        </div>
                        <div className="input-item">
                            <span className="item-name">类型<sup>*</sup></span>
                            <DropDownList className="item-value"
                                data={this.state.cateTempList}
                                value={this.state.category}
                                textField="text"
                                defaultItem={defaultItem}
                                dataItemKey="id"
                                disabled={this.state.cateDisable}
                                onChange={e => { this.categoryChangeHandler(e) }}>
                            </DropDownList>
                        </div>
                        <div className="input-item">
                            <span className="item-name">单价<sup>*</sup></span>
                            <NumericTextBox className="item-value" placeholder="请输入单价" value={this.state.price} onChange={e => { this.priceChange(e) }}></NumericTextBox>
                        </div>
                        <div className="input-item">
                            <span className="item-name">数量<sup>*</sup></span>
                            <NumericTextBox className="item-value" placeholder="请输入数量" value={this.state.quantity} onChange={e => { this.quantityChange(e) }}></NumericTextBox>
                        </div>
                    </div>
                    <DialogActionsBar>
                        {this.state.showError && <span className="error-info">*为必选(填)项</span>}
                        <span className="btn-item" onClick={this.onConfirmHandler.bind(this)}>ok</span>
                        <span className="btn-item" onClick={this.onCloseHandler.bind(this)}>cancle</span>
                    </DialogActionsBar>
                </Dialog>
            </div>
        );
    }
}

AddDialog.propTypes = propTypes;

export default AddDialog;