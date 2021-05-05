import React, { Component } from 'react';
import { Row, Col, Typography, Button, Tabs, Card } from 'antd';
import { buttonStyle } from '../../styles/customStyles';
import PlanElementComponent from '../components/PlanElementComponent';

const { Title } = Typography;
const { TabPane } = Tabs;

const position = { 'position': 'fixed', 'left': '50%', 'transform': 'translate(-50%)' }

class PersonalBusinessPlans extends Component {

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
                <Tabs defaultActiveKey="1" >
                        <TabPane tab="All" key="1">
                            <PlanElementComponent/>
                        </TabPane>
                        <TabPane tab="In Progress" key="2">
                            COntent of Tab 2
                        </TabPane>
                        <TabPane tab="Completed" key="3">
                            Content of Tab 3
                        </TabPane>
                        <TabPane tab="Shared With me" key="4">
                            Content of Tab 4
                        </TabPane>
                </Tabs>
            </Row>
        );
    }
}

export default PersonalBusinessPlans;