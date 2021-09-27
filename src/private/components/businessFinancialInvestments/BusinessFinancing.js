import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, InputNumber } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
;


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

class BusinessStartUpInvestments extends React.Component {
    render() {

        return (
            <>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business Financing</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Explanation … In previous section we understood total needed amount of invetsments …. Now we have to understand how to finance these investments. Do you have the means to fund your startup, or will you need to borrow money
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ display: 'flex' }}>
                                        <Col span={16}>
                                            <div style={{ marginTop: 20, marginLeft: 16 }}>
                                                <Text style={{ ...titleTextStyle }}>How much of your own money (savings) will you invest?</Text>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{ float: "right", marginTop: 16, marginBottom: 16, marginRight: 16 }}>
                                                <InputNumber
                                                    formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            </div>
                                        </Col>
                                    </div>
                                </Card >
                            </div>
                            <div style={{marginTop: 24}}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16 }}>
                                        <Text style={{ ...titleTextStyle }}>Business Financing</Text>
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