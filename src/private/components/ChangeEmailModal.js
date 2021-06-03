import React, { Component } from 'react';
import { Form, Modal, Button, Input, Space, Typography } from 'antd';
import { inputStyle } from '../../styles/customStyles';
import '../../css/customModal.css';

const { Text } = Typography;

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
                    title="Change email"
                    visible={isVisible}
                    onCancel={this.handleCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" htmlType="submit" type={'primary'}>Change email</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Space  style={{ marginBottom: "20px" }}>
                            <Text >
                                We'll send you an email to the new address to verify that you own it
                            </Text>
                        </Space>
                        
                        <Form.Item key="newEmail" name="newEmail" label="Enter new email address"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter new email address'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item key="currentEmail" name="currentEmail" label="Enter your current password"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter current email address'));
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

