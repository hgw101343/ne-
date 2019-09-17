import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
//路由
import { Route, Switch, Link, Redirect } from 'dva/router';
//引入首页
import Homepage from '../homepage/homepage'
//引入营销
import Coupon from '../markpage/coupon'
import Seckill from '../markpage/seckill'
//引入订单
import Orderlist from '../orderpage/orderlist'
import Orderset from '../orderpage/orderset'
import Orderreturn from '../orderpage/returngoods'
//引入商品
import Shoplist from '../shoppage/shoplist'
import Shopadd from '../shoppage/shopadd'
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            select1: '',
            select2: '',
            nav: [
                {
                    title: '商品',
                    type: 'shop',
                    key: '商品',
                    children: [{
                        title: '商品列表',
                        key: 2,
                        url: '/index/shoplist'
                    },
                    {
                        title: '添加商品',
                        key: 3,
                        url: "/index/shopadd"
                    }]
                },
                {
                    title: '订单',
                    type: 'database',
                    key: '订单',
                    children: [{
                        title: '订单列表',
                        key: 4,
                        url: '/index/orderlist'
                    }, {
                        title: '订单设置',
                        key: 5,
                        url: '/index/orderset'
                    },
                    {
                        title: '退货申请处理',
                        key: 6,
                        url: '/index/orderreturn'
                    }]
                },
                {
                    title: '营销',
                    type: 'fire',
                    key: '营销',
                    children: [{
                        title: '秒杀活动列表',
                        key: 7,
                        url: '/index/seckill'
                    }, {
                        title: '优惠券列表',
                        key: 8,
                        url: '/index/coupon'
                    }]
                },
            ],
        }
    }
    //获取到当前选中
    onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        let openKeys = item.props.openKeys;
        console.log(item.props.children[1]);
        if (item.props.children[1] == '首页') {
            this.setState({
                select1: '',
                select2: ''
            });
        } else {
            this.setState({
                select1: item.props.openKeys[openKeys.length - 1],
                select2: item.props.children.props.children
            });
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <div>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onSelect={this.onSelect.bind(this)}
                        >
                            <Menu.Item key="1" title="首页">
                                <Icon type="home" />
                                首页
                                <Link to='/index/home'>
                                </Link>
                            </Menu.Item>
                            {
                                this.state.nav.map((item, index) => {
                                    return <SubMenu
                                        key={item.key}
                                        title={
                                            <span>
                                                <Icon type={item.type} />
                                                {item.title}
                                            </span>
                                        }
                                    >{
                                            item.children.map((it) => {
                                                return <Menu.Item key={it.key}>
                                                    <Link to={it.url}>
                                                        {it.title}
                                                    </Link>
                                                </Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.select1}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.select2}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                {/* 主页 */}
                                <Route path="/index/home" component={Homepage} />
                                {/* 营销页 */}
                                <Route path="/index/seckill" component={Seckill} />
                                <Route path="/index/coupon" component={Coupon} />
                                {/* 订单页 */}
                                <Route path="/index/orderlist" component={Orderlist} />
                                <Route path="/index/orderset" component={Orderset} />
                                <Route path="/index/orderset" component={Orderreturn} />
                                {/* 商品页 */}
                                <Route path="/index/shopadd" component={Shopadd} />
                                <Route path="/index/shoplist" component={Shoplist} />
                                {/* <Redirect
                                    to={{
                                        pathname: "/home",
                                    }} ></Redirect> */}
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}