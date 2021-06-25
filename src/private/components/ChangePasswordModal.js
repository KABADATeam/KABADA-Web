import React, { Component } from 'react';
import { Form, Modal, Button, Input } from 'antd';
import { inputStyle } from '../../styles/customStyles';
import '../../css/customModal.css';
import { changeUserPassword } from "../../appStore/actions/settingsAction";
import { connect } from 'react-redux';

class ChangePasswordModal extends Component {

    handleOk = (values) => {
        this.props.changeUserPassword(values.currentPassword, values.newPassword)
        this.props.handleClose();
    };

    handleCancel = () => {
        this.props.handleClose();
    };

    render() {
        const isVisible = this.props.visibility;

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title="Change password"
                    visible={isVisible}
                    onCancel={this.handleCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" htmlType="submit" type={'primary'}>Submit</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>

                        <Form.Item key="currentPassword" name="currentPassword" label="Enter your current password"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Enter your current password'));
                                        }
                                    },
                                },
                            ]}>
                            <Input.Password size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item key="newPassword" name="newPassword" label="Enter new password" dependencies={['currentPassword']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Enter new password'));
                                        }
                                        if (!value || getFieldValue('currentPassword') === value) {
                                            return Promise.reject(new Error('The current password match the new password!'));
                                        }
                                    },
                                }),
                            ]}>
                            <Input.Password size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item key="repeatedPassword" name="repeatedPassword" label="Repeat your new password" dependencies={['newPassword']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Repeat your new password'));
                                        }
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        else return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                })
                            ]}>
                            <Input.Password size="large" style={inputStyle} />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
}
export default connect(mapStateToProps, { changeUserPassword })(ChangePasswordModal);

