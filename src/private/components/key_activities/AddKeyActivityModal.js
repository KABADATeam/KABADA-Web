import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Input, Space } from 'antd';
import  '../../../css/customModal.css';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { saveActivity } from "../../../appStore/actions/keyActivitiesAction";

const {Option} = Select;

const inputStyle = {
    border: '1px solid #BFBFBF',
    borderRadius: '4px',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 2px 0px rgba(0, 0, 0, 0.05)',
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    textColor: '#8C8C8C',
}

class AddKeyActivityModal extends Component {
    state = {
        selectedSubTypeId: null,
        name: '',
        description: '',
        selectedTypeError: ''
    }

    onCancel = () => {
        this.props.onClose();
        this.setState({
            selectedSubTypeId: null,
            name: '',
            description: ''
        })
    }

    onBack = () => {
        this.props.onClose()
    }
    onOK = () => {
        /*if (this.state.selectedTypeID === null) {
            this.setState({
                selectedTypeError: 'Select cost type'
            });
            return
        } else {
            this.setState({
                selectedTypeError: 'Wrong'
            })
        }*/
        const postObject = {
            "id": null,
            "product_id": this.props.productID,
            "sub_type_id": this.state.selectedSubTypeId,
            "name": this.state.name,
            "description": this.state.description,

        }
        const subTypeTitle = this.props.activity_category.subtypes.find(x => x.id = this.state.selectedSubTypeId) 
        const reducerObject = {
            "category_id": this.props.activity_category.id,
            "category_title": this.props.activity_category.title,
            "product_id": this.props.productID,
            "sub_type_id": this.state.selectedSubTypeId,
            "sub_type_title": subTypeTitle.title,
            "name": this.state.name,
            "description": this.state.description,
        }
        this.setState({
            selectedSubTypeId: null,
            name: '',
            description: ''
        })
        this.props.saveActivity(postObject, reducerObject);
        this.props.onClose();  
    }
    onSelectionChange(id) {
        this.setState({
            selectedSubTypeId: id
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onCloseAfterSaving = () => {
        this.props.handleClose();
    }

    render() {
        const options = this.props.activity_category.subtypes.map(s =>
            <Option key={s.id} value={s.id}>{s.title}</Option>
        );
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />  {this.props.activity_category.title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                    width={588}
                >
                    <Form layout="vertical">
                        <Form.Item key={100} label="Type">
                            <Select placeholder="Select type" value={this.state.selectedTypeId} onChange={this.onSelectionChange.bind(this)} style={{width:548}}>
                                {options}
                            </Select>                                                           
                        </Form.Item>
                        <Form.Item key={101} label="Name"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error());
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input placeholder="Your description goes here" value={this.state.name} onChange={this.onChangeName.bind(this)} size="large" style={{...inputStyle, width:548}}/>                                                
                        </Form.Item>
                        <Form.Item key={102} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.description} onChange={this.onChangeDescription.bind(this)} size="large" style={{...inputStyle, width:548}}/>                                                
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
        activity_category: state.keyActivityCategory,
        activities: state.keyActivities,
    };
}

export default connect(mapStateToProps, {saveActivity} )(AddKeyActivityModal);


