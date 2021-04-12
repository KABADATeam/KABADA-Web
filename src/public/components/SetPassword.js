import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../appStore/actions/authenticationActions';
import { connect } from 'react-redux';
import queryString from 'query-string';

import KabadaIcon from './KabadaIcon';

import { cardStyle, buttonStyle, textColor, inputStyle, linkStyle } from '../../styles/customStyles';

const spaceAlignContainer = { 'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center' };

const { Title } = Typography;

class SetPassword extends Component {

    onFinish = (values) => {
        if (values.password === values.confirmedPassword) {
            const params = queryString.parse(this.props.location.search)
            this.props.resetPassword(params.requestId, values.password, () => {
                window.location.href = '/login';
            });
        }
    };

    render() {
        return (
            <Card style={{ ...cardStyle, ...textColor }} bodyStyle={{ padding: "0" }}>
                <Row>
					<Space direction="vertical" size={40}>
						<KabadaIcon />
						<Title level={3} style={{ ...textColor, marginBottom: '0px' }}>Choose a new password</Title>
					</Space>
				</Row>

                <Form 
                    layout="vertical"
                    name="basic"
                    onFinish={this.onFinish} style={{ paddingTop: '32px'}} >

                    <Form.Item label={<label style={textColor}>Password</label>} style={inputStyle}>
                        <Form.Item
                            name="password"
                            nostyle
                            rules={[{ required: true, message: 'Please enter your password' }]} >
                                
                            <Input.Password size="large" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label={<label style={textColor}>Confirm password</label>} style={inputStyle}>
						<Form.Item
							name="confirmedPassword"
							nostyle
							rules={[{ required: true, message: 'Please confirm your password' }]} >
							<Input.Password size="large" />
						</Form.Item>
					</Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" size='large' style={buttonStyle} block>
                            Continue
                        </Button>
                    </Form.Item>
		        </Form>

                <div style={spaceAlignContainer}>
                    <Space direction="horizontal" align='center' size='large' >
                        <Link style={linkStyle} to='/login'>Return to sign in</Link>
                    </Space>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
		message: state.message,
	};
}

export default connect(mapStateToProps, { resetPassword })(withRouter(SetPassword));
