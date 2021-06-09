import React, { Component } from 'react';
import { Form, Modal, Button, Input, Upload, Select, Space, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import { UploadOutlined } from '@ant-design/icons';
import '../../css/customModal.css';
const { Option } = Select;
const { Text, Link } = Typography;

class NewBusinessPlanModal extends Component {

    state = {
        fileList: [],
        isVisible: false,
    };

    handleOk = (values) => {

        console.log('Clicked ok button');

        const { fileList } = this.state;
        const formData = new FormData();

        if (Array.isArray(fileList) && fileList.length !== 0) {
            fileList.forEach(item => {
                if (item.file.status !== 'removed') {
                    formData.append('files[]', item.file);
                }
            })
        }
        formData.append('name', values.name);

        this.setState({
            isVisible: true,
        });
        console.log(values);
        //this.props.handleClose();
    };

    handleCancel = () => {
        this.props.handleClose();
        console.log('Clicked cancel button');
        this.setState({
            isVisible: false,
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

        const isVisible = this.props.visibility;
        const { fileList } = this.state;

        const country = ['Lithuania', 'Latvia'];
        const language = ['lithuanian', 'english'];

        const aboutNACE = "NACE is ...";

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
            <>
                <Modal
                    destroyOnClose={true}
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={700}
                    title="New business plan"
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
                        <Space direction="vertical" size={2}>
                            <Space size={26}>
                                <Form.Item style={{ marginBottom: "0px" }} key="NACEcode" name="NACEcode" label={<Space><Text>NACE code</Text><Tooltip title={aboutNACE}><QuestionCircleOutlined style={{ color: "#8C8C8C" }} /></Tooltip></Space>}
                                    rules={[
                                        {
                                            validator: async (_, NACEcode) => {
                                                if (!NACEcode || NACEcode.length < 1) {
                                                    return Promise.reject(new Error('Enter NACE code'));
                                                }
                                            },
                                        },
                                    ]}>
                                    <Input size="large" style={{ ...inputStyle, width: 315 }} placeholder="Code example BD5645645" />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: "0px" }} key="country" name="country" label="Country of residence (optional)">
                                    <Select showSearch
                                        style={{ width: 315 }}
                                        placeholder="Select country"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {country.map(item => (
                                            <Option key={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                            <Link underline>Code website</Link>
                        </Space>
                        <Form.Item style={{ marginTop: "35px" }} key="language" name="language" label="Language of bussines plan?"
                            rules={[
                                {
                                    validator: async (_, language) => {
                                        if (!language || language.length < 1) {
                                            return Promise.reject(new Error('Select language of bussines plan'));
                                        }
                                    },
                                },
                            ]}
                        >
                            <Select showSearch
                                style={{ width: 315 }}
                                placeholder="Select language"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {language.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}

export default NewBusinessPlanModal;

