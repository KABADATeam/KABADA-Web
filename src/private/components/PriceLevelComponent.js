import React, { Component } from 'react';
import { Typography, Space, Card, Divider, Select, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../styles/customStyles';

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


    render() {
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Text style={infoTextStyle}>Price Level</Text>
                    <Select showSearch
                        style={{ width: '100%', marginTop: '20px' }}
                        allowClear
                        placeholder="Select price level"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option key={1} value={1}>Free</Option>
                        <Option key={2} value={2}>Other</Option>
                    </Select>
                    <Divider />
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Additional income sources</Text>
                        <Text style={descriptionTextStyle}>Select up to 5 sources</Text>
                        <Checkbox.Group>
                            <Space direction="vertical">
                                <Checkbox value="1">Non time limited usage</Checkbox>
                                <Checkbox value="2">Additional functions</Checkbox>
                                <Checkbox value="3">Paid plans</Checkbox>
                                <Checkbox value="4">Different price for business</Checkbox>
                                <Checkbox value="5">Different price for individuals</Checkbox>
                                <Checkbox value="6">Fees come from another product</Checkbox>
                                <Checkbox value="7">Other</Checkbox>
                            </Space>
                        </Checkbox.Group>
                    </Space>
                </Card>
            </>
        );
    }
}

export default PriceLevelComponent;
