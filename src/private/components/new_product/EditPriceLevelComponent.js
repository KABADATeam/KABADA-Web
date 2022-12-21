import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Divider, Select, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductPriceLevel, setIncomeSources, getProduct, getProductPriceLevels, getAditionalIncomeSources } from "../../../appStore/actions/productActions";
import TooltipComponent from "../Tooltip";
import '../../../css/publicBusinessPlans.css';

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
class EditPriceLevelComponent extends Component {
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

    componentDidMount() {
        this.props.getProduct(this.props.productId, (data) => {
            this.setState({
                checked: this.props.product.selected_additional_income_sources
            })
        });
        this.props.getProductPriceLevels();
        this.props.getAditionalIncomeSources();
    }



    onSelectionChange(id) {
        this.props.setProductPriceLevel(id);
    }

    getColor = (id) => {
        const element = this.props.product.selected_additional_income_sources.find(e => e.id === id);
        if (element === undefined) {
            let color = "white"
            return color
        } else {
            if (element.tag === 0) {
                let color = "white"
                return color
            } else {
                let color = "#BAE7FF"
                return color
            }
        }
        
    }

    // onIncomeSourcesChanged = (values) => {
    //     this.props.setIncomeSources(values);
    // }

    render() {
        const priceOptions = this.props.priceLevels.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );
        const priceLevelValue = this.props.product.price_level.price_id
        const incomeSourcesValues = this.props.product.selected_additional_income_sources.map(e => e.id);
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Text style={infoTextStyle}>
                        Price Level<TooltipComponent code="vpnp1" type="text" />
                    </Text>
                    <Select 
                        style={{ width: '100%', marginTop: '20px' }} 
                        value={priceLevelValue}
                        className={this.props.product.price_level.tag === 1 ? "aicolor .ant-select-selector" : "simplecolor .ant-select-selector" } 
                        placeholder="Select price level" 
                        onChange={this.onSelectionChange.bind(this)}
                        options={priceOptions}
                    />

                    <Divider />
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Additional income sources<TooltipComponent code="vpnp2" type="text" /></Text>
                        <Text style={descriptionTextStyle}>Select up to 5 sources</Text>
                        <Checkbox.Group onChange={this.onChange} value={incomeSourcesValues}>
                            <Space direction="vertical">
                                {this.props.incomeSources.map((obj) => (
                                    <Checkbox value={obj.id} key={obj.key} disabled={this.isDisabled(obj.id)} style={{backgroundColor: this.getColor(obj.id)}}>{obj.title}</Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    </Space>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priceLevels: state.productFeaturesLevels.priceLevels,
        incomeSources: state.additionalIncomeSources,
        product: state.product
    };
}

export default connect(mapStateToProps, { setProductPriceLevel, setIncomeSources, getProduct, getProductPriceLevels, getAditionalIncomeSources })(EditPriceLevelComponent);
