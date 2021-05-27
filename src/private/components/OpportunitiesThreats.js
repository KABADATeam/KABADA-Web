import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Table, Button, Input, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../css/customModal.css';
const EditableContext = React.createContext(null);
const CardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' };


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
        const { data } = this.state;
        const counter = data.length;
        const newData = {
            key: counter + 1,
            name: ``,
            opportunities: false,
            threats: false,
        };
        this.setState({
            data: [...data, newData],
            editing: true,
            editingId: counter + 1,
        });
    }

    handledeleteRow = (rowIndex) => {
        console.log(this.state.editingId);
        const dataSource = [...this.state.data];
        this.setState({
            data: dataSource.filter((item) => item.key !== this.state.editingId),
        });
    }
    render() {

        const handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
            const newCheckboxState = [...this.state.data];
            newCheckboxState[rowIndex][columnKey] = event.target.checked;
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => rowIndex === item.key);
            const item = newData[rowIndex];
            newData.splice(index, 1, { ...item, ...newCheckboxState[rowIndex] });
            this.setState({
                dataSource: newData,
            });
            console.log(newCheckboxState[rowIndex]);
        };

        const handleInputChange = (value, rowIndex) => event => {
            console.log(event.target.value);

            const newNameValue = [...this.state.data];
            newNameValue[rowIndex]["name"] = event.target.value;
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => rowIndex === item.key);
            const item = newData[rowIndex];
            newData.splice(index, 1, { ...item, ...newNameValue[rowIndex] });
            this.setState({
                dataSource: newData,
                editing: false,
                editingId: -1,
            })
        }

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'name',
                key: 'name',
                render: (value, record, rowIndex) => (
                    (this.state.editing && rowIndex === this.state.editingId - 1) ? (
                        <>
                            <Input
                                onPressEnter={handleInputChange(value, rowIndex)}
                                placeholder="Add other"

                            />
                            <Button onClick={this.handledeleteRow.bind(this, rowIndex)}><DeleteOutlined /></Button>
                        </>
                    ) : (<Typography>{value}</Typography>)
                ),
            },
            {
                title: 'Opportunities',
                dataIndex: 'opportunities',
                key: 'opportunities',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={handleCheckboxChangeFactory(rowIndex, "opportunities")}
                    />
                ),
            },
            {
                title: 'Threats',
                dataIndex: 'threats',
                key: 'threats',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={handleCheckboxChangeFactory(rowIndex, "threats")}
                    />
                ),
            }
        ];

        console.log(this.state.data)
        return (
            <>
                <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                    <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                        <div >Opportunities and threats</div>
                        <div>List of predefined options for each part, where some of the items can be define for both sides,
                            some can be simultaneously on both sides, some only for O or T part</div>
                        <Table
                            dataSource={this.state.data}
                            columns={columns}
                            pagination={false}
                            footer={() => (<Button onClick={this.addTableRow.bind(this)}><PlusOutlined />Add item</Button>)}
                        />
                    </Card.Grid>
                </Card >
            </>
        );
    };
};

export default OpportunitiesThreats;

