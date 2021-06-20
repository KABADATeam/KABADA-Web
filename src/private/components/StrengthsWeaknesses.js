import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip, Row } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableCardBodyStyle, tableCardStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { updateSwotList, createNewItem, updateNewItem, deleteNewItem } from "../../appStore/actions/swotAction";

class StrengthsWeaknesses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingId: -1,
            editing: false
        };
    }

    addItem = () => {
        if (this.state.editing === false) {
            const addedItems = this.props.list.updates.strengths.filter(x => isNaN(x.id) === false);
            const counter = this.props.list.original.strengths_weakness_items.length + addedItems.length;

            const newItem = {
                key: counter + 1,
                id: counter + 1,
                title: '',
                description: '',
                value: 0,
                isLocal: true
            };

            this.props.createNewItem(1, newItem);

            this.setState({
                editingId: counter + 1,
                editing: true
            });
        }
    }

    handleDeleteItem = (item) => {
        this.props.deleteNewItem(1, item);

        if (this.state.editing === true) {
            this.setState({
                editingId: -1,
                editing: false
            });
        }
    }

    handleState = (item, type) => event => {
        if (type === 1) {  // if strength
            item.value = event.target.checked === true ? 1 : 0;
        } else {    // weakness
            item.value = event.target.checked === true ? 2 : 0;
        }
        this.props.updateSwotList(1, item);
    };

    handleInputChange = (item) => event => {
        item.title = event.target.value;
        this.props.updateNewItem(1, item);
        this.setState({
            editingId: -1,
            editing: false
        });
    }

    render() {
        const data = this.props.list.original.strengths_weakness_items.concat(this.props.list.updates.strengths.filter(x => isNaN(x.id) === false));
        const editing = this.state.editing;
        const editingId = this.state.editingId - 1;

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'title',
                key: 'title',
                render: (title, record, rowIndex) => (
                    (editing && rowIndex === editingId) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onPressEnter={this.handleInputChange(record)}
                                placeholder="Add other"
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.handleDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
                        </Space>
                    ) : ((record.title) ? (<Space><Typography>{record.title}</Typography><Tooltip title={record.description}><span><InfoCircleFilled style={{ color: '#BFBFBF' }} /></span></Tooltip></Space>) :
                        (<Space><Typography>{record.title}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Strengths',
                dataIndex: 'strengths',
                key: 'strengths',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 1 ? true : false}
                        disabled={record.value === 2 ? true : false}
                        onChange={this.handleState(record, 1)}
                    />
                ),
                width: '23%',
            },
            {
                title: 'Weakness',
                dataIndex: 'weakness',
                key: 'weakness',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 2 ? true : false}
                        disabled={record.value === 1 ? true : false}
                        onChange={this.handleState(record, 2)}
                    />
                ),
                width: '23%',
            }
        ];

        return (
            <>
                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                    <Table
                        title={() => <>
                            <Typography style={{ ...tableTitleStyle }}>Strengths and weaknesses</Typography>
                            <Typography style={{ ...tableDescriptionStyle }}>
                                Select 3 - 6 items in each column. Each of the item can be selected only for one side – S or W</Typography>
                        </>}
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addItem.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.swotList
    };
}

export default connect(mapStateToProps, { updateSwotList, createNewItem, updateNewItem, deleteNewItem })(StrengthsWeaknesses);

