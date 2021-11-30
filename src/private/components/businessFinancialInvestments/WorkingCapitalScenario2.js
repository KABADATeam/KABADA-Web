import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Input, Table, Tooltip, Space } from 'antd';
import { connect } from 'react-redux';
import { changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital, updateWorkingCapitalMyMoney, updateWorkingCapitalLoanAmount } from "../../../appStore/actions/businessInvestmentAction";
import { InfoCircleFilled } from '@ant-design/icons';

const { Text } = Typography;



class WorkingCapitalScenario2 extends React.Component {
    state = {
        working_capital_for_table: [], //used in table
    }

    dataWorkingCapitalTest = (data) => {
        const newMonthsArray = []
        console.log(data.original.grace_period_short);
        if (data.original.grace_period_short > 0 && data.original.working_capital !== null) {
            const objUnique = {
                month: 'Startup',
                own_amount: data.original.own_money_short,
                loan_amount: data.original.loan_amount_short,
                total_necessary: null,
            }
            newMonthsArray.push(objUnique);
            for (var i = 1; i < data.original.grace_period_short + 1; i++) {
                const monthRow = {
                    month: i,
                    own_amount: null,
                    loan_amount: null,
                    total_necessary: this.props.totalNecessary.necessaryCapital[i]
                }
                console.log(monthRow)
                newMonthsArray.push(monthRow)
            }
        }
        this.setState({
            working_capital_for_table: newMonthsArray,
        })
    }
    componentDidMount() {
        this.dataWorkingCapitalTest(this.props.investments);
    }

    render() {
        const dataWorkingCapital = [{
            title: 'Startup',
            own_amount: this.props.investments.updates.own_money_short,
            loan_amount: this.props.investments.updates.loan_amount_short,
        }]
        const workingCapitalColumns = [
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
                    record === 0 ?
                        <div style={{ float: 'right' }}>
                            <Input style={{ width: 103 }}
                                prefix="€"
                                size="large"
                                defaultValue={text === null ? '' : text}
                                onChange={e => this.props.changeOwnMoneyShort(e.target.value)}
                            />
                        </div>
                        :
                        <div style={{ float: 'right' }}>
                            <Input style={{ width: 103 }}
                                prefix="€"
                                size="large"
                                defaultValue={text === null ? '' : text}
                                onChange={e => this.props.updateWorkingCapitalMyMoney(e.target.value, record)}
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
                                onChange={e => this.props.updateWorkingCapitalLoanAmount(e.target.value, record)}
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
                <div style={{ marginTop: 24 }}>
                    <Row>
                        <Col span={24}>
                            <Table
                                title={() => (
                                    <div>
                                        <Row style={{ marginBottom: 16 }}>
                                            <div>
                                                <Text>Working capital</Text>
                                                <Tooltip title="Tooltip text">
                                                    <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                                                </Tooltip>
                                            </div>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16} style={{ marginTop: 5 }}>
                                                <Text style={{ fontWeight: 400, fontSize: 14 }}>My initial guess, how big Working Capital I need</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Input style={{ width: 103 }}
                                                        prefix="€"
                                                        size="large"
                                                        defaultValue={this.props.investments.original.working_capital_amount === null ? 0 : this.props.investments.original.working_capital_amount}
                                                        onChange={e => this.props.changeWorkingCapitalAmount(e.target.value)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                dataSource={this.state.working_capital_for_table}
                                columns={workingCapitalColumns}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        investments: state.businessInvestments,
        totalNecessary: state.necessaryCapital
    };
}

export default connect(mapStateToProps, { changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital, updateWorkingCapitalMyMoney, updateWorkingCapitalLoanAmount })(WorkingCapitalScenario2);