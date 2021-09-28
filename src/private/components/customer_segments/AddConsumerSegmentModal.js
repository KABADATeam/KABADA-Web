import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveConsumerSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class AddConsumerSegmentModal extends Component {
    state = {
        ageGroup: null,
        genderType: null,
        isChildren: null,
        educationType: null,
        incomeType: null,
        locationType: null,
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
            "is_children": this.state.isChildren,
            "age": this.state.ageGroup,
            "gender": this.state.genderType,
            "education": this.state.educationType,
            "income": this.state.incomeType,
            "geographic_location": this.state.locationType
        };

        const selected_ages = this.props.categories.customer_segments_types.age_groups.filter((item) => this.state.ageGroup.some((field) => item.id === field));
        const selected_genders = this.props.categories.customer_segments_types.gender_types.filter((item) => this.state.genderType.some((field) => item.id === field));
        const selected_educations = this.props.categories.customer_segments_types.education_types.filter((item) => this.state.educationType.some((field) => item.id === field));
        const selected_incomes = this.props.categories.customer_segments_types.income_types.filter((item) => this.state.incomeType.some((field) => item.id === field));
        const selected_locations = this.props.categories.customer_segments_types.geographic_locations.filter((item) => this.state.locationType.some((field) => item.id === field));

        const reducerObj = {
            "is_children": this.state.isChildren,
            "age": selected_ages,
            "age_titles": selected_ages.map(e => e.title).join(", "),
            "gender": selected_genders,
            "gender_titles": selected_genders.map(e => e.title).join(", "),
            "education": selected_educations,
            "income": selected_incomes,
            "geographic_location": selected_locations,
            "location_titles": selected_locations.map(e => e.title).join(", "),
            "comment": null
        }

        this.props.saveConsumerSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onAgeGroupChange(value) {
        this.setState({
            ageGroup: value
        });
    }

    onGenderTypeChange(value) {
        this.setState({
            genderType: value
        });
    }

    onIsChildrenChange = e => {
        this.setState({
            isChildren: e.target.value,
        });
    }

    onEducationTypeChange(value) {
        this.setState({
            educationType: value
        });
    }

    onIncomeTypeChange(value) {
        this.setState({
            incomeType: value
        });
    }
    onLocationTypeChange(value) {
        this.setState({
            locationType: value
        })
    }

    render() {

        const isChildren = this.state.isChildren

        const ageGroupOptions = this.props.categories.customer_segments_types.age_groups.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const genderOptions = this.props.categories.customer_segments_types.gender_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const educationOptions = this.props.categories.customer_segments_types.education_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const incomeOptions = this.props.categories.customer_segments_types.income_types.map((obj) =>
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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Consumers</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="addConsumerForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="addConsumerForm" name="addConsumerForm" onFinish={this.onOK}>
                        <Form.Item key="name" name="name" label="Age group (years)"
                            rules={[{ required: true, message: 'Select age group (years)' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select age group (years)" onChange={this.onAgeGroupChange.bind(this)} >
                                {ageGroupOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="gender" name="gender" label="Gender"
                            rules={[{ required: true, message: 'Select gender' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select gender" onChange={this.onGenderTypeChange.bind(this)} >
                                {genderOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="isChildren" name="isChildren" label="Children"
                            rules={[{ required: true, message: 'Select if consumers are children' }]}>
                            <Radio.Group onChange={this.onIsChildrenChange} value={isChildren}>
                                <Space direction="vertical">
                                    <Radio value={true}>Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item key="education" name="education" label="Education"
                            rules={[{ required: true, message: 'Select education' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose education" onChange={this.onEducationTypeChange.bind(this)} >
                                {educationOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="income" name="income" label="Income"
                            rules={[{ required: true, message: 'Select income' }]}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose income" onChange={this.onIncomeTypeChange.bind(this)} >
                                {incomeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            rules={[{ required: true, message: 'Select geographic location' }]}>
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

export default connect(mapStateToProps, { saveConsumerSegment })(AddConsumerSegmentModal);

