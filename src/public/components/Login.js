import React from "react";
import { Button, Checkbox, Form, Container, Grid, Input, Divider } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from 'axios';
import loginDictionary from '../../dictionaries/LoginDictionary';
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			username: "",
			RememberMecheckBox: true,
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
		var res = response.profileObj;
		debugger;
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

  render() {
	const translation = loginDictionary[this.props.language];
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <Form>
                  <Form.Field icon="user" iconPosition="left" control={Input} label={translation.username} placeholder={translation.username}
                    value={this.state.username} onChange={this.handleUsernameChange.bind(this)} error={this.state.usernameError}></Form.Field>
                  <Form.Field
                    icon="lock"
                    iconPosition="left"
                    label={translation.password}
                    control={Input}
                    placeholder={translation.password}
                    onChange={this.handlePasswordChange.bind(this)}
                    name="password"
                    value={this.state.password}
                    type="password"
                    error={this.state.passwordError}
                  ></Form.Field>
                  <Form.Field>
                    <Checkbox
                      label={translation.keepMe}
                      name="RememberMecheckBox"
                      checked={this.state.RememberMecheckBox}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                  </Form.Field>
                  <Button
                    fluid
                    type="submit"
                    onClick={this.handleLogin.bind(this)}
                  >
                    {translation.login}
                  </Button>
                </Form>
                <div>
                  <Divider horizontal>{translation.alternativeLogin}</Divider>
                  {!this.login && (
                    <FacebookLogin
                      appId="243803703658185"
                      autoLoad={false}
                      fields="name, email, picture"
                      scope="public_profile"
                      callback={this.responseFacebook.bind(this)}
                      icon="fa-facebook"
                      textButton=" Facebook"
                      cssClass="ui fluid facebook button"
                      onClick={this.responseFacebook.bind(this)}
                    />
                  )}
				  </div>
				  <div style={{ marginTop: '5px'}}>
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
                    onFailure={this.responseGoogle.bind(this)}
                  />
                </div>
                <Divider inverted />
                <div style={{ textAlign: 'justify'}}>
                	{translation.registerText}
					<a href="register">{translation.register}</a> 
                </div>
				<Divider inverted />
                <div style={{ textAlign: 'justify'}}>
					{translation.resetText}
					<a href="reset">{translation.reset}</a>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    };
}

export default connect(mapStateToProps, null)(Login);
