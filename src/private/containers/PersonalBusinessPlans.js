import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Typography, Button, Tabs, Layout } from 'antd';
import { buttonStyle, pageHeaderStyle } from '../../styles/customStyles';
import PlanElementComponent from '../components/PlanElementComponent';
import NewBusinessPlanModal from "../components/NewBusinessPlanModal";
import { getPlans, getSelectedPlan, getImage, getPlansOverview } from "../../appStore/actions/planActions";
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import { logout } from '../../appStore/actions/authenticationActions';
import { changeState } from '../../appStore/actions/homeAction'
import Cookies from 'js-cookie';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;


class PersonalBusinessPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            isVisible: false,
        }
    }
    changeTabKey = (activeKey) => {
        let activeTabString = activeKey.toString();
        this.setState({
            activeTab: activeTabString
        })

    }

    openModal = () => {
        this.setState({
            isVisible: true,
        })
    };

    closeModal = () => {
        this.setState({
            isVisible: false,
        });

        this.props.changeState(true);
    };

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            this.props.getPlans()
                .then(() => {
                    this.props.personalPlans.forEach(plan => {
                        this.props.getImage(plan);
                        this.props.getPlansOverview(plan.id);


                    });
                });
            this.props.getTooltips();


            this.setState({
                isVisible: this.props.homeReducer
            })



        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }

    render() {
        const isVisible = this.state.isVisible;
        return (
            <Layout style={{ backgroundColor: '#F5F5F5' }}>
                <Content>
                    <Row>
                        <Col span={10} offset={2} >
                            <Title level={2} style={{ ...pageHeaderStyle }}>My business plans</Title>
                        </Col>
                        <Col span={10}>
                            <div style={{ float: "right", marginTop: "40px" }}>
                                <Button
                                    type="text"
                                    style={{ ...buttonStyle }}
                                    size="large"
                                    hidden
                                >
                                    Import
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ ...buttonStyle, marginLeft: 32 }}
                                    size="large"
                                    onClick={this.openModal.bind(this)}
                                >
                                    Create Plan
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} offset={2}>
                            <Tabs activeKey={this.state.activeTab} onChange={this.changeTabKey}>
                                <TabPane tab="All" key="1">
                                    <PlanElementComponent tabKey={this.state.activeTab} />
                                </TabPane>
                                <TabPane tab="In Progress" key="2">
                                    <PlanElementComponent tabKey={this.state.activeTab} />
                                </TabPane>
                                <TabPane tab="Completed" key="3">
                                    <PlanElementComponent tabKey={this.state.activeTab} />
                                </TabPane>
                                <TabPane tab="Shared With me" key="4">
                                    <PlanElementComponent tabKey={this.state.activeTab} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                    <NewBusinessPlanModal visibility={isVisible} handleClose={this.closeModal} />
                </Content>
            </Layout>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans,
        homeReducer: state.homeReducer.status
    };
}

export default connect(mapStateToProps, { getPlans, getSelectedPlan, getImage, getPlansOverview, getTooltips, logout, changeState })(withRouter(PersonalBusinessPlans));