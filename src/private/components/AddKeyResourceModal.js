import React, { Component } from 'react';
import { Modal, Button, Form, Space, Select, Radio, Divider } from 'antd';
import '../../css/customModal.css';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { buttonStyle } from '../../styles/customStyles';

const { Option } = Select;

class AddKeyResourceModal extends Component {
    state = {
        addKeyVisibility: false,
        ownershipType: 1,
        frequencyType: 1,
    }

    handleCancel = () => {
        this.props.handleClose();
        console.log('Clicked cancel button');
        this.setState({
            addKeyVisibility: false,
        });
    };
    addNewKeyResource = () => {
        this.setState({
            addKeyVisibility: true,
        })
    }
    closeNewKeyResourceModal = () => {
        this.setState({
            addKeyVisibility: false,
        })
    }
    handleOk = () => {
        this.setState({
            addKeyVisibility: false
        })
    }
    onChangeOwnershipType = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            ownershipType: e.target.value
        })
    }
    onChangeFrequency = e => {
        console.log('frequency radio checked', e.target.value);
        this.setState({
            frequencyType: e.target.value
        })
    }

    render() {
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={636}
                    title={"Physical resources"}
                    visible={this.props.visibility}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                        Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                        Add
                        </Button>,
                    ]}
                >
                    <Form
                        layout="vertical"
                    >
                        <Form.Item label="Type">
                            <Space>
                               <Select defaultValue="buildings" style={{width:548}}>
                                <Option value="buildings">Buildings</Option>
                                <Option value="buildings2">Buildings 2</Option>
                               </Select> 
                               <Button icon={<DeleteOutlined/>} style={{...buttonStyle, width: 40, height: 40}}/>                               
                            </Space>                            
                        </Form.Item>
                        <Form.Item label="Building type">
                               <Select defaultValue="inventoryBuildings" style={{width:548}}>
                                <Option value="inventoryBuildings">Inventory Buildings</Option>
                                <Option value="inventoryBuildings2">Inventory Buildings 2</Option>
                               </Select>                                                 
                        </Form.Item>
                        <Form.Item label="Ownership type">
                            <Radio.Group onChange={this.onChangeOwnershipType} value={this.state.ownershipType}>
                                <Space direction="vertical">
                                    <Radio value={1}>Rent</Radio>
                                    <Radio value={2}>Buy</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Frequency">
                            <Radio.Group onChange={this.onChangeFrequency} value={this.state.frequencyType}>
                                <Space direction="vertical">
                                    <Radio value={1}>Permanently</Radio>
                                    <Radio value={2}>Time to time</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Divider style={{width: 640, marginLeft: -25}} />
                        <Form.Item>
                            <Button size={"large"} style={{...buttonStyle, width: 118, height: 40}}><PlusOutlined />Add item</Button>
                        </Form.Item>
                    </Form>            
                </Modal >
            </>
        )
    }
}

export default AddKeyResourceModal;

