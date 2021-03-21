import React from "react";
import { Form, Input, Button, Card, Divider, Typography, Space, Row, Col } from 'antd';
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from 'react-redux';
import { login } from '../../appStore/actions/authenticationActions';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../../css/customButtons.css';
import KabadaIcon from './KabadaIcon';

import { cardStyle, buttonStyle, textColor, inputStyle, linkStyle, bottomDisclaimerStyle } from '../../styles/customStyles';
import { tailLayout} from '../../styles/customLayouts';

const { Title, Text } = Typography;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: true,
			login: false,
			data: "",
			picture: "",
			googleSignup: "",
		};
	}

	responseGoogle = (response) => {
		this.setState({ googleSignup: response });
	};

	responseFacebook = (response) => {
		this.setState({ data: response });
		this.setState({ picture: response.picture.data.url });
		if (response.accessToken) {
			this.setState({ login: true });
		} else {
			this.setState({ login: false });
		}
	};

	onFinish = (values) => {
		console.log('Success:', values);
		//this.props.login(values.username, values.password);
	};

	render() {
		return (
			<Card style={cardStyle} bodyStyle={{ padding: "0" }}>
				<Row>
					<Space direction="vertical" size={40}>
						<KabadaIcon />
						<Title level={3} style={{ ...textColor, marginBottom: '4px' }}>Sign in</Title>
					</Space>
				</Row>

				<Row>
					<Space style={{ marginBottom: '32px' }}>
						Don’t have an account? <Link to='/register'>Sign Up</Link>
					</Space>
				</Row>

				<Form
					layout="vertical"
					name="basic"
					initialValues={{ remember: false }}
					onFinish={this.onFinish} >

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
							name="username"
							nostyle
							rules={[{ required: true, message: 'Please enter your email address' }]}
						>
							<Input size="large" />
						</Form.Item>
					</Form.Item>

					<Form.Item>
						<Row style={{ paddingBottom: '8px' }}>
							<Col span={12}>
								<label style={textColor}>Password</label>
							</Col>

							<Col span={12} style={{ textAlign: 'right' }}>
								<Link style={linkStyle} to='/reset'>
									Forgot password?
								</Link>
							</Col>
						</Row>

						<Form.Item
							name="password"
							nostyle
							rules={[{ required: true, message: 'Please enter your password' }]}
						>
							<Input.Password size="large" />
						</Form.Item>
      				</Form.Item>

					<Form.Item {...tailLayout} style={{ marginBottom: '8px' }}>
						<Button type="primary" size="large" style={buttonStyle} htmlType="submit" block>
							Sign In
						</Button>
					</Form.Item>
				</Form>

				<Space direction="horizontal" style={bottomDisclaimerStyle}>
					<Text style={bottomDisclaimerStyle}>
						By continuing, you agree with Terms of service and Privacy Policy.
					</Text>
				</Space>
			</Card >
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error
	};
}

export default connect(mapStateToProps, { login })(withRouter(Login));
