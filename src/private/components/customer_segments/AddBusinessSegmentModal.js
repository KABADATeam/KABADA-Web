import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveBusinessSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

const inputStyle = {
    borderRadius: '4px',
    width: '100%',
    marginBottom: '0px',
    textAlign: 'center',
    fontSize: '14px'
};

class AddBusinessSegmentModal extends Component {
    state = {
        type: null,
        companySize: null,
        locationType: null,
        //annualRevenue: null,
        //budget: null,
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
            "business_type": this.state.type,
            "company_size": this.state.companySize,
            //"annual_revenue": this.state.annualRevenue,
            //"budget": this.state.budget,
            //"income": [],
            "geographic_location": this.state.locationType
        };

        const selected_types = this.props.categories.customer_segments_types.business_types.filter((item) => this.state.type.some((field) => item.id === field));
        const selected_company_sizes = this.props.categories.customer_segments_types.company_sizes.filter((item) => this.state.companySize.some((field) => item.id === field));
        const selected_locations = this.props.categories.customer_segments_types.geographic_locations.filter((item) => this.state.locationType.some((field) => item.id === field));

        const reducerObj = {
            "business_type": selected_types,
            "business_type_titles": selected_types.map(e => e.title).join(", "),
            "company_size": selected_company_sizes,
            "company_size_titles": selected_company_sizes.map(e => e.title).join(", "),
            //"annual_revenue": this.state.annualRevenue,
            //"budget": this.state.budget,
            //"income": [],
            "geographic_location": selected_locations,
            "location_titles": selected_locations.map(e => e.title).join(", "),
            "comment": null
        };

        this.props.saveBusinessSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onTypeChange(value) {
        this.setState({
            type: value
        });
    }

    onCompanySizeChange(value) {
        this.setState({
            companySize: value
        });
    }

    onLocationTypeChange(value) {
        this.setState({
            locationType: value
        })
    }
    /*
    onBudgetChange(value) {
        this.setState({
            budget: value
        })
    }

    onAnnualRevenueChange(value) {
        this.setState({
            annualRevenue: value
        })
    }*/

    render() {

        const typeOptions = this.props.categories.customer_segments_types.business_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const companySizeOptions = this.props.categories.customer_segments_types.company_sizes.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const locationOptions = this.props.categories.customer_segments_types.geographic_locations.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Business Segments</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button type="primary" htmlType="submit" key="customSubmit" form="addBusinessSegmentForm">Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="addBusinessSegmentForm" name="addBusinessSegmentForm" onFinish={this.onOK.bind(this)}>
                        <Form.Item key="type" name="type" label="Type"
                            rules={[{ required: true, message: 'Select business type' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select type" onChange={this.onTypeChange.bind(this)} >
                                {typeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="size" name="size" label="Company size"
                            rules={[{ required: true, message: 'Select company size' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select company size" onChange={this.onCompanySizeChange.bind(this)} >
                                {companySizeOptions}
                            </Select>
                        </Form.Item>

                        {/* <Form.Item key="annualRevenue" name="annualRevenue" label="Annual revenue"
                            rules={[{ required: true, message: 'Enter annual revenue in Euros' }]}>
                            <InputNumber size="large" style={inputStyle} onChange={this.onAnnualRevenueChange.bind(this)} placeholder="Enter annual revenue in Euros" />
                        </Form.Item>

                        <Form.Item key="budget" name="budget" label="Budget"
                            rules={[{ required: true, message: 'Enter budget in Euros' }]}>
                            <InputNumber size="large" style={inputStyle} placeholder="Enter budget in Euros" onChange={this.onBudgetChange.bind(this)} />
                        </Form.Item>
                        */}

                        <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            rules={[{ required: true, message: 'Choose geographic location' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose geographic location" onChange={this.onLocationTypeChange.bind(this)} >
                                {locationOptions}
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

export default connect(mapStateToProps, { saveBusinessSegment })(AddBusinessSegmentModal);

