import React, { Component } from 'react';
import { Modal, Button, Form, Space, Radio, Input } from 'antd';
import '../../css/customModal.css';
import { inputStyle } from '../../styles/customStyles';

class AddKeyPartnerModal extends Component {
    state = {
        addKeyVisibility: false,
        priority: 1,
    }

    handleCancel = () => {
        this.props.handleClose();
        console.log('Clicked cancel button');
        this.setState({
            addKeyVisibility: false,
        });
    };
    handleOk = (values) => {
        console.log(values);
        this.setState({
            addKeyVisibility: false
        })
    }
    onChangePriority = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            priority: e.target.value
        })
    }


    render() {
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title="Wholesalers"
                    visible={this.props.visibility}
                    onCancel={this.handleCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item key="name" name="name" label="Company Name"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Enter company name'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>

                        <Form.Item label="Is it Priority?" key="priority" name="priority">
                            <Radio.Group onChange={this.onChangePriority} value={this.state.priority}>
                                <Space direction="vertical">
                                    <Radio value={1}>No</Radio>
                                    <Radio value={2}>Yes</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item key="website" name="website" label="Companty website (optional)">
                            <Input size="large" style={inputStyle} />
                        </Form.Item>

                        <Form.Item key="comment" name="comment" label="Comment (optional)">
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}

export default AddKeyPartnerModal;

