import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input, Avatar, Row, Typography, Popover } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveConsumerSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;
const { Text } = Typography;

const inputStyle = {
    height: '40px',
    borderRadius: '4px',
    borderColor: '#BFBFBF',
}

class AddConsumerSegmentModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            segmentName: null,
            ageGroup: null,
            genderType: null,
            educationType: null,
            incomeType: null,
            locationType: null,
            popoverVisibility: false,
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        const education = this.state.educationType.map(e => e.id);
        const income = this.state.incomeType.map(e => e.id);
        const gender = this.state.genderType.map(e => e.id);
        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "age": this.state.ageGroup,
            "gender": gender,
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
            "age": selected_ages,
            "age_titles": selected_ages.map(e => e.title).join(", "),
            "gender": selected_genders,
            "gender_titles": selected_genders.map(e => e.title).join(", "),
            "education": selected_educations,
            "income": selected_incomes,
            "geographic_location": selected_locations,
            "location_titles": selected_locations.map(e => e.title).join(", "),
            "segment_name": this.state.segmentName
        }

        console.log('Post obj:' + JSON.stringify(postObj))
        console.log('Reducer obj:' + JSON.stringify(reducerObj))
        this.props.saveConsumerSegment(postObj, reducerObj);

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
        const genderTypeArray = [];
        console.log(this.state.genderType);
        console.log(value)
        if (this.state.genderType === null) {
            console.log(this.props.categories.customer_segments_types.gender_types)
            const gender_type = this.props.categories.customer_segments_types.gender_types.find((obj) => obj.id === value[0]);
            console.log(gender_type)
            const new_obj = {
                id: gender_type.id,
                title: gender_type.title,
                tag: 0
            }
            genderTypeArray.push(new_obj);
        }
        console.log(genderTypeArray);
        this.setState({
            genderType: genderTypeArray
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
    handlePopoverVisibilityChange = (visible) => {
        this.setState({
            popoverVisibility: visible
        })
    }
    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }
    onAIButtonClick = () => {
        console.log('AI button work');
        console.log(this.props.businessPlan.id)
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
        const popoverContent = (
            <>
                <Row>
                    <Text>
                        Test
                    {/* Based on your input KABADA AI recommends that you consider adding {this.props.customerSegments.aiPredictTextEdit.map((e, index) => 
                    <Text key={index} > for "{e.type_title}" {e.predict.map((p,index) => <Text key={index}>{p.title}</Text>)}</Text>)}. */}
                    </Text>
                    {/* Based on your input KABADA AI recommends that you consider adding for "Gender" male, for "Education" Primary. */}
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                </Row>
            </>
        )
        const popoverContentError = (
            <>
                <Row>
                    <Text>
                        AI did not have predict
                    </Text>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Button onClick={this.hidePopover}>Cancel</Button>
                </Row>
            </>
        )

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Consumers
                        <Popover
                            placement='topLeft'
                            title='AI Hint'
                            content={this.props.customerSegments.errorMessage === false ? popoverContent : popoverContentError}
                            overlayStyle={{ width: "328px" }}
                            trigger="click"
                            visible={this.state.popoverVisibility}
                            onVisibleChange={this.handlePopoverVisibilityChange}
                        >
                            <Button
                                icon=
                                {<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <rect width="28" height="28" rx="14" fill="#1990FE" />
                                    <path d="M22.7077 11.9719C22.1277 11.9719 21.9249 12.3878 21.876 12.4719H20.7385V9.5C20.7385 8.11937 19.6369 7 18.2769 7H9.41538C8.05538 7 6.95385 8.11937 6.95385 9.5V12.4719H5.81631C5.76738 12.4156 5.56462 11.9719 4.98462 11.9719C4.45969 11.9719 4 12.4006 4 12.9719C4 13.5438 4.46062 13.9437 4.98462 13.9437C5.56462 13.9437 5.76738 13.5281 5.81631 13.4719H6.95385V17.4438C6.95385 18.8244 8.056 19.9438 9.41538 19.9438L10.8923 19.9719V22.5966C10.8923 22.7281 10.9754 23 11.2615 23C11.3391 23 11.4153 22.9747 11.4799 22.9272L15.3231 19.9719L18.2769 19.9721C19.6363 19.9721 20.7385 18.8527 20.7385 17.4721V13.4719H21.8763C21.9262 13.5844 22.1292 13.9719 22.7077 13.9719C23.2326 13.9719 23.6923 13.5431 23.6923 13C23.6923 12.4281 23.2338 11.9719 22.7077 11.9719ZM18.7692 15C18.7692 15.5522 18.3283 16 17.7846 16H9.90769C9.36308 16 8.92308 15.5531 8.92308 15V11C8.92308 10.4478 9.364 10 9.90769 10H17.7846C18.3283 10 18.7692 10.4478 18.7692 11V15ZM10.8923 11.9719C10.3486 11.9719 9.90769 12.4197 9.90769 12.9719C9.90769 13.5241 10.3486 13.9719 10.8923 13.9719C11.436 13.9719 11.8769 13.5241 11.8769 12.9719C11.8769 12.4469 11.4369 11.9719 10.8923 11.9719ZM16.8 11.9719C16.2563 11.9719 15.8154 12.4197 15.8154 12.9719C15.8154 13.5241 16.2563 13.9719 16.8 13.9719C17.3437 13.9719 17.7846 13.5241 17.7846 12.9719C17.7846 12.4469 17.3446 11.9719 16.8 11.9719Z" fill="white" />
                                </svg>
                                }
                                type="link"
                                // shape="circle"
                            />
                        </Popover>
                    </Space>}
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
                        <Form.Item key="name" name="name" label="Segment Name"
                            rules={
                                [{ required: true, message: 'Type segment name' }]
                            }>
                            <Input style={{ width: '100%', ...inputStyle }} placeholder="Add segment name" onChange={(e) => this.onNameChange(e.target.value)} />
                        </Form.Item>
                        <Form.Item key="age" name="age" label="Age group (years)"
                            rules={[{ required: true, message: 'Select age group (years)' }]}>
                            <Select style={{ width: '100%', ...inputStyle }} mode="multiple" placeholder="Select age group (years)" onChange={this.onAgeGroupChange.bind(this)} >
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
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        categories: state.customerSegmentProperties,
        customerSegments: state.customerSegments
    };
}

export default connect(mapStateToProps, { saveConsumerSegment })(AddConsumerSegmentModal);

