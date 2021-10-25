import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Input, Table, Tooltip, Space } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { changeVisibility, changePeriod, changeVatPrayer, changeLoanAmount, changeWorkingCapitalAmount, changeOwnMoneyShort } from "../../../appStore/actions/businessInvestmentAction";
import { CaretDownFilled, UserOutlined, InfoCircleFilled } from '@ant-design/icons';

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

const months = [
    {
        own_amount: 10,
        loan_amount: 30,
    },
    {
        own_amount: 100,
        loan_amount: 100,
    },
    {
        own_amount: 1000,
        loan_amount: 300
    }
]

class WorkingCapital extends React.Component {
    state = {
        period: null,
        vat_payer: null,
        own_money: null,
        loan_amount: null,
        working_capital_amount: null,
        own_money_short: null,
        loan_amount_short: null,
        working_capital: [],
        original_object:[],
        updated_object: [],
    }
    onPeriodSelectionChange(value) {
        this.setState({
            period: value,
        });
        this.props.changePeriod(value);
        this.arraysEqual(this.state.original_object);
    }
    onVatPayerSelectionChange(value) {
        this.setState({
            vat_payer: value,
        });
        this.props.changeVatPrayer(value);
        this.arraysEqual(this.state.original_object);
    }
    onLoanAmountChange = (e) => {
        const getLoanAmount = this.props.data.total_investments - this.props.data.own_assets - this.props.data.own_money;
        this.setState({
            own_money: e.target.value,
            loan_amount: getLoanAmount,
        })
        this.props.changeLoanAmount(Number(e.target.value), getLoanAmount);
        this.arraysEqual(this.state.original_object);
    }
    onWorkingCapitalAmount = (e) => {
        this.props.changeWorkingCapitalAmount(Number(e.target.value));
        this.arraysEqual(this.state.original_object);
    }
    onOwnMoneyShortChange = (e) => {
        const loan_amount_short = this.props.data.working_capital_amount - e.target.value;
        this.setState({
            own_money_short: e.target.value,
            loan_amount_short: loan_amount_short
        })
        this.props.changeOwnMoneyShort(Number(e.target.value), loan_amount_short);
        this.arraysEqual(this.state.original_object);
    }

    setOriginalObject = (data) => {
        const array = []
        const obj = {
            period: data.period === null ? 12 : data.period,
            vat_payer: data.vat_payer,
            own_money: data.own_money === null ? 0 : data.own_money,
            loan_amount: data.loan_amount === null ? 0 : data.loan_amount,
            working_capital_amount: data.working_capital_amount === null ? 0 : data.working_capital_amount,
            own_money_short: data.own_money_short === null ? 0 : data.own_money_short,
            loan_amount_short: data.loan_amount_short === null ? 0 : data.loan_amount_short
        }
        array.push(obj);
        this.setState({
            original_object: array,
        })
    }
    setUpdatedObject = () => {
        const array = []
        const obj = {
            period: this.state.period,
            vat_payer: this.state.vat_payer,
            own_money: this.state.own_money,
            loan_amount: this.state.loan_amount,
            working_capital_amount: this.state.working_capital_amount,
            own_money_short: this.state.own_money_short,
            loan_amount_short: this.state.loan_amount_short
        }
        array.push(obj);
        this.setState({
            updated_object: array,
        })
    }
    arraysEqual = (array1) => {
        let a = JSON.parse(JSON.stringify(array1));
        let array2 = [];
        const obj = {
            period: this.state.period,
            vat_payer: this.state.vat_payer,
            own_money: this.state.own_money,
            loan_amount: this.state.loan_amount,
            working_capital_amount: this.state.working_capital_amount,
            own_money_short: this.state.own_money_short,
            loan_amount_short: this.state.loan_amount_short
        }
        array2.push(obj);
        let b = JSON.parse(JSON.stringify(array2));
        let original = array1;
        let modified = array2;
        console.log('test')
        console.log(original)
        console.log(modified)
        if (a === b) {
            this.props.changeVisibility('hidden');
        }
        //if (a == null || b == null) return this.props.changeVisibility('visible');
        //if (a.length !== b.length) return this.props.changeVisibility('visible');

        a = a.sort();
        b = b.sort();
        for (var i = 0; i < original.length; ++i) {
            if (original[i].period !== modified[i].period || 
                original[i].vat_payer !== modified[i].vat_payer ||
                original[i].own_money !== modified[i].own_money ||
                original[i].loan_amount !== modified[i].loan_amount ||
                original[i].working_capital_amount !== modified[i].working_capital_amount ||
                original[i].own_money_short !== modified[i].own_money_short ||
                original[i].loan_amount_short !== modified[i].loan_amount_short 
                ) {
                // console.log('Original price:' + original[i].price + ", modified price is: " + modified[i].price)
                console.log('They are not equal')
                this.props.changeVisibility('visible')
                //return 'visible';
            }
        }
    }
    componentDidMount() {
        this.setOriginalObject(this.props.data);
    }
    render() {
        const default_vat_prayer_value = this.props.data.vat_payer === null ? true : this.props.data.vat_payer;
        const getLoanAmount = this.props.data.total_investments - this.props.data.own_assets - this.props.data.own_money;
        const dataWorkingCapitalV1 = [{
            title: 'Startup',
            own_amount: this.props.data.own_money_short,
            loan_amount: this.props.data.loan_amount_short,
            total_necessary: 0
        }]
        const newMonthsArray = []

        months.forEach((item, index) => {
            const obj = {
                month: index + 1,
                own_amount: item.own_amount,
                loan_amount: item.loan_amount
            }
            if (index === 0) {
                const objUnique = {
                    month: 'Startup',
                    own_amount: 1000,
                    loan_amount: 1000
                }
                newMonthsArray.push(objUnique);
            }
            newMonthsArray.push(obj);
        })

        const workingCapitalColumnsV1 = [
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
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
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
                            defaultValue={text === null ? 0 : text}
                            onChange={e => this.onOwnMoneyShortChange(e)}
                        />
                    </div>

                )
            },
            {
                title: () => (
                    <Space>
                        <Text>Loan Amount</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
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
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
                        </Tooltip>
                    </Space>
                ),
                dataIndex: 'total',
                key: 'total',
                width: '25%',
                align: 'right',
                render: (text, obj, record) => (
                    <Text style={{ color: '#CF1322' }}>-</Text>
                )
            },
        ];
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
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
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
                            defaultValue={text === null ? 0 : text}
                            onChange={e => this.props.changeOwnMoneyShort(Number(e))}
                        />
                    </div>

                )
            },
            {
                title: () => (
                    <Space>
                        <Text>Loan Amount</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
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
                                defaultValue={text === null ? 0 : text}
                            />
                        </div>
                )
            },

            {
                title: () => (
                    <Space>
                        <Text>Total Necessary</Text>
                        <Tooltip title="Tooltip text">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF'}}  />
                        </Tooltip>
                    </Space>
                ),
                dataIndex: 'total',
                key: 'total',
                width: '25%',
                align: 'right',
                render: (text, obj, record) => (
                    <Text style={{ color: '#CF1322' }}>-</Text>
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
                                                <Select defaultValue={this.props.data.period === null ? 12: this.props.data.period} suffixIcon={<CaretDownFilled />} size='default' onSelect={this.onPeriodSelectionChange.bind(this)}>
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
                                                <Select defaultValue={default_vat_prayer_value} suffixIcon={<CaretDownFilled />} onChange={this.onVatPayerSelectionChange.bind(this)}>
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
                                                    <Text>{this.props.data.total_investments}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Own Assets (physical & intellectual)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>{this.props.data.own_assets}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Additional necessary funds for investments in assets</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>{this.props.data.investment_amount}</Text>
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
                                                        onChange={e => this.onLoanAmountChange(e)}
                                                        defaultValue={this.props.data.loan_amount}
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
                                                    <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>{getLoanAmount}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row style={{ ...titleTextStyle, marginBottom: 16 }}>
                                            <div>
                                                <Text>Working capital</Text>
                                                <Tooltip title="Tooltip text">
                                                    <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                                                </Tooltip>
                                            </div>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16} style={{ marginTop: 5 }}>
                                                <Text>My initial guess, how big Working Capital I need</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Input style={{ width: 103 }}
                                                        prefix="€"
                                                        size="large"
                                                        defaultValue={this.props.data.working_capital_amount}
                                                        onChange={e => this.onWorkingCapitalAmount(e)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Table
                                                    dataSource={dataWorkingCapitalV1}
                                                    columns={workingCapitalColumnsV1}
                                                    pagination={false}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row style={{ ...titleTextStyle, marginBottom: 16 }}>
                                            <div>
                                                <Text>Working capital</Text>
                                                <Tooltip title="Tooltip text">
                                                    <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                                                </Tooltip>
                                            </div>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16} style={{ marginTop: 5 }}>
                                                <Text>My initial guess, how big Working Capital I need</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Input style={{ width: 103 }}
                                                        prefix="€"
                                                        size="large"
                                                        defaultValue={this.props.data.working_capital_amount}
                                                        onChange={e => this.onWorkingCapitalAmount(e)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Table
                                                    dataSource={newMonthsArray}
                                                    columns={workingCapitalColumnsV2}
                                                    pagination={false}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
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
        investments: state.businessInvestment,
    };
}

export default connect(mapStateToProps, {changeVisibility, changePeriod, changeVatPrayer, changeLoanAmount, changeWorkingCapitalAmount, changeOwnMoneyShort})(WorkingCapital);