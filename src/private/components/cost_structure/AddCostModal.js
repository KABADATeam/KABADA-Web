import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Input, Space } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveFixedCost, saveVariableCost } from "../../../appStore/actions/costStructureAction";

const { Option } = Select;

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

class AddCostModal extends Component {
    state = {
        selectedTypeId: null,
        name: '',
        description: '',
        selectedTypeError: ''
    }

    onCancel = () => {
        this.props.onClose();
        this.setState({
            selectedTypeId: null,
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
        const typeTitle = this.props.category.selected_category.types.find(element => element.type_id === this.state.selectedTypeId)

        const postObject = {
            //"id": null,
            "business_plan_id": this.props.businessPlan.id,
            "type_id": this.state.selectedTypeId,
            "name": this.state.name,
            "description": this.state.description,

        }

        //const type_id = this.state.selectedTypeId;
        const reducerObject = {
            "category_id": this.props.category.selected_category.category_id,
            "category_title": this.props.category.selected_category.category_title,
            "type_id": this.state.selectedTypeId,
            "type_title": typeTitle.type_title,
            "name": this.state.name,
            "description": this.state.description,
            "number": this.props.number
        }
        this.setState({
            selectedTypeId: null,
            name: '',
            description: ''
        })
        if (this.props.number === 1) {
            this.props.saveFixedCost(postObject, reducerObject);
            this.props.onClose();
        } else if (this.props.number === 2) {
            this.props.saveVariableCost(postObject, reducerObject);
            this.props.onClose();
        } else {
            this.props.onClose();
        }

    }
    onSelectionChange(id) {
        this.setState({
            selectedTypeId: id
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

    componentDidMount() {
        // if its only option and if its type title is 'Other' then select it from start and dont show it
        if (this.props.category.selected_category.types.length < 2 && this.props.category.selected_category.types[0].type_title === 'Other') {
            this.setState({
                selectedTypeId: this.props.category.selected_category.types[0].type_id
            })
        }
    }

    render() {
        const options = this.props.category.selected_category.types.map(t =>
            <Option key={t.type_id} value={t.type_id}>{t.type_title}</Option>
        );
        //const defaultValue = this.props.category.types[0].type_id
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />  {this.props.category.category_title}</Space>}
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
                        {this.props.category.selected_category.types.length < 2 && this.props.category.selected_category.types[0].type_title === 'Other' ?
                            null :
                            <Form.Item key={100} label="Type">
                                <Select placeholder="Select type" value={this.state.selectedTypeId} onChange={this.onSelectionChange.bind(this)} style={{ width: 548 }}>
                                    {options}
                                </Select>
                            </Form.Item>}

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
                            <Input placeholder="Your description goes here" value={this.state.name} onChange={this.onChangeName.bind(this)} size="large" style={{ ...inputStyle, width: 548 }} />
                        </Form.Item>
                        <Form.Item key={102} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.description} onChange={this.onChangeDescription.bind(this)} size="large" style={{ ...inputStyle, width: 548 }} />
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
        category: state.costCategoriesList
    };
}

export default connect(mapStateToProps, { saveFixedCost, saveVariableCost })(AddCostModal);


