import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Input, Table, Tooltip, Space } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { changeVisibility, changePeriod, changeVatPrayer, changeOwnMoney, changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital } from "../../../appStore/actions/businessInvestmentAction";
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ImportOutlined } from '@ant-design/icons';
import WorkingCapitalScenario1 from './WorkingCapitalScenario1';
import WorkingCapitalScenario2 from './WorkingCapitalScenario2';

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

const titleButtonStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #BFBFBF",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent",
}

class WorkingCapital extends React.Component {
    state = {
        working_capital_for_table: [], //used in table
    }

    setWorkingCapital = (data) => {
        const newMonthsArray = []
        if (data.original.grace_period_short === null) {
            const objUnique = {
                month: 'Startup',
                own_amount: data.updates.own_money_short,
                loan_amount: data.updates.loan_amount_short,
                total_necessary: null,
            }
            newMonthsArray.push(objUnique);
        } else if (data.original.grace_period_short === 0) {
            const objUnique = {
                month: 'Startup',
                own_amount: data.updates.own_money_short,
                loan_amount: data.updates.loan_amount_short,
                total_necessary: null,
            }
            newMonthsArray.push(objUnique);
        } else if (data.original.grace_period_short > 0 && data.original.working_capital === null) {
            const objUnique = {
                month: 'Startup',
                own_amount: data.original.own_money_short,
                loan_amount: data.original.loan_amount_short,
                total_necessary: null,
            }
            newMonthsArray.push(objUnique)
            for (var i = 1; i < data.grace_period_short + 1; i++) {
                const monthRow = {
                    month: i,
                    own_amount: null,
                    loan_amount: null,
                    total_necessary: this.props.totalNecessary.necessaryCapital[i] === null ? null : this.props.totalNecessary.necessaryCapital[i],
                }
                console.log(monthRow);
                newMonthsArray.push(monthRow)
            }
            console.log(newMonthsArray);
        } else if (data.grace_period_short > 0 && data.working_capital.length === null) {
            const objUnique = {
                month: 'Startup',
                own_amount: data.own_money_short,
                loan_amount: data.loan_amount_short
            }
            newMonthsArray.push(objUnique)
            console.log(newMonthsArray);
            for (var i = 1; i < data.grace_period_short + 1; i++) {
                const monthRow = {
                    month: i,
                    own_amount: null,
                    loan_amount: null,
                    total_necessary: this.props.totalNecessary.necessaryCapital[i]
                }
                newMonthsArray.push(monthRow)
            }
            console.log(newMonthsArray);
        }
        this.setState({
            working_capital_for_table: newMonthsArray
        })
    }
    componentDidMount() {
        this.setWorkingCapital(this.props.data);
    }
    render() {
        const workingCapitalColumnsV2 = [
            {
                title: 'Month',
                dataIndex: 'month',
                key: 'month',
                width: '32.5%',
                render: (text, obj, record) => (
                    record === 0 ? <Text>Startup</Text> : <Text>{text} month</Text>
                )
            },
            {
                title: () => (
                    <Space>
                        <Text>My money</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF' }} />
                        </Tooltip>
                    </Space>
                ),
                dataIndex: 'own_amount',
                key: 'own_amount',
                width: '20%',
                align: 'center',
                render: (text, obj, record) => (
                    <div style={{ float: 'right' }}>
                        <Input style={{ width: 103 }}
                            prefix="€"
                            size="large"
                            defaultValue={text === null ? '' : text}
                            onChange={e => this.props.changeOwnMoneyShort(e.target.value)}
                        />
                    </div>

                )
            },
            {
                title: () => (
                    <Space>
                        <Text>Loan Amount</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF' }} />
                        </Tooltip>
                    </Space>
                ),
                dataIndex: 'loan_amount',
                key: 'loan_amount',
                width: '22.5%',
                align: 'right',
                render: (text, obj, record) => (
                    record === 0 ? <Text>{text}</Text> :
                        <div style={{ float: 'right' }}>
                            <Input style={{ width: 103 }}
                                prefix="€"
                                size="large"
                                defaultValue={text === null ? '' : text}
                                onChange={e => this.updateWorkingItemsProperties(e.target.value, 'loan_amount', record)}
                            />
                        </div>
                )
            },

            {
                title: () => (
                    <Space>
                        <Text>Total Necessary</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF' }} />
                        </Tooltip>
                    </Space>
                ),
                dataIndex: 'total_necessary',
                key: 'total_necessary',
                width: '25%',
                align: 'right',
                render: (text, obj, record) => (
                    text === null ? <Text style={{ color: '#CF1322' }}>-</Text> : <Text style={{ color: '#CF1322' }}>{text}</Text>
                )
            },
        ];
        return (
            <>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business start-up investments</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Explanation … Before you start selling your product or service, you need to  understand what investments are needed to start your business. Bellow in this section are most  usuall investment categories for start-up business
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ display: 'flex' }}>
                                        <Col span={12}>
                                            <div style={{ marginTop: 24, marginLeft: 16 }}>
                                                <Text style={{ ...titleTextStyle }}>What Period?</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{ float: "right", marginTop: 16, marginRight: 16 }}>
                                                <Select defaultValue={this.props.investments.original.period === null ? 12 : this.props.investments.original.period} suffixIcon={<CaretDownFilled />} size='default' onSelect={value => this.props.changePeriod(value)}>
                                                    <Option value={12}>12 mo.</Option>
                                                    <Option value={24}>24 mo.</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                    <Divider />
                                    <div style={{ display: 'flex' }}>
                                        <Col span={12}>
                                            <div style={{ marginTop: 4, marginLeft: 16 }}>
                                                <Text style={{ ...titleTextStyle }}>Do you pay VAT</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{ float: "right", marginBottom: 16, marginRight: 16 }}>
                                                <Select defaultValue={this.props.investments.original.vat_payer === null ? true : this.props.investments.original.vat_payer} suffixIcon={<CaretDownFilled />} onChange={value => this.props.changeVatPrayer(value)}>
                                                    <Option value={true}>Yes</Option>
                                                    <Option value={false}>No</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Physical and Intellectual assets</Text>
                                    </div>
                                    <div style={{ margin: 16 }}>
                                        <Row style={{ marginBottom: 8 }}>

                                            <Col span={16}>
                                                <Text>Investments</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>{this.props.investments.total_investments}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Own Assets (physical & intellectual)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>{this.props.investments.own_assets}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Additional necessary funds for investments in assets</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>{this.props.investments.investment_amount}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={16}>
                                                <div style={{ marginTop: 13 }}>
                                                    <Text>How much can I invest my money? </Text>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Input style={{ width: 103 }}
                                                        prefix="€"
                                                        size="large"
                                                        onChange={e => this.props.changeOwnMoney(e.target.value)}
                                                        defaultValue={this.props.investments.original.own_money}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider />
                                        <Row>
                                            <Col span={16}>
                                                <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>Loan (Long term)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>{this.props.investments.updates.loan_amount === null ? this.props.investments.investment_amount : this.props.investments.updates.loan_amount}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                {this.props.investments.original.grace_period_short === 0 ?
                                    <Row>
                                        <Col span={24}>
                                            <WorkingCapitalScenario1 />
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col span={24}>
                                            <WorkingCapitalScenario2 />
                                        </Col>
                                    </Row>
                                }
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

export default connect(mapStateToProps, { changeVisibility, changePeriod, changeVatPrayer, changeOwnMoney, changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital })(WorkingCapital);