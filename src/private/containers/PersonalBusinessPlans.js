import React, { Component } from 'react';
import { Row, Col, Typography, Button, Tabs, Layout } from 'antd';
import { buttonStyle, pageHeaderStyle } from '../../styles/customStyles';
import PlanElementComponent from '../components/PlanElementComponent';
import NewBusinessPlanModal from "../components/NewBusinessPlanModal";

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
    };

    render() {
        const isVisible = this.state.isVisible;
        return (
            <Layout style={{ backgroundColor: '#F5F5F5'}}>
                <Content style={{ marginTop: "40px"}}>
                    <Row wrap={false} justify="center" align="middle">
                        <Col span={20}>
                            <div style={{display: "flex"}}>
                                <Col span={12}>
                                    <Title level={2} style={{ ...pageHeaderStyle}}>My business plans</Title>
                                </Col>
                                <Col span={12}>
                                    <div style={{float: "right", marginTop: "40px"}}>
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

export default PersonalBusinessPlans;