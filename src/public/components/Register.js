import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { register } from '../../appStore/actions/authenticationActions';
import { Link } from 'react-router-dom';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

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

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            fullNameMessage: false,
            emailMessage: false,
            passwordMassage: false,
            passwordConfirmationMessage: false
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.fullName.length < 3) {
            this.fullNamemessageChange("Full name must be at least 3 characters");
        }
        else {
            this.fullNamemessageChange(false);
        }
        if ((this.state.email.length <= 0) || (!emailRegex.test(this.state.email))) {
            this.emailMessageChange("Invalid email");
        }
        else {
            this.emailMessageChange(false);
        }
        if (this.state.password.length < 5) {
            this.passwordMessageChange("Password must contain at least 6 characters")
        }
        else {
            this.passwordMessageChange(false);
        }
        if (this.state.password !== this.state.passwordConfirmation) {
            this.passwordConfirmationMessageChange("Pasword must match");
        }
        else {
            this.passwordConfirmationMessageChange(false);
        }

        this.props.register(this.state.fullName, this.state.email, this.state.password, () => {
            this.props.history.push("/login");
        });
    }

    fullNamemessageChange = (text) => {
        this.setState({
            fullNameMessage: text
        });
    };

    emailMessageChange = (text) => {
        this.setState({
            emailMessage: text
        });
    };

    passwordMessageChange = (text) => {
        this.setState({
            passwordMessage: text
        });
    };

    passwordConfirmationMessageChange = (text) => {
        this.setState({
            passwordConfirmationMessage: text
        });
    };

    fullNameChange = (event) => {
        event.preventDefault();
        this.setState({
            fullName: event.target.value
        });
    }

    passwordChange = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    passwordConfirmationChange = (event) => {
        event.preventDefault();
        this.setState({ passwordConfirmation: event.target.value });
    }

    emailChange = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

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
            <Form 
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
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

                <Form.Item
                    label="Repeated password"
                    name="repeated_password"
                    rules={[
                    {
                        required: true,
                        message: 'Please repeat your password!',
                    },
                    ]}>

                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

                <Form.Item {...tailLayout} rules={[ { required: false } ]}>
                    <Link to='/login'>
                        <h4>Login</h4>
                    </Link>
                </Form.Item>
            </Form>
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