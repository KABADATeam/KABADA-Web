import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../appStore/actions/authenticationActions';
import { connect } from 'react-redux';
import KabadaIcon from './KabadaIcon';

import {
  cardStyle,
  buttonStyle,
  textColor,
  linkStyle,
} from '../../styles/customStyles';

const spaceAlignContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const { Title } = Typography;

class ResetPassword extends Component {
  onFinish = (e) => {
    this.props.forgotPassword(e.email, () => {
      this.props.history.push('/password-sent');
    });
  };

  render() {
    return (
      <Card style={{ ...cardStyle, ...textColor }} bodyStyle={{ padding: '0' }}>
        <Row>
          <Space direction='vertical' size={40}>
            <KabadaIcon />
            <Title level={3} style={{ ...textColor, marginBottom: '0px' }}>
              Reset your password
            </Title>
          </Space>
        </Row>

        <Row>
          <Space style={{ marginBottom: '32px', paddingTop: '16px' }}>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Space>
        </Row>

        <Form layout='vertical' name='basic' onFinish={(e) => this.onFinish(e)}>
          <Form.Item
            name={'email'}
            label='Email'
            rules={[{ required: true, type: 'email', message: 'Please enter your email address' }]}
          >
            <Input size='large'/>
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            size='large'
            style={buttonStyle}
            block={true}
          >
            Continue
          </Button>
        </Form>

        <div style={spaceAlignContainer}>
          <Space direction='horizontal' align='center' size='large'>
            <Link style={linkStyle} to='/login'>
              Return to sign in
            </Link>
          </Space>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    message: state.message,
  };
};

export default connect(mapStateToProps, { forgotPassword })(
  withRouter(ResetPassword)
);
