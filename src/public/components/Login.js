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
//import TiSocialFacebookCircular from "react-icons/lib/ti/social-facebook-circular";

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
    };
  }

  handleCheckBoxChange = (event) => {
    if (this.state.RememberMecheckBox === true) {
      this.setState({ RememberMecheckBox: false });
    } else if (this.state.RememberMecheckBox === false) {
      this.setState({ RememberMecheckBox: true });
    }
    console.log("CheckeBox: " + this.state.RememberMecheckBox);
  };

  handleLogin = () => {
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
    console.log(response);
  };

  responseFacebook = (response) => {
    console.log(response);
  };

  componentClicked = () => {};

  render() {
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
                  <FacebookLogin
                    icon="fa-facebook"
                    textButton=" Facebook"
                    cssClass="ui fluid facebook button"
                  />
                  <GoogleLogin
                    render={(renderProps) => (
                      <button className="ui fluid google plus button">
                        <i aria-hidden="true" className="google plus icon"></i>
                        Google
                      </button>
                    )}
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
