import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography, Form, Input, Select } from 'antd'
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
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
const inputStyle = {
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '25px'
}

class EditProductInfoComponent extends Component {
    render() {
        const typeOptions = this.props.productTypes.map((obj) =>
            ({ label: obj.title, value: obj.id })
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
                                key="name" label="Product name" >
                                <Input id="name" size="large" style={{ ...inputStyle, width: '100%' }} value={this.props.product.title} disabled={true} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" label="Product type">
                                <Select
                                    style={{ width: '100%' }}
                                    disabled
                                    value={this.props.product.product_type.type_id}
                                    options={typeOptions}
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: '0px' }} key="description" label="Short description of Product (2-3 sentences)">
                                <TextArea style={inputStyle} rows={3} value={this.props.product.description} disabled={true} />
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
