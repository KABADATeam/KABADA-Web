import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Divider, Select, Checkbox, Col, Row, Form } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductPriceLevel, setIncomeSources } from "../../../appStore/actions/productActions";
import TooltipComponent from "../Tooltip";

const { Text } = Typography;
const { Option } = Select;

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    fontWeight: 600,
}
const descriptionTextStyle = {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#8C8C8C',
}
class PriceLevelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        };
    }
    //everytime you check checkbox it will add id of income source to checked array ['7878787','898954654654654']
    onChange = checkedValues => {
        this.setState(() => {
            return { checked: checkedValues };
        });
        this.props.setIncomeSources(checkedValues);
    };

    isDisabled = id => {
        return (
            this.state.checked.length > 4 && this.state.checked.indexOf(id) === -1
        );
    };

    onSelectionChange(id) {
        this.props.getPrice(id);
        this.props.setProductPriceLevel(id);
    }


    render() {
        const priceOptions = this.props.priceLevels.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );
        const checkBoxes = this.props.incomeSources.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );
        const priceLevelValue = this.props.product.price_level.price_id;
        const incomeSourcesValues = this.props.product.selected_additional_income_sources.map(e => e.id);
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Form>
                        <Text style={infoTextStyle}>
                            Price Level<TooltipComponent code="vpnp1" type="text" />
                        </Text>
                        {
                            this.props.price_error === false ?
                                <Form.Item style={{ display: 'inline-block', width: '100%', marginRight: "10px" }}
                                    key="price"
                                >
                                    <Select 
                                        style={{ width: '100%', marginTop: '20px' }} 
                                        placeholder="Select price level" 
                                        onChange={this.onSelectionChange.bind(this)}
                                        value={priceLevelValue}
                                        options={priceOptions}
                                    />
                                </Form.Item>
                                :
                                <Form.Item style={{ display: 'inline-block', width: '100%', marginRight: "10px" }}
                                    key="price"
                                    validateStatus="error"
                                    help="Select price level"
                                >
                                    <Select 
                                        style={{ width: '100%', marginTop: '20px' }} 
                                        placeholder="Select price level" 
                                        onChange={this.onSelectionChange.bind(this)}
                                        value={priceLevelValue}
                                        options={priceOptions}
                                    />
                                </Form.Item>
                        }

                        <Divider />
                        <Space direction="vertical">
                            <Text style={infoTextStyle}>Additional income sources<TooltipComponent code="vpnp2" type="text" /></Text>
                            <Text style={descriptionTextStyle}>Select up to 5 sources</Text>
                            <Checkbox.Group onChange={this.onChange} value={incomeSourcesValues}>
                                <Space direction="vertical">
                                    {this.props.incomeSources.map((obj) => (
                                        <Checkbox value={obj.id} key={obj.key} disabled={this.isDisabled(obj.id)}>{obj.title}</Checkbox>
                                    ))}
                                </Space>
                            </Checkbox.Group>
                        </Space>
                    </Form>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priceLevels: state.productFeaturesLevels.priceLevels,
        incomeSources: state.additionalIncomeSources,
        product: state.product,
    };
}

export default connect(mapStateToProps, { setProductPriceLevel, setIncomeSources })(PriceLevelComponent);
