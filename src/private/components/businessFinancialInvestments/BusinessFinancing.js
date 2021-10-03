import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, InputNumber, Select, Space, Table } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled } from '@ant-design/icons';


const { Option } = Select;


const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
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

const textStyleInTable = {
    fontSize: '14px',
    color: '#262626',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
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
const BusinessFinancingDataSource = [
    {
        loan_amount: 0,
        payment_period: 12,
        interest_rate: 6,
        grace_period: 6,
    },
]

const BusinessFinancingColumn = [
    {
        title: () => (<Text style={textStyleInTable}>Loan amount</Text>),
        dataIndex: 'loan_amount',
        key: 'loan_amount',
        width: '40%',
        render: (text, obj, record) => (
            <Text>{text}</Text>
        )
    },
    {
        title: () => (<Text style={textStyleInTable}>Payment period</Text>),
        dataIndex: 'payment_period',
        key: 'payment_period',
        width: '20%',
        render: (text, obj, record) => (
            <Space size={0}>
                <Select defaultValue={text+"mo."} suffixIcon={<CaretDownFilled />}>
                    <Option value="12">12 mo.</Option>
                    <Option value="24">24 mo.</Option>
                </Select>
            </Space>
        )
    },
    {
        title: () => (<Text style={textStyleInTable}>Interest rate</Text>),
        dataIndex: 'interest_rate',
        key: 'interest_rate',
        width: '20%',
        render: (text, obj, record) => (
            <InputNumber
                size="large"
                defaultValue={text}
                formatter={value => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
        )
    },
    {
        title: () => (<Text style={textStyleInTable}>Grace period (mo.)</Text>),
        dataIndex: 'grace_period',
        key: 'grace_period',
        width: '20%',
        render: (text, obj, record) => (
            <InputNumber
                style={{width: '100%'}}
                size="large"
                defaultValue={text}
            />
        )
    },



]

class BusinessStartUpInvestments extends React.Component {
    render() {

        return (
            <>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business Financing</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Explanation … In previous section we understood total needed amount of invetsments …. Now we have to understand how to finance these investments. Do you have the means to fund your startup, or will you need to borrow money
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>

                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Business Financing</Text>
                                    </div>
                                    <Table
                                        dataSource={BusinessFinancingDataSource}
                                        columns={BusinessFinancingColumn}
                                        pagination={false}
                                    />
                                </Card >
                            </div>
                        </Col>
                    </Row>
                </Col>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
    };
}

export default connect(mapStateToProps)(BusinessStartUpInvestments);