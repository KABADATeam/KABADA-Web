import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Switch, Tabs, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import StrengthsWeaknesses from '../components/Swot/StrengthsWeaknesses';
import OpportunitiesThreats from '../components/Swot/OpportunitiesTreats';
// import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { getSwotList, discardChanges, saveChanges, saveState } from "../../../appStore/actions/swotAction";
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import { logout } from '../../../appStore/actions/authenticationActions';
import Cookies from 'js-cookie';
import TooltipComponent from '../../components/Tooltip';
import TextHelper from '../../components/TextHelper';

const { TabPane } = Tabs;
const { Text } = Typography;

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
    marginRight: '40px'
}

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",

    border: "1px solid #BFBFBF",
    boxSizing: "border-box",

    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent"
}

class SwotWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisibleHeader: 'hidden'
        }
    }
    onBackClick() {
        this.props.history.push(`/public/overview`);
    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    discardChanges = () => {
        this.props.discardChanges();
    };

    saveChanges = () => {
        this.props.saveChanges(this.props.businessPlan.id, () => {
            this.props.getSwotList(this.props.businessPlan.id, () => {

            });
        });
    };

    arrayEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));

        let original = array1;
        let modified = array2;

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        if(a !== b) return false;
        
        return true;
    }

    getUpdatesWindowState() {

        if (this.props.swot.original.strengths_weakness_items.length > 0 ||
            this.props.swot.original.oportunities_threats > 0) {
            const originalStrengths = JSON.stringify(this.props.swot.original_updates.strengths)
            const modifiedStrengths = JSON.stringify(this.props.swot.updates.strengths)
            const originalOpportunities = JSON.stringify(this.props.swot.original_updates.opportunities)
            const modifiedOpportunities = JSON.stringify(this.props.swot.updates.opportunities)

            if (this.arrayEqual(originalStrengths, modifiedStrengths) === false) {
                return 'visible';
            }
            if (this.arrayEqual(originalOpportunities, modifiedOpportunities) === false) {
                return 'visible'
            }
        }
        return 'hidden'
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getSwotList(this.props.businessPlan.id, () => {
    
                        });
                    });
                }
            } else {
                this.props.getSwotList(this.props.businessPlan.id, () => {
    
                });
            }
        }else{
            this.props.logout()
            this.props.history.push('/')
            
        }
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
        return (
            <>
                <Col span={20} offset={2}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/public-business-plans'>Public Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            SWOT
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>SWOT</Text>
                            <TooltipComponent code='swot' type='title'/>
                        </div>
                    </Col>
                </Row>

                <Col span={20} offset={2}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Overall" key="1">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>Strengths and weaknesses</Typography.Title>
                                        <TextHelper code="swotsw" type="lefttext"/>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <StrengthsWeaknesses planId={this.props.businessPlan.id} getUpdatesWindowState={this.getUpdatesWindowState} />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={aboutTitleTextStyle}>Opportunities and threats</Typography.Title>
                                        <TextHelper code="swotot" type="lefttext"/>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <OpportunitiesThreats getUpdatesWindowState={this.getUpdatesWindowState} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Strengths and weaknesses" key="2">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>Strengths and weaknesses</Typography.Title>
                                        <TextHelper code="swotsw" type="lefttext"/>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <StrengthsWeaknesses getUpdatesWindowState={this.getUpdatesWindowState} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Opportunities and threats" key="3">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={aboutTitleTextStyle}>Opportunities and threats</Typography.Title>
                                        <TextHelper code="swotot" type="lefttext"/>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <OpportunitiesThreats getUpdatesWindowState={this.getUpdatesWindowState} />
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        swot: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, getSwotList, discardChanges, saveChanges, saveState, refreshPlan,logout })(withRouter(SwotWindow));