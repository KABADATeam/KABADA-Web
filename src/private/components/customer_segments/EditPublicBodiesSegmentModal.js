import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input, Row, Tag, Typography, Popover } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateNgoSegment } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;
const { Text } = Typography;

const inputStyle = {
    borderRadius: '4px',
    borderColor: '#BFBFBF',
    height: '40px'
};

class EditPublicBodiesSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentName: this.props.item.segment_name,
            ngoType: this.props.item.ngo_types.map(e => ({ id: e.id, title: e.title, tag: 0 })),
            popoverVisibility: false
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        const { segmentName, ngoType } = this.state;
        if (segmentName.length > 0 && ngoType.length > 0){
            const ngo_Type = this.state.ngoType.map(e => e.id);
        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "ngo_types": ngo_Type,
            "segment_name": this.state.segmentName
        };

        const selected_ngo_types = this.props.categories.customer_segments_types.ngo_types.filter((item) => ngo_Type.some((field) => item.id === field));

        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "ngo_types": selected_ngo_types,
            "ngo_types_titles": selected_ngo_types.map(e => e.title).join(", "),
            "segment_name": this.state.segmentName
        };

        this.props.updateNgoSegment(postObj, reducerObj);
        this.props.onClose();
        }  
    }

    onNameChange(value) {
        this.setState({
            segmentName: value
        })
    }

    onNgoTypeChange(value) {
        const ngoTypeArray = [];
        for (var i = 0; i < value.length; i++) {
            if (this.state.ngoType[i] === undefined) {
                const ngo_type = this.props.categories.customer_segments_types.ngo_types.find((obj) => obj.id === value[i]);
                const new_obj = {
                    id: ngo_type.id,
                    title: ngo_type.title,
                    tag: 0
                }
                ngoTypeArray.push(new_obj)
            } else {
                const ngo_type = this.state.ngoType.find((obj) => obj.id === value[i]);
                if (ngo_type.tag === 0) {
                    const new_obj = {
                        id: ngo_type.id,
                        title: ngo_type.title,
                        tag: 0
                    }
                    ngoTypeArray.push(new_obj);
                } else if (ngo_type.tag === 1) {
                    const new_obj = {
                        id: ngo_type.id,
                        title: ngo_type.title,
                        tag: 1
                    }
                    ngoTypeArray.push(new_obj);
                }
            }
        }
        this.setState({
            ngoType: ngoTypeArray
        });
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
        const obj = this.props.customerSegments.aiPredict.custSegs.publicNgo;
        const aiObject = obj.find((el) => el.id === this.props.item.id);
        const ngoType = this.state.ngoType.map(e => e.id);
        const ngoTypeAI = aiObject.business_type;
        const ngoTypePredict = this.compareArray(ngoTypeAI, ngoType);
        const newNgoTypeArray = [...this.state.ngoType];
        for (var i in ngoTypePredict) {
            const title = this.props.categories.customer_segments_types.ngo_types.find((obj) => obj.id === ngoTypePredict[i]).title;
            const new_ngo_type_obj = {
                id: ngoTypePredict[i],
                title: title,
                tag: 1
            }
            newNgoTypeArray.push(new_ngo_type_obj);
        }
        this.setState({
            ngoType: newNgoTypeArray,
        })
        this.hidePopover();
    }
    render() {
        const ngoType = this.state.ngoType.map(e => e.id);
        const typeOptions = this.props.categories.customer_segments_types.ngo_types.map((obj) =>
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
                        AI did not have predict
                    </Text>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Button onClick={this.hidePopover}>Cancel</Button>
                </Row>
            </>
        )
        const ngoTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.ngoType.find(t => t.id === value);
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
            // Public bodies & NGO segments
            <> 
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Public bodies & NGO segments
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
                            />
                        </Popover>
                    </Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="editPublicBodiesNgoForm" htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout="vertical" id="editPublicBodiesNgoForm" name="editPublicBodiesNgoForm" onFinish={this.onOK}
                        initialValues={{
                            name: this.props.item.segment_name
                        }}>
                        <Form.Item
                            key="name"
                            name="name"
                            label="Segment name"
                            rules={
                                [{ required: true, message: 'Type segment name' }]
                            }>
                            <Input
                                style={{ width: '100%', ...inputStyle }}
                                placeholder="Edit segment name"
                                value={this.state.segmentName}
                                onChange={(e) => this.onNameChange(e.target.value)}
                            />
                        </Form.Item>
                        {
                            this.state.ngoType.length > 0 ?
                            <Form.Item key="type" label="Type"
                                    rules={[{ required: true, message: 'Select type' }]}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Select type"
                                        onChange={this.onNgoTypeChange.bind(this)}
                                        value={ngoType}
                                        tagRender={ngoTag}
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
                                        onChange={this.onNgoTypeChange.bind(this)}
                                        value={ngoType}
                                        tagRender={ngoTag}
                                        options={typeOptions}
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

export default connect(mapStateToProps, { updateNgoSegment })(EditPublicBodiesSegmentModal);

