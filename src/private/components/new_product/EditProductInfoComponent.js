import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography, Form, Input, Select, Popover, Button, Row, Col } from 'antd'
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductTitle, setProductType, setProductDescription } from "../../../appStore/actions/productActions";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "32px",
    textAlign: "center",
    fontWeight: 600,
}
const inputStyle = {
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '25px'
}

class EditProductInfoComponent extends Component {

    state = {
        popoverVisibility: false,
        popoverType: 'is predict',
        popoverTextObject: []
    }

    handlePopoverVisibilityChange = (visible) => {
        this.setState({
            popoverVisibility: visible,
        })
    }

    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }

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
        const typeOptions = this.props.productTypes.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );        
        const typeValue = this.props.product.product_type.type_id;
        const popoverContent = (
            <>
                {
                    this.state.popoverType === 'no predict' ?
                        <>
                            <Row>
                                <Text>
                                    Based on the current information KABADA AI did not have any suggestions.
                                </Text>
                            </Row>
                            <Row style={{ marginTop: '12px' }}>
                                <Button onClick={this.hidePopover}>Cancel</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Row>
                                    <Text>Test test test test tets test test test</Text>
                                    {/* {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Text>Based on the current information KABADA AI thinks that everything looks good.</Text>
                                            :
                                            <Text>
                                                Based on your input KABADA AI recommends that you consider adding {this.state.popoverTextObject.map((e, index) => {
                                                    if (index + 1 === this.state.popoverTextObject.length) {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text};</Text>
                                                        )
                                                    }
                                                })}.
                                            </Text>
                                    } */}
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {/* {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Button onClick={this.hidePopover}>Cancel</Button>
                                            :
                                            <>
                                                <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                            </>
                                    } */}
                                    
                                        <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                        <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                    
                                </Row>
                            </Row>
                        </>
                }
            </>
        )
        if (this.props.product.title === undefined) {
            return <></>
        } else {
            return (
                <>
                    <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                        <Row>
                            <Col>
                                <Text style={infoTextStyle}>Product information</Text>
                            </Col>
                            <Col style={{marginLeft: '5px'}}>
                                <Popover
                                    placement='topLeft'
                                    title='AI Hint'
                                    content={popoverContent}
                                    overlayStyle={{ width: "328px" }}
                                    trigger="click"
                                    visible={this.state.popoverVisibility}
                                    onVisibleChange={this.handlePopoverVisibilityChange}
                                >
                                    <Button
                                        icon=
                                        {<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <rect width="28" height="28" rx="14" fill="#1990FE" />
                                            <path d="M22.7077 11.9719C22.1277 11.9719 21.9249 12.3878 21.876 12.4719H20.7385V9.5C20.7385 8.11937 19.6369 7 18.2769 7H9.41538C8.05538 7 6.95385 8.11937 6.95385 9.5V12.4719H5.81631C5.76738 12.4156 5.56462 11.9719 4.98462 11.9719C4.45969 11.9719 4 12.4006 4 12.9719C4 13.5438 4.46062 13.9437 4.98462 13.9437C5.56462 13.9437 5.76738 13.5281 5.81631 13.4719H6.95385V17.4438C6.95385 18.8244 8.056 19.9438 9.41538 19.9438L10.8923 19.9719V22.5966C10.8923 22.7281 10.9754 23 11.2615 23C11.3391 23 11.4153 22.9747 11.4799 22.9272L15.3231 19.9719L18.2769 19.9721C19.6363 19.9721 20.7385 18.8527 20.7385 17.4721V13.4719H21.8763C21.9262 13.5844 22.1292 13.9719 22.7077 13.9719C23.2326 13.9719 23.6923 13.5431 23.6923 13C23.6923 12.4281 23.2338 11.9719 22.7077 11.9719ZM18.7692 15C18.7692 15.5522 18.3283 16 17.7846 16H9.90769C9.36308 16 8.92308 15.5531 8.92308 15V11C8.92308 10.4478 9.364 10 9.90769 10H17.7846C18.3283 10 18.7692 10.4478 18.7692 11V15ZM10.8923 11.9719C10.3486 11.9719 9.90769 12.4197 9.90769 12.9719C9.90769 13.5241 10.3486 13.9719 10.8923 13.9719C11.436 13.9719 11.8769 13.5241 11.8769 12.9719C11.8769 12.4469 11.4369 11.9719 10.8923 11.9719ZM16.8 11.9719C16.2563 11.9719 15.8154 12.4197 15.8154 12.9719C15.8154 13.5241 16.2563 13.9719 16.8 13.9719C17.3437 13.9719 17.7846 13.5241 17.7846 12.9719C17.7846 12.4469 17.3446 11.9719 16.8 11.9719Z" fill="white" />
                                        </svg>
                                        }
                                        type="link"
                                    />
                                </Popover>
                            </Col>
                        </Row>

                        <Form layout="vertical" style={{ marginTop: '20px' }}>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: "10px" }}
                                key="name" label="Product name"
                                validateStatus={this.props.product.title === '' ? 'error' : 'success'}
                                help={this.props.product.title === '' ? 'Enter product name' : ''}>
                                <Input id="name" style={{ ...inputStyle }} size='large' onChange={this.onTitleChanged} value={this.props.product.title} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" label="Product type" disabled={true}>
                                <Select 
                                    style={{ width: '100%' }} 
                                    placeholder="Select product type" 
                                    value={this.props.product.product_type.type_id} 
                                    onChange={this.onSelectionChange.bind(this)} 
                                    options={typeOptions}
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: '0px' }} key="description" label="Short description of Product (2-3 sentences)">
                                <TextArea style={inputStyle} rows={3} value={this.props.product.description} onChange={this.onDescriptionChanged} />
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
