import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Input } from 'antd';
import { tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { changeVisibility, changePeriod, changeVatPrayer, changeOwnMoney, changeWorkingCapitalAmount, changeOwnMoneyShort, changeWorkingCapital } from "../../../appStore/actions/businessInvestmentAction";
import { CaretDownFilled } from '@ant-design/icons';
import WorkingCapitalScenario1 from './WorkingCapitalScenario1';
import WorkingCapitalScenario2 from './WorkingCapitalScenario2';
import TooltipComponent from '../Tooltip';
import '../../../css/BusinessInvestment.css'
import TextHelper from '../TextHelper';

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

class WorkingCapital extends React.Component {

    render() {
        const periodDefaultValue = this.props.investments.original.period === null ? 12 : this.props.investments.original.period;
        return (
            <>  {
                periodDefaultValue === undefined ?
                    <div></div>
                    :
                    <Col span={24} >
                        <Row style={{ marginBottom: "50px" }}>
                            <Col span={8}>
                                <div style={{ marginRight: '40px' }}>
                                    <Typography.Title style={{ ...aboutTitleTextStyle }}>Business start-up investments</Typography.Title>
                                    <TextHelper code="bstartinvestcapital" type="lefttext"/>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div>
                                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                        <div style={{ display: 'flex' }}>
                                            <Col span={12}>
                                                <div style={{ marginTop: 24, marginLeft: 16 }}>
                                                    <Text style={{ ...titleTextStyle }}>What Period?</Text>
                                                    <TooltipComponent code="bstartinvestwc1" type="text" />
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div style={{ float: "right", marginTop: 16, marginRight: 16 }}>
                                                    <Select 
                                                        defaultValue={periodDefaultValue} 
                                                        suffixIcon={<CaretDownFilled />} 
                                                        size='default' 
                                                        onSelect={value => this.props.changePeriod(value)} 
                                                        style={{ width: 90 }}
                                                        className={"business-startup-selector-style"}
                                                    >
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
                                                    <TooltipComponent code="bstartinvestwc2" type="text" />
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div style={{ float: "right", marginBottom: 16, marginRight: 16 }}>
                                                    <Select 
                                                        style={{ width: 71 }} 
                                                        defaultValue={this.props.investments.original.vat_payer === null ? true : this.props.investments.original.vat_payer} 
                                                        suffixIcon={<CaretDownFilled />} 
                                                        onChange={value => this.props.changeVatPrayer(value)}
                                                        className={"business-startup-selector-style"}
                                                    >
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
                                            <TooltipComponent code="bstartinvestwc3" type="text" />
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
                                                        <Text>How much can I invest my money?</Text>
                                                        <TooltipComponent code="bstartinvestwc4" type="text" />
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div style={{ float: 'right' }}>
                                                        <Input style={{ width: 103 }}
                                                            prefix="€"
                                                            size="large"
                                                            onChange={e => this.props.changeOwnMoney(e.target.value)}
                                                            defaultValue={this.props.investments.original.own_money}
                                                            className={"business-startup-input-style"}
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
            }
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