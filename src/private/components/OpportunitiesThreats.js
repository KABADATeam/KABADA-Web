import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled, SaveOutlined } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableTitleStyle, tableDescriptionStyle, tableCardBodyStyle, tableCardStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { updateSwotList, createNewItem, updateNewItem, deleteNewItem } from "../../appStore/actions/swotAction";

class OpportunitiesThreats extends Component {

    state = {
        editingId: -1,
        editing: false,
        title: ""
    };

    addItem = () => {
        if (this.state.editing === false) {
            const addedItems = this.props.list.updates.opportunities.filter(x => isNaN(x.id) === false);
            const counter = this.props.list.original.oportunities_threats.length + addedItems.length;

            const newItem = {
                key: counter + 1,
                id: counter + 1,
                title: '',
                description: '',
                value: 0,
                isLocal: true
            };

            this.props.createNewItem(2, newItem);

            this.setState({
                editingId: counter + 1,
                editing: true
            });
        }
    }

    handleState = (item, type) => event => {
        if (type === 3) {  // if opportunity
            item.value = event.target.checked === true ? 3 : 0;
        } else {    // threat
            item.value = event.target.checked === true ? 4 : 0;
        }
        this.props.updateSwotList(2, item);
    };

    handleDeleteItem = (item) => {
        this.props.deleteNewItem(2, item);

        if (this.state.editing === true) {
            this.setState({
                editingId: -1,
                editing: false,
                title: ""
            });
        }
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

    handleTitleChange = () => event => {
        this.setState({
            title: event.target.value
        });
    }

    render() {
        const data = this.props.list.original.oportunities_threats.concat(this.props.list.updates.opportunities.filter(x => isNaN(x.id) === false));
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
                                onChange={this.handleTitleChange()}
                                placeholder="Add other"
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.handleSaveItem.bind(this, record)}><SaveOutlined /></Button>
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.handleDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
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
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addItem.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        list: state.swotList
    };
}

export default connect(mapStateToProps, { updateSwotList, createNewItem, updateNewItem, deleteNewItem })(OpportunitiesThreats);

