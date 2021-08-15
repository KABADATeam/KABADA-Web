import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveNgoSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class AddPublicBodiesSegmentModal extends Component {
    state = {
        ngoType: null,
        ngoTypeError: '',
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        if (this.state.ngoType === null) {
            this.setState({
                ngoTypeError: 'Select business type'
            });
            return;
        } else {
            this.setState({
                ngoTypeError: ''
            });
        }

        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "ngo_types": this.state.ngoType,
        };

        const selected_ngo_types = this.props.categories.customer_segments_types.ngo_types.filter((item) => this.state.ngoType.some((field) => item.id === field));

        const reducerObj = {
            "ngo_types": selected_ngo_types,
            "ngo_types_titles": selected_ngo_types.map(e => e.title).join(", "),
            "comment": null
        }

        this.props.saveNgoSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onNgoTypeChange(value) {
        this.setState({
            ngoType: value
        });
    }

    render() {

        const typeOptions = this.props.categories.customer_segments_types.ngo_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Public bodies & NGO segments</Space>}
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
                        <Form.Item key="type" name="type" label="Type"
                            validateStatus={this.state.ngoTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" allowClear placeholder="Select type" onChange={this.onNgoTypeChange.bind(this)} >
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
        categories: state.customerSegmentProperties,
    };
}
export default connect(mapStateToProps, { saveNgoSegment })(AddPublicBodiesSegmentModal);

