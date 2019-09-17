import React from 'react';
import ReactDOM from 'react-dom'
import { Table, Input, InputNumber, Popconfirm, Form, Switch, Button } from 'antd';
import $axios from 'axios'
import styles from '../routes/shoppage/shoplist.css'
import store from '../store/store'
import { connect } from 'react-redux'
const EditableContext = React.createContext();
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };
    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            getShop: [],
        };
        this.goodsdata = this.goodsdata.bind(this)
        //编辑确认删除
        this.handleDelete = (num) => {
            let num1 = num;
            var del = this.state.getShop.splice(num, 1);
            $axios.get('http://localhost:3000/delgood', {
                params: {
                    num: del[0].num
                }
            }).then(data => {
                if (data.data == true) {
                    let ab = this.props.dispatch({
                        type: 'delShoplist',
                        num: num1
                    })
                    console.log(this.props.shoplist);
                    document.location.reload();
                    // this.goodsdata();

                }
            })
        }
        this.cancel = (a) => {
            this.setState({ editingKey: '' });
        }

        this.columns = [
            {
                title: '商品货号',
                dataIndex: 'num',
                width: '10%',
                editable: false,
            },
            {
                title: '商品图片',
                dataIndex: 'imgurl',
                width: '10%',
                editable: false,
            }, {
                title: '商品名称',
                dataIndex: 'title',
                width: '15%',
                editable: true
            },
            {
                title: '价格/元',
                dataIndex: 'price',
                width: '10%',
                editable: true,
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: '标签',
                dataIndex: 'Label',
                width: '10%',
                editable: false,
            },
            {
                title: '库存',
                dataIndex: 'kucun',
                width: '10%',
                editable: true,
            }, {
                title: '商家名称',
                dataIndex: 'SN',
                width: '10%',
                editable: true,
            },
            {
                title: '审核状态',
                dataIndex: 'state',
                width: '10%',
                editable: false,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return <div>{editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        保存
                  </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                编辑
            </a>
                        )
                    },{
                            this.props.shoplist.length >= 1 ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                    <a>删除</a>
                                </Popconfirm>
                            ) : null
                        }
                    </div>
                },
            },
        ];
    }
    async goodsdata() {
        let Ashop = [];
        this.props.dispatch({
            type: 'getsearch',
        });
        let datalist1 = await $axios.get("http://localhost:3000/getShop");
        this.props.dispatch({
            type: 'setShoplist',
            shoplist: datalist1.data
        });
        let datalist = this.props.shoplist;
        var top, newgood, Recommend;
        datalist.map((item, index) => {
            var icon = "http://localhost:3000/images/" + item.imgs.split('&')[0];
            let arr = datalist[index].Label;
            top = arr.indexOf('上架') >= 0 ? true : false;
            newgood = arr.indexOf('新品') >= 0 ? true : false;
            Recommend = arr.indexOf('推荐') >= 0 ? true : false;
            return Ashop.push({
                key: `${index}`,
                num: `${item.gid}`,
                imgurl: <img src={icon} className={styles.tableimg} />,
                title: `${item.title}`,
                price: `${item.price}`,
                kucun: `${item.kucun}`,
                SN: `${item.SN}`,
                Label: <div><p>上架 ： <Switch defaultChecked={top} /></p>
                    <p>推荐 ： <Switch defaultChecked={Recommend} /></p>
                    <p>新品 ： <Switch defaultChecked={newgood} /></p>
                </div>,
                state: <div className={styles.tablestate}>{item.status}<p><a>审核详情</a></p></div>,
                status: item.status,
                Label1: item.Label
            });
        })
        this.props.dispatch({
            type: 'setShoplist',
            shoplist: Ashop
        });
    }
    //获取表格内的数据
    async componentDidMount() {
        // store.subscribe(() => console.log(store.getState()))
        await this.goodsdata();
        console.log(this.props.shoplist);
        // let search = this.props.shoplist.concat();
        // this.props.dispatch({
        //     type: 'setsearch',
        //     searchlist: search
        // });
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
        // console.log('取消');
    };

    save(form, key) {
        console.log('保存');
        console.log(this);
        console.log(this.props.searchdata);
        //用变量存起来，dom节点只能找到0-4
        let newkey = key
        let gid = this.props.shoplist[key].num
        console.log(this.state.getShop[key].num);
        //当key>=5时从0开始
        if (newkey >= 5) {
            newkey = newkey % 5;
        }
        //找到当前该修改的那行数据
        let child = ReactDOM.findDOMNode(this.refs['child']);
        let tablebody = child.querySelector('tbody');
        let currentDom = tablebody.querySelectorAll('tr')[newkey];
        let title = currentDom.querySelector('#title').value;
        let price = currentDom.querySelector('#price').value;
        let kucun = currentDom.querySelector('#kucun').value;
        let SN = currentDom.querySelector('#SN').value;
        console.log(currentDom);
        $axios.post('http://localhost:3000/edit', {
            gid,
            price,
            SN,
            title,
            kucun
        }).then(res => {
            this.setState({ editingKey: '' });
            document.location.reload();
        });
    }
    edit(key) {
        this.setState({ editingKey: key });
        // console.log(key);
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <EditableContext.Provider value={this.props.form} ref="box">
                    <Table
                        ref="child"
                        rowSelection={rowSelection}
                        components={components}
                        bordered
                        dataSource={this.props.shoplist}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                            pageSize: 5
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }
}
const EditableFormTable = Form.create()(EditableTable);
export default connect((state) => {
    return state
})(EditableFormTable)