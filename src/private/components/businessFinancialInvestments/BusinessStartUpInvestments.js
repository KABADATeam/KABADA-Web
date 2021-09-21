import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import {CaretDownFilled, UserOutlined} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
}

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #BFBFBF",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent",
}


const physicalAndIntellectualAssetsColumns = [
    {
        asset: 'Asset',
        dataIndex: 'asset_title',
        key: 'asset_title',
        width: '40%',
    },
    {
        title: 'Status',
        dataIndex: 'status_title',
        key: 'status_title',
        width: '20%',
    },
    {
        title: 'Total amount (w/VAT)',
        dataIndex: 'total_amount_title',
        key: 'total_amount_title',
        width: '30%',
        render: (obj, record) => (
            <Space size={0}>
                <Input placeholder="default size" prefix={<UserOutlined />} />
            </Space>
        )

    },
    {
        title: 'VAT Rate',
        dataIndex: 'vat_rate',
        key: 'var_rate',
        width: '10%',
        render: (obj, record) => (
            <Space size={0}>
                <Select defaultValue="true" suffixIcon={<CaretDownFilled/>}>
                    <Option value="21">21%</Option>
                    <Option value="9">9%</Option>
                </Select>
            </Space>
        ),
    }
];

class BusinessStartUpInvestments extends React.Component {
    render() {

        return (
            <>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business start-up investments</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                Explanation … Before you start selling your product or service, you need to  understand what investments are needed to start your business. Bellow in this section are most  usuall investment categories for start-up business
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{display: 'flex'}}>
                                        <Col span={12}>
                                            <div style={{marginTop:24, marginLeft:16}}>
                                                <Text style={{...titleTextStyle}}>What Period?</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{float: "right", marginTop: 16, marginBottom: 16, marginRight:16}}>
                                                <Select defaultValue="12month" suffixIcon={<CaretDownFilled/>} size='default'>
                                                    <Option value="12month">12 mo.</Option>
                                                    <Option value="24month">24 mo.</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                </Card >  
                            </div>
                            <div style={{marginTop: 24}}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{display: 'flex'}}>
                                        <Col span={12}>
                                            <div style={{marginTop: 24, marginLeft:16}}>
                                                <Text style={{...titleTextStyle}}>Do you pay VAT</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{float: "right", marginTop: 16, marginBottom: 16, marginRight:16}}>
                                                <Select defaultValue="true" suffixIcon={<CaretDownFilled/>}>
                                                    <Option value="true">Yes</Option>
                                                    <Option value="false">No</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                </Card >
                            </div>
                            

                        </Col>
                    </Row>
                </Col>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
    };
}

export default connect(mapStateToProps)(BusinessStartUpInvestments);