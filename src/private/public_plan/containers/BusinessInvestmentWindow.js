import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tab, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, RightSquareFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import WorkingCapital from '../components/businessFinancialInvestments/WorkingCapital';
import BusinessFinancing from '../components/businessFinancialInvestments/BusinessFinancing';
import { getBusinessStartUpInvestmentInformation, changeVisibility, saveChanges, getNecessaryCapitalInformation, saveState, recalculateInvestment, discardChanges } from "../../../appStore/actions/businessInvestmentAction";
import { getCountryShortCode } from '../../../appStore/actions/countriesActions';
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import '../../../css/BusinessInvestment.css';
import Cookies from 'js-cookie';
import { logout } from '../../../appStore/actions/authenticationActions';
import TooltipComponent from '../../components/Tooltip';

const { Text } = Typography;
const { TabPane } = Tabs;

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

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    getUpdatesWindowState() {
        let original = JSON.stringify(this.props.investments.original);
        let modified = JSON.stringify(this.props.investments.updates);
        if (original === modified) {
            return 'hidden'
        } else {
            return 'visible'
        }
    }

    componentDidMount() {
        if(Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null){
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPublicPlan(localStorage.getItem("plan"), () => {
                        this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id);
                        this.props.getNecessaryCapitalInformation(this.props.businessPlan.id);
                    });
                }
            } else {
                this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id);
                this.props.getNecessaryCapitalInformation(this.props.businessPlan.id);
            }
        }else{
            this.props.history.push('/login')
            this.props.logout()
        }
        
    }


    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
        return (
            <>
                <Col span={20} offset={2}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/public-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Financial projections
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={20} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Business start-up investments</Text>
                            <TooltipComponent code="bstartinvest" type="title"/>
                        </div>
                    </Col>
                </Row>
                <Col span={20} offset={2}>
                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab="Working capital" key="1">
                            <WorkingCapital/>
                        </TabPane>
                        <TabPane tab="Business Financing" key="2">
                            <BusinessFinancing/>
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
        totalNecessary: state.necessaryCapital,
    };
}
export default connect(mapStateToProps, { refreshPublicPlan, logout,getBusinessStartUpInvestmentInformation, getCountryShortCode, changeVisibility, saveChanges, getNecessaryCapitalInformation, saveState, getSelectedPlanOverview, recalculateInvestment, discardChanges })(BusinessInvestmentsWindow);