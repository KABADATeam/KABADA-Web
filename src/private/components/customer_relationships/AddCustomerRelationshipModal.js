import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveCustomerRelationship } from "../../../appStore/actions/customerRelationshipsAction";

class AddCustomerRelationshipModal extends Component {
    state = {
        channels: null,
        channelsError: '',
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        if (this.state.channels === null) {
            this.setState({
                channelsError: 'Select channel'
            });
            return;
        } else {
            this.setState({
                channelsError: ''
            });
        }

        const postObj = {
            "item_id": null,
            "business_plan_id": this.props.businessPlan.id,
            "channels": this.state.channels,
            "category_id": this.props.categories.selected_category.id,
            "group": this.props.group,
        };

        const reducerObj = {
            "channels": this.state.channels,
            "category": this.props.categories.selected_category,
            "comment": null,
            "group": this.props.group,
        };

        this.props.saveCustomerRelationship(postObj, reducerObj);

        this.props.onClose();
    }

    onChannelsChange(value) {
        this.setState({
            channels: value
        });
    }

    render() {

        const category_title = this.props.categories.selected_category.title;
        const children = [];

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />{category_title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item key="channels" name="channels" label="Channel"
                            validateStatus={this.state.channelsError !== '' ? 'error' : 'success'}>
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Enter channel" onChange={this.onChannelsChange.bind(this)}>
                                {children}
                            </Select>
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
        categories: state.customerRelationshipsCategories,
    };
}

export default connect(mapStateToProps, { saveCustomerRelationship })(AddCustomerRelationshipModal);

