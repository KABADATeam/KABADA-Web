import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Input, Table, Tooltip, Space } from 'antd';
import { connect } from 'react-redux';
import { changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital } from "../../../appStore/actions/businessInvestmentAction";
import { InfoCircleFilled } from '@ant-design/icons';

const { Text } = Typography;


class WorkingCapitalScenario1 extends React.Component {
    
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
                    <Text>Startup</Text> 
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
                    <Text>{text}</Text> 
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
                                dataSource={dataWorkingCapital}
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
    };
}

export default connect(mapStateToProps, {changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital })(WorkingCapitalScenario1);