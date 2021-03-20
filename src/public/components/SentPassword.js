import React, { Component } from 'react';
import { Form, Input, Button, Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import KabadaIcon from './KabadaIcon';

const cardStyle = {
	'background': '#FFFFFF', 'border': '0px', 'borderRadius': '8px', 'boxShadow': '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)',
	'fontWeight': 'normal', 'fontSize': '16px', 'padding': '40px'
};

const mainTextColor = { color: '#262626', fontWeight: '600' };
const textColor = { color: '#262626', fontWeight: '400' };

const linkStyle = { 'fontWeight': '600', 'fontSize': '14px' };

const spaceAlignContainer = { 'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center' };
const buttonStyle = { 'borderRadius': '4px', 'fontWeight': '600', 'fontSize': '14px', };

const { Title, Text } = Typography;

class SentPassword extends Component {

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
						<Title level={3} style={{ ...mainTextColor, marginBottom: '0px' }}>Thanks, check your email for instructions to reset your password</Title>
					</Space>
				</Row>
				<Row>
					<Space style={{ 'marginBottom': '32px', paddingTop: '16px' }}>
                   <Text style={{ ...textColor, marginBottom: '0px' }}> Didn't get the email? Check your spam folder or <a href='/password-sent'>resend</a> </Text>
					</Space>
				</Row>

            </Card>
            
            
        )
    }
}

export default SentPassword;