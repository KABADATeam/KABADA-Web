import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Radio, Input } from 'antd';
import '../../../css/customModal.css';
import { inputStyle } from '../../../styles/customStyles';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateDistributor, updateSupplier, updateOther } from "../../../appStore/actions/partnersAction";

class EditKeyPartnerModal extends Component {
    state = {
        priority: 0,
        companyName: '',
        website: '',
        comment: ''
    }

    onCancel = () => {
        this.props.onClose();
    }

    onOK = () => {
        const priority = this.state.priority === 0 ? this.props.item.is_priority : this.state.priority;
        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "type_id": this.props.item.type_id,
            "name": this.state.companyName === '' ? this.props.item.name : this.state.companyName,
            "is_priority": priority === 1 ? false : true,
            "website": this.state.website === '' ? this.props.item.website : this.state.website,
            "comment":  this.state.comment === '' ? this.props.item.comment : this.state.comment
        }

        if (this.props.item.category === "distributor") {
            this.props.updateDistributor(postObj, this.props.item.type_title);
        } else if (this.props.item.category === "supplier") {
            this.props.updateSupplier(postObj, this.props.item.type_title);
        } else if (this.props.item.category === "other") {
            this.props.updateOther(postObj, this.props.item.type_title);
        } else {
            return;
        }

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

    render() {

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space>{this.props.item.type_title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            {/*<Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button>*/}
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.onOK}>
                        <Form.Item key="name" name="name" label="Company Name" initialValue={this.props.item.name}
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Enter company name'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} value={this.state.companyName} onChange={this.onCompanyNameChange} disabled={true}/>
                        </Form.Item>

                        <Form.Item label="Is it Priority?" key="priority" name="priority" initialValue={this.props.item.is_priority === false ? 1 : 2}>
                            <Radio.Group onChange={this.onChangePriority} value={this.props.item.is_priority === false ? 1 : 2} disabled={true}>
                                <Space direction="vertical">
                                    <Radio value={1}>No</Radio>
                                    <Radio value={2}>Yes</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item key="website" name="website" label="Company website (optional)" initialValue={this.props.item.website}>
                            <Input size="large" style={inputStyle} onChange={this.onWebsiteChange} disabled={true} />
                        </Form.Item>

                        <Form.Item key="comment" name="comment" label="Comment (optional)" initialValue={this.props.item.comment}>
                            <Input size="large" style={inputStyle} onChange={this.onCommentChange} disabled={true} />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { updateDistributor, updateSupplier, updateOther  })(EditKeyPartnerModal);

