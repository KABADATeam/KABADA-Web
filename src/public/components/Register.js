import React from 'react';
import {
    Button,
    Form,
    Container,
    Grid,
    Divider,
    Input,
} from "semantic-ui-react";
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            nameMessage: false,
            surenameMessage: false,
            emailMessage: false,
            passwordMassage: false,
            passwordConfirmationMessage: false


        }

    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.firstName.length < 3) {
            this.messageChange("First name must be at least 3 characters")
        }
        else {
            this.messageChange(false)
        }
        if (this.state.lastName.length < 3) {
            this.surenameMessageChange("Last name must be at least 3 characters")
        }
        else {
            this.surenameMessageChange(false)
        }
        if ((this.state.email.length <= 0) || (!emailRegex.test(this.state.email))) {
            this.emailMessageChange("Invalid email")
        }
        else {
            this.emailMessageChange(false)
        }
        if (this.state.password.length < 5) {
            this.passwordMessageChange("Password must contain at least 6 characters")
        }
        else {
            this.passwordMessageChange(false)
        }
        if (this.state.password !== this.state.passwordConfirmation) {
            this.passwordConfirmationMessageChange("Pasword must match")
        }
        else {
            this.passwordConfirmationMessageChange(false)
        }


    }
    messageChange = (text) => {

        this.setState({
            nameMessage: text



        })
    };
    surenameMessageChange = (text) => {

        this.setState({
            surenameMessage: text



        })
    };
    emailMessageChange = (text) => {

        this.setState({
            emailMessage: text
        })
    };
    passwordMessageChange = (text) => {

        this.setState({
            passwordMessage: text
        })
    };
    passwordConfirmationMessageChange = (text) => {

        this.setState({
            passwordConfirmationMessage: text
        })
    };
    firstNameChange = (event) => {
        event.preventDefault();
        this.setState({
            firstName: event.target.value

        })

    }
    lastNameChange = (event) => {
        event.preventDefault();

        this.setState({ lastName: event.target.value })
    }
    passwordChange = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value })
    }
    passwordConfirmationChange = (event) => {
        event.preventDefault();
        this.setState({ passwordConfirmation: event.target.value })
    }
    emailChange = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value })
    }
    render() {
        return (
            <div>
                <Container>
                    <Grid>
                        <Grid.Row centered>
                            <Grid.Column width={6}>
                                <Form>
                                    <Form.Field
                                        control={Input}
                                        label="First name"
                                        placeholder="enter your first name"
                                        value={this.state.firstName}
                                        onChange={this.firstNameChange.bind(this)}
                                        error={this.state.nameMessage}
                                    ></Form.Field>
                                    <Form.Field
                                        control={Input}
                                        label="Last name"
                                        placeholder="enter your last name"
                                        value={this.state.lastname}
                                        onChange={this.lastNameChange.bind(this)}
                                        error={this.state.surenameMessage}
                                    ></Form.Field>
                                    <Form.Field
                                        control={Input}
                                        label="Email"
                                        placeholder="enter your email"
                                        value={this.state.email}
                                        onChange={this.emailChange.bind(this)}
                                        error={this.state.emailMessage}
                                    ></Form.Field>
                                    <Form.Field
                                        label="Password"
                                        control={Input}
                                        placeholder="enter yuor password"
                                        onChange={this.passwordChange.bind(this)}
                                        value={this.state.password}
                                        type="password"
                                        error={this.state.passwordMessage}
                                    ></Form.Field>
                                    <Form.Field
                                        label="Confirm password"
                                        control={Input}
                                        placeholder="Confirm your password"
                                        onChange={this.passwordConfirmationChange.bind(this)}
                                        value={this.state.passwordConfirmation}
                                        type="password"
                                        error={this.state.passwordConfirmationMessage}
                                    ></Form.Field>
                                    <Button
                                        fluid
                                        type="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        Create account
                                     </Button>
                                </Form>
                                <Divider inverted />
                <center><div >
                  
                  <a href="./Login">Already have an Account</a> 
                </div></center>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

            </div>
        )
    }
}

export default Register;