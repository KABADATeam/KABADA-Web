import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Divider, Select, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductPriceLevel, setIncomeSources } from "../../../appStore/actions/productActions";

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

    onSelectionChange(id) {
        this.props.setProductPriceLevel(id);
    }

    onIncomeSourcesChanged = (values) => {
        this.props.setIncomeSources(values);
    }

    render() {
        const options = this.props.priceLevels.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );
        const checkBoxes = this.props.incomeSources.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );

        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Text style={infoTextStyle}>Price Level</Text>
                    <Select style={{ width: '100%', marginTop: '20px' }} value={this.props.product.price_level} placeholder="Select price level" onChange={this.onSelectionChange.bind(this)} disabled={true}>
                        {options}
                    </Select>

                    <Divider />
                    <Space direction="vertical" disabled = {true}>
                        <Text style={infoTextStyle}>Additional income sources</Text>
                        <Text style={descriptionTextStyle}>Select up to 5 sources</Text>
                        <Checkbox.Group onChange={this.onIncomeSourcesChanged} value={this.props.product.selected_additional_income_sources} disabled={true}>
                            <Space direction="vertical">
                                {checkBoxes}
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

export default connect(mapStateToProps, { setProductPriceLevel, setIncomeSources })(EditPriceLevelComponent);