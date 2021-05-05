import React, { Component } from 'react';
import { Row, Col, Typography, Button, Avatar, Divider, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {buttonStyle} from '../../styles/customStyles';

const { Text, Paragraph } = Typography;

const position = { 'position': 'fixed', 'left': '50%', 'transform': 'translate(-50%)' }

const settingsTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
}

const settingsTextStyle = {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'left'
}

const personalDataCardStyle = {
    position: 'absolute',
    width: 792, 
    height: 191, 
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)',
}

const inputStyle = {
    border: '1px solid #BFBFBF',
    borderRadius: 4,
}

class PersonalSettings extends Component {

    render() {
        return (
            <Row style={{ ...position, marginTop: 64, width: 1200 }}>
                <Col span={8} style={{ marginTop: 41 }}>
                    <Row>
                        <Text style={settingsTitleTextStyle}>Personal data</Text>
                    </Row>
                    <Row>
                        <Paragraph style={{...settingsTextStyle, color: '#8C8C8C'}}>
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                        </Paragraph>
                    </Row>
                </Col>
                <Col span={16} style={{ marginTop: 41 }}>
                    <div style={{...personalDataCardStyle}}>
                        <Row>
                            <Col style={{marginTop: 20, marginLeft: 20}}>
                                <Avatar size={40} icon={<UserOutlined />}/>
                                <Button style={{...buttonStyle, marginLeft: 20}}>     
                                    Upload photo
                                </Button>
                                <Button style={{...buttonStyle, marginLeft: 8}}>     
                                    Remove photo
                                </Button>
                            </Col>
                        </Row>
                        <Divider style={{marginTop: 20}}/>
                        <Row style={{...settingsTextStyle, margin: 20}}>
                            <Col style={{width:366}}>
                                <Text>First name</Text>
                                <Input style={inputStyle}/>
                            </Col>
                            <Col style={{width:366, marginLeft: 20}}>
                                <Text>Last name</Text>
                                <Input style={inputStyle}/>
                            </Col>                 
                        </Row>                             
                    </div>
                </Col>
                
            </Row>
        );
    }
}

export default PersonalSettings;