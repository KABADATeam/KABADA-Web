import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableCardBodyStyle, tableCardStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { updateSwotList, createNewItem, deleteItem, updateItem } from "../../appStore/actions/swotAction";

class StrengthsWeaknesses extends Component {

    onAddItem = () => {
        const newItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": null,
                "name": "-",
                "operation": 0
            },
            "kind": 0
        };

        this.props.createNewItem(1, newItem);
    }

    onDeleteItem = (item) => {
        const deleteItem = {
            "business_plan_id": this.props.businessPlan.id,
            "strengths_weakness": [
                {
                    "id": item.id,
                    "name": item.title,
                    "operation": -1
                }
            ]
        };
        this.props.deleteItem(1, deleteItem);
    }

    handleState = (item, type) => event => {
        if (type === 1) {  // if strength
            item.value = event.target.checked === true ? 1 : 0;
        } else {    // weakness
            item.value = event.target.checked === true ? 2 : 0;
        }
        this.props.updateSwotList(1, item);
    };

    onTitleChange = (item) => event => {
        const updateItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                  "id": item.id,
                  "name": event.target.value,
                  "operation": item.value
            },
            "kind": 0
        };
        if (event.target.value !== '') {
            this.props.updateItem(1, updateItem);
        }
    }

    render() {
        const data = this.props.list.original.strengths_weakness_items.concat(this.props.list.updates.strengths.filter(x => isNaN(x.id) === false));

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'title',
                key: 'title',
                render: (title, record, rowIndex) => (
                    (record.isLocal === true) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onChange={this.onTitleChange(record)}
                                placeholder="Enter title"
                                defaultValue={record.title}
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.onDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
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
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddItem.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { updateSwotList, createNewItem, deleteItem, updateItem })(StrengthsWeaknesses);

