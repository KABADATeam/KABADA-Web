import React, { Component } from 'react';
import { Typography, Space, Card, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../styles/customStyles';

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
    render() {
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Product features</Text>
                        <Text style={descriptionTextStyle}>Up to 5 of mixed characteristics</Text>
                        <Checkbox.Group>
                            <Space direction="vertical">
                                <Checkbox value="1">Not different from competitors</Checkbox>
                                <Checkbox value="2">Product or service already exists in the market</Checkbox>
                                <Checkbox value="3">No improvements or innovations</Checkbox>
                                <Checkbox value="4">Continuous</Checkbox>
                                <Checkbox value="5">Based on old technology</Checkbox>
                                <Checkbox value="6">Dominant design unchanged</Checkbox>
                                <Checkbox value="7">Improvement of existing characteristics</Checkbox>
                            </Space>
                        </Checkbox.Group>
                    </Space>
                </Card>
            </>
        );
    }
}

export default ProductFeaturesComponent;
