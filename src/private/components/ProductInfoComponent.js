import React, { Component } from 'react';
import { Card, Typography, Form, Input, Select } from 'antd'
import { cardStyle, tableCardBodyStyle, inputStyle } from '../../styles/customStyles';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    fontWeight: 600,
}

class ProductInfoComponent extends Component {
    render() {
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Text style={infoTextStyle}>Product information</Text>
                    <Form
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: "10px" }} key="name" name="name" label="Product name"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter product name'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={{ ...inputStyle, width: '100%' }} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" name="type" label="Product type"
                            rules={[
                                {
                                    validator: async (_, type) => {
                                        if (!type || type.length < 1) {
                                            return Promise.reject(new Error('Select product type'));
                                        }
                                    },
                                },
                            ]}
                        >
                            <Select showSearch
                                style={{ width: '100%' }}
                                allowClear
                                placeholder="Select product type"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key={1} value={1}>Physical Good</Option>
                                <Option key={2} value={2}>Other Good</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: '0px' }}
                            key="description" name="description" label="Short description of Product (2-3 sentences)"
                        >
                            <TextArea style={inputStyle} rows={3} />
                        </Form.Item>
                    </Form>
                </Card>
            </>
        );
    }
}

export default ProductInfoComponent;
