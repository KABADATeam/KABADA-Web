import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input } from 'antd';
import '../../css/customModal.css';
import { saveResource } from "../../appStore/actions/resourcesAction";
import { ArrowLeftOutlined } from '@ant-design/icons';

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

class AddKeyResourceModal extends Component {
    state = {
        selectedItemId: null,
        selections: [0, 0],
        description: '',
        disable: false
    }

    onCancel = () => {
        this.props.handleClose();
        this.setState({
            selectedItemId: null,
            selections: [0, 0],
            description: ''
        });
    }

    onOk = () => {
        let item = this.props.category.types[0];
        if (this.state.selectedItemId !== null) {
            item = this.props.category.types.find(x => x.id === this.state.selectedItemId);
        }

        const selections = item.selections.map((item, i) => {
            const options = item.options.map((x, j) => j === this.state.selections[i] ? { title: x.title, selected: true } : x);
            return { title: item.title, options: options }
        });

        const postObject = {
            "resource_id": null,
            "business_plan_id": this.props.businessPlan.id,
            "resource_type_id": item.id,
            "name": this.state.description,
            "selections": selections
        };

        this.props.saveResource(postObject, this.props.category);
        this.setState({
            selectedItemId: null,
            selections: [0, 0],
            description: ''
        });
        this.props.handleClose();
        this.props.onSaving();
    }

    onBack = () => {
        this.props.onBack();
    }

    onChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    getSelections(id) {
        const item = this.props.category.types.find(x => x.id === id);
        if (item !== null && item !== undefined) {
            // const uiElements = item.selections.map((item, i) =>
            return (
                <Form.Item key={0} label={item.selections[0].title}>
                    <Radio.Group key={0} onChange={this.onRadioSelection.bind(this, 0)} value={this.state.selections[0]}>
                        <Space direction="vertical">
                            {item.selections[0].options.map((o, j) =>
                                <Radio key={j} value={j}>{o.title}</Radio>
                            )}
                        </Space>
                    </Radio.Group>
                </Form.Item>
            )
        }
        else {
            return <div></div>
        }
    }

    getSelectionsSecond(id) {
        const item = this.props.category.types.find(x => x.id === id);
        console.log('Item:'+JSON.stringify(item))
        if (item !== null && item !== undefined) {
            // const uiElements = item.selections.map((item, i) =>
            return (
                <Form.Item key={1} label={item.selections[1].title}>
                    <Radio.Group disabled={this.state.disable} key={1} onChange={this.onRadioSelection.bind(this, 1)} value={this.state.selections[1]}>
                        <Space direction="vertical">
                            {item.selections[1].options.map((o, j) =>
                                <Radio key={j} value={j}>{o.title}</Radio>
                            )}
                        </Space>
                    </Radio.Group>
                </Form.Item>
            )
        }
        else {
            return <div></div>
        }
    }

    onRadioSelection(item, e) {
        const array = this.state.selections;
        array[item] = e.target.value;
        // if not Rent is selected set disabled to true
        if(array[0] !== 0){
            this.setState({
                selections: [e.target.value,0],
                disable: true
            });
        }else{
            this.setState({
                selections: array,
                disable: false
            });
        }
        
    }

    onSelectionChange(id) {
        this.setState({
            selectedItemId: id
        });
    }

    render() {
        const options = this.props.category.types.map(t =>
            <Option key={t.id} value={t.id}>{t.title}</Option>
        );
        const defaultValue = this.props.category.types.length > 0 ? this.props.category.types[0].id : "";
        const elements = this.getSelections(this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId);
        const element2 = this.getSelectionsSecond(this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId);
        
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={588}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />  {this.props.category.title}</Space>}
                    visible={this.props.visibility}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    footer={[
                        <Button key="back" onClick={this.onCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.onOk}>Save</Button>
                    ]}>

                    <Form layout="vertical">
                        <Form.Item key={100} label="Type">
                            <Select defaultValue={defaultValue} value={this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId} onChange={this.onSelectionChange.bind(this)} style={{ width: 548 }}>
                                {options}
                            </Select>
                        </Form.Item>

                        <Form.Item key={101} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.description} onChange={this.onChange.bind(this)} size="large" style={{ ...inputStyle, width: 548 }} />
                        </Form.Item>
                        {elements}
                        {element2}
                    </Form>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.selectedResourcesCategory,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { saveResource })(AddKeyResourceModal);

