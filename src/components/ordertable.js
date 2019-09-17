import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Switch } from 'antd';
import $axios from 'axios'
// import styles from '../routes/shoppage/shoplist.css'
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
        //编辑确认删除
        this.handleDelete = (num) => {
            console.log(num);
        }
        this.cancel = (a) => {
            console.log(a);
        }

        this.columns = [
            {
                title: '编号',
                dataIndex: 'num',
                width: '5%',
                editable: true,
            },
            {
                title: '订单编号',
                dataIndex: 'ordernum',
                width: '10%',
                editable: false,
            }, {
                title: '提交时间',
                dataIndex: 'time',
                width: '15%',
                editable: true
            },
            {
                title: '用户账号',
                dataIndex: 'username',
                width: '10%',
                editable: true,
            },
            {
                title: '订单金额',
                dataIndex: 'price',
                width: '10%',
                editable: false,
            },
            {
                title: '订单分类',
                dataIndex: 'paymethod',
                width: '10%',
                editable: true,
            }, {
                title: '订单状态',
                dataIndex: 'orderstatus',
                width: '10%',
                editable: true,
            },
            {
                title: '审核状态',
                dataIndex: 'orderstatus',
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
                            this.state.getShop.length >= 1 ? (
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
    //获取表格内的数据
    async componentDidMount() {
        let datalist = await $axios.get("http://localhost:3000/getorder");
        let Ashop = [];
        console.log(datalist.data);
        datalist.data.map((item, index) => {
            return Ashop.push({
                num: item.num,
                ordernum: `${item.ordernum}`,
                time: item.time,
                username: `${item.username}`,
                price: `${item.price}`,
                paymethod: `${item.paymethod}`,
                orderstatus: `${item.orderstatus}`,
            });
        })
        this.setState({
            getShop: Ashop
        });
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.getShop];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
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
            <EditableContext.Provider value={this.props.form}>
                <Table
                    rowSelection={rowSelection}
                    components={components}
                    bordered
                    dataSource={this.state.getShop}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                        pageSize: 5
                    }}
                />
            </EditableContext.Provider>
        );
    }
}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable