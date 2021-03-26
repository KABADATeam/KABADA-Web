import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Typography, Card, Space, Divider, Row } from 'antd';
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { register } from '../../appStore/actions/authenticationActions';
import { Link } from 'react-router-dom';
import KabadaIcon from './KabadaIcon';

import { cardStyle, buttonStyle, textColor, inputStyle, bottomDisclaimerStyle } from '../../styles/customStyles';
import { tailLayout} from '../../styles/customLayouts';

const { Text, Title } = Typography

class Register extends React.Component {

    responseFacebook = (response) => {
        console.log(response);
	};

    responseGoogle = (response) => {
		console.log(response);
	};

    onFinish = (values) => {
        console.log('Success:', values);
        this.props.register(values.name, values.email, values.password, () => {
            this.props.history.push("/login");
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Card style={cardStyle} bodyStyle={{ padding: "0" }}>
                <Row>
					<Space direction="vertical" size={40}>
                        <KabadaIcon />
                        <Title level={3} style={{ ...textColor, marginBottom: '4px' }}>Sign up</Title>
                    </Space>
                </Row>
                
                <Row>
                    <Space style={{ marginBottom: '32px' }}>
                        Already have an account? <Link to='/login'>Sign in</Link>
                    </Space>
                </Row> 

                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed} >

                    <Form.Item {...tailLayout} block style={{ marginBottom: '16px' }}>
						<FacebookLogin
							appId="243803703658185"
							autoLoad={false}
							fields="name, email, picture"
							scope="public_profile"
							callback={this.responseFacebook.bind(this)}
							textButton=" Continue with Facebook"
							cssClass="custom-facebook-button"
							icon={<FacebookFilled />}
							onClick={this.responseFacebook.bind(this)} />
					</Form.Item>

                    <Form.Item {...tailLayout}>
						<GoogleLogin
							clientId="959683655410-qvc3ilj5rppsntbv68lnkcp95i3t8d29.apps.googleusercontent.com"
							render={(renderProps) => (
								<Button
									size="large"
									style={buttonStyle}
									onClick={renderProps.onClick}
									icon={<GoogleCircleFilled />} block
								>
									Continue in with Google
								</Button>
							)}
							cookiePolicy={"single_host_origin"}
							scope="profile"
							autoLoad={false}
							onSuccess={this.responseGoogle.bind(this)}
							onFailure={this.responseGoogle.bind(this)} />
					</Form.Item>
                    
                    <Divider style={textColor}>OR</Divider>

                    <Form.Item label={<label style={textColor}>Email address</label>} style={inputStyle}>
						<Form.Item
							name="email"
							nostyle
							rules={[{ required: true, message: 'Please enter your email address' }]} >
						
							<Input size="large" />
						</Form.Item>
					</Form.Item>

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

                    <Form.Item {...tailLayout} style={{ marginBottom: '8px' }}>
						<Button type="primary" size="large" style={buttonStyle} htmlType="submit" block>
							Create Account
						</Button>
					</Form.Item>
                </Form>
                <Space direction="horizontal" style={bottomDisclaimerStyle}>
					<Text style={bottomDisclaimerStyle}>
						By continuing, you agree with Terms of service and Privacy Policy.
					</Text>
				</Space>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    };
}

export default connect(mapStateToProps, { register })(withRouter(Register));
