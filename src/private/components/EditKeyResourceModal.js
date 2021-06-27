import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input} from 'antd';
import '../../css/customModal.css';
import { saveResource } from "../../appStore/actions/resourcesAction";

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

class EditKeyResourceModal extends Component {
    state = {
        selectedItemId: null,
        selections: [ 0, 0 ],
        description: ''
    }

    onCancel = () => {
        this.props.handleClose();
        this.setState({
            selectedItemId: null,
            selections: [ 0, 0 ],
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
            selections: [ 0, 0 ],
            description: ''
        });
        this.props.handleClose();
        this.props.onSaving();
    }

    onChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    getSelections(id) {
        const item = this.props.category.types.find(x => x.id === id);
        if (item !== null && item !== undefined) {
            const uiElements = item.selections.map((item, i) =>
                <Form.Item key={i} label={item.title}>
                    <Radio.Group key={i} onChange={this.onRadioSelection.bind(this, i)} value={this.state.selections[i]}>
                        <Space direction="vertical">
                            {item.options.map((o, j) =>
                                <Radio key={j} value={j}>{o.title}</Radio>
                            )}
    
                        </Space>
                    </Radio.Group>
                </Form.Item>
            );
            return uiElements;
        }
        else{
            return <div></div>
        }
    }

    onRadioSelection(item, e) {
        const array = this.state.selections;
        array[item] = e.target.value;
        this.setState({
            selections: array
        });
    }

    onSelectionChange(id) {
        this.setState({
            selectedItemId: id
        });
    }

    getOptions() {
        if (this.props.categories.length > 0) {
            const index = this.props.categories.findIndex(x => x.id === this.props.resource.category.id);
            if (index > -1) {
                const options = this.props.categories[index].types.map(t =>
                    <Option key={t.id} value={t.id}>{t.title}</Option>
                );
                return options;
            } else {
                return <div></div>;
            }
        }
        return <div></div>;
    }

    getCategory() {
        const index = this.props.categories.findIndex(x => x.id === this.props.resource.category.id);
        if (index > -1) {
            return this.props.categories[index];
        } else {
            return null;
        }
    }

    render() {
        console.log(this.props);
        const options = this.getOptions();
        const category = this.getCategory();
        const defaultValue = category === null ? "" : category.types[0].id;
        const elements = <div></div>//this.getSelections(this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId);

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={588}
                    title={this.props.resource.category.description}
                    visible={this.props.visibility}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    footer={[
                        <Button key="back" onClick={this.onCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.onOk}>Save</Button>
                    ]}>

                    <Form layout="vertical">
                        <Form.Item key={100} label="Type">
                            <Select defaultValue={defaultValue} value={this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId} onChange={this.onSelectionChange.bind(this)} style={{width:548}}>
                                {options}
                            </Select>                                                           
                        </Form.Item>

                        <Form.Item key={101} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.description} onChange={this.onChange.bind(this)} size="large" style={{...inputStyle, width:548}}/>                                                
                        </Form.Item>    
                        {elements}                   
                    </Form>            
                </Modal >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.resourcesCategoriesList,
        businessPlan: state.selectedBusinessPlan,
        resource: state.selectedResource
    };
}

export default connect(mapStateToProps, { saveResource } )(EditKeyResourceModal);

