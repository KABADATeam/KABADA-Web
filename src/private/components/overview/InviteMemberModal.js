import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';
import '../../../css/customModal.css';
import { inputStyle } from '../../../styles/customStyles';
import { inviteMember } from '../../../appStore/actions/planActions';

const invitationLink = "http://kabada.ba.lv/register?email=";

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class InviteMemberModal extends Component {
    state = {
        invitationEmail: '',
        isEmailValid: true
    }

    

    onCancel = () => {
        this.props.onClose();
    }

    onOK = () => {

        if (validateEmail(this.state.invitationEmail) === false) {
            this.setState({
                isEmailValid: false
            });
            return;
        }

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

    onEmailChange = (e) => {
        this.setState({
            invitationEmail: e.target.value,
            isEmailValid: true
        });
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
                            <Input disabled={true} value={invitationLink + this.state.invitationEmail}/>
                        </Form.Item>

                        <Form.Item 
                            name="email"
                            label="Member email"
                            validateStatus={this.state.isEmailValid === false ? 'error' : 'success'}
                            help={this.state.isEmailValid === false ? 'Enter valid email' : ''}
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
        type: state.selectedPartnersCategoryType
    };
}

export default connect(mapStateToProps, { inviteMember })(InviteMemberModal);

