import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography, Form, Input, Select } from 'antd'
import { cardStyle, tableCardBodyStyle, inputStyle } from '../../../styles/customStyles';
import { setProductTitle, setProductType, setProductDescription } from "../../../appStore/actions/productActions";

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

    onTitleChanged = (e) => {
        this.props.setProductTitle(e.target.value);
    }

    onSelectionChange(id) {
        this.props.setProductType(id);
    }

    onDescriptionChanged = (e) => {
        this.props.setProductDescription(e.target.value);
    }

    render() {
        const options = this.props.productTypes.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );
        console.log(this.props);
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
                            <Input size="large" style={{ ...inputStyle, width: '100%' }} onChange={this.onTitleChanged} />
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
                            ]}>

                            <Select style={{ width: '100%' }} placeholder="Select product type" onChange={this.onSelectionChange.bind(this)} >
                                {options}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: '0px' }}
                            key="description" name="description" label="Short description of Product (2-3 sentences)">
                            <TextArea style={inputStyle} rows={3} onChange={this.onDescriptionChanged}/>
                        </Form.Item>
                    </Form>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        productTypes: state.productTypes
    };
}

export default connect(mapStateToProps, { setProductTitle, setProductType, setProductDescription })(ProductInfoComponent);
