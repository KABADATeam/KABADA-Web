import React, { Component } from 'react';
import { Row, Col, Typography, Button, Card, Alert, Space } from 'antd';
import { connect } from 'react-redux';
import { buttonStyle } from '../../styles/customStyles';
import ChangeEmailModal from "../components/ChangeEmailModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { resendVerificationEmail } from "../../appStore/actions/settingsAction";

const { Text } = Typography;

const textStyle = { fontStyle: "normal", fontWeight: "600", fontSize: "16px", lineHeight: "24px" }
const editableTextStyle = { fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "22px" }

const CardStyle = {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '20px', paddingRight: '20px' };

class EmailPasswordSettings extends Component {

    state = {
        isVisibleChangeEmail: false,
        isVisibleChangePassword: false
    };

    closeChangeEmailModal = () => {
        this.setState({
            isVisibleChangeEmail: false
        });
    };

    openChangeEmailModal = () => {
        this.setState({
            isVisibleChangeEmail: true
        });
    };

    closeChangePasswordModal = () => {
        this.setState({
            isVisibleChangePassword: false
        });
    };

    openChangePasswordModal = () => {
        this.setState({
            isVisibleChangePassword: true
        });
    };

    resendVerificationEmail = () => {
        console.log("resend")
    }

    render() {
        const email = this.props.user.email;
        const passLatChanged = 1;
        return (
            <Row style={{ marginBottom: "16px" }}>
                <Col span={24}>
                    <Alert style={{ marginBottom: "16px" }}
                        message={<Text strong={true}>Pending email verification</Text>}
                        type="warning"
                        showIcon
                        description={
                            <Space direction="vertical">
                                <Text>
                                    We sent an email to verify that you own {email}. You will not be able to use this email to log in to your account until it's verified.
                                </Text>
                                <Button type="ghost" onClick={this.resendVerificationEmail.bind(this)}>
                                    <Text strong={true}>Resend verification email</Text>
                                </Button>
                            </Space>

                        }
                    />

                    <Card style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <div>
                                <Text style={textStyle}>Email</Text>
                            </div>
                            <div style={{ marginTop: "8px" }}>
                                <Text style={editableTextStyle}>{this.props.user.email}</Text>
                            </div>
                            <Button style={{ ...buttonStyle, marginTop: "29px" }} onClick={this.openChangeEmailModal.bind(this)}>Change email</Button>
                        </Card.Grid>

                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <div>
                                <Text style={textStyle}>Password</Text>
                            </div>
                            <div style={{ marginTop: "8px" }}>
                                <Text style={editableTextStyle}>You changed your last password almost {passLatChanged} year(s) ago</Text>
                            </div>
                            <Button style={{ ...buttonStyle, marginTop: "29px" }} onClick={this.openChangePasswordModal.bind(this)}>Change password</Button>
                        </Card.Grid>
                    </Card>
                </Col>
                <ChangeEmailModal visibility={this.state.isVisibleChangeEmail} handleClose={this.closeChangeEmailModal} />
                <ChangePasswordModal visibility={this.state.isVisibleChangePassword} handleClose={this.closeChangePasswordModal} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { resendVerificationEmail })(EmailPasswordSettings);
