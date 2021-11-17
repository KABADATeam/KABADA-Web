import React, { Component, PureComponent } from 'react';
import { Card, Typography, List, Row, Col, Tooltip, Divider } from 'antd';
import { getSurvivalRate } from '../../../appStore/actions/eurostat/eurostatSurvivalRateAction'
import { getGreatnessIndustry } from '../../../appStore/actions/eurostat/eurostatGreatnessIndustryAction'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';
import { Line as ChartjsLine } from 'react-chartjs-2';

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
const numberStyleForEUAndTotal = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
}
const textStyleForEUAndTotal = {
    fontStyle: 'normal',
    fontWeight: '400px',
    fontSize: '14px',
    lineHeight: '22px',
}

class IndustryDataComponent extends PureComponent {
    componentDidMount() {
        this.props.getSurvivalRate();
        this.props.getGreatnessIndustry();
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
                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.compareValue}%</Text>
                                                        </div>
                                                        :
                                                        <div style={{ ...numberStyle, color: '#CF1322' }}>
                                                            <ArrowDownOutlined />
                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.compareValue}%</Text>
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
                    <Divider style={{ width: '1200px' }} />
                    <Row>
                        <div>
                            <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is the industry?</Typography.Title>
                        </div>
                    </Row>
                    <Row>
                        <List
                            grid={{ gutter: 16 }}
                            dataSource={this.props.greatnessIndustry.greatness_industry_data}
                            itemLayout='vertical'
                            renderItem={item => {
                                const data = {
                                    labels: item.timeLabels,
                                    datasets: [
                                        {
                                            label: item.geo,
                                            data: item.activityValues,
                                            fill: false,
                                            backgroundColor: '#1890FF',
                                            borderColor: '#1890FF',
                                            pointRadius: 0,
                                            yAxisID: 'y'
                                        },
                                        {
                                            label: item.geo + '(Total)',
                                            data: item.totalActivitiesValues,
                                            fill: false,
                                            backgroundColor: '#BFBFBF',
                                            borderColor: '#BFBFBF',
                                            pointRadius: 0,
                                            yAxisID: 'y1'
                                        }
                                    ]
                                }
                                const options = {
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            type: 'linear',
                                            display: true,
                                            position: 'left'
                                        },
                                        y1: {
                                            beginAtZero: true,
                                            type: 'linear',
                                            display: true,
                                            position: 'right'
                                        }
                                    },
                                    tooltip: {
                                        enabled: false
                                    },
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            align: 'start'
                                        }
                                    }

                                };
                                console.log(data);
                                return (
                                    <List.Item >
                                        <Card style={{ width: '384px', height: '581px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <Row>
                                                <div>
                                                    <Text style={{ ...textStyle }}>{item.variableTitle} {item.industry}</Text>
                                                    <Tooltip title="Tooltip text">
                                                        <InfoCircleFilled style={{ color: '#BFBFBF' }} />
                                                    </Tooltip>
                                                </div>
                                            </Row>
                                            <Row style={{ marginTop: '8px' }}>
                                                <Col span={12}>
                                                    <Text style={{ ...numberStyle }}>{item.activityValue[1]}%</Text>
                                                </Col>
                                                <Col span={12}>
                                                    <div style={{ float: 'right' }}>
                                                        {item.activityValue[1] - item.activityValue[0] > 0 ?
                                                            <div style={{ ...numberStyle, color: '#389E0D' }}>
                                                                <ArrowUpOutlined />
                                                                <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.activityProgress}%</Text>
                                                            </div>
                                                            :
                                                            <div style={{ ...numberStyle, color: '#CF1322' }}>
                                                                <ArrowDownOutlined />
                                                                <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.activityProgress}%</Text>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <Row style={{ marginTop: '8px' }}>
                                                <Col span={12}>
                                                    <Text style={{ ...textStyleForEUAndTotal }}>{item.geo} (Total)</Text>
                                                </Col>
                                                <Col span={12}>
                                                    <div style={{ float: 'right' }}>
                                                        {item.totalActivitiesValue[1] - item.totalActivitiesValue[0] > 0 ?
                                                            <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}M</Text>
                                                                <ArrowUpOutlined />
                                                                <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.totalActivitiesProgress}</Text>
                                                            </div>
                                                            :
                                                            <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}M</Text>
                                                                <ArrowDownOutlined />
                                                                <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.totalActivitiesProgress}</Text>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={13}>
                                                    <Text style={{ ...textStyleForEUAndTotal }}>European Union</Text>
                                                </Col>
                                                <Col span={11}>
                                                    <div style={{ float: 'right' }}>
                                                        {item.totalActivitiesValue[1] - item.euActivitiesValue[0] > 0 ?
                                                            <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}M</Text>
                                                                <ArrowUpOutlined />
                                                                <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.euActivitiesProgress}</Text>
                                                            </div>
                                                            :
                                                            <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}M</Text>
                                                                <ArrowDownOutlined />
                                                                <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.euActivitiesProgress}</Text>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <ChartjsLine data={data} options={options} />
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )
                            }}
                        />
                    </Row>
                    <Divider style={{ width: '1200px' }} />
                    <Row>
                        <div>
                            <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is labor costs and productivity</Typography.Title>
                        </div>
                    </Row>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans,
        survival: state.survivalRate,
        greatnessIndustry: state.greatnessIndustry
    };
}

export default connect(mapStateToProps, { getSurvivalRate, getGreatnessIndustry })(withRouter(IndustryDataComponent));
