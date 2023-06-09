import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, InputNumber, Select, Space, Table } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled } from '@ant-design/icons';
import { changeVisibility, changePaymentPeriod, changePaymentPeriodShort, changeInterestRate, changeInterestRateShort, changeGracePeriod, changeGracePeriodShort } from "../../../../appStore/actions/businessInvestmentAction";
import TooltipComponent from '../../../components/Tooltip';
import TextHelper from '../../../components/TextHelper';
import '../../../../css/BusinessInvestment.css';

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

class BusinessStartUpInvestments extends React.Component {

    render() {
        const gracePeriodSelectionArray = [];
        for (let i = 0; i < (this.props.investments.original.period - 5); i++) {
            gracePeriodSelectionArray[i] = {
                value: i,
                label: i + ' mo.'
            }
        }
        const shortLoanPaymentPeriodSelectionArray = [];
        for (let i = 1; i < (this.props.investments.original.period); i++) {
            shortLoanPaymentPeriodSelectionArray[i] = {
                value: i,
                label: i + ' mo.'
            }
        }
        const gracePeriodOptions = gracePeriodSelectionArray.map((v, index) => (
            <Option value={v.value} key={v.value}>{v.label}</Option>
        ))
        const shortLoanPaymentPeriodOptions = shortLoanPaymentPeriodSelectionArray.map((v, index) => (
            <Option value={v.value} key={v.value}>{v.label}</Option>
        ))
        const loanLongDataSource = [
            {
                loan_amount: this.props.investments.updates.loan_amount === null ? this.props.investments.investment_amount : this.props.investments.updates.loan_amount,
                payment_period: this.props.investments.original.payment_period,
                interest_rate: this.props.investments.original.interest_rate,
                grace_period: this.props.investments.original.grace_period,
            },
        ]

        const loanShortDataSource = [
            {
                loan_amount_short: this.props.investments.updates.loan_amount_short,
                payment_period_short: this.props.investments.updates.payment_period_short,
                interest_rate_short: this.props.investments.updates.interest_rate_short,
                grace_period_short: this.props.investments.updates.grace_period_short,
            },
        ]

        const loanLongTermColumn = [
            {
                title: () => (<Text style={textStyleInTable}>Loan amount</Text>),
                dataIndex: 'loan_amount',
                key: 'loan_amount',
                width: '46%',
                render: (text, obj, record) => (
                    text === null ? <Text style={loanAmountText}>€0</Text> : <Text style={loanAmountText}>€{text}</Text>
                )
            },
            {
                title: () => (
                    <>
                        <Row>
                            <Text style={textStyleInTable}>Payment period </Text>
                            <TooltipComponent code="bstartinvestbf6" type="text"/>
                        </Row>
                    </>                
                ),
                dataIndex: 'payment_period',
                key: 'payment_period',
                width: '18.5%',
                render: (text, obj, record) => (
                    <Select defaultValue={text === null ? 12 : text + " mo."} suffixIcon={<CaretDownFilled />} onChange={e => this.props.changePaymentPeriod(e)} style={{width: 112}} className={"business-startup-selector-style"} disabled={true}>
                        <Option value={3}>3 mo.</Option>
                        <Option value={6}>6 mo.</Option>
                        <Option value={9}>9 mo.</Option>
                        <Option value={12}>12 mo.</Option>
                        <Option value={24}>24 mo.</Option>
                        <Option value={36}>36 mo.</Option>
                        <Option value={48}>48 mo.</Option>
                        <Option value={60}>60 mo.</Option>
                        <Option value={72}>72 mo.</Option>
                        <Option value={84}>84 mo.</Option>
                        <Option value={96}>96 mo.</Option>
                        <Option value={108}>108 mo.</Option>
                        <Option value={120}>120 mo.</Option>
                        <Option value={132}>132 mo.</Option>
                        <Option value={144}>144 mo.</Option>
                        <Option value={156}>156 mo.</Option>
                        <Option value={168}>168 mo.</Option>
                        <Option value={180}>180 mo.</Option>
                    </Select>
                )
            },
            {
                title: () => (
                    <>
                        <Row>
                            <Text style={textStyleInTable}>Interest rate </Text>
                            <TooltipComponent code="bstartinvestbf7" type="text"/>
                        </Row>
                    </>
                ),
                dataIndex: 'interest_rate',
                key: 'interest_rate',
                width: '16.5%',
                render: (text, obj, record) => (
                    <InputNumber
                        size="large"
                        defaultValue={this.props.investments.original.interest_rate === null ? 0 + ' %' : this.props.investments.original.interest_rate + ' %'}
                        formatter={value => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        style={{width: 96}}
                        className={"business-startup-input-style"}
                        disabled={true}
                    />
                )
            },
            {
                title: () => (
                    <>
                        <Row>
                            <Text style={textStyleInTable}>Grace period (mo.) </Text>
                            <TooltipComponent code="bstartinvestbf8" type="text"/>
                        </Row>
                    </>
                ),
                dataIndex: 'grace_period',
                key: 'grace_period',
                width: '19%',
                render: (text, obj, record) => (
                    <Select defaultValue={this.props.investments.original.grace_period === null ? 0 : this.props.investments.original.grace_period}
                        suffixIcon={<CaretDownFilled />}
                        style={{width: 128}}
                        className={"business-startup-selector-style"}
                        disabled={true}
                    >
                        {gracePeriodOptions}
                    </Select>
                )
            },
        ]

        const loanShortTermColumn = [
            {
                title: () => (<Text style={textStyleInTable}>Loan amount</Text>),
                dataIndex: 'loan_amount_short',
                key: 'loan_amount',
                width: '46%',
                render: (text, obj, record) => (
                    text === null ? <Text style={loanAmountText}>€0</Text> : <Text style={loanAmountText}>€{text}</Text>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Payment period<TooltipComponent code="bstartinvestbf2" type="text"/></Text>),
                dataIndex: 'payment_period_short',
                key: 'payment_period',
                width: '18.5%',
                render: (text, obj, record) => (
                    <Select 
                        defaultValue={this.props.investments.original.payment_period_short === null ? 1 : this.props.investments.original.payment_period_short} 
                        suffixIcon={<CaretDownFilled />}
                        style={{width: 112}}
                        className={"business-startup-selector-style"}
                        disabled={true}
                    >
                        {shortLoanPaymentPeriodOptions}
                    </Select>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Interest rate<TooltipComponent code="bstartinvestbf3" type="text"/></Text>),
                dataIndex: 'interest_rate_short',
                key: 'interest_rate',
                width: '16.5%',
                render: (text, obj, record) => (
                    <InputNumber
                        size="large"
                        defaultValue={this.props.investments.original.interest_rate_short === null ? 0 + ' %' : this.props.investments.original.interest_rate_short + ' %'}
                        formatter={value => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        style={{width: 96}}
                        className={"business-startup-input-style"}
                        disabled={true}
                    />
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Grace period (mo.)<TooltipComponent code="bstartinvestbf4" type="text"/></Text>),
                dataIndex: 'grace_period_short',
                key: 'grace_period',
                width: '19%',
                render: (text, obj, record) => (
                    <Select defaultValue={this.props.investments.original.grace_period_short === null ? 0 : this.props.investments.original.grace_period_short}
                        suffixIcon={<CaretDownFilled />}
                        style={{width: 128}}
                        className={"business-startup-selector-style"}
                        disabled={true}
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
                                <TextHelper code="bstartinvestfinancing" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Table
                                    title={() => (
                                        <div>
                                            <Row>
                                                <div>
                                                    <Text>Loan (Long term)<TooltipComponent code="bstartinvestbf1" type="text"/></Text>
                                                </div>
                                            </Row>
                                        </div>
                                    )}
                                    dataSource={loanLongDataSource}
                                    columns={loanLongTermColumn}
                                    pagination={false}
                                />
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Table
                                    title={() => (
                                        <div>
                                            <Row>
                                                <div>
                                                    <Text>Loan (Short term)<TooltipComponent code="bstartinvestbf5" type="text"/></Text>
                                                </div>
                                            </Row>
                                        </div>
                                    )}
                                    dataSource={loanShortDataSource}
                                    columns={loanShortTermColumn}
                                    pagination={false}
                                />
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
        investments: state.businessInvestments,
    };
}

export default connect(mapStateToProps, { changeVisibility, changePaymentPeriod, changePaymentPeriodShort, changeInterestRate, changeInterestRateShort, changeGracePeriod, changeGracePeriodShort })(BusinessStartUpInvestments);