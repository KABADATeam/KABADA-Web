import React, { Component } from 'react';
import { Card, Typography, List, Row, Col, Tooltip } from 'antd';
import { getSurvivalRate } from '../../../appStore/actions/eurostat/eurostatSurvivalRateAction'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
const { Text } = Typography;

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: "28px"
}
const textStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
}
const numberStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '38px',
}

class IndustryDataComponent extends Component {
    componentDidMount() {
        this.props.getSurvivalRate();
    }
    render() {
        console.log(this.props.survival.survival_rate_data);
        return (
            <>
                <div>
                    <Row style={{ marginTop: "40px" }}>
                        <div>
                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Company Survival rate (3 year)</Typography.Title>
                        </div>
                    </Row>
                    <Row>
                        <List
                            grid={{ gutter: 16 }}
                            dataSource={this.props.survival.survival_rate_data}
                            itemLayout='vertical'
                            renderItem={item => (
                                <List.Item >
                                    <Card style={{ width: '384px', height: '110px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                        <Row>
                                            <div>
                                                <Text style={{ ...textStyle }}>{item.title}</Text>
                                                <Tooltip title="Tooltip text">
                                                    <InfoCircleFilled style={{ color: '#BFBFBF' }} />
                                                </Tooltip>
                                            </div>
                                        </Row>
                                        <Row style={{ marginTop: '8px' }}>
                                            <Col span={12}>
                                                <Text style={{ ...numberStyle }}>{item.lastValue[1]}%</Text>
                                            </Col>
                                            <Col span={12}>
                                                <div style={{ float: 'right' }}>
                                                    {item.lastValue[1] - item.lastValue[0] > 0 ?
                                                        <div style={{ ...numberStyle, color: '#389E0D' }}>
                                                            <ArrowUpOutlined />
                                                            <Text style={{ color: '#389E0D' }}>{item.compareValue}%</Text>
                                                        </div>
                                                        :
                                                        <div style={{ ...numberStyle, color: '#CF1322' }}>
                                                            <ArrowDownOutlined />
                                                            <Text style={{ color: '#CF1322' }}>{item.compareValue}%</Text>
                                                        </div>
                                                    }
                                                </div>

                                            </Col>
                                        </Row>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Row>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans,
        survival: state.survivalRate
    };
}

export default connect(mapStateToProps, { getSurvivalRate })(withRouter(IndustryDataComponent));
