import React, { Component } from 'react';
import { Row, Col, Typography, Button, Tabs } from 'antd';
import { buttonStyle } from '../../styles/customStyles';
import PlanElementComponent from '../components/PlanElementComponent';

const { Title } = Typography;
const { TabPane } = Tabs;

const position = { 'position': 'fixed', 'left': '50%', 'transform': 'translate(-50%)' }

class PersonalBusinessPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
        }
    }
    
    changeTabKey = (activeKey) => {
        let activeTabString = activeKey.toString();
        this.setState({
            activeTab: activeTabString
        })

    }

    render() {
        return (
            <Row style={{ ...position, marginTop: 64, width: 1200 }}>
                <Col span={12} style={{ marginTop: 41 }}>
                    <Title level={2} style={{ textAlign: 'left', color: '#262626', fontWeight: 600 }}>My business plans</Title>
                </Col>
                <Col span={12} style={{ marginTop: 41 }}>
                    <div style={{ float: 'right' }}>
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
                        >
                            Create Plan
                        </Button>
                    </div>
                </Col>
                <Tabs activeKey={this.state.activeTab} onChange={this.changeTabKey}>
                        <TabPane tab="All" key="1">
                            <PlanElementComponent tabKey={this.state.activeTab}/>
                        </TabPane>
                        <TabPane tab="In Progress" key="2">
                            <PlanElementComponent tabKey={this.state.activeTab}/>
                        </TabPane>
                        <TabPane tab="Completed" key="3">
                            <PlanElementComponent tabKey={this.state.activeTab}/>
                        </TabPane>
                        <TabPane tab="Shared With me" key="4">
                            <PlanElementComponent tabKey={this.state.activeTab}/>
                        </TabPane>
                </Tabs>
            </Row>
        );
    }
}

export default PersonalBusinessPlans;