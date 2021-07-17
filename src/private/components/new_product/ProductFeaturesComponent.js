import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductFeatures } from "../../../appStore/actions/productActions";

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

    onProductFeaturesChanged = (values) => {
        this.props.setProductFeatures(values);
    }

    render() {
        const checkBoxes = this.props.features.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );

        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Product features</Text>
                        <Text style={descriptionTextStyle}>Up to 5 of mixed characteristics</Text>
                        <Checkbox.Group onChange={this.onProductFeaturesChanged}>
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
        features: state.productFeatures
    };
}

export default connect(mapStateToProps, { setProductFeatures })(ProductFeaturesComponent);
