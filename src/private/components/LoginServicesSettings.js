import React, { Component } from 'react';
import { Card, Row, Col, Button, Space } from 'antd';
import '../../css/customModal.css';
import { buttonStyle } from '../../styles/customStyles';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';

const CardStyle = {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '20px', paddingRight: '20px' };

class LoginServicesSettings extends Component {

    state = {
        disabledFacebook: true,
        disabledGoogle: true,
    };

    toggleDisableFacebook = () => {
        this.setState({ disabledFacebook: !this.state.disabledFacebook });
        console.log("Facebook:" + this.state.disabledFacebook);
    };

    toggleDisableGoogle = () => {
        this.setState({ disabledGoogle: !this.state.disabledGoogle });
        console.log("Google:" + this.state.disabledGoogle);
    };

    render() {

        return (
            <>
                <Row>
                    <Col span={24}>
                        <Card title="Login services" headStyle={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'left' }} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div><FacebookFilled /> Facebook</div>
                                    <Button size="large" style={{ ...buttonStyle }} onClick={this.toggleDisableFacebook.bind(this)}>
                                        {!this.state.disabledFacebook ? 'Disconnect' : 'Connect'}
                                    </Button>
                                </Space>
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div><GoogleCircleFilled /> Google</div>
                                    <Button size="large" style={buttonStyle} onClick={this.toggleDisableGoogle.bind(this)}>
                                        {!this.state.disabledGoogle ? 'Disconnect' : 'Connect'}
                                    </Button>
                                </Space>
                            </Card.Grid>
                        </Card >
                    </Col>
                </Row>
            </>
        )
    }
}

export default LoginServicesSettings;

