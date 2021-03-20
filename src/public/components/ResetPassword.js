import React, { Component } from 'react';
import { Form, Input, Button, Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import KabadaIcon from './KabadaIcon';

const cardStyle = {
	'background': '#FFFFFF', 'border': '0px', 'borderRadius': '8px', 'boxShadow': '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)',
	'fontWeight': 'normal', 'fontSize': '16px', 'padding': '40px'
};

const mainTextColor = { 'color': '#262626' };

const linkStyle = { 'fontWeight': '600', 'fontSize': '14px' };

const spaceAlignContainer = { 'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center' };
const buttonStyle = { 'borderRadius': '4px', 'fontWeight': '600', 'fontSize': '14px', };

const { Title, Text } = Typography;

class ResetPassword extends Component {

    state = {
        email: '',
        errorMessage: "Enter valid email",
        status: "success",
        count: 0
    };

    onChange = (e) => {
        if (this.state.count === 0) {
            this.setState({
                email: e.target.value
            });
        } else {
            if (this.isEmailValid(e.target.value)) {
                this.setState({
                    email: e.target.value,
                    status: 'success'
                });
            } else {
                this.setState({
                    email: e.target.value,
                    status: 'error'
                });
            }
        }
        
    }

    isEmailValid(email){
        const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if (email && email.match(mailformat)) {
            return true;
        } else {
            return false;
        }
    }

    onFinish = () => {
        this.setState({
            count: 1
        });

        if (this.isEmailValid(this.state.email)) {
            this.setState({
                status: "success"
            });
        } else {
            this.setState({
                status: "error"
            });
        }
        
        //this.props.login(values.username, values.password);
    };

    render() {
        return (
            <Card style={{ ...cardStyle, ...mainTextColor }} bodyStyle={{ padding: "0" }}>
                <Row>
					<Space direction="vertical" size={40}>
						<KabadaIcon />
						<Title level={3} style={{ ...mainTextColor, marginBottom: '0px' }}>Reset your password</Title>
					</Space>
				</Row>
				<Row>
					<Space style={{ 'marginBottom': '32px', paddingTop: '16px' }}>
                        Enter the email address associated with your account and we'll send you a link to reset your password.
					</Space>
				</Row>
                <Form 
                layout="vertical"
                name="basic"
                onFinish={this.onFinish} >

			<Form.Item
				label="Email address"
				name="email"
                validateStatus={this.state.status}
				help={this.state.status === 'error' ? this.state.errorMessage : null }
				>

				<Input onChange={this.onChange}/>
			</Form.Item>

			<Form.Item >
				<Button type="primary" htmlType="submit" size='large' style={buttonStyle} block>
					Continue
				</Button>
      		</Form.Item>

		</Form>
        <div style={spaceAlignContainer}>
            <div >
            <Space direction="horizontal" align='center' size='large' >
            <Link style={linkStyle} to='/login'>
							Return to sign in
								</Link>
				</Space>
            </div>
        </div>
        
            </Card>
            
            
        )
    }
}

export default ResetPassword;