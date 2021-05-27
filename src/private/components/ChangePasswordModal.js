import React, { Component } from 'react';
import { Form, Modal, Button, Input, Upload } from 'antd';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import { UploadOutlined } from '@ant-design/icons';
import '../../css/customModal.css';

class ChangeEmailModal extends Component {

    handleOk = (values) => {
        console.log(values);
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
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter your current password'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item key="newPassword" name="newPassword" label="Enter new password"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter new password'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item key="repeatedPassword" name="repeatedPassword" label="Repeat your new password"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Repeat your new password'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}

export default ChangeEmailModal;

