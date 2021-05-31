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
        data: [
            {
                key: 1,
                name: 'Land',
                strengths: true,
                weakness: false,
                info: "a"
            },
            {
                key: 2,
                name: 'Facilities and equipment',
                strengths: false,
                weakness: true,
                info: "a"
            },
            {
                key: 3,
                name: 'Vehicles',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 4,
                name: 'Inventory',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 5,
                name: 'Skills and experience of employees',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 6,
                name: 'Corporate image',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 7,
                name: 'Patents',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 8,
                name: 'Trademarks',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 9,
                name: 'Copyrights',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 10,
                name: 'Operational processes',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 11,
                name: 'Management processes',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 12,
                name: 'Supporting processes',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 13,
                name: 'Product design',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 14,
                name: 'Product assortment',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 15,
                name: 'Packaging and labelling',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 16,
                name: 'Complementary and after-sales service',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 17,
                name: 'Guarantees and warranties',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 18,
                name: 'Return of goods',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 19,
                name: 'Price',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 20,
                name: 'Discounts',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 21,
                name: 'Payment terms',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 22,
                name: 'Customer convenient access to products',
                strengths: false,
                weakness: false,
                info: "a"
            },
            {
                key: 23,
                name: 'Advertising, PR and sales promotion',
                strengths: false,
                weakness: false,
                info: "a"
            },
        ],
        editing: false,
        editingId: -1,
        selectedStrengthsCount: 0,
        selectedWeaknessCount: 0,
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

    checkBoxValidation = () => {
        const data = [...this.state.data];
        let strengthsCount = 0;
        let weaknessCount = 0;
        for (let index = 0; index < data.length; index++) {
            if (data[index]["strengths"] === true)
                strengthsCount++;
            if (data[index]["weakness"] === true) {
                weaknessCount++;
            }
        }
        this.setState({
            selectedStrengthsCount: strengthsCount,
            selectedWeaknessCount: weaknessCount,
        })

    }

    handleCheckboxChangeFactory = (rowIndex, columnKey) => event => {
        const newData = [...this.state.data];
        newData[rowIndex][columnKey] = event.target.checked;
        this.setState({
            dataSource: newData,
        });
        this.checkBoxValidation();
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
                        disabled={(this.state.data[rowIndex]["weakness"] === true || (this.state.selectedStrengthsCount === 6 && value !== true)) ? true : false}
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
                        disabled={(this.state.data[rowIndex]["strengths"] === true || (this.state.selectedWeaknessCount === 6 && value !== true)) ? true : false}
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
                        dataSource={this.state.data}
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

