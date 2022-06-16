import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Radio, Input } from 'antd';
import '../../css/customModal.css';
import { inputStyle } from '../../styles/customStyles';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveDistributor, saveSupplier, saveOther } from "../../appStore/actions/partnersAction";

const priorityData = [
    {
        value: false,
        title: 'No',
        tag: 0
    },
    {
        value: true,
        title: 'Yes',
        tag: 0
    }
]


class AddKeyPartnerModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priority: null,
            companyName: '',
            website: '',
            comment: ''
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onOK = () => {
        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "type_id": this.props.type.type_id,
            "name": this.state.companyName,
            "is_priority": this.state.priority.value,
            "website": this.state.website,
            "comment": this.state.comment
        }
        if (this.props.type.category_title === "distributor") {
            this.props.saveDistributor(postObj, this.props.type.title);
            console.log(this.props.type.title)
        } else if (this.props.type.category_title === "supplier") {
            this.props.saveSupplier(postObj, this.props.type.title);
        } else if (this.props.type.category_title === "other") {
            this.props.saveOther(postObj, this.props.type.title);
        } else {
            return;
        }
        this.setState({
            companyName: '',
            website: '',
            comment: ''
        });

        this.props.onClose();
    }

    onCompanyNameChange = (e) => {
        this.setState({
            companyName: e.target.value
        });
    }

    onWebsiteChange = (e) => {
        this.setState({
            website: e.target.value
        });
    }

    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    onChangePriority = e => {
        this.setState({
            priority: { value: e.target.value, tag: 0 }
        })
    }

    onBack = () => {
        this.props.onBack();
    }

    getColor = (value) => {
        const element = this.props.type.priorityValue.value === value ? this.props.type.priorityValue : undefined;
        console.log(element)
        if (element === undefined) {
            let color = "#FFFFFF"
            return color
        } else {
            if (element.tag === 0) {
                let color = "#FFFFFF"
                return color
            } else if (element.tag === 1) {
                let color = "#BAE7FF"
                return color
            } else {
                let color = "#FFFFFF"
                return color
            }
        }
    }
    render() {
        // console.log('partners ',this.props.partners);
        // console.log('selected type ', this.props.type);
        // console.log('priority state ', this.state.priority)
         console.log(this.props.type.priorityValue)
        // console.log(this.props.partners.aiPredict !== null ? this.props.partners.aiPredict[0].priority[0].toLowerCase() === 'true' : false)
        const priorityOptions = priorityData.map((obj) =>
            <Radio key={obj.value} value={obj.value} style={{ backgroundColor: this.getColor(obj.value) }}>{obj.title}</Radio>
        );
        return (
            <>
                <Modal
                    destroyOnClose={true}
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />  {this.props.type.selectedType === null ? '' : this.props.type.selectedType.title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
                        <Form.Item key="name" name="name" label="Company Name"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Enter company name'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} value={this.state.companyName} onChange={this.onCompanyNameChange} />
                        </Form.Item>

                        <Form.Item label="Is it Priority?" key="priority" name="priority" initialValue={this.props.type.priorityValue.value}>
                            <Radio.Group onChange={this.onChangePriority} value={this.props.type.priorityValue.value}>
                                <Space direction="vertical">
                                    {priorityOptions}
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        {/* <Radio.Group key="groupTwo" onChange={this.onLocationSelection.bind(this)} value={this.state.location === null ? 0 : this.state.location.id}>
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group> */}
                        <Form.Item key="website" name="website" label="Company website (optional)">
                            <Input size="large" style={inputStyle} onChange={this.onWebsiteChange} />
                        </Form.Item>

                        <Form.Item key="comment" name="comment" label="Comment (optional)">
                            <Input size="large" style={inputStyle} onChange={this.onCommentChange} />
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
        type: state.selectedPartnersCategoryType,
        partners: state.partners,
        category: state.selectedPartnersCategory,
    };
}

export default connect(mapStateToProps, { saveDistributor, saveSupplier, saveOther })(AddKeyPartnerModal);

