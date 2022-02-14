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

        this.props.history.push('/personal-business-plans/1')
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

            if (this.props.match.params.id == 0) {
                this.setState({
                    isVisible: true
                })
                console.log(this.state.isVisible)
            }
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
                    <Row wrap={false} justify="center" align="middle">
                        <Col span={20}>
                            <div style={{ display: "flex" }}>
                                <Col span={12}>
                                    <Title level={2} style={{ ...pageHeaderStyle }}>My business plans</Title>
                                </Col>
                                <Col span={12}>
                                    <div style={{ float: "right", marginTop: "40px" }}>
                                        <Button
                                            type="text"
                                            style={{ ...buttonStyle }}
                                            size="large"
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

                            </div>
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
                            <NewBusinessPlanModal visibility={isVisible} handleClose={this.closeModal} />
                        </Col>
                    </Row>
                </Content>
            </Layout>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans
    };
}

export default connect(mapStateToProps, { getPlans, getSelectedPlan, getImage, getPlansOverview, getTooltips, logout })(withRouter(PersonalBusinessPlans));