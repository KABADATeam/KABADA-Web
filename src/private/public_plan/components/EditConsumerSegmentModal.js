import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateConsumerSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class EditConsumerSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ageGroup: this.props.item.age.map(e => e.id),
            genderType: this.props.item.gender.map(e => e.id),
            isChildren: this.props.item.is_children,
            educationType: this.props.item.education.map(e => e.id),
            incomeType: this.props.item.income.map(e => e.id),
            locationType: this.props.item.geographic_location.map(e => e.id),
            ageGroupError: '',
            genderTypeError: '',
            isChildrenError: '',
            educationTypeError: '',
            incomeTypeError: '',
            locationTypeError: ''
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        if (this.state.ageGroup === null) {
            this.setState({
                ageGroupError: 'Select age group'
            });
            return;
        } else {
            this.setState({
                ageGroupError: ''
            });
        }

        if (this.state.genderType === null) {
            this.setState({
                genderTypeError: 'Select gender'
            });
            return;
        } else {
            this.setState({
                genderTypeError: ''
            });
        }

        if (this.state.isChildren === null) {
            this.setState({
                isChildrenError: 'Select if consumers are children or not'
            });
            return;
        } else {
            this.setState({
                isChildrenError: ''
            });
        }

        if (this.state.educationType === null) {
            this.setState({
                educationTypeError: 'Select education'
            });
            return;
        } else {
            this.setState({
                educationTypeError: ''
            });
        }

        if (this.state.incomeType === null) {
            this.setState({
                incomeTypeError: 'Select income'
            });
            return;
        } else {
            this.setState({
                incomeTypeError: ''
            });
        }

        if (this.state.locationType === null) {
            this.setState({
                locationTypeError: 'Select geographical location'
            });
            return;
        } else {
            this.setState({
                locationTypeError: ''
            });
        }

        const postObj = {
            "id": this.props.item.id,
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
            "id": this.props.item.id,
            "key": this.props.item.id,
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
        };

        this.props.updateConsumerSegment(postObj, reducerObj);

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
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}
                        initialValues={{
                            age: this.props.item.age.map(e => e.id),
                            gender: this.props.item.gender.map(e => e.id),
                            isChildren: this.props.item.is_children,
                            education: this.props.item.education.map(e => e.id),
                            income: this.props.item.income.map(e => e.id),
                            geographicLocation: this.props.item.geographic_location.map(e => e.id),
                        }}
                    >
                        <Form.Item key="age" name="age" label="Age group (years)"
                            validateStatus={this.state.ageGroupError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" disabled={true}
                                placeholder="Select age group (years)" onChange={this.onAgeGroupChange.bind(this)} >
                                {ageGroupOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="gender" name="gender" label="Gender"
                            validateStatus={this.state.genderTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select gender" onChange={this.onGenderTypeChange.bind(this)} disabled={true}>
                                {genderOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="isChildren" name="isChildren" label="Children" 
                            validateStatus={this.state.isChildrenError !== '' ? 'error' : 'success'} >
                            <Radio.Group onChange={this.onIsChildrenChange} value={isChildren}> 
                                <Space direction="vertical" >
                                    <Radio value={true} disabled={true}>Yes</Radio > 
                                    <Radio value={false} disabled={true}>No</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item key="education" name="education" label="Education"
                            validateStatus={this.state.educationTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose education" onChange={this.onEducationTypeChange.bind(this)} disabled={true}>
                                {educationOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="income" name="income" label="Income"
                            validateStatus={this.state.incomeTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose income" onChange={this.onIncomeTypeChange.bind(this)} disabled={true}>
                                {incomeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            validateStatus={this.state.locationTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Choose geographic location" onChange={this.onLocationTypeChange.bind(this)} disabled={true}>
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

