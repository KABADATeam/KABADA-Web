import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: '20px',
    lineHeight: "38px"
}

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #BFBFBF",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent",
}

class VariableCosts extends React.Component {
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
                        <Select defaultValue={this.props.countryVats.standardRate === undefined ? 'Null' : this.props.countryVats.standardRate}>
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
                <Col span={24}>
                <Row style={{ marginBottom: "50px" }}>
                    <Col span={7}>
                        <div style={{ marginRight: '40px' }}>
                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Fixed Costs</Typography.Title>
                            <Typography.Text style={{ ...textStyle }}>
                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                            </Typography.Text>
                        </div>
                    </Col>
                    <Col span={17}>
                        <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                                rowKey="id"
                                columns={fixed_costs_columns}
                                dataSource={this.props.financialProjections.variable_types}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                    </Row>
                </Col>

            </>
        )
    }
}

export default VariableCosts
