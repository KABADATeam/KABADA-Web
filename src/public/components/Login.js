import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Grid,
  Input,
  Divider,
} from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from 'axios';

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
    console.log(response);
    var res = response.profileObj;
    console.log(res);
    debugger;
    this.setState({ signup: response });
  };

  responseFacebook = (response) => {
    console.log("Facebook response: ");
    console.log(response);
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
    console.log("CheckeBox: " + this.state.RememberMecheckBox);
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
    if (pass.length > 1 && name.length > 1) {
      console.log("Username: " + this.state.username);
      console.log("Password: " + this.state.password);
      console.log("Remember me: " + this.state.RememberMecheckBox);
    }
    const response = await axios.get('https://localhost:5001/api/authentication/users/all');
    
    console.log(response.data);
  }
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
    console.log(this.state.data);
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <Form>
                  <Form.Field
                    icon="user"
                    iconPosition="left"
                    control={Input}
                    label="Username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange.bind(this)}
                    error={this.state.usernameError}
                  ></Form.Field>
                  <Form.Field
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    control={Input}
                    placeholder="Password"
                    onChange={this.handlePasswordChange.bind(this)}
                    name="password"
                    value={this.state.password}
                    type="password"
                    error={this.state.passwordError}
                  ></Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="Keep me signed in"
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
                    Login
                  </Button>
                </Form>
                <div>
                  <Divider horizontal>Or Sign Up Using </Divider>
                  {!this.login && (
                    <FacebookLogin
                      appId="243803703658185"
                      autoLoad="false"
                      fields="name, email, picture"
                      scope="public_profile"
                      callback={this.responseFacebook.bind(this)}
                      icon="fa-facebook"
                      textButton=" Facebook"
                      cssClass="ui fluid facebook button"
                      onClick={this.responseFacebook.bind(this)}
                    />
                  )}
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
                    autoLoad="false"
                    onSuccess={this.responseGoogle.bind(this)}
                    onFailure={this.responseGoogle.bind(this)}
                  />
                </div>
                <Divider inverted />
                <div>
                  Don't have account, yet? Follow the{" "}
                  <a href="register">Registration</a> link to create one
                </div>
                <div>
                  Forgot password? Follow the <a href="reset">Password reset</a>{" "}
                  link to get new one
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Login;
