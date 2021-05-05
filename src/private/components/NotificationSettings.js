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

    state = {
        recieveEmail: false,
        revieveNotification: false,
    };

    onChangeEmail = (checked) => {
        this.setState({
            recieveEmail: checked
        })
        console.log(`recieveEmail: ${checked}`);
    }

    onChangeNotification = (checked) => {
        this.setState({
            revieveNotification: checked
        })
        console.log(`revieveNotification: ${checked}`);
    }

    render() {

        return (
            <>
                <Row>
                    <Col span={14}>
                        <Card size={'small'} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <div style={{ float: 'left' }}>Recieve email when someone reads your business plan</div>
                                <div style={{ float: 'right' }}><Switch onChange={this.onChangeEmail.bind(this)} /></div>
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                                <div style={{ float: 'left' }}>Recieve personal contact notifications</div>
                                <div style={{ float: 'right' }}><Switch onChange={this.onChangeNotification.bind(this)} /></div>
                            </Card.Grid>
                        </Card >
                    </Col>
                </Row>
            </>
        )
    }
}

export default NotificationSettings;

