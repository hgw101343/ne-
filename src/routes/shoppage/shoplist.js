import React, { Component } from 'react';
import styles from './shoplist.css'
import { Input, Icon, Button, Select } from 'antd';
import Shoptable from '../../components/shoptable'
import ReactDOM from 'react-dom'
import $axios from 'axios'
import store from '../../store/store'
import { connect } from 'react-redux'
const Option = Select.Option;
class shoplist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getShop: [],
            label: '',
            status: '',
            searchdata: []
        }
        this.handleChange1 = (value) => {
            this.setState({
                label: value
            })
        }
        this.handleChange2 = (value) => {
            this.setState({
                status: value
            })
        }
    }
    reset() {
        console.log(store);
        document.location.reload();
    }
    search(event) {
        //获取查询项的值
        let box = ReactDOM.findDOMNode(this.refs['box']);
        let tex = box.querySelectorAll('input[type="text"]');
        // let tex2 = box.querySelectorAll('.ant-select-selection-selected-value');
        let title = tex[0].value;
        let gid = tex[1].value;
        let SN = tex[2].value;
        console.log(title, gid, SN, this.state.status, this.state.label);
        function checkAdult(obj) {
            console.log(obj);
            if (this.state.status && !this.state.label) {
                return obj.title.indexOf(title) >= 0 && (obj.status == this.state.status) == true && obj.num.indexOf(gid) >= 0 && obj.SN.indexOf(SN) >= 0;
            }
            else if (this.state.label && !this.state.status) {
                return obj.title.indexOf(title) >= 0 && obj.Label1.indexOf(this.state.label) >= 0 && obj.num.indexOf(gid) >= 0 && obj.SN.indexOf(SN) >= 0;
            }
            else if (!this.state.label && !this.state.status) {
                return obj.title.indexOf(title) >= 0 && obj.num.indexOf(gid) >= 0 && obj.SN.indexOf(SN) >= 0;
            }
            else {
                return obj.title.indexOf(title) >= 0 && obj.Label1.indexOf(this.state.label) >= 0 && obj.num.indexOf(gid) >= 0 && obj.SN.indexOf(SN) >= 0 && (obj.status == this.state.status) == true;
            }
        }
        console.log(this.props.shoplist);
        let arr = this.props.shoplist.filter(checkAdult.bind(this));
        store.dispatch({
            type: 'setShoplist',
            shoplist: arr
        });
        console.log(this.props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.shoplist}>
                <div ref='box'>
                    <div className={styles.fontP}>
                        <Icon type="search" style={{
                            fontSize: '25px',
                            marginRight: '10px'
                        }} />筛选选择 <Button type="primary" onClick={this.search.bind(this)}>查询结果</Button>
                        <Button onClick={this.reset.bind(this)}>重置</Button></div>
                    <i>输入搜索 :</i> <Input placeholder="商品名称" className={styles.input} />
                    <i>商品货号 : </i><Input placeholder="商品货号" className={styles.input} />
                    <i>商品商家 :</i><Input placeholder="商家名称" className={styles.input} />
                    <br />
                    <i>上架状态 :</i>
                    <Select placeholder="全部" style={{ width: 120, margin: 30 }} onChange={this.handleChange1.bind(this)}>
                        <Option value="上架">上架</Option>
                        <Option value="新品">新品</Option>
                        <Option value="推荐">推荐</Option>
                    </Select>
                    <i>审核状态 :</i>
                    <Select placeholder="全部" style={{ width: 120, margin: 30 }} onChange={this.handleChange2.bind(this)}>
                        <Option value="审核通过">审核通过</Option>
                        <Option value="未通过">未通过</Option>
                    </Select>
                </div>
                <Shoptable />
            </div>
        );
    }
}
export default connect((state) => {
    return state
})(shoplist);