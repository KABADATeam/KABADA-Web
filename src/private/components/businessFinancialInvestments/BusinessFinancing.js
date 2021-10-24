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
const loanAmountText = {
    fontWeight: 600,
    fontSize: 24,
    fontStyle: 'normal'
}

const BusinessFinancingShortDataSource = [
    {
        loan_amount: 0,
        payment_period: null,
        interest_rate: 12,
        grace_period: 5,
    },
]



class BusinessStartUpInvestments extends React.Component {
    state = {
        period: 12,
        loan_amount: this.props.data.loan_amount,
        payment_period: this.props.data.payment_period,
        interest_rate: this.props.data.interest_rate,
        grace_period: this.props.data.grace_period,
        startup_loan_amount: this.props.data.startup_loan_amount,
        payment_period_short: this.props.data.payment_period_short,
        interest_rate_short: this.props.data.interest_rate_short,
        grace_period_short: this.props.data.grace_period_short,
    }
    render() {
        const gracePeriodSelectionArray = []
        for (let i = 0; i < (this.state.period - 5); i++) {
            gracePeriodSelectionArray[i] = {
                value: i,
                label: i + ' mo.'
            }
        }
        const gracePeriodOptions = gracePeriodSelectionArray.map((v, index) => (
            <Option value={v.value} key={v.value}>{v.label}</Option>
        ))
        const gracePeriodDefaultValue = this.state.grace_period === null ? 0 : this.state.grace_period
        const loanLongDataSource = [
            {
                loan_amount: this.props.data.loan_amount,
                payment_period: this.props.data.payment_period,
                interest_rate: this.props.data.interest_rate,
                grace_period: this.props.data.grace_period,
            },
        ]

        const loanLongTermColumn = [
            {
                title: () => (<Text style={textStyleInTable}>Loan amount</Text>),
                dataIndex: 'loan_amount',
                key: 'loan_amount',
                width: '40%',
                render: (text, obj, record) => (
                    text === null ? <Text style={loanAmountText}>€0</Text> : <Text style={loanAmountText}>€{text}</Text>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Payment period</Text>),
                dataIndex: 'payment_period',
                key: 'payment_period',
                width: '20%',
                render: (text, obj, record) => (
                        <Select defaultValue={text === null ? "12" : text + " mo."} suffixIcon={<CaretDownFilled />}>
                            <Option value="3">3 mo.</Option>
                            <Option value="6">6 mo.</Option>
                            <Option value="9">9 mo.</Option>
                            <Option value="12">12 mo.</Option>
                            <Option value="24">24 mo.</Option>
                            <Option value="36">36 mo.</Option>
                            <Option value="48">48 mo.</Option>
                            <Option value="60">60 mo.</Option>
                            <Option value="72">72 mo.</Option>
                            <Option value="84">84 mo.</Option>
                            <Option value="96">96 mo.</Option>
                            <Option value="108">108 mo.</Option>
                            <Option value="120">120 mo.</Option>
                            <Option value="132">132 mo.</Option>
                            <Option value="144">144 mo.</Option>
                            <Option value="156">156 mo.</Option>
                            <Option value="168">168 mo.</Option>
                            <Option value="180">180 mo.</Option>
                        </Select>
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
                        defaultValue={this.props.data.interest_rate === null ? 0 + ' %' : this.props.data.interest_rate + ' %'}
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
                    <Select defaultValue={gracePeriodDefaultValue}
                        suffixIcon={<CaretDownFilled />}
                    >
                        {gracePeriodOptions}
                    </Select>
                )
            },
        ]

        const loanShortTermColumn = [
            {
                title: () => (<Text style={textStyleInTable}>Loan amount</Text>),
                dataIndex: 'loan_amount',
                key: 'loan_amount',
                width: '40%',
                render: (text, obj, record) => (
                    text === null ? <Text style={loanAmountText}>€0</Text> : <Text style={loanAmountText}>€{text}</Text>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Payment period</Text>),
                dataIndex: 'payment_period',
                key: 'payment_period',
                width: '20%',
                render: (text, obj, record) => (
                        <Select defaultValue={text === null ? "1" : text + " mo."} suffixIcon={<CaretDownFilled />}>
                            <Option value="1">1 mo.</Option>
                            <Option value="2">2 mo.</Option>
                            <Option value="3">3 mo.</Option>
                            <Option value="4">4 mo.</Option>
                            <Option value="5">5 mo.</Option>
                            <Option value="6">6 mo.</Option>
                            <Option value="7">7 mo.</Option>
                            <Option value="8">8 mo.</Option>
                            <Option value="9">9 mo.</Option>
                            <Option value="10">10 mo.</Option>
                            <Option value="11">11 mo.</Option>
                            <Option value="12">12 mo.</Option>
                            <Option value="13">13 mo.</Option>
                            <Option value="14">14 mo.</Option>
                            <Option value="15">15 mo.</Option>
                            <Option value="16">16 mo.</Option>
                            <Option value="17">17 mo.</Option>
                            <Option value="18">18 mo.</Option>
                            <Option value="19">19 mo.</Option>
                            <Option value="20">20 mo.</Option>
                            <Option value="21">21 mo.</Option>
                            <Option value="22">22 mo.</Option>
                            <Option value="23">23 mo.</Option>
                            <Option value="24">24 mo.</Option>
                        </Select>
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
                    <Select defaultValue={gracePeriodDefaultValue}
                        suffixIcon={<CaretDownFilled />}
                    >
                        {gracePeriodOptions}
                    </Select>
                )
            },
        ]
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
                                        <Text style={{ ...titleTextStyle }}>Loan (Long term)</Text>
                                    </div>
                                    <Table
                                        dataSource={loanLongDataSource}
                                        columns={loanLongTermColumn}
                                        pagination={false}
                                    />
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Loan (Short term)</Text>
                                    </div>
                                    <Table
                                        dataSource={BusinessFinancingShortDataSource}
                                        columns={loanShortTermColumn}
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