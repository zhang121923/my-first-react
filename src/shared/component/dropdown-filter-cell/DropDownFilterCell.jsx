import * as React from 'react';
import PropsType from 'prop-types';
// 组件
import { DropDownList } from '@progress/kendo-react-dropdowns';
// 全局变量
import { CategoryInfo } from '../../const/index.jsx';

const propsType = {
    data: PropsType.array,
    onChange: PropsType.func
};

const defaultItem = { text: '全部', id: 0 };

function DropDownFilterCell(props) {
    return class DropDownProxy extends React.Component {
        hasValue(value) {
            return value && value !== defaultItem;
        }
        render() {
            return (
                <div className="k-filtercell">
                    <DropDownList
                        data={CategoryInfo}
                        defaultValue={defaultItem}
                        textField="text"
                        defaultItem={defaultItem}
                        dataItemKey="id"
                        onChange={(e) => {
                            const hasValue = this.hasValue(e.target.value);
                            this.props.onChange({
                                value: hasValue ? e.target.value.text : '',
                                operator: hasValue ? 'eq' : '',
                                syntheticEvent: e.syntheticEvent
                            });
                        }}>
                    </DropDownList>
                    <button
                        className="k-button k-button-icon k-clear-button-visible"
                        title="Clear"
                        disabled={!this.hasValue(this, props.value)}
                        onClick={e => {
                            e.preventDefault();
                            this.props.onChange({
                                value: '',
                                operator: '',
                                syntheticEvent: e
                            })
                        }}>
                        <span className="k-icon k-i-filter-clear" />
                    </button>
                </div>
            );
        }
    }
}

DropDownFilterCell.propsType = propsType;

export default DropDownFilterCell;