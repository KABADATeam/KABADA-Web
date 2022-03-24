import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input, Avatar, Row, Tag, Typography, Popover } from 'antd';
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
    constructor(props) {
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
        const { ageGroup, educationType, incomeType, genderType, locationType } = this.state;
        console.log(this.state)
        if (ageGroup !== null && educationType !== null && incomeType !== null && genderType !== null && locationType !== null &&
            ageGroup.length !== 0 && educationType.length !== 0 && incomeType.length !== 0 && genderType.length !== 0 && locationType.length !== 0) {
            const age = ageGroup.map(e => e.id);
            const education = educationType.map(e => e.id);
            const income = incomeType.map(e => e.id);
            const gender = genderType.map(e => e.id);
            const location = locationType.map(e => e.id);
            const postObj = {
                "id": null,
                "business_plan_id": this.props.businessPlan.id,
                "age": age,
                "gender": gender,
                "education": education,
                "income": income,
                "geographic_location": location,
                "segment_name": this.state.segmentName
            };

            const selected_ages = this.props.categories.customer_segments_types.age_groups.filter((item) => age.some((field) => item.id === field));
            const selected_genders = this.props.categories.customer_segments_types.gender_types.filter((item) => gender.some((field) => item.id === field));
            const selected_educations = this.props.categories.customer_segments_types.education_types.filter((item) => education.some((field) => item.id === field));
            const selected_incomes = this.props.categories.customer_segments_types.income_types.filter((item) => income.some((field) => item.id === field));
            const selected_locations = this.props.categories.customer_segments_types.geographic_locations.filter((item) => location.some((field) => item.id === field));

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
            this.props.saveConsumerSegment(postObj, reducerObj);
            this.props.onClose();
        } else {
            this.setState({
                ageGroup: ageGroup === null ? [] : ageGroup,
                genderType: genderType === null ? [] : genderType,
                educationType: educationType === null ? [] : educationType,
                incomeType: incomeType === null ? [] : incomeType,
                locationType: locationType === null ? [] : locationType
            })
        }
    }

    onNameChange(value) {
        this.setState({
            segmentName: value
        })
    }

    onAgeGroupChange(value) {
        const ageGroupArray = [];
        if (this.state.ageGroup === null) {
            const age_group = this.props.categories.customer_segments_types.age_groups.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: age_group.id,
                title: age_group.title,
                tag: 0
            }
            ageGroupArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                console.log(this.state.ageGroup[i])
                if (this.state.ageGroup[i] === undefined) {
                    const age_group = this.props.categories.customer_segments_types.age_groups.find((obj) => obj.id === value[i]);
                    const new_obj = {
                        id: age_group.id,
                        title: age_group.title,
                        tag: 0
                    }
                    ageGroupArray.push(new_obj)
                } else {
                    const age_group = this.state.ageGroup.find((obj) => obj.id === value[i]);
                    if (age_group.tag === 0) {
                        const new_obj = {
                            id: age_group.id,
                            title: age_group.title,
                            tag: 0
                        }
                        ageGroupArray.push(new_obj);
                    } else if (age_group.tag === 1) {
                        const new_obj = {
                            id: age_group.id,
                            title: age_group.title,
                            tag: 1
                        }
                        ageGroupArray.push(new_obj);
                    }
                }
            }
        }
        this.setState({
            ageGroup: ageGroupArray
        });
    }

    onGenderTypeChange(value) {
        const genderTypeArray = [];
        if (this.state.genderType === null) {
            const gender_type = this.props.categories.customer_segments_types.gender_types.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: gender_type.id,
                title: gender_type.title,
                tag: 0
            }
            genderTypeArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                if (this.state.genderType[i] === undefined) {
                    const gender_type = this.props.categories.customer_segments_types.gender_types.find((obj) => obj.id === value[i]);
                    console.log(gender_type);
                    const new_obj = {
                        id: gender_type.id,
                        title: gender_type.title,
                        tag: 0
                    }
                    genderTypeArray.push(new_obj)
                } else {
                    const gender_type = this.state.genderType.find((obj) => obj.id === value[i]);
                    if (gender_type.tag === 0) {
                        const new_obj = {
                            id: gender_type.id,
                            title: gender_type.title,
                            tag: 0
                        }
                        genderTypeArray.push(new_obj);
                    } else if (gender_type.tag === 1) {
                        const new_obj = {
                            id: gender_type.id,
                            title: gender_type.title,
                            tag: 1
                        }
                        genderTypeArray.push(new_obj);
                    }
                }
            }
        }
        this.setState({
            genderType: genderTypeArray
        });
    }

    onEducationTypeChange(value) {
        const educationTypeArray = [];
        if (this.state.educationType === null) {
            const education_type = this.props.categories.customer_segments_types.education_types.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: education_type.id,
                title: education_type.title,
                tag: 0
            }
            educationTypeArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                if (this.state.educationType[i] === undefined) {
                    const education_type = this.props.categories.customer_segments_types.education_types.find((obj) => obj.id === value[i]);
                    const new_obj = {
                        id: education_type.id,
                        title: education_type.title,
                        tag: 0
                    };
                    educationTypeArray.push(new_obj);
                } else {
                    const education_type = this.state.educationType.find((obj) => obj.id === value[i]);
                    if (education_type.tag === 0) {
                        const new_obj = {
                            id: education_type.id,
                            title: education_type.title,
                            tag: 0
                        }
                        educationTypeArray.push(new_obj);
                    } else if (education_type.tag === 1) {
                        const new_obj = {
                            id: education_type.id,
                            title: education_type.title,
                            tag: 1
                        }
                        educationTypeArray.push(new_obj);
                    }
                }
            };
        }
        this.setState({
            educationType: educationTypeArray
        });
    }

    onIncomeTypeChange(value) {
        const incomeTypeArray = [];
        if (this.state.incomeType === null) {
            const income_type = this.props.categories.customer_segments_types.income_types.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: income_type.id,
                title: income_type.title,
                tag: 0
            }
            incomeTypeArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                if (this.state.incomeType[i] === undefined) {
                    const income_type = this.props.categories.customer_segments_types.income_types.find((obj) => obj.id === value[i]);
                    const new_obj = {
                        id: income_type.id,
                        title: income_type.title,
                        tag: 0
                    };
                    incomeTypeArray.push(new_obj);
                } else {
                    const income_type = this.state.incomeType.find((obj) => obj.id === value[i]);
                    if (income_type.tag === 0) {
                        const new_obj = {
                            id: income_type.id,
                            title: income_type.title,
                            tag: 0
                        }
                        incomeTypeArray.push(new_obj);
                    } else if (income_type.tag === 1) {
                        const new_obj = {
                            id: income_type.id,
                            title: income_type.title,
                            tag: 1
                        }
                        incomeTypeArray.push(new_obj);
                    }
                }
            };
        }
        this.setState({
            incomeType: incomeTypeArray
        });
    }
    onLocationTypeChange(value) {
        const locationTypeArray = [];
        if (this.state.locationType === null) {
            const location_type = this.props.categories.customer_segments_types.geographic_locations.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: location_type.id,
                title: location_type.title,
                tag: 0
            }
            locationTypeArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                if (this.state.locationType[i] === undefined) {
                    const location_type = this.props.categories.customer_segments_types.geographic_locations.find((obj) => obj.id === value[i]);
                    const new_obj = {
                        id: location_type.id,
                        title: location_type.title,
                        tag: 0
                    };
                    locationTypeArray.push(new_obj);
                } else {
                    const location_type = this.state.locationType.find((obj) => obj.id === value[i]);
                    if (location_type.tag === 0) {
                        const new_obj = {
                            id: location_type.id,
                            title: location_type.title,
                            tag: 0
                        }
                        locationTypeArray.push(new_obj);
                    } else if (location_type.tag === 1) {
                        const new_obj = {
                            id: location_type.id,
                            title: location_type.title,
                            tag: 1
                        }
                        locationTypeArray.push(new_obj);
                    }
                }
            };
        }
        this.setState({
            locationType: locationTypeArray
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
    compareArray = (arrayAI, arrayState) => {
        const newArray = []
        for (var i in arrayAI) {
            if (arrayState.indexOf(arrayAI[i]) === -1) {
                newArray.push(arrayAI[i]);
            }
        }
        return newArray;
    }
    onAIButtonClick = () => {
        const obj = this.props.customerSegments.aiPredict.custSegs.consumer;
        const aiObject = obj.find((el) => el.id === null);
        const age = this.state.ageGroup === null ? [] : this.state.ageGroup.map(e => e.id);
        const ageAI = aiObject.age;
        const agePredict = this.compareArray(ageAI, age);
        const newAgeGroupArray = this.state.ageGroup === null ? [] : [...this.state.ageGroup];
        for (var i in agePredict) {
            const title = this.props.categories.customer_segments_types.age_groups.find((obj) => obj.id === agePredict[i]).title;
            const new_age_group_obj = {
                id: agePredict[i],
                title: title,
                tag: 1
            }
            console.log(new_age_group_obj)
            newAgeGroupArray.push(new_age_group_obj);
        }

        const gender = this.state.genderType === null ? [] : this.state.genderType.map(e => e.id);
        const genderAI = aiObject.gender;
        const genderPredict = this.compareArray(genderAI, gender);
        const newGenderArray = this.state.genderType === null ? [] : [...this.state.genderType];
        for (var i in genderPredict) {
            const title = this.props.categories.customer_segments_types.gender_types.find((obj) => obj.id === genderPredict[i]).title;
            const new_gender_type_obj = {
                id: genderPredict[i],
                title: title,
                tag: 1
            }
            console.log(new_gender_type_obj)
            newGenderArray.push(new_gender_type_obj);
        }
        const education = this.state.educationType === null ? [] : this.state.educationType.map(e => e.id);
        const educationAI = aiObject.education;
        const educationPredict = this.compareArray(educationAI, education);
        const newEducationArray = this.state.educationType === null ? [] : [...this.state.educationType];
        for (var i in educationPredict) {
            const title = this.props.categories.customer_segments_types.education_types.find((obj) => obj.id === educationPredict[i]).title;
            const new_education_type_obj = {
                id: educationPredict[i],
                title: title,
                tag: 1
            };
            newEducationArray.push(new_education_type_obj);
        }
        const income = this.state.incomeType === null ? [] : this.state.incomeType.map(e => e.id);
        const incomeAI = aiObject.income;
        const incomePredict = this.compareArray(incomeAI, income);
        const newIncomeArray = this.state.incomeType === null ? [] : [...this.state.incomeType];
        for (var i in incomePredict) {
            const title = this.props.categories.customer_segments_types.income_types.find((obj) => obj.id === incomePredict[i]).title;
            const new_income_type_obj = {
                id: incomePredict[i],
                title: title,
                tag: 1
            }
            newIncomeArray.push(new_income_type_obj);
        }
        const location = this.state.locationType === null ? [] : this.state.locationType.map(e => e.id);
        const locationAI = aiObject.geographic_location;
        const locationPredict = this.compareArray(locationAI, location);
        const newLocationArray = this.state.locationType === null ? [] : [...this.state.locationType];
        for (var i in locationPredict) {
            const title = this.props.categories.customer_segments_types.geographic_locations.find((obj) => obj.id === locationPredict[i]).title;
            const new_location_obj = {
                id: locationPredict[i],
                title: title,
                tag: 1
            }
            newLocationArray.push(new_location_obj);
        }
        this.setState({
            ageGroup: newAgeGroupArray.length === 0 ? null : newAgeGroupArray,
            genderType: newGenderArray.length === 0 ? null : newGenderArray,
            educationType: newEducationArray.length === 0 ? null : newEducationArray,
            incomeType: newIncomeArray.length === 0 ? null : newIncomeArray,
            locationType: newLocationArray.length === 0 ? null : newLocationArray
        })
        this.hidePopover();
    }


    render() {
        const age = this.state.ageGroup !== null ? this.state.ageGroup.map(e => e.id) : [];
        const gender = this.state.genderType !== null ? this.state.genderType.map(e => e.id) : [];
        const education = this.state.educationType !== null ? this.state.educationType.map(e => e.id) : [];
        const income = this.state.incomeType !== null ? this.state.incomeType.map(e => e.id) : [];
        const location = this.state.locationType !== null ? this.state.locationType.map(e => e.id) : [];

        const ageGroupOptions = this.props.categories.customer_segments_types.age_groups.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const genderOptions = this.props.categories.customer_segments_types.gender_types.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const educationOptions = this.props.categories.customer_segments_types.education_types.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const incomeOptions = this.props.categories.customer_segments_types.income_types.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const locationOptions = this.props.categories.customer_segments_types.geographic_locations.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );
        const popoverContent = (
            <>
                <Row>
                    <Text>
                    Based on your input KABADA AI recommends that you consider adding {this.props.customerSegments.predictText.map((e, index) =>
                            <Text key={index} > for "{e.type_title}": {e.predict.map((p, index) => <Text key={index}>{p.title},</Text>)}</Text>)}.
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
                    Based on the current information KABADA AI did not have any suggestions.
                    </Text>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Button onClick={this.hidePopover}>Cancel</Button>
                </Row>
            </>
        )
        const ageTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.ageGroup !== null ? this.state.ageGroup.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor === null) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }
        }
        const genderTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.genderType !== null ? this.state.genderType.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor === null) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }

        }

        const educationTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.educationType !== null ? this.state.educationType.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor === null) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }
        }

        const incomeTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.incomeType !== null ? this.state.incomeType.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor === null) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }
        }

        const locationTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.locationType !== null ? this.state.locationType.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor === null) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }
        }

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Consumers
                        <Popover
                            placement='topLeft'
                            title='AI Hint'
                            //content={popoverContent}
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

                        {
                            this.state.ageGroup === null ?
                                <Form.Item key="age" label="Age group (years)"
                                    rules={[{ required: true, message: 'Select age group (years)' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder='Select age group (years)'
                                        onChange={this.onAgeGroupChange.bind(this)}
                                        value={age}
                                        tagRender={ageTag}
                                        options={ageGroupOptions}
                                    />
                                </Form.Item>
                                : age.length > 0 ?
                                    <Form.Item key="age" label="Age group (years)"
                                        rules={[{ required: true, message: 'Select age group (years)' }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Select age group (years)"
                                            onChange={this.onAgeGroupChange.bind(this)}
                                            value={age}
                                            tagRender={ageTag}
                                            options={ageGroupOptions}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        key="age"
                                        label="Age group (years)"
                                        validateStatus="error"
                                        help="Select age group (years)"
                                        rules={[
                                            {
                                                validator: async (_, age) => {
                                                    if (!age || age.length < 1) {
                                                        return Promise.reject(new Error('Select age group (years)'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select age group (years)"
                                            onChange={this.onAgeGroupChange.bind(this)}
                                            value={age}
                                            tagRender={ageTag}
                                            options={ageGroupOptions}
                                        />
                                    </Form.Item>
                        }

                        {/* <Form.Item key="age" name="age" label="Age group (years)"
                            rules={[{ required: true, message: 'Select age group (years)' }]}>
                            <Select
                                mode="multiple"
                                placeholder="Select age group (years)"
                                onChange={this.onAgeGroupChange.bind(this)}
                                value={age}
                                tagRender={ageTag}
                                options={ageGroupOptions}
                            />
                        </Form.Item> */}

                        {
                            this.state.genderType === null ?
                                <Form.Item key="gender" label="Gender"
                                    rules={[{ required: true, message: 'Select gender' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Select gender"
                                        onChange={this.onGenderTypeChange.bind(this)}
                                        value={gender}
                                        tagRender={genderTag}
                                        options={genderOptions}
                                    />
                                </Form.Item>
                                : gender.length > 0 ?
                                    <Form.Item key="gender" label="Gender"
                                        rules={[{ required: true, message: 'Select gender' }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Select gender"
                                            onChange={this.onGenderTypeChange.bind(this)}
                                            value={gender}
                                            tagRender={genderTag}
                                            options={genderOptions}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        key="gender"
                                        label="Gender"
                                        validateStatus="error"
                                        help="Select gender"
                                        rules={[
                                            {
                                                validator: async (_, gender) => {
                                                    if (!gender || gender.length < 1) {
                                                        return Promise.reject(new Error('Select gender'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select gender"
                                            onChange={this.onGenderTypeChange.bind(this)}
                                            value={gender}
                                            tagRender={genderTag}
                                            options={genderOptions}
                                        />
                                    </Form.Item>
                        }

                        {
                            this.state.educationType === null ?
                                <Form.Item
                                    key="education"
                                    label="Education"
                                    rules={[{ required: true, message: 'Select education' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Choose education"
                                        onChange={this.onEducationTypeChange.bind(this)}
                                        value={education}
                                        tagRender={educationTag}
                                        options={educationOptions}
                                    />
                                </Form.Item>
                                : education.length > 0 ?
                                    <Form.Item
                                        key="education"
                                        label="Education"
                                        rules={[{ required: true, message: 'Select education' }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose education"
                                            onChange={this.onEducationTypeChange.bind(this)}
                                            value={education}
                                            tagRender={educationTag}
                                            options={educationOptions}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        key="education"
                                        label="Education"
                                        validateStatus="error"
                                        help="Select education"
                                        rules={[
                                            {
                                                validator: async (_, education) => {
                                                    if (!education || education.length < 1) {
                                                        return Promise.reject(new Error('Select education'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose education"
                                            onChange={this.onEducationTypeChange.bind(this)}
                                            value={education}
                                            tagRender={educationTag}
                                            options={educationOptions}
                                        />
                                    </Form.Item>
                        }

                        {/* <Form.Item key="income" name="income" label="Income"
                            rules={[{ required: true, message: 'Select income' }]}>
                            <Select
                                mode="multiple"
                                placeholder="Choose income"
                                onChange={this.onIncomeTypeChange.bind(this)}
                                value={income}
                                tagRender={incomeTag}
                                options={incomeOptions}
                            />
                        </Form.Item> */}

                        {
                            this.state.incomeType === null ?
                                <Form.Item
                                    key="income"
                                    label="Income"
                                    rules={[{ required: true, message: 'Select income' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Choose income"
                                        onChange={this.onIncomeTypeChange.bind(this)}
                                        value={income}
                                        tagRender={incomeTag}
                                        options={incomeOptions}
                                    />
                                </Form.Item>
                                : income.length > 0 ?
                                    <Form.Item
                                        key="income"
                                        label="Income"
                                        rules={[{ required: true, message: 'Select income' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose income"
                                            onChange={this.onIncomeTypeChange.bind(this)}
                                            value={income}
                                            tagRender={incomeTag}
                                            options={incomeOptions}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        key="income"
                                        label="Income"
                                        validateStatus="error"
                                        help="Select income"
                                        rules={[
                                            {
                                                validator: async (_, income) => {
                                                    if (!income || income.length < 1) {
                                                        return Promise.reject(new Error('Select income'));
                                                    }
                                                },
                                            },
                                        ]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose income"
                                            onChange={this.onIncomeTypeChange.bind(this)}
                                            value={income}
                                            tagRender={incomeTag}
                                            options={incomeOptions}
                                        />
                                    </Form.Item>
                        }

                        {/* <Form.Item key="geographicLocation" name="geographicLocation" label="Geographic Location"
                            rules={[{ required: true, message: 'Select geographic location' }]}>
                            <Select
                                mode="multiple"
                                placeholder="Choose geographic location"
                                onChange={this.onLocationTypeChange.bind(this)}
                                value={location}
                                tagRender={locationTag}
                                options={locationOptions}
                            />
                        </Form.Item> */}
                        {
                            this.state.locationType === null ?
                                <Form.Item key="geographicLocation" label="Geographic Location"
                                    rules={[{ required: true, message: 'Choose geographic location' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Choose geographic location"
                                        onChange={this.onLocationTypeChange.bind(this)}
                                        value={location}
                                        tagRender={locationTag}
                                        options={locationOptions}
                                    />
                                </Form.Item>
                                : location.length > 0 ?
                                    <Form.Item key="geographicLocation" label="Geographic Location"
                                        rules={[{ required: true, message: 'Choose geographic location' }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose geographic location"
                                            onChange={this.onLocationTypeChange.bind(this)}
                                            value={location}
                                            tagRender={locationTag}
                                            options={locationOptions}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        key="geographicLocation"
                                        label="Geographic Location"
                                        validateStatus="error"
                                        help="Choose geographic location"
                                        rules={[
                                            {
                                                validator: async (_, geographicLocation) => {
                                                    if (!geographicLocation || geographicLocation.length < 1) {
                                                        return Promise.reject(new Error('Choose geographic location'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Choose geographic location"
                                            onChange={this.onLocationTypeChange.bind(this)}
                                            value={location}
                                            tagRender={locationTag}
                                            options={locationOptions}
                                        />
                                    </Form.Item>
                        }
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

