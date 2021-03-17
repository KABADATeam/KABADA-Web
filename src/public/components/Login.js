import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import loginDictionary from '../../dictionaries/LoginDictionary';
import { connect } from 'react-redux';
import { login } from '../../appStore/actions/authenticationActions';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

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

  componentClicked = () => {};

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
		<Form 
			{...layout}
			name="basic"
			initialValues={{
				remember: false,
			}}
			onFinish={this.onFinish}
			onFinishFailed={this.onFinishFailed}>

			<Form.Item
				label="Username"
				name="username"
				rules={[
				{
					required: true,
					message: 'Please input your username!',
				},
				]}>

				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
				{
					required: true,
					message: 'Please input your password!',
				},
				]}>

				<Input.Password />
			</Form.Item>

			<Form.Item {...tailLayout} name="remember" valuePropName="unchecked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Login
				</Button>
      		</Form.Item>

			<Form.Item {...tailLayout}>
				<GoogleLogin
					clientId="959683655410-qvc3ilj5rppsntbv68lnkcp95i3t8d29.apps.googleusercontent.com"
					render={(renderProps) => (
						<button
						className="ui fluid google plus button"
						onClick={renderProps.onClick}
						>
						<i aria-hidden="true" className="google plus icon"></i>
						Google
						</button>
					)}
					cookiePolicy={"single_host_origin"}
					scope="profile"
					autoLoad={false}
					onSuccess={this.responseGoogle.bind(this)}
					onFailure={this.responseGoogle.bind(this)} />
      		</Form.Item>

			<Form.Item {...tailLayout}>
				<FacebookLogin
					appId="243803703658185"
					autoLoad={false}
					fields="name, email, picture"
					scope="public_profile"
					callback={this.responseFacebook.bind(this)}
					icon="fa-facebook"
					textButton=" Facebook"
					cssClass="ui fluid facebook button"
					onClick={this.responseFacebook.bind(this)} />	
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Link to='/reset'>
					<h4>Forgot my password</h4>
				</Link>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Link to='/register'>
					<h4>Register</h4>
				</Link>
			</Form.Item>
		</Form>
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
