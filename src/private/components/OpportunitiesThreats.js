import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableTitleStyle, tableDescriptionStyle, tableCardBodyStyle, tableCardStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';

class OpportunitiesThreats extends Component {

    state = {
        editingId: -1,
    };

    addTableRow = () => {
        if (this.props.editing === false) {
            this.props.handleHeader();
            let counter = this.props.otList.length;
            let newData = {
                key: counter + 1,
                name: '',
                checkedOpportunities: false,
                checkedThreats: false,
                isThreat: true,
                isOpportunity: true,
                isBoth: true,
            };
            this.props.handleAddRow(newData);
            this.setState({
                editingId: counter + 1,
            });
        }
    }

    handledeleteRow = (rowIndex) => {
        if (this.props.editing === true) {
            this.props.handleDeleteRow(this.state.editingId);
            this.setState({
                editingId: -1,
            });
        }
    }

    handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
        this.props.handleHeader();
        this.props.otList[rowIndex][columnKey] = event.target.checked;
    };

    handleInputChange = (value, rowIndex) => event => {
        if (event.target.value !== "") {
            this.props.otList[rowIndex]["name"] = event.target.value;
            this.setState({
                editingId: -1,
            })
            this.props.handleEditingChange();
        }
    }

    render() {
        const data = this.props.otList;
        const editing = this.props.editing;
        const editingId = this.state.editingId - 1;
        const columns = [
            {
                title: 'Column name',
                dataIndex: 'name',
                key: 'name',
                render: (value, record, rowIndex) => (
                    (editing && rowIndex === editingId) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onPressEnter={this.handleInputChange(value, rowIndex)}
                                placeholder="Add other"
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.handledeleteRow.bind(this, rowIndex)}><DeleteOutlined /></Button>
                        </Space>
                    ) : ((record.info) ? (<Space><Typography>{value}</Typography> <InfoCircleFilled style={{ color: '#BFBFBF' }} /></Space>) :
                        (<Space><Typography>{value}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Opportunities',
                dataIndex: 'checkedOpportunities',
                key: 'checkedOpportunities',
                render: (value, record, rowIndex) => (
                    (data[rowIndex]["isOpportunity"]) ? (
                        <Checkbox
                            checked={value}
                            disabled={(data[rowIndex]["checkedThreats"] === true && data[rowIndex]["isBoth"] === false) ? true : false}
                            onChange={this.handleCheckboxChangeFactory(rowIndex, "checkedOpportunities")}
                        />) : (<></>)
                ),
                width: '23%',
            },
            {
                title: 'Threats',
                dataIndex: 'checkedThreats',
                key: 'checkedThreats',
                render: (value, record, rowIndex) => (
                    (data[rowIndex]["isThreat"]) ? (
                        <Checkbox
                            checked={value}
                            disabled={(data[rowIndex]["checkedOpportunities"] === true && data[rowIndex]["isBoth"] === false) ? true : false}
                            onChange={this.handleCheckboxChangeFactory(rowIndex, "checkedThreats")}
                        />) : (<></>)
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
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addTableRow.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        );
    };
};

export default OpportunitiesThreats;

