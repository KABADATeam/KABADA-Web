import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveNgoSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class AddPublicBodiesSegmentModal extends Component {
    state = {
        name: null,
        ngoType: null,
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "ngo_types": this.state.ngoType,
            "comment":this.state.name
        };

        const selected_ngo_types = this.props.categories.customer_segments_types.ngo_types.filter((item) => this.state.ngoType.some((field) => item.id === field));

        const reducerObj = {
            "ngo_types": selected_ngo_types,
            "ngo_types_titles": selected_ngo_types.map(e => e.title).join(", "),
            "comment": this.state.name
        }

        console.log("Post obj:"+JSON.stringify(postObj))
        console.log("Reducer obj:"+JSON.stringify(reducerObj))

        this.props.saveNgoSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange(value) {
        this.setState({
            name: value
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
                            <Button key="customSubmit" form="addPublicBodiesNgoForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="addPublicBodiesNgoForm" name="addPublicBodiesNgoForm" onFinish={this.onOK}>
                        <Form.Item key="name" name="name" label="Segment name">
                            <Input style={{width: '100%'}} placeholder="Add segment name" onChange={(e) => this.onNameChange(e.target.value)}/>
                        </Form.Item>
                        <Form.Item key="type" name="type" label="Type"
                            rules={[{ required: true, message: 'Select type' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" allowClear placeholder="Select type" onChange={this.onNgoTypeChange.bind(this)} >
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
export default connect(mapStateToProps, { saveNgoSegment })(AddPublicBodiesSegmentModal);

