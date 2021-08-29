import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Input, Space } from 'antd';
import  '../../../css/customModal.css';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { updateKeyActivity } from "../../../appStore/actions/keyActivitiesAction";

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

class EditKeyActivity extends Component {
    state = {
        sub_type_id: this.props.item.sub_type_id,
        name: this.props.item.name,
        description: this.props.item.description,
        selectedTypeError: '',
    }
    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose()
    }
    onOK = () => {
        const postObject = {
            "activity_id": this.props.item.id,
            "product_id": this.props.productID,
            "sub_type_id": this.state.sub_type_id,
            "name": this.state.name,
            "description": this.state.description,

        }
        const Data = this.props.categories.activity_categories.find(x => x.id === this.props.item.type_id) 
        const sub_title = Data.subtypes.find(x => x.id === this.state.sub_type_id)
        const reducerObject = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "category_id": this.props.item.type_id,
            "category_title": this.props.item.type_name,
            "product_id": this.props.productID,
            "sub_type_id": this.state.sub_type_id,
            "sub_type_title": sub_title.title,
            "name": this.state.name,
            "description": this.state.description,
        }
        console.log(reducerObject)
        this.setState({
            selectedSubTypeId: null,
            name: '',
            description: ''
        })
        this.props.updateKeyActivity(postObject, reducerObject);
        this.props.onClose()
    }

    onSelectionChange(id) {
        this.setState({
            sub_type_id: id
        });
        console.log(id)
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
        const optionsData = this.props.categories.activity_categories.find(x => x.id === this.props.item.type_id) 
        const options = optionsData.subtypes.map(s =>
            <Option key={s.id} value={s.id}>{s.title}</Option>
        );
        const defaultValue = optionsData.subtypes.find(x => x.id === this.props.item.sub_type_id)
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />{this.props.item.type_name}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button>
                        </div>
                    }
                    width={588}
                >
                    <Form layout="vertical">
                        <Form.Item key={100} label="Type">
                            <Select defaultValue={defaultValue.id} value={this.state.sub_type_id} onChange={this.onSelectionChange.bind(this)} style={{width:548}}>
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
        categories: state.keyActivitiesCategoriesList   
    };
}

export default connect(mapStateToProps, {updateKeyActivity} )(EditKeyActivity);


