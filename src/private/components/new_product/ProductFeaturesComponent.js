import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductFeatures } from "../../../appStore/actions/productActions";
import TooltipComponent from "../Tooltip";

const { Text } = Typography;

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


class ProductFeaturesComponent extends Component {
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
        this.props.setProductFeatures(checkedValues);
    };

    isDisabled = id => {
        return (
            this.state.checked.length > 8 && this.state.checked.indexOf(id) === -1
        );
    };
    getColor = (id) => {
        const element = this.props.product.product_features.find(e => e.id === id);
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

    render() {
        const checkBoxes = this.props.features.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );
        const productFeaturesValues = this.props.product.product_features.map(e => e.id);
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Product features<TooltipComponent code="vpnp3" type="text" /></Text>
                        <Text style={descriptionTextStyle}>Up to 9 of mixed characteristics</Text>
                        <Checkbox.Group onChange={this.onChange} value={productFeaturesValues}>
                            <Space direction="vertical" >
                                {this.props.features.map((obj) => (
                                    <Checkbox value={obj.id} key={obj.key} disabled={this.isDisabled(obj.id)} style={{ backgroundColor: this.getColor(obj.id) }}>{obj.title}</Checkbox>
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
        features: state.productFeatures,
        product: state.product
    };
}

export default connect(mapStateToProps, { setProductFeatures })(ProductFeaturesComponent);
