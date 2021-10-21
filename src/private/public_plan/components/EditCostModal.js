import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Input, Space } from 'antd';
import  '../../../css/customModal.css';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { updateFixedCost, updateVariableCost } from "../../../appStore/actions/costStructureAction";

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

class EditCostModal extends Component {
    state = {
        cost: this.props.item.type_id,
        name: this.props.item.name,
        description: this.props.item.description,
        selectedTypeError: '',
        optionsData: []
    }
    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose()
    }
    onOK = () => {
        const postObject = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "type_id": this.state.cost,
            "name": this.state.name,
            "description": this.state.description,
        }
        console.log(postObject);
        const optionsData = this.props.number === 1 ? this.props.categories.fixed_categories.find(x => x.category_id === this.props.item.category_id) : this.props.categories.variable_categories.find(x => x.category_id === this.props.item.category_id)
        const typeTitle = optionsData.types.find(x => x.type_id === this.state.cost)
        const reducerObject = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "category_id": this.props.item.category_id,
            "category_title": this.props.item.category_title,
            "type_id": this.state.cost,
            "type_title": typeTitle.type_title,
            "name": this.state.name,
            "description": this.state.description,
            "number": this.props.number
        }
        console.log(reducerObject);
        if (this.props.number === 1) {
            this.props.updateFixedCost(postObject, reducerObject);
            this.props.onClose();
        } else if (this.props.number === 2) {
            this.props.updateVariableCost(postObject, reducerObject);
            this.props.onClose();
        } else {
            this.props.onClose();
        }
        

    }

    onSelectionChange(id) {
        this.setState({
            cost: id
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
        const optionsData = this.props.number === 1 ? this.props.categories.fixed_categories.find(x => x.category_id === this.props.item.category_id) : this.props.categories.variable_categories.find(x => x.category_id === this.props.item.category_id)
        const options = optionsData.types.map(t =>
            <Option key={t.type_id} value={t.type_id}>{t.type_title}</Option>
        );
        console.log(options)
        const defaultValue = optionsData.types.find(x => x.type_id === this.props.item.type_id)
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />{this.props.item.category_title}</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                           {/* <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button> */}
                        </div>
                    }
                    width={588}
                >
                    <Form layout="vertical">
                        <Form.Item key={100} label="Type">
                            <Select defaultValue={defaultValue.type_id} value={this.state.cost} onChange={this.onSelectionChange.bind(this)} style={{width:548}} disabled={true}>
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
                            <Input placeholder="Your description goes here" value={this.state.name} onChange={this.onChangeName.bind(this)} size="large" style={{...inputStyle, width:548}} disabled={true}/>                                                
                        </Form.Item>
                        <Form.Item key={102} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.description} onChange={this.onChangeDescription.bind(this)} size="large" style={{...inputStyle, width:548}} disabled={true}/>                                                
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
        categories: state.costCategoriesList,
        category: state.selectedCostCategory        
    };
}

export default connect(mapStateToProps, {updateFixedCost, updateVariableCost} )(EditCostModal);


