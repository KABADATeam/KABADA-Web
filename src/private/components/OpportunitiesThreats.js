import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
const CardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '4px', paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' };


class OpportunitiesThreats extends Component {

    state = {
        data: [
            {
                key: 1,
                name: 'Arrival of new technology',
                opportunities: true,
                threats: false,
            },
            {
                key: 2,
                name: 'New regulations',
                opportunities: true,
                threats: true,
            },
        ],
        editing: false,
        editingId: -1,
    };

    addTableRow = () => {
        if (this.state.editing === false) {
            const { data } = this.state;
            const counter = data.length;
            const newData = {
                key: counter + 1,
                name: '',
                opportunities: false,
                threats: false,
            };
            this.setState({
                data: [...data, newData],
                editing: true,
                editingId: counter + 1,
            });
        }
    }

    handledeleteRow = (rowIndex) => {
        if (this.state.editing === true) {
            console.log(this.state.editingId);
            const dataSource = [...this.state.data];
            this.setState({
                data: dataSource.filter((item) => item.key !== this.state.editingId),
                editingId: -1,
                editing: false,
            });
        }
    }

    handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
        const newData = [...this.state.data];
        newData[rowIndex][columnKey] = event.target.checked;
        this.setState({
            dataSource: newData,
        });
        console.log(newData[rowIndex]);
    };

    handleInputChange = (value, rowIndex) => event => {
        if (event.target.value !== "") {
            const newData = [...this.state.data];
            newData[rowIndex]["name"] = event.target.value;
            this.setState({
                dataSource: newData,
                editing: false,
                editingId: -1,
            })
        }
    }

    render() {

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'name',
                key: 'name',
                render: (value, record, rowIndex) => (
                    (this.state.editing && rowIndex === this.state.editingId - 1) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onPressEnter={this.handleInputChange(value, rowIndex)}
                                placeholder="Add other"
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.handledeleteRow.bind(this, rowIndex)}><DeleteOutlined /></Button>
                        </Space>
                    ) : (<Typography>{value}</Typography>)
                ),
                width: '54%',
            },
            {
                title: 'Opportunities',
                dataIndex: 'opportunities',
                key: 'opportunities',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={this.handleCheckboxChangeFactory(rowIndex, "opportunities")}
                    />
                ),
                width: '23%',
            },
            {
                title: 'Threats',
                dataIndex: 'threats',
                key: 'threats',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={this.handleCheckboxChangeFactory(rowIndex, "threats")}
                    />
                ),
                width: '23%',
            }
        ];

        console.log(this.state.data)
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
                        dataSource={this.state.data}
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

