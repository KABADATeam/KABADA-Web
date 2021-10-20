import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
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

const assetsDataSource = [
    {
        resource_id: "1",
        asset_title: 'Transport',
        resource_title: "Volvo",
        resource_status: 'Buy',
        total_amount: null,
        vat: null,
    },
    {
        resource_id: "2",
        asset_title: 'Transport',
        resource_title: "Scania",
        resource_status: 'Own',
        total_amount: null,
        vat: null,
    },
    {
        resource_id: "3",
        asset_title: 'Transport',
        resource_title: "BMW",
        resource_status: 'Own',
        total_amount: null,
        vat: null,
    },
]


class BusinessStartUpInvestments extends React.Component {
    state = {
        period: 12,
        vat_payer: true,
        total_investments: null, 
        own_assets: null,
        investments_amount: null,
        own_money: null, 
        loan_amount: null,
        payment_period: null, 
        interest_rate: null, 
        grace_period: null, 
        physical_assets: this.props.data,
        original_physical_assets: this.props.originalData,
        isDisabledVatSelection: null, 
        investment_object: this.props.physical_assets_object
    }
    onPeriodSelectionChange(value) {
        this.setState({
            period: value,
        });
        console.log(value);
    }
    onVatPayerSelectionChange(value) {
        this.setState({
            vat_payer: value,
        });
        console.log(value);
    }
    render() {
        
        
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
                                                <Select defaultValue={12 + " mo."} suffixIcon={<CaretDownFilled />} size='default' onSelect={this.onPeriodSelectionChange.bind(this)}>
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
                                                <Select defaultValue={this.state.vat_payer} suffixIcon={<CaretDownFilled />} onChange={this.onVatPayerSelectionChange.bind(this)}>
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
                                    <div style={{ marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row style={{ ...titleTextStyle, marginBottom: 16 }}>
                                            <div>
                                                <Text>Working capital</Text>
                                            </div>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16} style={{ marginTop: 5 }}>
                                                <Text>My initial guess, how big Working Capital I need</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <InputNumber
                                                        size="large"
                                                        defaultValue="0"
                                                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={16}>
                                                <div style={{ marginTop: 5 }}>
                                                    <Text>How much can I invest my money?</Text>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <InputNumber
                                                        size="large"
                                                        defaultValue="0"
                                                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider />
                                        <Row>
                                            <Col span={16}>
                                                <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>Loan (Short term)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{...titleTextStyle, marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row>
                                            <Col span={16}>
                                                <Text>Total additional investments needed to start a business</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
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

export default connect(mapStateToProps)(BusinessStartUpInvestments);