import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Input, Button } from 'antd';
import $axios from 'axios'
class addshop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputstyle: {
                width: "60%"
            },
            istyle: {
                width: '10%',
                display: 'inline-block',
                textAlign: 'right',
                fontStyle: 'normal'
            }
        }
        this.add = this.add.bind(this)
    }
    render() {
        return (
            <div ref="addbox">
                <p><i style={this.state.istyle}>商品编号 : </i><Input placeholder="请输入商品编号" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>商品图片 : </i><Input placeholder="请输入类似1.png" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>商品名称 : </i><Input placeholder="请输入商家名称" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>价格 :</i> <Input placeholder="请输入价格" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>标签 : </i><Input placeholder="请输入标签&做分割" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>库存 : </i><Input placeholder="请输入库存" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>商家名称 : </i><Input placeholder="请输入商家名称" style={this.state.inputstyle} /></p>
                <p><i style={this.state.istyle}>审核状态 : </i><Input placeholder="请输入审核状态" style={this.state.inputstyle} /></p>
                <Button type="primary" style={
                    {
                        float: 'right',
                        marginRight: '20%'
                    }
                } onClick={this.add}>添加</Button>
            </div >
        );
    }
    async add() {
        console.log('a');
        let box = ReactDOM.findDOMNode(this.refs['addbox']);
        let tex = box.querySelectorAll('input[type="text"]');
        let gid = tex[0].value;
        let imgs = tex[1].value;
        let title = tex[2].value;
        let price = tex[3].value;
        let Label = tex[4].value;
        let kucun = tex[5].value;
        let SN = tex[6].value;
        let status = tex[7].value;
        console.log(tex);
        let str = await $axios.post('http://localhost:3000/add', {
            gid, imgs, title, price, Label, kucun, SN, status
        });
    }
    componentDidMount() {
    }
}
export default connect((state) => {
    return state
})(addshop)