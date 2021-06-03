import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableCardBodyStyle, tableCardStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';

class StrengthsWeaknesses extends Component {

    state = {
        editingId: -1,
        selectedStrengthsCount: 0,
        selectedWeaknessCount: 0,
    };


    addTableRow = () => {
        if (this.props.editing === false) {
            this.props.handleHeader();
            let counter = this.props.swList.length;
            let newData = {
                key: counter + 1,
                name: '',
                strengths: false,
                weakness: false,
                info: ''
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

    checkBoxValidation = () => {
        let strengthsCount = 0;
        let weaknessCount = 0;
        for (let index = 0; index < this.props.swList.length; index++) {
            if (this.props.swList[index]["strengths"] === true)
                strengthsCount++;
            if (this.props.swList[index]["weakness"] === true) {
                weaknessCount++;
            }
        }
        this.setState({
            selectedStrengthsCount: strengthsCount,
            selectedWeaknessCount: weaknessCount,
        })
    }

    handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
        this.props.handleHeader();
        this.props.swList[rowIndex][columnKey] = event.target.checked;
        this.checkBoxValidation();
    };

    handleInputChange = (value, rowIndex) => event => {
        if (event.target.value !== "") {
            this.props.swList[rowIndex]["name"] = event.target.value;
            this.setState({
                editingId: -1,
            })
            this.props.handleEditingChange();
        }
    }

    render() {

        const data = this.props.swList;
        const editing = this.props.editing;
        const editingId = this.state.editingId - 1;
        const selectedStrengthsCount = this.state.selectedStrengthsCount;
        const selectedWeaknessCount = this.state.selectedWeaknessCount;

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
                title: 'Strengths',
                dataIndex: 'strengths',
                key: 'strengths',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        disabled={(data[rowIndex]["weakness"] === true || (selectedStrengthsCount === 6 && value !== true)) ? true : false}
                        onChange={this.handleCheckboxChangeFactory(rowIndex, "strengths")}
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
                        checked={value}
                        disabled={(data[rowIndex]["strengths"] === true || (selectedWeaknessCount === 6 && value !== true)) ? true : false}
                        onChange={this.handleCheckboxChangeFactory(rowIndex, "weakness")}
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
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addTableRow.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card >
            </>
        )
    }
}

export default StrengthsWeaknesses;

