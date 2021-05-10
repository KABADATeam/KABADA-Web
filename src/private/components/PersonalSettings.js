import React, { Component } from 'react';
import { Row, Col, Typography, Button, Avatar, Input, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {buttonStyle} from '../../styles/customStyles';

const { Text } = Typography;

const inputStyle = {
    border: '1px solid #BFBFBF',
    borderRadius: "4px",
}

const CardStyle = {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '20px', paddingRight: '20px' };

class PersonalSettings extends Component {

    render() {
        return (
            <Row>
                <Col span={24} style={{marginBottom: "20px"}}>
                    <Card headStyle={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'left' }} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <Space>
                                <Avatar size={40} icon={<UserOutlined />}/>
                                <Button style={{...buttonStyle, marginLeft: 20}}>     
                                    Upload photo
                                </Button>
                                <Button style={{...buttonStyle, marginLeft: 8}}>     
                                    Remove photo
                                </Button>
                            </Space>
                        </Card.Grid>

                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <Row>
                                <Col span={12}>
                                    <Text>First name</Text>
                                    <Input style={inputStyle}/>
                                </Col>
                                <Col span={12}>
                                    <Text style={{ marginLeft: "10px"}}>Last name</Text>
                                    <Input style={{...inputStyle, marginLeft: "10px"}}/>
                                </Col>
                            </Row>         
                        </Card.Grid>                             
                    </Card>
                </Col>
                
            </Row>
        );
    }
}

export default PersonalSettings;