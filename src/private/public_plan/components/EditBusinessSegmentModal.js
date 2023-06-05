import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateBusinessSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;
const inputStyle = {
    borderRadius: '4px',
    width: '100%',
    marginBottom: '0px',
    textAlign: 'center',
    fontSize: '14px'
};

class EditBusinessSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.item.business_type.map(e => e.id),
            companySize: this.props.item.company_size.map(e => e.id),
            annualRevenue: this.props.item.annual_revenue,
            budget: this.props.item.budget,
            locationType: this.props.item.geographic_location.map(e => e.id),
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
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
    onBudgetChange(value) {
        this.setState({
            budget: value
        })
    }

    onAnnualRevenueChange(value) {
        this.setState({
            annualRevenue: value
        })
    }


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
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editBusinessSegmentForm" name="editBusinessSegmentForm" onFinish={this.onOK}
                        initialValues={{
                            type: this.props.item.business_type.map(e => e.id),
                            size: this.props.item.company_size.map(e => e.id),
                            annualRevenue: this.props.item.annual_revenue,
                            budget: this.props.item.budget,
                            geographicLocation: this.props.item.geographic_location.map(e => e.id),
                        }}>
                        <Form.Item key="type" name="type" label="Type"
                            rules={[{ required: true, message: 'Select business type' }]}>
                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Select type" onChange={this.onTypeChange.bind(this)} >
                                {typeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="size" name="size" label="Company size"
                            rules={[{ required: true, message: 'Select company size' }]}>
                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Select company size" onChange={this.onCompanySizeChange.bind(this)} >
                                {companySizeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="annualRevenue" name="annualRevenue" label={<label>Annual revenue</label>}
                            rules={[{ required: true, message: 'Enter annual revenue in Euros' }]}>
                            <InputNumber disabled={true} size="large" style={inputStyle} onChange={this.onAnnualRevenueChange.bind(this)} placeholder="Enter annual revenue in Euros" />
                        </Form.Item>

                        <Form.Item key="budget" name="budget" label="Budget"
                            rules={[{ required: true, message: 'Enter budget in Euros' }]}>
                            <InputNumber disabled={true} size="large" style={inputStyle} placeholder="Enter budget in Euros" onChange={this.onBudgetChange.bind(this)}
                            />
                        </Form.Item>

                        <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            rules={[{ required: true, message: 'Choose geographic location' }]}>
                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Choose geographic location" onChange={this.onLocationTypeChange.bind(this)} >
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

export default connect(mapStateToProps, { updateBusinessSegment })(EditBusinessSegmentModal);

