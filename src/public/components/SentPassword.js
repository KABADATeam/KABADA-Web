import React, { Component } from 'react';
import { Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import KabadaIcon from './KabadaIcon';

import { cardStyle, textColor} from '../../styles/customStyles';

const textColor2 = { color: '#262626', fontWeight: '400' };

const { Title, Text } = Typography;

class SentPassword extends Component {

    render() {
        return (
            <Card style={{ ...cardStyle, ...textColor }} bodyStyle={{ padding: "0" }}>
                <Row>
					<Space direction="vertical" size={40}>
						<KabadaIcon />
						<Title level={3} style={{ ...textColor, marginBottom: '0px' }}>Thanks, check your email for instructions to reset your password</Title>
					</Space>
				</Row>
				<Row>
					<Space style={{ 'marginBottom': '32px', paddingTop: '16px' }}>
                        <Text style={{ ...textColor2, marginBottom: '0px' }}> Didn't get the email? Check your spam folder or <Link to='/password-sent'>resend</Link> </Text>
					</Space>
				</Row>

            </Card>
        )
    }
}

export default SentPassword;