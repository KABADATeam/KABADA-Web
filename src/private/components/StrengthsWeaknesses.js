import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Table, Button, Input, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../css/customModal.css';

const CardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' };

class StrengthsWeaknesses extends Component {

    state = {
        data: [
            {
                key: '1',
                name: 'Land',
                strengths: true,
                weakness: false,
            },
            {
                key: '2',
                name: 'Facilities and equipment',
                strengths: true,
                weakness: true,
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
            strengths: false,
            weakness: false,
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
                title: 'Strengths',
                dataIndex: 'strengths',
                key: 'strengths',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={handleCheckboxChangeFactory(rowIndex, "strengths")}
                    />
                ),
            },
            {
                title: 'Weakness',
                dataIndex: 'weakness',
                key: 'weakness',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        onChange={handleCheckboxChangeFactory(rowIndex, "weakness")}
                    />
                ),
            }
        ];

        return (
            <>
                <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                    <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                        <div >Strengths and weaknesses</div>
                        <div>Select 3 - 6 items in each column. Each of the item can be selected only for one side – S or W</div>
                        <Table
                            dataSource={this.state.data}
                            columns={columns}
                            pagination={false}
                            footer={() => (<Button onClick={this.addTableRow.bind(this)}><PlusOutlined />Add item</Button>)}
                        />
                    </Card.Grid>
                </Card >
            </>
        )
    }
}

export default StrengthsWeaknesses;

