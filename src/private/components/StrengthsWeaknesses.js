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
            console.log(this.state.editingId);
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
        console.log(rowIndex);
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
        console.log(this.props.swList)

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
                title: 'Strengths',
                dataIndex: 'strengths',
                key: 'strengths',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={value}
                        disabled={(data[rowIndex]["weakness"] === true || (this.state.selectedStrengthsCount === 6 && value !== true)) ? true : false}
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
                        disabled={(data[rowIndex]["strengths"] === true || (this.state.selectedWeaknessCount === 6 && value !== true)) ? true : false}
                        onChange={this.handleCheckboxChangeFactory(rowIndex, "weakness")}
                    />
                ),
                width: '23%',
            }
        ];

        return (
            <>
                <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                    <Table
                        title={() => <>
                            <Typography style={{ fontSize: "16px", fontWeight: "600", color: "#262626" }}>Strengths and weaknesses</Typography>
                            <Typography style={{ color: "#8C8C8C", fontSize: "14px" }}>
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

