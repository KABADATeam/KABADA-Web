import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Select, InputNumber, Popconfirm, Input, Divider, Modal, Col, Typography, Card, Table } from 'antd';
import { CaretDownFilled} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    marginBottom: "20px",
}
class VariableCostPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthsChecked: null,
            checked: [],
            data: []
        }
    }

    onMonthsChanged = (value) => {
        console.log(value)
        this.setState({
            monthsChecked: value
        });
        const array = []
        //loop through array. loop while index is not greater that provided value. add id's to array
        this.state.data.map((obj, index) => {
            if (index <= value - 1) {
                array.push(obj.id)
                console.log(obj.id)
            }
        });
        this.setState({
            checked: array
        });
    }

    isDisabled = id => {
        console.log(JSON.stringify(this.state.checked))
        console.log('YE' + id)
        return (
            this.state.checked.length > 0 && this.state.checked.indexOf(id) === -1
        );
    };

    componentDidMount() {
        const duom = []
        for (var i = 1; i < 13; i++) {
            duom.push({ id: i, month: i, price: 0, selectedMonths: 12 })
        }
        this.setState({
            data: duom
        })
    }
    render() {

        const columns = [
            {
                title: 'Month',
                dataIndex: 'month',
                width: '65%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '35%',
                render: (text, record, index) => {
                    if (index === 0) { }
                    return (<InputNumber
                        defaultValue={text === null? 0 : text}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        key={record.id}
                        disabled={this.isDisabled(record.id)}
                    />)
                }
            }
        ]
        return (
            <>
                <Modal
                    // title={this.props.category_title}
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                >
                    <Card  size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <div style={{ display: 'flex' }}>
                            <Col span={12}>
                                <div style={{ marginTop: 24, marginLeft: 16 }}>
                                    <Text style={{ ...titleTextStyle }}>All months?</Text>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ float: "right", marginTop: 16, marginBottom: 16, marginRight: 16 }}>
                                    <Select defaultValue={12} suffixIcon={<CaretDownFilled />} size='default' onSelect={this.onMonthsChanged.bind(this)}>
                                        {this.state.data.map((obj, index) => (
                                            <Option value={obj.id}>{obj.month + "mo."}</Option>
                                        ))}
                                    </Select>
                                </div>
                            </Col>
                        </div>
                    </Card>
                    <div style={{ marginTop: "15px" }}></div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                        title={() => this.props.category_title}
                    />
                </Modal>
            </>
        )
    }

}

export default VariableCostPopUp
