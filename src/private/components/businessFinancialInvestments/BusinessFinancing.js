import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, InputNumber, Select, Space, Table } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled } from '@ant-design/icons';
import { changeVisibility, changePaymentPeriod, changePaymentPeriodShort, changeInterestRate, changeInterestRateShort, changeGracePeriod, changeGracePeriodShort } from "../../../appStore/actions/businessInvestmentAction";

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
    state = {
        loan_amount: this.props.data.loan_amount,
        payment_period: this.props.data.payment_period,
        interest_rate: this.props.data.interest_rate,
        grace_period: this.props.data.grace_period,
        startup_loan_amount: this.props.data.startup_loan_amount,
        payment_period_short: this.props.data.payment_period_short,
        interest_rate_short: this.props.data.interest_rate_short,
        grace_period_short: this.props.data.grace_period_short,
        original_object: [],
        updated_object: []
    }
    componentDidMount() {
        this.setOriginalObject(this.props.data);
        this.setUpdatedObject(this.props.data);
        console.log(this.props.data);
    }
    setOriginalObject = (data) => {
        const array = []
        const obj = {
            payment_period: data.payment_period === null ? 0: data.payment_period,
            interest_rate: data.interest_rate === null ? 0: data.interest_rate,
            grace_period: data.grace_period === null ? 0 : data.grace_period,
            payment_period_short: data.payment_period_short === null ? 12: data.payment_period_short,
            interest_rate_short: data.interest_rate_short === null ? 0: data.interest_rate_short,
            grace_period_short: data.grace_period_short === null ? 0 : data.grace_period_short,
        }
        array.push(obj);
        this.setState({
            original_object: array,
        })
    }
    setUpdatedObject = (data) => {
        const array = []
        const obj = {
            payment_period: data.payment_period === null ? 0: data.payment_period,
            interest_rate: data.interest_rate === null ? 0: data.interest_rate,
            grace_period: data.grace_period === null ? 0 : data.grace_period,
            payment_period_short: data.payment_period_short === null ? 6: data.payment_period_short,
            interest_rate_short: data.interest_rate_short === null ? 0: data.interest_rate_short,
            grace_period_short: data.grace_period_short === null ? 0 : data.grace_period_short,
        }
        array.push(obj);
        this.setState({
            updated_object: array,
        })
    }
    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
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
            if (original[i].grace_period !== modified[i].grace_period || 
                original[i].grace_period_short !== modified[i].grace_period_short ||
                original[i].interest_rate !== modified[i].interest_rate ||
                original[i].interest_rate_short !== modified[i].interest_rate_short ||
                original[i].payment_period !== modified[i].payment_period ||
                original[i].payment_period_short !== modified[i].payment_period_short 
                ) {
                // console.log('Original price:' + original[i].price + ", modified price is: " + modified[i].price)
                console.log('They are not equal')
                this.props.changeVisibility('visible')
                //return 'visible';
            }
        }
    }
    updateProperties = (value, inputName) => {
        const array = this.state.updated_object

        array.forEach(item => {
            if (inputName === 'interest_rate') {
                item.interest_rate = Number(value);
                this.props.changeInterestRate(Number(value));
            } else if (inputName === 'payment_period') {
                item.payment_period = value;
                this.props.changePaymentPeriod(value);
            } else if (inputName === 'grace_period') {
                item.grace_period = value;
                this.props.changeGracePeriod(value);
            } else if (inputName === 'interest_rate_short') {
                item.interest_rate_short = Number(value);
                this.props.changeInterestRateShort(Number(value));
            } else if (inputName === 'payment_period_short') {
                item.payment_period_short = value;  
                this.props.changePaymentPeriodShort(value);
            } else if (inputName === 'grace_period_short') {
                item.grace_period_short = value;
                this.props.changeGracePeriodShort(value);
            }
        })
        this.setState({
            updated_object: array
        })
       this.arraysEqual(this.state.original_object, array);
    }
    render() {
        const gracePeriodSelectionArray = []
        for (let i = 0; i < (this.props.data.period - 5); i++) {
            gracePeriodSelectionArray[i] = {
                value: i,
                label: i + ' mo.'
            }
        }
        const gracePeriodOptions = gracePeriodSelectionArray.map((v, index) => (
            <Option value={v.value} key={v.value}>{v.label}</Option>
        ))
        const loanLongDataSource = [
            {
                loan_amount: this.props.data.loan_amount,
                payment_period: this.props.data.payment_period,
                interest_rate: this.props.data.interest_rate,
                grace_period: this.props.data.grace_period,
            },
        ]

        const loanShortDataSource = [
            {
                loan_amount_short: this.props.data.loan_amount_short,
                payment_period_short: this.props.data.payment_period_short,
                interest_rate_short: this.props.data.interest_rate_short,
                grace_period_short: this.props.data.grace_period_short,
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
                    <Select defaultValue={text === null ? 12 : text + " mo."} suffixIcon={<CaretDownFilled />} onChange={e => this.updateProperties(e, 'payment_period')}>
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
                title: () => (<Text style={textStyleInTable}>Interest rate</Text>),
                dataIndex: 'interest_rate',
                key: 'interest_rate',
                width: '20%',
                render: (text, obj, record) => (
                    <InputNumber
                        size="large"
                        defaultValue={this.props.data.interest_rate === null ? 0 + ' %' : this.props.data.interest_rate + ' %'}
                        formatter={value => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        onChange={e => this.updateProperties(e, 'interest_rate')}
                    />
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Grace period (mo.)</Text>),
                dataIndex: 'grace_period',
                key: 'grace_period',
                width: '20%',
                render: (text, obj, record) => (
                    <Select defaultValue={this.state.grace_period === null ? 0 : this.state.grace_period}
                        suffixIcon={<CaretDownFilled />}
                        onChange={e => this.updateProperties(e, 'grace_period')}
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
                width: '40%',
                render: (text, obj, record) => (
                    text === null ? <Text style={loanAmountText}>€0</Text> : <Text style={loanAmountText}>€{text}</Text>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Payment period</Text>),
                dataIndex: 'payment_period_short',
                key: 'payment_period',
                width: '20%',
                render: (text, obj, record) => (
                    <Select defaultValue={text === null ? 1 : text + " mo."} suffixIcon={<CaretDownFilled />} onChange={e => this.updateProperties(e, 'payment_period_short')}>
                        <Option value={1}>1 mo.</Option>
                        <Option value={2}>2 mo.</Option>
                        <Option value={3}>3 mo.</Option>
                        <Option value={4}>4 mo.</Option>
                        <Option value={5}>5 mo.</Option>
                        <Option value={6}>6 mo.</Option>
                        <Option value={7}>7 mo.</Option>
                        <Option value={8}>8 mo.</Option>
                        <Option value={9}>9 mo.</Option>
                        <Option value={10}>10 mo.</Option>
                        <Option value={11}>11 mo.</Option>
                        <Option value={12}>12 mo.</Option>
                        <Option value={13}>13 mo.</Option>
                        <Option value={14}>14 mo.</Option>
                        <Option value={15}>15 mo.</Option>
                        <Option value={16}>16 mo.</Option>
                        <Option value={17}>17 mo.</Option>
                        <Option value={18}>18 mo.</Option>
                        <Option value={19}>19 mo.</Option>
                        <Option value={20}>20 mo.</Option>
                        <Option value={21}>21 mo.</Option>
                        <Option value={22}>22 mo.</Option>
                        <Option value={23}>23 mo.</Option>
                        <Option value={24}>24 mo.</Option>
                    </Select>
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Interest rate</Text>),
                dataIndex: 'interest_rate_short',
                key: 'interest_rate',
                width: '20%',
                render: (text, obj, record) => (
                    <InputNumber
                        size="large"
                        defaultValue={this.props.data.interest_rate === null ? 0 + ' %' : this.props.data.interest_rate + ' %'}
                        formatter={value => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        onChange={e => this.updateProperties(e, 'interest_rate_short')}
                    />
                )
            },
            {
                title: () => (<Text style={textStyleInTable}>Grace period (mo.)</Text>),
                dataIndex: 'grace_period_short',
                key: 'grace_period',
                width: '20%',
                render: (text, obj, record) => (
                    <Select defaultValue={this.state.grace_period_short === null ? 0 : this.state.grace_period_short}
                        suffixIcon={<CaretDownFilled />}
                        onChange={e => this.updateProperties(e, 'grace_period_short')}
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
                                        dataSource={loanShortDataSource}
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
        investments: state.businessInvestments,
    };
}

export default connect(mapStateToProps, {changeVisibility, changePaymentPeriod, changePaymentPeriodShort, changeInterestRate, changeInterestRateShort, changeGracePeriod, changeGracePeriodShort})(BusinessStartUpInvestments);