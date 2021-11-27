import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateNgoSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class EditPublicBodiesSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentName: this.props.item.segment_name,
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

        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "ngo_types": this.state.ngoType,
            "segment_name":this.state.segmentName
        };

        const selected_ngo_types = this.props.categories.customer_segments_types.ngo_types.filter((item) => this.state.ngoType.some((field) => item.id === field));

        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "ngo_types": selected_ngo_types,
            "ngo_types_titles": selected_ngo_types.map(e => e.title).join(", "),
            "segment_name": this.state.segmentName
        };

        this.props.updateNgoSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange(value){
        this.setState({
            segmentName: value
        })
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
                            <Button key="customSubmit" form="editPublicBodiesNgoForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editPublicBodiesNgoForm" name="editPublicBodiesNgoForm" onFinish={this.onOK}
                        initialValues={{
                            type: this.props.item.ngo_types.map(e => e.id),
                        }}>
                        <Form.Item key="name" name="name" label="Segment name">
                            <Input style={{width: '100%'}} placeholder="Edit segment name" defaultValue={this.state.segmentName}
                            value={this.state.segmentName} onChange={(e) => this.onNameChange(e.target.value)}/>
                        </Form.Item>
                        <Form.Item key="type" name="type" label="Type"
                            rules={[{ required: true, message: 'Select type' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select type" onChange={this.onNgoTypeChange.bind(this)} >
                                {typeOptions}
                            </Select>
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
        categories: state.customerSegmentProperties,
    };
}

export default connect(mapStateToProps, { updateNgoSegment })(EditPublicBodiesSegmentModal);

