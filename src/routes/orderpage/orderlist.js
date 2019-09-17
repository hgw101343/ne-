import React, { Component } from 'react';
import { Input, Icon, Button, Select, DatePicker } from 'antd';
import styles from './orderlist.css'
import Ordertable from '../../components/ordertable'
const { Option } = Select;

export default class homepage extends Component {
    //下拉框
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    //日期
    onChange(date, dateString) {
        console.log(date._d, dateString);
    }
    render() {
        return (
            <div>
                <div className={styles.orderhead}>
                    <div>
                        <Icon type="search" style={{
                            fontSize: '25px',
                            marginRight: '10px'
                        }} />筛选选择
                    <Button type="primary">查询结果</Button>
                        <Button>重置</Button>
                    </div>
                    <p>
                        <i>输入搜索 : </i>
                        <Input placeholder="订单编号" />
                    </p>
                    <p>
                        <i>收货人 : </i>
                        <Input placeholder="请输入收货人姓名" />
                    </p>
                    <p>
                        <i>联系方式 : </i>
                        <Input placeholder="请输入收货人手机号码" />
                    </p>
                    <p>
                        <i>订单状态 : </i>
                        <Select style={{ width: 120 }} onChange={this.handleChange} placeholder="全部">
                            <Option value="待付款">待付款</Option>
                            <Option value="待发货">待发货</Option>
                            <Option value="已发货">已发货</Option>
                            <Option value="已完成">已完成</Option>
                            <Option value="已关闭">已关闭</Option>
                        </Select>
                    </p>
                    <p>
                        <i>订单分类 : </i>
                        <Select style={{ width: 120 }} onChange={this.handleChange} placeholder="全部">
                            <Option value="正常订单">正常订单</Option>
                            <Option value="秒杀订单">秒杀订单</Option>
                        </Select>
                    </p>
                    <p className={styles.datainput}>
                        <i>提交时间 : </i>
                        <DatePicker onChange={this.onChange} />
                    </p>
                </div>
                <div className={styles.ordertitle}>
                    <h3>
                        <Icon type="database" style={{ fontSize: '16px' }} />
                        数据列表</h3>
                </div>
                <Ordertable />
            </div>
        );
    }
}