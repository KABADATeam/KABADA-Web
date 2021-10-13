import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateNgoSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class EditPublicBodiesSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngoType: this.props.item.ngo_types.map(e => e.id),
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
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
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editPublicBodiesNgoForm" name="editPublicBodiesNgoForm" onFinish={this.onOK}
                        initialValues={{
                            type: this.props.item.ngo_types.map(e => e.id),
                        }}>
                        <Form.Item key="type" name="type" label="Type"
                            rules={[{ required: true, message: 'Select type' }]}>
                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Select type" onChange={this.onNgoTypeChange.bind(this)} >
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

export default connect(mapStateToProps, { updateNgoSegment })(EditPublicBodiesSegmentModal);

