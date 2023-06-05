import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Input } from 'antd';
import '../../css/customModal.css';
import { updateResource } from "../../appStore/actions/resourcesAction";

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
        selections: [0, 0],
        name: null,
        is_changed: [false, false]
    }

    onCancel = () => {
        this.setState({
            selectedItemId: null,
            selections: [0, 0],
            name: null,
            is_changed: [false, false]
        });
        this.props.handleClose();
    }

    onOk = () => {
        const arrayOfSelections = this.transformSelections();
        const category = this.props.categories.find(x => x.id === this.props.resource.category.id);
        let type = category.types.find(x => x.id === (this.state.selectedItemId === null ? this.props.resource.type_id : this.state.selectedItemId));
        const selections = type.selections.map((item, i) => {
            const options = item.options.map((x, j) => (j === this.state.selections[i] && this.state.is_changed[i]) ? { title: x.title, selected: true } : ((j === arrayOfSelections[i] && !this.state.is_changed[i]) ? { title: x.title, selected: true } : x));
            return { title: item.title, options: options }
        });

        const postObject = {
            "resource_id": this.props.resource.resource_id,
            "business_plan_id": this.props.businessPlan.id,
            "resource_type_id": type.id,
            "name": this.state.name === null ? this.props.resource.name : this.state.name,
            "selections": selections
        };

        this.props.updateResource(postObject, category);
        this.setState({
            selectedItemId: null,
            selections: [0, 0],
            name: null,
            is_changed: [false, false]
        });
        this.props.handleClose();
    }

    onChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    transformSelections() {
        let array = [];
        if (this.props.resource !== null && this.props.resource !== undefined) {
            if (this.props.resource.selections !== null) {
                this.props.resource.selections.forEach(item =>
                    item.options.forEach((o, j) => {
                        if (o.selected === true) {
                            array.push(j);
                        }
                    })
                );
            }
        }
        return array;
    }

    getSelections() {
        const category = this.props.categories.find(x => x.id === this.props.resource.category.id);
        if (category !== null) {
            const type = category.types.find(x => x.id === this.state.selectedItemId);
            const uiElements = type.selections.map((item, i) =>
                <div>
                    {item.title === 'Frequency' ?
                        <Form.Item key={i} label={item.title}>
                            <Radio.Group key={i} disabled={this.state.disable} onChange={this.onRadioSelection.bind(this, i)} value={this.state.selections[i]}>
                                <Space direction="vertical">
                                    {item.options.map((o, j) =>
                                        <Radio key={j} value={j}>{o.title}</Radio>
                                    )}
                                </Space>
                            </Radio.Group>

                        </Form.Item> :
                        <Form.Item key={i} label={item.title}>
                            <Radio.Group key={i} onChange={this.onRadioSelection.bind(this, i)} value={this.state.selections[i]}>
                                <Space direction="vertical">
                                    {item.options.map((o, j) =>
                                        <Radio key={j} value={j}>{o.title}</Radio>
                                    )}
                                </Space>
                            </Radio.Group>

                        </Form.Item>}
                </div>
            );
            return uiElements;
        }
        else {
            return <div></div>
        }
    }

    getInitialSelections() {
        const array = this.transformSelections();
        const uiElements = this.props.resource.selections !== null ? this.props.resource.selections.map((item, i) =>
            <div>
                {item.title === 'Frequency' ?
                    <Form.Item key={i} label={item.title}>
                        <Radio.Group key={i} disabled={this.state.disable} onChange={this.onRadioSelection.bind(this, i)} value={this.state.is_changed[i] === false ? array[i] : this.state.selections[i]} >
                            <Space direction="vertical">
                                {item.options.map((o, j) =>
                                    <Radio key={j} value={j}>{o.title}</Radio>
                                )}

                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    : <Form.Item>
                        <Radio.Group key={i} onChange={this.onRadioSelection.bind(this, i)} value={this.state.is_changed[i] === false ? array[i] : this.state.selections[i]} >
                            <Space direction="vertical">
                                {item.options.map((o, j) =>
                                    <Radio key={j} value={j}>{o.title}</Radio>
                                )}

                            </Space>
                        </Radio.Group>
                    </Form.Item>}
            </div>

        )
            : []
        return uiElements;
    }

    onRadioSelection(item, e) {
        const array = this.state.selections;
        const changesArray = this.state.is_changed;
        changesArray[item] = true;
        array[item] = e.target.value;
        if (this.props.resource.category.description === 'Human resources') {
            if (array[0] === 2) {
                this.setState({
                    selections: array,
                    is_changed: changesArray,
                    disable: true
                })
            } else {
                this.setState({
                    selections: array,
                    is_changed: changesArray,
                    disable: false
                })
            }
        } else if (this.props.resource.category.description === "Physical resources" || this.props.resource.category.description === "Intellectual resources") {
            //if its Physical or Intelectual resources. THEN if not Rent is selected set disabled to true
            if (array[0] !== 0) {
                this.setState({
                    selections: array,
                    is_changed: changesArray,
                    disable: true
                })
            } else {
                this.setState({
                    selections: array,
                    is_changed: changesArray,
                    disable: false
                })
            }
        }


    }

    onSelectionChange(id) {
        this.setState({
            selectedItemId: id,
            selections: [0, 0]
        });
    }

    getOptions() {
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
    componentDidMount() {

        // if options length is only 2 then its raw material selected
        if (this.props.resource.selections[0].options.length === 2) {
            this.setState({
                disable: false
            })
        } else {
            // if we are editing one of Human recources
            if (this.props.resource.category.description === 'Human resources') {
                // If ownership type is Mysalf then disable frequencies
                if (this.props.resource.selections[0].options[2].selected === true) {
                    this.setState({
                        disable: true
                    })
                }
            } else if (this.props.resource.category.description === "Physical resources" || this.props.resource.category.description === "Intellectual resources") {
                // if we are editing Physical or Intelectual recourses. which structure is basically same
                // if selected ownership type is Buy or Own we have to disable Frequencies
                if (this.props.resource.selections[0].options[1].selected === true || this.props.resource.selections[0].options[2].selected === true) {
                    this.setState({
                        disable: true
                    })
                }
            }
        }
    }

    render() {
        const options = this.getOptions();
        const defaultValue = this.state.selectedItemId === null ? this.props.resource.type_id : this.state.selectedItemId;
        let elements = [];

        if (this.state.selectedItemId === null) {
            elements = this.getInitialSelections();
        } else {
            elements = this.getSelections();
        }

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
                            <Select defaultValue={defaultValue} value={this.state.selectedItemId === null ? defaultValue : this.state.selectedItemId} onChange={this.onSelectionChange.bind(this)} style={{ width: 548 }}>
                                {options}
                            </Select>
                        </Form.Item>

                        <Form.Item key={101} label="Description (optional)">
                            <Input placeholder="Your description goes here" value={this.state.name === null ? this.props.resource.name : this.state.name} onChange={this.onChange.bind(this)} size="large" style={{ ...inputStyle, width: 548 }} />
                        </Form.Item>
                        {elements}
                    </Form>
                </Modal>
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

export default connect(mapStateToProps, { updateResource })(EditKeyResourceModal);

