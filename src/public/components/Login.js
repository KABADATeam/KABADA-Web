import React from "react";
import { Form, Input, Button, Card, Divider, Typography, Space, Row, Col, Alert, message } from 'antd';
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from 'react-redux';
import { login, googleLogin, facebookLogin } from '../../appStore/actions/authenticationActions';
import { setMessage } from "../../appStore/actions/messageActions";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../../css/customButtons.css';
import KabadaIcon from './KabadaIcon';
import { cardStyle, buttonStyle, textColor, inputStyle, linkStyle, bottomDisclaimerStyle } from '../../styles/customStyles';
import { tailLayout } from '../../styles/customLayouts';
import PoliciesComponent from "./PoliciesComponent";

const { Title, Text } = Typography;
const policiesLinkTextStyle = {
	color: '#1890ff',
};
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: true,
			login: false,
			data: "",
			picture: "",
			googleSignup: "",
			submited: false,
			policy: false
		};
	}
	showPolicy = () => {
		this.setState({
			policiesVisible: true,
		});
	};
	hidePolicy = () => {
		this.setState({
			policiesVisible: false,
		});
	};
	responseGoogle = (response) => {
		const email = response.profileObj.email;
		this.setState({ googleSignup: response });
		this.props.googleLogin(email, response.tokenId);
	};

	responseFailGoogle = (response) => {
	};

	responseFacebook = (response) => {
		this.props.facebookLogin(response.email,response.accessToken);
	};
	onFinish = (values) => {
		//this.setState({ submited: true });
		this.props.login(values.username, values.password);
	};
	componentDidMount(){
		this.props.setMessage();
	}
	render() {
		return (
			<>
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
					onFinish={this.onFinish}
				>
				{/* autoLoad: false */}
					{/* <Form.Item {...tailLayout} style={{ marginBottom: '16px' }}>
						<FacebookLogin
							// appId={process.env.REACT_APP_FACEBOOK_APPID}
							appId={process.env.REACT_APP_FACEBOOK_APPID.toString()}
							autoLoad={false}
							fields="name, email, picture"
							scope="public_profile"
							style={buttonStyle}
							// callback={this.responseFacebook.bind(this)}
							textButton=" Continue with Facebook"
							cssClass="custom-facebook-button"
							icon={<FacebookFilled />}
							// onClick={this.responseFacebook.bind(this)}
							 />
					</Form.Item> */}

					<Form.Item {...tailLayout} >
						<GoogleLogin
							clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
							render={(renderProps) => (
								<Button
									loading={this.props.loading}
									size="large"
									style={buttonStyle}
									onClick={renderProps.onClick}
									icon={<GoogleCircleFilled />} block="true"	>
									Continue with Google
								</Button>
							)}
							cookiePolicy={"single_host_origin"}
							scope="profile"
							autoLoad={false}
							onSuccess={this.responseGoogle.bind(this)}
							onFailure={this.responseFailGoogle.bind(this)} />
					</Form.Item>

					<Divider style={textColor}>OR</Divider>

					<Form.Item label={<label style={textColor}>Email address</label>} style={inputStyle}>
						<Form.Item
							name="username"
							rules={[{ type: 'email', required: true, message: 'Please enter your email address' }]} >
							<Input size="large" />
						</Form.Item>
					</Form.Item>

					<Form.Item style={{ marginBottom: '0px' }}>
						<Row style={{ paddingBottom: '8px' }}>
							<Col span={12}>
								<label style={textColor}>Password</label>
							</Col>

							<Col span={12} style={{ textAlign: 'right' }}>
								<Link style={linkStyle} to='/forgot-password'>
									Forgot password?
								</Link>
							</Col>
						</Row>

						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Please enter your password' }]} 	>
							<Input.Password size="large" />
						</Form.Item>

					</Form.Item>
					{
						this.props.message.type === 'error' ?
							(<Alert
								style={{ padding: '3px 3px', marginBottom: '15px' }}
								description={this.props.message.message}
								type="error"
								showIcon
							/>) : (<></>)
					}
					<Form.Item {...tailLayout} style={{ marginBottom: '8px' }}>
						<Button type="primary" loading={this.props.loading} size="large" style={buttonStyle} htmlType="submit" block="true" >
							Sign In
						</Button>
					</Form.Item>
				</Form>
				<Space direction="horizontal" style={bottomDisclaimerStyle}>
					<Text style={bottomDisclaimerStyle}>
						By continuing, you agree with 
						<Text onClick={this.showPolicy} style={{ ...policiesLinkTextStyle }}> Terms of service and Privacy Policy</Text>.
					</Text>
				</Space>
			</Card >
			{this.state.policiesVisible === true ? (
          		<PoliciesComponent
            		visible={this.state.policiesVisible}
            		onClose={this.hidePolicy}
          		/>
        	) : null}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
		message: state.message,
	};
}

export default connect(mapStateToProps, { login, googleLogin, facebookLogin, setMessage })(withRouter(Login));
