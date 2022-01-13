import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input, Tag } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateConsumerSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

const inputStyle = {
    height: '40px', 
    borderRadius: '4px',
    borderColor: '#BFBFBF',
}

class EditConsumerSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentName: this.props.item.segment_name,
            ageGroup: this.props.item.age.map(e => e.id),
            genderType: this.props.item.gender.map(e => e.id),
            educationType: this.props.item.education.map(e => e.id),
            incomeType: this.props.item.income.map(e => e.id),
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
        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "age": this.state.ageGroup,
            "gender": this.state.genderType,
            "education": this.state.educationType,
            "income": this.state.incomeType,
            "geographic_location": this.state.locationType,
            "segment_name": this.state.segmentName
        };

        const selected_ages = this.props.categories.customer_segments_types.age_groups.filter((item) => this.state.ageGroup.some((field) => item.id === field));
        const selected_genders = this.props.categories.customer_segments_types.gender_types.filter((item) => this.state.genderType.some((field) => item.id === field));
        const selected_educations = this.props.categories.customer_segments_types.education_types.filter((item) => this.state.educationType.some((field) => item.id === field));
        const selected_incomes = this.props.categories.customer_segments_types.income_types.filter((item) => this.state.incomeType.some((field) => item.id === field));
        const selected_locations = this.props.categories.customer_segments_types.geographic_locations.filter((item) => this.state.locationType.some((field) => item.id === field));

        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "age": selected_ages,
            "age_titles": selected_ages.map(e => e.title).join(", "),
            "gender": selected_genders,
            "gender_titles": selected_genders.map(e => e.title).join(", "),
            "education": selected_educations,
            "income": selected_incomes,
            "geographic_location": selected_locations,
            "location_titles": selected_locations.map(e => e.title).join(", "),
            "segment_name": this.state.segmentName
        };

        this.props.updateConsumerSegment(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange(value) {
        this.setState({
            segmentName: value
        })
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
                            <Button key="customSubmit" form="editConsumerForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editConsumerForm" name="editConsumerForm" onFinish={this.onOK}
                        initialValues={{
                            name: this.props.item.segment_name,
                            age: this.props.item.age.map(e => e.id),
                            gender: this.props.item.gender.map(e => e.id),
                            education: this.props.item.education.map(e => e.id),
                            income: this.props.item.income.map(e => e.id),
                            geographicLocation: this.props.item.geographic_location.map(e => e.id),
                        }}
                    >
                        <Form.Item key="name" name="name" label="Segment name"
                        rules={
                            [{ required: true, message: 'Type segment name' }]
                        }>
                            <Input style={{ width: '100%', ...inputStyle }} placeholder="Edit segment name" 
                                value={this.state.segmentName} onChange={(e) => this.onNameChange(e.target.value)} />
                        </Form.Item>
                        <Form.Item key="age" name="age" label="Age group (years)"
                            rules={[{ required: true, message: 'Select age group (years)' }]}>
                            <Select style={{ width: '100%', }} mode="multiple" className='ant-select' 
                                placeholder="Select age group (years)" onChange={this.onAgeGroupChange.bind(this)} >
                                {ageGroupOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="gender" name="gender" label="Gender"
                            rules={[{ required: true, message: 'Select gender' }]}>
                            <Select style={{ width: '100%', ...inputStyle }} mode="multiple" placeholder="Select gender" onChange={this.onGenderTypeChange.bind(this)} >
                                {genderOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="education" name="education" label="Education"
                            rules={[{ required: true, message: 'Select education' }]}>
                            <Select style={{ width: '100%', ...inputStyle }} mode="multiple" placeholder="Choose education" onChange={this.onEducationTypeChange.bind(this)} >
                                {educationOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="income" name="income" label="Income"
                            rules={[{ required: true, message: 'Select income' }]}>
                            <Select style={{ width: '100%', ...inputStyle }} mode="multiple" placeholder="Choose income" onChange={this.onIncomeTypeChange.bind(this)} >
                                {incomeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            rules={[{ required: true, message: 'Select geographic location' }]}>
                            <Select style={{ width: '100%', ...inputStyle }} mode="multiple" placeholder="Choose geographic location" onChange={this.onLocationTypeChange.bind(this)} >
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

export default connect(mapStateToProps, { updateConsumerSegment })(EditConsumerSegmentModal);

