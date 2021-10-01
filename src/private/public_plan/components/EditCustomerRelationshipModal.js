import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateCustomerRelationship } from "../../../appStore/actions/customerRelationshipsAction";

const { Option } = Select;

class EditCustomerRelationshipModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: this.props.item.channels,
            channelsError: '',
        }
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
            "item_id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "channels": this.state.channels,
            "category_id": this.props.item.category.id,
            "group": this.props.item.group,
        };

        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "channels": this.state.channels,
            "category": this.props.item.category,
            "comment": null,
            "group": this.props.item.group,
        };

        this.props.updateCustomerRelationship(postObj, reducerObj);

        this.props.onClose();
    }

    onChannelsChange(value) {
        this.setState({
            channels: value
        });
    }

    render() {
        const category_title = this.props.item.category.title;

        const typeOptions = this.props.item.channels.map((obj) =>
            <Option key={obj} value={obj}>{obj}</Option>
        );

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
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}
                        initialValues={{
                            channels: this.props.item.channels.map(e => e),
                        }}>
                        <Form.Item key="channels" name="channels" label="Channel"
                            validateStatus={this.state.channelsError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="tags" placeholder="Select channel" onChange={this.onChannelsChange.bind(this)} disabled={true}>
                                {typeOptions}
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

export default connect(mapStateToProps, { updateCustomerRelationship })(EditCustomerRelationshipModal);

