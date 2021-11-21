import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Radio, Input } from 'antd';
import '../../css/customModal.css';
import { inputStyle } from '../../styles/customStyles';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveDistributor, saveSupplier, saveOther } from "../../appStore/actions/partnersAction";

class AddKeyPartnerModal extends Component {
    state = {
        priority: 1,
        companyName: '',
        website: '',
        comment: ''
    }
    test = () => {
        console.log(this.state.companyName);
    }
    onCancel = () => {
        this.props.onClose();
    }

    onOK = () => {
        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "type_id": this.props.type.type_id,
            "name": this.state.companyName,
            "is_priority": this.state.priority === 1 ? false : true,
            "website": this.state.website,
            "comment":  this.state.comment
        }

        if (this.props.type.category_title === "distributor") {
            this.props.saveDistributor(postObj, this.props.type.title);
        } else if (this.props.type.category_title === "supplier") {
            this.props.saveSupplier(postObj, this.props.type.title);
        } else if (this.props.type.category_title === "other") {
            this.props.saveOther(postObj, this.props.type.title);
        } else {
            return;
        }
        this.setState({
            priority: 1,
            companyName: '',
            website: '',
            comment: ''
        });
        
        this.props.onClose();
    }

    onCompanyNameChange = (e) => {
        this.setState({
            companyName: e.target.value
        });
    }

    onWebsiteChange = (e) => {
        this.setState({
            website: e.target.value
        });
    }

    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    onChangePriority = e => {
        this.setState({
            priority: e.target.value
        })
    }

    onBack = () => {
        this.props.onBack();
    }


    render() {
        return (
            <>
                <Modal
                    destroyOnClose={true}
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />  {this.props.type.title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
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
                            <Input size="large" style={inputStyle} value={this.state.companyName} onChange={this.onCompanyNameChange} />
                        </Form.Item>

                        <Form.Item label="Is it Priority?" key="priority" name="priority" initialValue={1}>
                            <Radio.Group onChange={this.onChangePriority}  value={this.state.priority}>
                                <Space direction="vertical">
                                    <Radio value={1}>No</Radio>
                                    <Radio value={2}>Yes</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item key="website" name="website" label="Company website (optional)">
                            <Input size="large" style={inputStyle} onChange={this.onWebsiteChange} />
                        </Form.Item>

                        <Form.Item key="comment" name="comment" label="Comment (optional)">
                            <Input size="large" style={inputStyle} onChange={this.onCommentChange} />
                        </Form.Item>
                    </Form>
                </Modal>
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

export default connect(mapStateToProps, { saveDistributor, saveSupplier, saveOther })(AddKeyPartnerModal);

