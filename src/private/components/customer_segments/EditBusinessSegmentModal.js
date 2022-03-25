import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, InputNumber, Input, Tag, Popover, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateBusinessSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;
const { Text } = Typography;
const inputStyle = {
    borderRadius: '4px',
    height: '40px'
};

class EditBusinessSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            segmentName: this.props.item.segment_name,
            type: this.props.item.business_type.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            companySize: this.props.item.company_size.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            //annualRevenue: this.props.item.annual_revenue,
            //budget: this.props.item.budget,
            locationType: this.props.item.geographic_location.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            popoverVisibility: false,
            popoverType: 'no predict'
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        const { segmentName, type, companySize, locationType } = this.state;
        if (segmentName.length > 0 && type.length > 0 && companySize.length > 0 && locationType.length > 0) {
            const business_type = type.map(e => e.id);
            const company_size = companySize.map(e => e.id);
            const location = locationType.map(e => e.id);
            const postObj = {
                "id": this.props.item.id,
                "business_plan_id": this.props.businessPlan.id,
                "business_type": business_type,
                "company_size": company_size,
                "geographic_location": location,
                "segment_name": this.state.segmentName
            };

            const selected_types = this.props.categories.customer_segments_types.business_types.filter((item) => business_type.some((field) => item.id === field));
            const selected_company_sizes = this.props.categories.customer_segments_types.company_sizes.filter((item) => company_size.some((field) => item.id === field));
            const selected_locations = this.props.categories.customer_segments_types.geographic_locations.filter((item) => location.some((field) => item.id === field));

            const reducerObj = {
                "id": this.props.item.id,
                "key": this.props.item.id,
                "business_type": selected_types,
                "business_type_titles": selected_types.map(e => e.title).join(", "),
                "company_size": selected_company_sizes,
                "company_size_titles": selected_company_sizes.map(e => e.title).join(", "),
                "geographic_location": selected_locations,
                "location_titles": selected_locations.map(e => e.title).join(", "),
                "segment_name": this.state.segmentName
            };
            this.props.updateBusinessSegment(postObj, reducerObj);
            this.props.onClose()
        }

    }

    onNameChange(value) {
        this.setState({
            segmentName: value
        })
    }

    addSelectedValue = (value, state, segment_type) => {
        const resultArray = [];
        for (var i = 0; i < value.length; i++) {
            if (state[i] === undefined) {
                const type = segment_type.find((obj) => obj.id === value[i]);
                const new_obj = {
                    id: type.id,
                    title: type.title,
                    tag: 0
                }
                resultArray.push(new_obj)
            } else {
                const type = state.find((obj) => obj.id === value[i]);
                if (type.tag === 0) {
                    const new_obj = {
                        id: type.id,
                        title: type.title,
                        tag: 0
                    }
                    resultArray.push(new_obj);
                } else if (type.tag === 1) {
                    const new_obj = {
                        id: type.id,
                        title: type.title,
                        tag: 1
                    }
                    resultArray.push(new_obj);
                }
            }
        }
        return resultArray;
    }

    onTypeChange(value) {
        this.setState({
            type: this.addSelectedValue(value, this.state.type, this.props.categories.customer_segments_types.business_types)
        });
    }

    onCompanySizeChange(value) {
        this.setState({
            companySize: this.addSelectedValue(value, this.state.companySize, this.props.categories.customer_segments_types.company_sizes)
        });
    }

    onLocationTypeChange(value) {
        this.setState({
            locationType: this.addSelectedValue(value, this.state.locationType, this.props.categories.customer_segments_types.geographic_locations)
        })
    }
    handlePopoverVisibilityChange = (visible) => {
        if (this.props.customerSegments.aiPredict === null) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = this.generateAIHelpText(this.props.customerSegments.aiPredict.custSegs.business, this.props.categories.customer_segments_types);
            if (text === undefined) {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'no predict',
                })
            } else {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'is predict',
                    popoverTextObject: text
                })
            }
        }
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
    generateAIHelpText = (predictsObj, segmentTypes) => {
        const aiHintTextObject = [];
        const selectedItem = {
            "id": this.state.id,
            "business_type": this.state.type,
            "company_size": this.state.companySize,
            "geographic_location": this.state.locationType
        }
        console.log(predictsObj)
        if (predictsObj !== undefined) {
            const predictObj = predictsObj.find(s => s.id === selectedItem.id);

            if (predictObj !== undefined) {
                const predictProperties = Object.getOwnPropertyNames(predictsObj.find(s => s.id === selectedItem.id));
                const filteredPredictProperties = predictProperties.filter(p => p !== 'id');
                for (const property of filteredPredictProperties) {
                    const selectedItemPropertyValuesObj = Object.getOwnPropertyDescriptor(selectedItem, property).value;
                    const selectedItemPropertyValues = selectedItemPropertyValuesObj.map(s => s.id);
                    const predictObjPropertyValues = Object.getOwnPropertyDescriptor(predictObj, property).value;
                    const propertyType = property === 'geographic_location' ? segmentTypes.geographic_locations
                        : property === 'company_size' ? segmentTypes.company_sizes
                            : property === 'business_type' ? segmentTypes.business_types
                                : null
                    const comparePropertiesValues = this.compareArray(predictObjPropertyValues, selectedItemPropertyValues);
                    console.log(comparePropertiesValues);
                    console.log(comparePropertiesValues.length);
                    let propertiesValuesString = '';
                    if (comparePropertiesValues.length > 1) {
                        console.log(comparePropertiesValues);
                        for (var i = 0; i < comparePropertiesValues.length; i++) {
                            const propertyTypeTitle = propertyType.find(t => t.id === comparePropertiesValues[i]);
                            propertiesValuesString += i === predictObjPropertyValues.length - 1 ? propertyTypeTitle.title + '' : propertyTypeTitle.title + ', '
                            console.log(propertiesValuesString);
                        }
                        //property.charAt(0).toUpperCase() + property.slice(1),
                        const new_obj = {
                            type_title: property === 'business_type' ? 'Type' : property === 'company_size' ? 'Company size' : property === 'geographic_location' ? 'Geographic location' : null,
                            text: propertiesValuesString
                        }
                        aiHintTextObject.push(new_obj);
                    } else if (comparePropertiesValues.length === 1){
                        const propertyTypeTitle = propertyType.find(t => t.id === comparePropertiesValues[0]);
                        propertiesValuesString = propertyTypeTitle.title;
                        console.log(propertiesValuesString);
                        const new_obj = {
                            type_title: property === 'business_type' ? 'Type' : property === 'company_size' ? 'Company size' : property === 'geographic_location' ? 'Geographic location' : null,
                            text: propertiesValuesString
                        }
                        aiHintTextObject.push(new_obj);
                    } else {
                        this.setState({
                            popoverType: 'no predict',
                        })
                    }
                }
                return aiHintTextObject
            } else {
                this.setState({
                    popoverType: 'no predict',
                })
            }

        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }

    }
    onAIButtonClick = () => {
        const obj = this.props.customerSegments.aiPredict.custSegs.business;
        console.log('id object ', this.props.item.id);
        const aiObject = obj.find((el) => el.id === this.props.item.id);
        const type = this.state.type.map(e => e.id);
        const typeAI = aiObject.business_type;
        const typePredict = this.compareArray(typeAI, type);
        const newTypeArray = [...this.state.type];
        for (var i in typePredict) {
            const title = this.props.categories.customer_segments_types.business_types.find((obj) => obj.id === typePredict[i]).title;
            const new_type_obj = {
                id: typePredict[i],
                title: title,
                tag: 1
            }
            newTypeArray.push(new_type_obj);
        }
        const companySize = this.state.companySize.map(e => e.id);
        const companySizeAI = aiObject.company_size;
        console.log(companySizeAI);
        const companySizePredict = this.compareArray(companySizeAI, companySize);
        console.log(companySizePredict);
        const newCompanySizeArray = [...this.state.companySize];
        for (var i in companySizePredict) {
            const title = this.props.categories.customer_segments_types.company_sizes.find((obj) => obj.id === companySizePredict[i]).title;
            const new_company_size_obj = {
                id: companySizePredict[i],
                title: title,
                tag: 1
            };
            newCompanySizeArray.push(new_company_size_obj);
        }
        const location = this.state.locationType.map(e => e.id);
        const locationAI = aiObject.geographic_location;
        const locationPredict = this.compareArray(locationAI, location);
        const newLocationArray = [...this.state.locationType];
        console.log('location predict: ', locationPredict)
        for (var i in locationPredict) {
            const title = this.props.categories.customer_segments_types.geographic_location.find((obj) => obj.id === locationPredict[i]).title;
            const new_location_obj = {
                id: locationPredict[i],
                title: title,
                tag: 1
            }
            newLocationArray.push(new_location_obj);
        }
        this.setState({
            type: newTypeArray,
            companySize: newCompanySizeArray,
            locationType: newLocationArray
        })
        this.hidePopover();
    }
    /*onBudgetChange(value) {
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
        const type = this.state.type.map(e => e.id);
        const size = this.state.companySize.map(e => e.id);
        const location = this.state.locationType.map(e => e.id);
        const typeOptions = this.props.categories.customer_segments_types.business_types.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const companySizeOptions = this.props.categories.customer_segments_types.company_sizes.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const locationOptions = this.props.categories.customer_segments_types.geographic_locations.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );
        const popoverContent = (
            <>
                {
                    this.state.popoverType === 'no predict' ?
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
                        :
                        <>
                            <Row>
                                {
                                    this.state.popoverTextObject.length === 0 ?
                                        <Text>Based on the current information KABADA AI thinks that everything looks good.</Text>
                                        :
                                        <Text>
                                            Based on your input KABADA AI recommends that you consider adding {this.state.popoverTextObject.map((e, index) =>
                                                <Text key={index} > for "{e.type_title}": {e.text}</Text>)}.
                                        </Text>
                                }

                            </Row>
                            <Row style={{ marginTop: '12px' }}>
                                <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                            </Row>
                        </>
                }
            </>
        )
        const typeTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.type.find(t => t.id === value);
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
            } else if (tagColor === undefined) {
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
        const companySizeTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.companySize.find(t => t.id === value);
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
            } else if (tagColor === undefined) {
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
            const tagColor = this.state.locationType.find(t => t.id === value);
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
            } else if (tagColor === undefined) {
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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Business
                        <Popover
                            placement='topLeft'
                            title='AI Hint'
                            content={popoverContent}
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
                            <Button key="customSubmit" form="editBusinessSegmentForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editBusinessSegmentForm" name="editBusinessSegmentForm" onFinish={this.onOK}
                        initialValues={{
                            name: this.props.item.segment_name
                        }}>

                        <Form.Item key="name" name="name" label="Segment name"
                            rules={
                                [{ required: true, message: 'Type segment name' }]
                            }>
                            <Input style={{ width: '100%', ...inputStyle }} placeholder="Edit segment name"
                                value={this.state.segmentName} onChange={(e) => this.onNameChange(e.target.value)} />
                        </Form.Item>
                        {
                            this.state.type.length > 0 ?
                                <Form.Item key="type" label="Type"
                                    rules={[{ required: true, message: 'Select business type' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Select type"
                                        onChange={this.onTypeChange.bind(this)}
                                        value={type}
                                        tagRender={typeTag}
                                        options={typeOptions}
                                    />
                                </Form.Item>
                                :
                                <Form.Item
                                    key="type"
                                    label="Type"
                                    validateStatus="error"
                                    help="Select type"
                                    rules={[
                                        {
                                            validator: async (_, type) => {
                                                if (!type || type.length < 1) {
                                                    return Promise.reject(new Error('Select type'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Select type"
                                        onChange={this.onTypeChange.bind(this)}
                                        value={type}
                                        tagRender={typeTag}
                                        options={typeOptions}
                                    />
                                </Form.Item>
                        }
                        {
                            this.state.companySize.length > 0 ?
                                <Form.Item key="size" label="Company size"
                                    rules={[{ required: true, message: 'Select company size' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Select type"
                                        onChange={this.onCompanySizeChange.bind(this)}
                                        value={size}
                                        tagRender={companySizeTag}
                                        options={companySizeOptions}
                                    />
                                </Form.Item>
                                :
                                <Form.Item
                                    key="size"
                                    label="Company size"
                                    validateStatus="error"
                                    help="Select company size"
                                    rules={[
                                        {
                                            validator: async (_, size) => {
                                                if (!size || size.length < 1) {
                                                    return Promise.reject(new Error('Select company size'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Select company size"
                                        onChange={this.onCompanySizeChange.bind(this)}
                                        value={size}
                                        tagRender={companySizeTag}
                                        options={companySizeOptions}
                                    />
                                </Form.Item>
                        }
                        {
                            this.state.locationType.length > 0 ?
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

export default connect(mapStateToProps, { updateBusinessSegment })(EditBusinessSegmentModal);

