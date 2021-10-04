import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';

const { Option } = Select;
const { Text } = Typography;


class FixedCostTable extends React.Component {
    render() {
        const fixed_costs_columns = [
            {
                title: 'Name',
                dataIndex: 'type_title',
                width: '55%',
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '20%',
                render: (text, record, index) => (
                    <Input value={text === null ? 0 : text} />
                )
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '10%',
                render: (text, record, index) => (
                    <Input.Group compact>
                        <Select defaultValue={text === null? 'Null':text}>
                            <Option value={this.props.countryVats.standardRate}>{this.props.countryVats.standardRate + "%"}</Option>
                            <Option value={this.props.countryVats.reducedRates2}>{this.props.countryVats.reducedRates2 + "%"}</Option>
                            <Option value={this.props.countryVats.reducedRates1}>{this.props.countryVats.reducedRates1 + "%"}</Option>
                            <Option value={this.props.countryVats.superReducedRate}>{this.props.countryVats.superReducedRate === null ? "Null" : this.props.countryVats.superReducedRate}</Option>
                        </Select>
                    </Input.Group>
                )
            },
            {
                title: 'First expenses',
                dataIndex: 'first_expenses',
                width: '15%',
                render: (text, record, index) => (
                    <Input.Group compact>
                        <Select defaultValue={text === null ? "1st mo." : text}>
                            <Option value={"1st mo."}>{"1st mo."}</Option>
                            <Option value={"2nd mo."}>{"2nd mo."}</Option>
                            <Option value={"3rd mo."}>{"3rd mo."}</Option>
                            <Option value={"6th mo."}>{"6th mo."}</Option>
                            <Option value={"1st y."}>{"1st y."}</Option>
                            <Option value={"2nd y."}>{"2nd y."}</Option>
                            <Option value={"3rd y."}>{"3rd y."}</Option>
                            <Option value={"4th y."}>{"4th y."}</Option>
                        </Select>
                    </Input.Group>
                )
            },
        ];
        return (
            <>
                <Col span={17}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            
                            rowKey="id"
                            columns={fixed_costs_columns}
                            dataSource={this.props.data}
                            pagination={false}
                            title={() => this.props.category_title}
                        />
                    </Card>
                </Col>
            </>
        )
    }

}

export default FixedCostTable
