import React from "react";
import { Form, Input, Button, Card, Divider, Typography, Space, Row } from 'antd';
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import loginDictionary from '../../dictionaries/LoginDictionary';
import { connect } from 'react-redux';
import { login } from '../../appStore/actions/authenticationActions';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../../css/customButtons.css';

const { Title, Text } = Typography;

const layout = {
	labelCol: {
		span: 24,
	},
	wrapperCol: {
		span: 24,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 0,
		span: 24,
	},
};

const cardStyle = { 'border-radius': '8px', 'box-shadow': '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', 'font-weight': 'normal', 'font-size': '16px', 'padding-left': '16px', 'padding-top': '16px', 'padding-right': '16px', 'padding-bottom': '16px' };
const buttonStyle = { 'border-radius': '4px', 'font-weight': '600', 'font-size': '14px' };
const bottomDisclaimerStyle = { textAlign: "center", 'font-size': '12px' };
const inputStyle = { 'border-radius': '4px' };
const linkStyle = { 'font-weight': '600' };

const KabadaIconSVG = () => (
	<svg width="164" height="38" viewBox="0 0 164 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M35.6 8.07895H29.3V4.28947C29.3 2.18632 27.5645 0.5 25.4 0.5H14.6C12.4355 0.5 10.7 2.18632 10.7 4.28947V8.07895H4.4C2.2355 8.07895 0.5195 9.76526 0.5195 11.8684L0.5 34.2105C0.5 36.3137 2.2355 38 4.4 38H35.6C37.7645 38 39.5 36.3137 39.5 34.2105V11.8684C39.5 9.76526 37.7645 8.07895 35.6 8.07895ZM25.4 8.07895H14.6V4.28947H25.4V8.07895Z" fill="#1890FF" />
		<path fill-rule="evenodd" clip-rule="evenodd" d="M33.305 24.2395L32.9571 24.8535C27.0761 35.2317 11.993 34.8402 6.65834 24.1708L9.34162 22.8292C13.6025 31.3511 25.6498 31.6638 30.3471 23.3744L30.6949 22.7605L33.305 24.2395Z" fill="white" />
		<path d="M53 13.2C53 13.0895 53.0895 13 53.2 13H57.3C57.4105 13 57.5 13.0895 57.5 13.2V19.4611C57.5 19.6451 57.7274 19.7315 57.8495 19.5939L63.6453 13.0672C63.6832 13.0245 63.7377 13 63.7948 13H68.4072C68.579 13 68.6709 13.2023 68.5578 13.3317L62.5181 20.2379C62.4595 20.3049 62.4523 20.4025 62.5002 20.4774L69.042 30.6921C69.1272 30.8253 69.0316 31 68.8735 31H64.5431C64.4738 31 64.4095 30.9641 64.373 30.9052L59.7633 23.4546C59.6935 23.3418 59.5353 23.3269 59.4457 23.4248L57.5525 25.4924C57.5187 25.5292 57.5 25.5774 57.5 25.6274V30.8C57.5 30.9105 57.4105 31 57.3 31H53.2C53.0895 31 53 30.9105 53 30.8V13.2Z" fill="#262626" />
		<path d="M76.5455 13.1286C76.5751 13.0512 76.6494 13 76.7323 13H81.3203C81.4032 13 81.4775 13.0512 81.5071 13.1286L88.2301 30.7286C88.2801 30.8596 88.1834 31 88.0433 31H83.7739C83.6919 31 83.6183 30.95 83.588 30.8738L82.0671 27.0454C82.0369 26.9693 81.9632 26.9193 81.8813 26.9193H76.1443C76.0619 26.9193 75.988 26.9698 75.958 27.0465L74.4642 30.8727C74.4342 30.9495 74.3603 31 74.2779 31H70.0094C69.8692 31 69.7725 30.8596 69.8225 30.7286L76.5455 13.1286ZM81.1111 23.5932C81.2514 23.5932 81.3481 23.4525 81.2978 23.3215L79.1862 17.8215C79.1204 17.65 78.8776 17.6505 78.8125 17.8222L76.7254 23.3222C76.6758 23.4531 76.7724 23.5932 76.9124 23.5932H81.1111Z" fill="#262626" />
		<path d="M90.6128 13.2C90.6128 13.0895 90.7024 13 90.8128 13H100.116C101.905 13 103.265 13.4286 104.197 14.2857C105.128 15.1242 105.594 16.3354 105.594 17.9193C105.594 18.8323 105.417 19.6242 105.063 20.295C104.781 20.814 104.417 21.2386 103.97 21.5688C103.833 21.67 103.854 21.8959 104.009 21.966C104.686 22.2724 105.206 22.6843 105.566 23.2019C106.013 23.7981 106.237 24.6366 106.237 25.7174C106.237 27.4317 105.734 28.7453 104.728 29.6584C103.722 30.5528 102.277 31 100.395 31H90.8128C90.7024 31 90.6128 30.9105 90.6128 30.8V13.2ZM98.7743 20.323C100.265 20.323 101.01 19.6522 101.01 18.3106C101.01 17.6025 100.824 17.0807 100.451 16.7453C100.079 16.4099 99.4451 16.2422 98.5507 16.2422H95.3128C95.2024 16.2422 95.1128 16.3318 95.1128 16.4422V20.123C95.1128 20.2334 95.2024 20.323 95.3128 20.323H98.7743ZM99.2215 27.7857C100.06 27.7857 100.675 27.618 101.066 27.2826C101.458 26.9286 101.653 26.3323 101.653 25.4938C101.653 24.7857 101.448 24.264 101.038 23.9286C100.647 23.5932 99.9855 23.4255 99.0538 23.4255H95.3128C95.2024 23.4255 95.1128 23.515 95.1128 23.6255V27.5857C95.1128 27.6962 95.2024 27.7857 95.3128 27.7857H99.2215Z" fill="#262626" />
		<path d="M114.243 13.1286C114.273 13.0512 114.347 13 114.43 13H119.018C119.101 13 119.175 13.0512 119.205 13.1286L125.928 30.7286C125.978 30.8596 125.881 31 125.741 31H121.471C121.389 31 121.316 30.95 121.286 30.8738L119.765 27.0454C119.734 26.9693 119.661 26.9193 119.579 26.9193H113.842C113.759 26.9193 113.686 26.9698 113.656 27.0465L112.162 30.8727C112.132 30.9495 112.058 31 111.975 31H107.707C107.567 31 107.47 30.8596 107.52 30.7286L114.243 13.1286ZM118.809 23.5932C118.949 23.5932 119.046 23.4525 118.995 23.3215L116.884 17.8215C116.818 17.65 116.575 17.6505 116.51 17.8222L114.423 23.3222C114.373 23.4531 114.47 23.5932 114.61 23.5932H118.809Z" fill="#262626" />
		<path d="M128.31 13.2C128.31 13.0895 128.4 13 128.51 13H136.108C138.922 13 141.028 13.7174 142.425 15.1522C143.841 16.587 144.549 18.9068 144.549 22.1118C144.549 25.1491 143.841 27.3944 142.425 28.8478C141.028 30.2826 138.922 31 136.108 31H128.51C128.4 31 128.31 30.9105 128.31 30.8V13.2ZM135.494 27.5342C136.537 27.5342 137.376 27.3851 138.009 27.087C138.643 26.7888 139.127 26.2484 139.463 25.4658C139.798 24.6832 139.966 23.5652 139.966 22.1118C139.966 20.6398 139.807 19.5031 139.49 18.7019C139.192 17.882 138.717 17.3043 138.065 16.9689C137.431 16.6335 136.574 16.4658 135.494 16.4658H133.01C132.9 16.4658 132.81 16.5554 132.81 16.6658V27.3342C132.81 27.4446 132.9 27.5342 133.01 27.5342H135.494Z" fill="#262626" />
		<path d="M151.856 13.1286C151.885 13.0512 151.96 13 152.043 13H156.631C156.714 13 156.788 13.0512 156.817 13.1286L163.54 30.7286C163.59 30.8596 163.494 31 163.354 31H159.084C159.002 31 158.929 30.95 158.898 30.8738L157.377 27.0454C157.347 26.9693 157.274 26.9193 157.192 26.9193H151.455C151.372 26.9193 151.298 26.9698 151.268 27.0465L149.775 30.8727C149.745 30.9495 149.671 31 149.588 31H145.32C145.18 31 145.083 30.8596 145.133 30.7286L151.856 13.1286ZM156.421 23.5932C156.562 23.5932 156.658 23.4525 156.608 23.3215L154.497 17.8215C154.431 17.65 154.188 17.6505 154.123 17.8222L152.036 23.3222C151.986 23.4531 152.083 23.5932 152.223 23.5932H156.421Z" fill="#262626" />
	</svg>
);

const KabadaIcon = props => <Icon component={KabadaIconSVG} {...props} />;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			username: "",
			RememberMecheckBox: false,
			response: true,
			usernameError: false,
			passwordError: false,
			login: false,
			setLogin: false,
			data: "",
			name: "",
			picture: "",
			setPicture: "",
			googleSignup: "",
		};
	}

	responseGoogle = (response) => {
		this.setState({ signup: response });
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

	handleCheckBoxChange = (event) => {
		if (this.state.RememberMecheckBox === true) {
			this.setState({ RememberMecheckBox: false });
		} else if (this.state.RememberMecheckBox === false) {
			this.setState({ RememberMecheckBox: true });
		}
	};

	handleLogin = async () => {
		var pass = this.state.password;
		var name = this.state.username;
		if (pass < 1) {
			this.setState({ passwordError: true });
		}
		if (name < 1) {
			this.setState({ usernameError: true });
		}

		this.props.login(name, pass);

	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
		if (this.state.password.length > 0) {
			this.setState({ passwordError: false });
		}
	};

	handleUsernameChange = (event) => {
		this.setState({ username: event.target.value });
		if (this.state.username.length > 0) {
			this.setState({ usernameError: false });
		}
	};

	responseGoogle = (response) => {
		console.log("Google Response: " + response);
	};

	responseFacebook = (response) => {
		console.log(response);
	};

	componentClicked = () => { };

	onFinish = (values) => {
		console.log('Success:', values);
		this.props.login(values.username, values.password);
	};

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	render() {
		const translation = loginDictionary["en"];


		return (
			<Card style={cardStyle}>
				<Row>
					<Space direction="vertical" size="large">
						<KabadaIcon />
						<Title level={3}>Sign in</Title>
					</Space>
				</Row>
				<Row>
					<Space style={{ 'margin-bottom': '32px' }}>
						Don’t have an account?
				<Link to='/register'>
							Sign Up
					</Link>
					</Space>
				</Row>
				<Space>
					<Form
						{...layout}
						name="basic"
						initialValues={{
							remember: false,
						}}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed} >

						<Form.Item {...tailLayout} block>
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
						<Divider>OR</Divider>

						<Form.Item
							label="Email address"
							name="username"
							rules={[
								{
									message: 'Please input your username!',
								},
							]}>

							<Input size="large" style={inputStyle} />
						</Form.Item>

						<Form.Item
							label={<Space align="end" direction="horizontal" size={230}><label>Password</label>
								<Link style={linkStyle} to='/reset'>
									Forgot password?
								</Link>
							</Space>}
							name="password"
							rules={[
								{
									message: 'Please input your password!',
								},
							]}>
							<Input.Password size="large" style={inputStyle} />
						</Form.Item>

						<Form.Item {...tailLayout} style={{ 'margin-bottom': '8px' }}>
							<Button type="primary" size="large" style={buttonStyle} htmlType="submit" block>
								Sign In
								</Button>
						</Form.Item>

						<Form.Item style={bottomDisclaimerStyle}>
							<Text type="secondary">By continuing, you agree with Terms of service and Privacy Policy.</Text>
						</Form.Item>

					</Form >
				</Space>
			</Card>

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
