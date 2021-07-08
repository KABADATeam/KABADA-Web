import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableTitleStyle, tableDescriptionStyle, tableCardBodyStyle, tableCardStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { updateSwotList, createNewItem, updateItem, deleteItem } from "../../appStore/actions/swotAction";

class OpportunitiesThreats extends Component {

    onAddItem = () => {
        const newItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": null,
                "name": "-",
                "operation": 0
            },
            "kind": 1
        };

        this.props.createNewItem(2, newItem);
    }

    handleState = (item, type) => event => {
        if (type === 3) {  // if opportunity
            item.value = event.target.checked === true ? 3 : 0;
        } else {    // threat
            item.value = event.target.checked === true ? 4 : 0;
        }
        this.props.updateSwotList(2, item);
    };

    onDeleteItem = (item) => {
        const deleteItem = {
            "business_plan_id": this.props.businessPlan.id,
            "opportunities_threats": [
                {
                    "id": item.id,
                    "name": item.title,
                    "operation": -1
                }
            ]
        };
        this.props.deleteItem(2, deleteItem);
    }

    handleSaveItem = (item) => {
        item.title = this.state.title;
        this.props.updateNewItem(1, item);
        this.setState({
            editingId: -1,
            editing: false,
            title: ""
        });
    }

    handleInputChange = (item) => event => {
        item.title = event.target.value;
        this.props.updateNewItem(2, item);
        this.setState({
            editingId: -1,
            editing: false,
            title: ""
        });
    }

    onTitleChange = (item) => event => {
        const updateItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                  "id": item.id,
                  "name": event.target.value,
                  "operation": item.value
            },
            "kind": 1
        };
        if (event.target.value !== '') {
            this.props.updateItem(2, updateItem);
        }
    }

    render() {
        const data = this.props.list.original.oportunities_threats.concat(this.props.list.updates.opportunities.filter(x => isNaN(x.id) === false));

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
                    ) : ((record.title) ? (<Space><Typography>{record.title}</Typography> <InfoCircleFilled style={{ color: '#BFBFBF' }} /></Space>) :
                        (<Space><Typography>{record.title}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Opportunities',
                dataIndex: 'checkedOpportunities',
                key: 'checkedOpportunities',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 3 ? true : false}
                        disabled={record.value === 4 ? true : false}
                        onChange={this.handleState(record, 3)}
                    />
                ),
                width: '23%',
            },
            {
                title: 'Threats',
                dataIndex: 'checkedThreats',
                key: 'checkedThreats',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 4 ? true : false}
                        disabled={record.value === 3 ? true : false}
                        onChange={this.handleState(record, 4)}
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
                            <Typography style={{ ...tableTitleStyle }}>Opportunities and threats</Typography>
                            <Typography style={{ ...tableDescriptionStyle }}>
                                List of predefined options for each part, where some of the items can be define for both sides,
                                some can be simultaneously on both sides, some only for O or T part</Typography>
                        </>}
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddItem.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        list: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { updateSwotList, createNewItem, updateItem, deleteItem })(OpportunitiesThreats);

