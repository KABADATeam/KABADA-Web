import React from 'react';
import { Divider, Button, Breadcrumb, Row, Col, Typography } from 'antd';
import LoginServicesSettings from '../components/LoginServicesSettings';
import NotificationSettings from '../components/NotificationSettings';
import EmailPasswordSettings from '../components/EmailPasswordSettings';
import PersonalSettings from '../components/PersonalSettings';
import { buttonStyle } from '../../styles/customStyles';

import { ArrowLeftOutlined } from '@ant-design/icons';

const { Text } = Typography;

const settingsGroupTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
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

class UserSettingsWindow extends React.Component {

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    render() {        
        return (
            <>
                <Col span={16} offset = {4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <a href="personal-business-plans">My Business plans</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Settings
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col offset = {4}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col>
                        <Text style={{...titleTextStyle, marginLeft: "16px" }}>Settings</Text>
                    </Col>
                </Row>
                

                <Col span={16} offset = {4}>
                    <Divider />
                </Col>
                
                <Row>
                    <Col span={4} offset = {4}>
                        <Text style={settingsGroupTitleTextStyle}>Registration data</Text>
                    </Col>
                    <Col span={12}>
                        <EmailPasswordSettings />
                        <LoginServicesSettings />
                    </Col>
                </Row>

                <Col span={16} offset = {4}>
                    <Divider />
                </Col>
                
                <Row>
                    <Col span={4} offset = {4}>
                        <Text style={settingsGroupTitleTextStyle}>Personal data</Text>
                    </Col>
                    <Col span={12}>
                        <PersonalSettings />
                    </Col>
                </Row>

                <Col span={16} offset = {4}>
                    <Divider />
                </Col>
                
                <Row>
                    <Col span={4} offset = {4}>
                        <Text style={settingsGroupTitleTextStyle}>Notification settings</Text>
                    </Col>
                    <Col span={12}>
                        <NotificationSettings />
                    </Col>
                </Row>

                <Col span={16} offset = {4}>
                    <Divider />
                </Col>

                <Col span={16} offset = {4}>
                    <div style={{ float:"right", height: "200px" }}>
                        <Button style={{ ...buttonStyle, marginRight: "8px" }}>Discard</Button>
                        <Button type="primary" style={{ ...buttonStyle}}>Save</Button>
                    </div>
                </Col>
            </>     
        );
    }
}

export default UserSettingsWindow;