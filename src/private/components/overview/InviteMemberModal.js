import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';
import '../../../css/customModal.css';
import { inputStyle } from '../../../styles/customStyles';
import { inviteMember, getMembers } from '../../../appStore/actions/planActions';

const invitationLink = "http://kabada.ba.lv/register?email=";

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
}

class InviteMemberModal extends Component {
    state = {
        invitationEmail: '',
        isEmailValid: true,
        validateStatus: 'success',
        errorMsg: null
    }



    onCancel = () => {
        this.props.onClose();
    }

    onOK = () => {

        if (validateEmail(this.state.invitationEmail) === false) {
            this.setState({
                validateStatus: 'error',
                errorMsg: 'Please enter a valid email address'
            });
            return;
        }
        if (this.state.validateStatus === 'error') {

        } else {
            const postObj = {
                "business_plan_id": this.props.businessPlan.id,
                "email": this.state.invitationEmail
            }

            this.setState({
                invitationEmail: ''
            });

            this.props.inviteMember(postObj);
            this.props.onClose();
        }

    }


    onEmailChange = (e) => {
        console.log(this.props.businessPlan.members);
        if (this.props.businessPlan.members === null) {
            if (e.target.value !== this.props.user.email) {
                this.setState({
                    invitationEmail: e.target.value,
                    validateStatus: 'success',
                    errorMsg: null
                });
            }
            if (e.target.value === this.props.user.email) {
                this.setState({
                    invitationEmail: e.target.value,
                    validateStatus: 'error',
                    errorMsg: 'Can not share business plan with yourseft'
                })
            }
        } else {
            const emailInMemberList = this.props.businessPlan.members.find((x) => x.email === e.target.value) === undefined ? false : true;
            if (e.target.value !== this.props.user.email) {
                this.setState({
                    invitationEmail: e.target.value,
                    validateStatus: 'success',
                    errorMsg: null
                });
            }
            if (e.target.value === this.props.user.email) {
                this.setState({
                    invitationEmail: e.target.value,
                    validateStatus: 'error',
                    errorMsg: 'Can not share business plan with yourseft'
                })
            }
            if (emailInMemberList === true) {
                this.setState({
                    invitationEmail: e.target.value,
                    validateStatus: 'error',
                    errorMsg: 'The invited member is already on the list'
                })
            }
        }      
    }

    onBack = () => {
        this.props.onBack();
    }

    render() {
        console.log(this.state);
        console.log(invitationLink);
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title="Invite team member"
                    visible={this.props.visible}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Invite</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="invitationForm">

                        <Form.Item label="Invitation link"  >
                            <Input disabled={true} value={invitationLink + this.state.invitationEmail} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Member email"
                            validateStatus={this.state.validateStatus}
                            help={this.state.errorMsg}
                        >

                            <Input size="large" style={inputStyle} onChange={this.onEmailChange} />
                        </Form.Item>

                    </Form>
                </Modal >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        type: state.selectedPartnersCategoryType,
        user: state.user
    };
}

export default connect(mapStateToProps, { inviteMember, getMembers })(InviteMemberModal);

