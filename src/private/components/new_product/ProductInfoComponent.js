import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography, Form, Input, Select, Row, Col, Button, Popover, Tag } from 'antd'
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import '../../../css/publicBusinessPlans.css';
import { setProductTitle, setProductType, setProductDescription, setValuePropositionAIPredict } from "../../../appStore/actions/productActions";

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

class ProductInfoComponent extends Component {
    state = {
        popoverVisibility: false,
        popoverType: 'is predict',
        popoverTextObject: []
    }

    handlePopoverVisibilityChange = (visible) => {
        this.setState({
            popoverVisibility: visible,
            popoverTextObject: this.generateAIHelpText()
        })
    }

    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }

    onTitleChanged = (e) => {
        this.props.getTitle(e.target.value);
        this.props.setProductTitle(e.target.value);
    }

    onSelectionChange(id) {
        this.props.getType(id);
        this.props.setProductType(id);
    }

    onDescriptionChanged = (e) => {
        this.props.setProductDescription(e.target.value);
    }

    onAIButtonClick = () => {
        const ai_type_id = this.props.product.aiPredict.find(e => e.id === null).productType;
        const ai_price_id = this.props.product.aiPredict.find(e => e.id === null).priceLevel;

        this.props.setValuePropositionAIPredict(null);
        this.props.getType(ai_type_id);
        this.props.getPrice(ai_price_id);
        this.hidePopover();
    }

    compareArray = (arrayAI, arrayState) => {
        const newArray = []
        for (var i in arrayAI) {
            if (arrayState.indexOf(arrayAI[i]) === -1) {
                newArray.push(arrayAI[i]);
            }
        }
        return newArray;
    }

    generateAIHelpText = () => {
        const aiHintTextObject = [];
        const { product_type, price_level, selected_additional_income_sources, product_features, aiPredict } = this.props.product;
        const { priceLevels } = this.props.productFeaturesLevels;
        console.log(aiPredict)
        const ai_obj = aiPredict.find(e => e.id === null);
        console.log(ai_obj);
        console.log(this.props.product)
        if (ai_obj !== undefined) {
            if (ai_obj.prodType !== undefined) {
                if (product_type.type_id !== ai_obj.prodType[0]) {
                    const type_name = this.props.productTypes.find(e => e.id === ai_obj.prodType[0]).title;
                    const new_obj = {
                        type_title: 'Product type',
                        text: type_name
                    };
                    aiHintTextObject.push(new_obj);
                }
            }            
            if (ai_obj.priceLevel !== undefined) {
                if (price_level.price_id !== ai_obj.priceLevel[0]) {
                    const level_name = priceLevels.find(e => e.id === ai_obj.priceLevel[0]).title;
                    const new_obj = {
                        type_title: 'Price level',
                        text: level_name
                    };
                    aiHintTextObject.push(new_obj);
                }
            }
            
            let incomeSourcesHintText = '';
            const selected_income_sources = selected_additional_income_sources.map(e => e.id);
            const comparedIncomeSource = this.compareArray(ai_obj.addIncomeSource, selected_income_sources);
            if (comparedIncomeSource.length > 1) {
                for (let i = 0; i < comparedIncomeSource.length; i++) {
                    const income_name = this.props.additionalIncomeSources.find(e => e.id === comparedIncomeSource[i]).title;
                    incomeSourcesHintText += i === comparedIncomeSource.length - 1 ? income_name + '' : income_name + ', ';
                }
                const new_obj = {
                    type_title: 'Additional income sources',
                    text: incomeSourcesHintText
                }
                aiHintTextObject.push(new_obj);
            } else if (comparedIncomeSource.length === 1) {
                const income_name = this.props.additionalIncomeSources.find(e => e.id === comparedIncomeSource[0]).title;
                incomeSourcesHintText = income_name;
                const new_obj = {
                    type_title: 'Additional income sources',
                    text: incomeSourcesHintText
                }
                aiHintTextObject.push(new_obj)
            };
            let productFeaturesHintText = '';
            const selected_product_features = product_features.map(e => e.id);
            const comparedProductFeatures = this.compareArray(ai_obj.productFeatures, selected_product_features);
            if (comparedProductFeatures.length > 1) {
                for (let i = 0; i < comparedProductFeatures.length; i++) {
                    const features_name = this.props.productFeatures.find(e => e.id === comparedProductFeatures[i]).title;
                    productFeaturesHintText += i === comparedProductFeatures.length - 1 ? features_name + '' : features_name + ', ';
                }
                const new_obj = {
                    type_title: 'Product features',
                    text: productFeaturesHintText
                }
                aiHintTextObject.push(new_obj);
            } else if (comparedProductFeatures.length === 1) {
                const features_name = this.props.productFeatures.find(e => e.id === comparedProductFeatures[0]).title;
                productFeaturesHintText = features_name;
                const new_obj = {
                    type_title: 'Product features',
                    text: productFeaturesHintText
                }
                aiHintTextObject.push(new_obj)
            };

        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }
        console.log(aiHintTextObject);
        return aiHintTextObject;
    }

    render() {
        const typeOptions = this.props.productTypes.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );
        const typeValue = this.props.product.product_type.type_id;
        // const testText = this.generateAIHelpText();
        // console.log(testText);
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
                                    {/* <Text>Test test test test tets test test test</Text> */}
                                    {
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
                                    }
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Button onClick={this.hidePopover}>Cancel</Button>
                                            :
                                            <>
                                                <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                            </>
                                    }

                                    {/* <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                    <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button> */}

                                </Row>
                            </Row>
                        </>
                }
            </>
        )

        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Row>
                        <Col>
                            <Text style={infoTextStyle}>Product information</Text>
                        </Col>
                        <Col style={{ marginLeft: '5px' }}>
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
                    <Form
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        {
                            this.props.title_error === false ?
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
                                :
                                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: "10px" }} key="name" name="name" label="Product name"
                                    validateStatus="error"
                                    help="Enter product name"
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
                        }
                        {
                            this.props.product_type_error === false ?
                                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" label="Product type">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select product type"
                                        className={this.props.product.product_type.tag === 1 ? "aicolor .ant-select-selector" : "simplecolor .ant-select-selector" }
                                        onChange={this.onSelectionChange.bind(this)}
                                        value={typeValue}
                                        options={typeOptions}
                                    />
                                </Form.Item>
                                :
                                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} key="type" label="Product type"
                                    validateStatus="error"
                                    help="Select product type"
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select product type"
                                        onChange={this.onSelectionChange.bind(this)}
                                        value={typeValue}
                                        options={typeOptions}
                                    />
                                </Form.Item>

                        }
                        <Form.Item
                            style={{ marginBottom: '0px' }}
                            key="description" name="description" label="Short description of Product (2-3 sentences)">
                            <TextArea style={inputStyle} rows={3} onChange={this.onDescriptionChanged} />
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
        productTypes: state.productTypes,
        productFeaturesLevels: state.productFeaturesLevels,
        additionalIncomeSources: state.additionalIncomeSources,
        productFeatures: state.productFeatures
    };
}

export default connect(mapStateToProps, { setProductTitle, setProductType, setProductDescription, setValuePropositionAIPredict })(ProductInfoComponent);
