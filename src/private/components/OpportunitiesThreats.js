import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
const CardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '4px', paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' };


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
            console.log(this.state.editingId);
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
        console.log("editing: " + this.props.editing);
        const data = this.props.otList;
        const editing = this.props.editing;
        const columns = [
            {
                title: 'Column name',
                dataIndex: 'name',
                key: 'name',
                render: (value, record, rowIndex) => (
                    (editing && rowIndex === this.state.editingId - 1) ? (
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

        console.log(data)
        return (
            <>
                <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                    <Table
                        title={() => <>
                            <Typography style={{ fontSize: "16px", fontWeight: "600", color: "#262626" }}>Opportunities and threats</Typography>
                            <Typography style={{ color: "#8C8C8C", fontSize: "14px" }}>
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

