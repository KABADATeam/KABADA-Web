import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, InputNumber, Input, Tag } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateBusinessSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;
const inputStyle = {
    borderRadius: '4px',
    borderColor: '#BFBFBF',
    height: '40px'
};

class EditBusinessSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentName: this.props.item.segment_name,
            type: this.props.item.business_type.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            companySize: this.props.item.company_size.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            //annualRevenue: this.props.item.annual_revenue,
            //budget: this.props.item.budget,
            locationType: this.props.item.geographic_location.map(e => ({ id: e.id, title: e.title, tag: 0 })),
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

    onTypeChange(value) {
        const typeArray = [];
        for (var i = 0; i < value.length; i++) {
            if (this.state.type[i] === undefined) {
                const type = this.props.categories.customer_segments_types.business_types.find((obj) => obj.id === value[i]);
                const new_obj = {
                    id: type.id,
                    title: type.title,
                    tag: 0
                }
                typeArray.push(new_obj)
            } else {
                const type = this.state.type.find((obj) => obj.id === value[i]);
                if (type.tag === 0) {
                    const new_obj = {
                        id: type.id,
                        title: type.title,
                        tag: 0
                    }
                    typeArray.push(new_obj);
                } else if (type.tag === 1) {
                    const new_obj = {
                        id: type.id,
                        title: type.title,
                        tag: 1
                    }
                    typeArray.push(new_obj);
                }
            }
        }
        this.setState({
            type: typeArray
        });
    }

    onCompanySizeChange(value) {
        const sizeArray = [];
        for (var i = 0; i < value.length; i++) {
            if (this.state.companySize[i] === undefined) {
                const companySize = this.props.categories.customer_segments_types.company_sizes.find((obj) => obj.id === value[i]);
                const new_obj = {
                    id: companySize.id,
                    title: companySize.title,
                    tag: 0
                }
                sizeArray.push(new_obj)
            } else {
                const companySize = this.state.companySize.find((obj) => obj.id === value[i]);
                if (companySize.tag === 0) {
                    const new_obj = {
                        id: companySize.id,
                        title: companySize.title,
                        tag: 0
                    }
                    sizeArray.push(new_obj);
                } else if (companySize.tag === 1) {
                    const new_obj = {
                        id: companySize.id,
                        title: companySize.title,
                        tag: 1
                    }
                    sizeArray.push(new_obj);
                }
            }
        }
        this.setState({
            companySize: sizeArray
        });
    }

    onLocationTypeChange(value) {
        const locationTypeArray = [];
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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Business Segments</Space>}
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
    };
}

export default connect(mapStateToProps, { updateBusinessSegment })(EditBusinessSegmentModal);

