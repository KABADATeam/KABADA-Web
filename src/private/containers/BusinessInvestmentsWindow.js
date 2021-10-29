import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tab, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, RightSquareFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import WorkingCapital from '../components/businessFinancialInvestments/WorkingCapital';
import BusinessFinancing from '../components/businessFinancialInvestments/BusinessFinancing';
import { getBusinessStartUpInvestmentInformation, changeVisibility, updateBusinessStartUpInvestmentInformation, getNecessaryCapitalInformation, saveState, recalculateInvestment } from "../../appStore/actions/businessInvestmentAction";
import { getCountryShortCode } from '../../appStore/actions/countriesActions';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';

const { Text } = Typography;
const { TabPane } = Tabs

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
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

class BusinessInvestmentsWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleHeader: this.props.investments.visibility
        }
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));
        let original = array1;
        let modified = array2;

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

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
                return false;
            }
        }
        return true;
    }

    getUpdatesWindowState = (original, modified) => {
        if (original === null) {
            return 'hidden'
        }
        if (modified === null) {
            return 'hidden'
        }
        if (this.arraysEqual(original, modified) === false) {
            return 'visible'
        }
        return 'hidden'
    }
    saveChanges = () => {
        const postObject = {
            business_plan_id: this.props.businessPlan.id,
            period: this.props.investments.period === null ? 12 : this.props.investments.period,
            vat_payer: this.props.investments.vat_payer === null ? true : this.props.investments.vat_payer,
            own_money: this.props.investments.own_money,
            loan_amount: this.props.investments.loan_amount,
            working_capital_amount: this.props.investments.working_capital_amount,
            own_money_short: this.props.investments.own_money_short,
            loan_amount_short: this.props.investments.loan_amount_short,
            payment_period: this.props.investments.payment_period,
            interest_rate: this.props.investments.interest_rate,
            grace_period: this.props.investments.grace_period,
            payment_period_short: this.props.investments.payment_period_short,
            interest_rate_short: this.props.investments.interest_rate_short,
            grace_period_short: this.props.investments.grace_period_short,
            total_investments: this.props.investments.total_investments,
            own_assets: this.props.investments.own_assets,
            investment_amount: this.props.investments.investment_amount,
        }
        console.log(postObject);
        this.props.updateBusinessStartUpInvestmentInformation(postObject);
        this.props.changeVisibility('hidden');
    }
    recalChanges = () => {
        const postObject = {
            business_plan_id: this.props.businessPlan.id,
            working_capitals: this.props.investments.working_capital,
        }
        console.log(postObject)
        this.props.recalculateInvestment(postObject);
        this.props.changeVisibility('hidden');
    }
    discardChanges = () => {
        this.props.changeVisibility('hidden');
        this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id)
    }
    onCompletedChange(state) {
        console.log('test')
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id);   
                    this.props.getNecessaryCapitalInformation(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id);
            this.props.getNecessaryCapitalInformation(this.props.businessPlan.id);
        }
    }


    render() {
        console.log(this.props.totalNecessary);
        return (
            <>
                <UnsavedChangesHeader
                    visibility={this.props.investments.visibility}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Financial projections
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Business start-up investments</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.investments.is_business_investments_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>
                <Col span={16} offset={4}>
                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab="Working capital" key="1">
                            <WorkingCapital data={this.props.investments} totalNecessary={this.props.totalNecessary} updateWindowState={this.getUpdatesWindowState.bind(this)} />
                        </TabPane>
                        <TabPane tab="Business Financing" key="2">
                            <BusinessFinancing data={this.props.investments} />
                        </TabPane>
                    </Tabs>
                </Col>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        countryCode: state.countryShortCode,
        countryVats: state.countryVats,
        investments: state.businessInvestments,
        totalNecessary: state.necessaryCapital
    };
}
export default connect(mapStateToProps, { refreshPlan, getBusinessStartUpInvestmentInformation, getCountryShortCode, changeVisibility, updateBusinessStartUpInvestmentInformation, getNecessaryCapitalInformation, saveState, getSelectedPlanOverview, recalculateInvestment })(BusinessInvestmentsWindow);