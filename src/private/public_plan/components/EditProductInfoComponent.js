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

class EditProductInfoComponent extends Component {


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

        if (this.props.product.title === undefined) {
            return <></>
        } else {
            return (
                <>
                    <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                        <Text style={infoTextStyle}>Product information</Text>
                        <Form layout="vertical" style={{ marginTop: '20px' }}>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: "10px" }}
                                key="name" label="Product name" 
                                validateStatus={this.props.product.title === '' ? 'error' : 'success' }
                                help={this.props.product.title === '' ? 'Enter product name' : ''} >
                                <Input id="name" size="large" style={{ ...inputStyle, width: '100%' }} onChange={this.onTitleChanged} value={this.props.product.title} disabled={true}/>
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" label="Product type">
                                <Select style={{ width: '100%' }} placeholder="Select product type" value={this.props.product.product_type} onChange={this.onSelectionChange.bind(this)} disabled={true}>
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: '0px' }} key="description" label="Short description of Product (2-3 sentences)">
                                <TextArea style={inputStyle} rows={3} value={this.props.product.description} onChange={this.onDescriptionChanged} disabled={true}/>
                            </Form.Item>
                        </Form>
                    </Card>
                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        productTypes: state.productTypes
    };
}

export default connect(mapStateToProps, { setProductTitle, setProductType, setProductDescription })(EditProductInfoComponent);
