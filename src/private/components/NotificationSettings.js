import React, { Component } from 'react';
import { Switch, Card, Row, Col } from 'antd';
import '../../css/customModal.css';

const CardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' };

class NotificationSettings extends Component {

    onChangeEmail = (checked) => {
        this.props.handleHeader();
        this.props.handleRecieveEmail(checked);
    }

    onChangeNotification = (checked) => {
        this.props.handleHeader();
        this.props.handleRecieveNotification(checked);
    }

    render() {
        const email = this.props.settings.recieveEmail;
        const notif = this.props.settings.recieveNotification;

        return (
            <>
                <Row>
                    <Col span={24}>
                        <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <div style={{ float: 'left' }}>Recieve email when someone reads your business plan</div>
                                <div style={{ float: 'right' }}><Switch onChange={this.onChangeEmail.bind(this)} checked={email} /></div>
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <div style={{ float: 'left' }}>Recieve personal contact notifications</div>
                                <div style={{ float: 'right' }}><Switch onChange={this.onChangeNotification.bind(this)} checked={notif} /></div>
                            </Card.Grid>
                        </Card >
                    </Col>
                </Row>
            </>
        )
    }
}

export default NotificationSettings;

