import React, { Component } from 'react';
import { Form, Modal, Button, Input, Upload } from 'antd';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import { UploadOutlined } from '@ant-design/icons';
import '../../css/customModal.css';

class NewBusinessPlanModal extends Component {

    state = {
        fileList: [],
        visibility: false,
    };


    componentDidMount() {
        this.setState({
            visibility: this.props.visibility,
        });
    }

    handleOk = (values) => {
        console.log('Clicked ok button');

        const { fileList } = this.state;
        const formData = new FormData();
        if (Array.isArray(fileList) && fileList.length !== 0) {
            fileList.forEach(item => {
                if (item.file.status != 'removed') {
                    formData.append('files[]', item.file);
                }
            })
        }
        formData.append('name', values.name);

        this.setState({
            visibility: true,
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visibility: false,
        });
    };

    normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    render() {

        const visibility = this.state.visibility;
        const { fileList } = this.state;

        const propsUpload = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            onChange: file => {
                this.setState(state => {
                    return {
                        fileList: [file],
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <Modal
                bodyStyle={{ paddingBottom: '0px' }}
                centered={true}
                title="New business plan"
                visible={visibility}
                okText="Create"
                footer={[
                    <>
                        <Button key="cancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                        <Button key="submit" form="myForm" key="submit" htmlType="submit" type={'primary'}>Submit</Button>
                    </>
                ]}
            >
                <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                    <Form.Item key="name" name="name" label="Project name"
                        rules={[
                            {
                                validator: async (_, name) => {
                                    if (!name || name.length < 1) {
                                        return Promise.reject(new Error('Enter project name'));
                                    }
                                },
                            },
                        ]}>
                        <Input size="large" style={inputStyle} />
                    </Form.Item>
                    <Form.Item
                        key="upload"
                        name="upload"
                        label="Cover image (optional)"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                    >
                        <Upload key="files" {...propsUpload} maxCount={1} name="files" accept="image/*">
                            <Button style={buttonStyle} icon={<UploadOutlined />}>Browse</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
}

export default NewBusinessPlanModal;

