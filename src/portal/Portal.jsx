import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
// 子组件
import GridInfo from '../grid-info/GridInfo.jsx';
import Detail from '../detail/Detail.jsx';
// 样式
import './style.scss';

let leftNavigateDom = null;

class Portal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        leftNavigateDom = this.refs.leftNavigate;
        leftNavigateDom.style.left = '-105px';
    }

    componentWillUnmount() {
        leftNavigateDom = null;
    }

    onLeftMenuEnter(e) {
        leftNavigateDom.style.left = '0px';
        leftNavigateDom.style.transitionDuration = '1s';
    }

    onLeftMenuOut(e) {
        leftNavigateDom.style.left = '-105px';
        leftNavigateDom.style.transitionDuration = '1s';
    }

    onClickLink(e, path) {
        this.context.router.history.push(path);
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <div className="navigate-page">
                        <div ref="leftNavigate"
                            className="left-navigate"
                            onMouseOver={e => { this.onLeftMenuEnter(e) }}
                            onMouseOut={e => { this.onLeftMenuOut(e) }}>
                            <ul>
                                <NavLink className="nav-link" to="/"><li className="navigate-item">首页</li></NavLink>
                                <NavLink className="nav-link" to='/detail'><li className="navigate-item">销售分布</li></NavLink>
                            </ul>
                        </div>
                        <div className="content">
                            <Route exact path="/" component={GridInfo} />
                            <Route path="/detail" component={Detail} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Portal;
