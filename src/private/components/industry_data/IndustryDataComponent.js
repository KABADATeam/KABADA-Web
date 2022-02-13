import React, { Component, PureComponent } from 'react';
import { Card, Typography, List, Row, Col, Tooltip, Divider, Spin, Button, Input } from 'antd';
import { getSurvivalRate } from '../../../appStore/actions/eurostat/eurostatSurvivalRateAction';
import { getGreatnessIndustry } from '../../../appStore/actions/eurostat/eurostatGreatnessIndustryAction';
import { getCostsProductivity } from '../../../appStore/actions/eurostat/eurostatCostsProductivityAction';
import { getCompanySize } from '../../../appStore/actions/eurostat/eurostatCompanySizeAction.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';
import { Line as ChartjsLine } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TooltipComponent from '../Tooltip';
import TextHelper from '../TextHelper';

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
    constructor(props) {
        super(props);
        this.survivalRate = [];
        this.bigIndustry = [];
        this.costsProductivity = [];
        this.companySize = [];
        this.dividerRef = [];
        this.testRef = React.createRef();
    }

    downloadTestRef = async () => {
        console.log(this.survivalRate.length);
        console.log(this.bigIndustry.length);
        console.log(this.costsProductivity.length);
        console.log(this.companySize.length);
        console.log(this.dividerRef);
        const imgWidth = 53.3;
        const pageHeight = 297;
        const surviveCanvas = await html2canvas(this.survivalRate[0]);
        const surviveHeight = surviveCanvas.height * imgWidth / surviveCanvas.width;
        const chartCanvas = await html2canvas(this.bigIndustry[0]);
        const chartCardHeight = chartCanvas.height * imgWidth / chartCanvas.width;
        const doc = new jsPDF('p', 'mm', [297, 210]);
        const dividerCanvas = await html2canvas(this.dividerRef[0]);
        const dividerHeight = dividerCanvas.height * 170 / dividerCanvas.width;
        const dividerElement = dividerCanvas.toDataURL('image/png');
        doc.setFontSize(16);
        doc.text(20, 20, 'Industry data');
        doc.addImage(dividerElement, 'PNG', 20, 25, 170, dividerHeight);
        for (var i = 0; i < this.survivalRate.length; i++) {
            const canvas = await html2canvas(this.survivalRate[i]);
            const dataElement = canvas.toDataURL('image/png');
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const xPosition = 20 + i * 5 + i * imgWidth;
            if (i === 0) {
                doc.setFontSize(12)
                doc.text(20, 35, 'Company Survival rate (3 year)')
                doc.addImage(dataElement, 'PNG', xPosition, 40, imgWidth, imgHeight);
            } else {
                doc.addImage(dataElement, 'PNG', xPosition, 40, imgWidth, imgHeight);
            }
        }
        doc.addImage(dividerElement, 'PNG', 20, 45 + surviveHeight, 170, dividerHeight);
        for (var i = 0; i < this.bigIndustry.length; i++) {
            const canvas = await html2canvas(this.bigIndustry[i]);
            const dataElement = canvas.toDataURL('image/png');
            console.log('height', canvas.height)
            console.log('width', canvas.width)
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const xPosition = 20 + i * 5 + i * imgWidth;
            const yPosition = 60 + surviveHeight;
            if (i === 0) {
                doc.setFontSize(12)
                doc.text(20, 55 + surviveHeight, 'How big is the industry?')
                doc.addImage(dataElement, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
            } else if (i === 3) {
                doc.addImage(dataElement, 'PNG', 20, yPosition + imgHeight + 5, imgWidth, imgHeight);
            } else {
                doc.addImage(dataElement, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
            }
        }
        doc.addImage(dividerElement, 'PNG', 20, 70 + surviveHeight + 2 * chartCardHeight, 170, dividerHeight);
        doc.addPage();
        for (var i = 0; i < this.costsProductivity.length; i++) {
            const canvas = await html2canvas(this.costsProductivity[i]);
            const dataElement = canvas.toDataURL('image/png');
            console.log('height', canvas.height)
            console.log('width', canvas.width)
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const xPosition = 20 + i * 5 + i * imgWidth;
            const yPosition = 25 + imgHeight;
            if (i === 0) {
                doc.setFontSize(12)
                doc.text(20, 20, 'How big is labor costs and productivity?')
                doc.addImage(dataElement, 'PNG', xPosition, 25, imgWidth, imgHeight);
            } else if (i === 3) {
                doc.addImage(dataElement, 'PNG', 20, yPosition + 5, imgWidth, imgHeight);
            } else {
                doc.addImage(dataElement, 'PNG', xPosition, 25, imgWidth, imgHeight);
            }
        }
        doc.addImage(dividerElement, 'PNG', 20, 32.5 + chartCardHeight, 170, dividerHeight);
        for (var i = 0; i < this.companySize.length; i++) {
            const canvas = await html2canvas(this.companySize[i]);
            const dataElement = canvas.toDataURL('image/png');
            console.log('height', canvas.height)
            console.log('width', canvas.width)
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const xPosition = 20 + i * 5 + i * imgWidth;
            const yPosition = 40 + imgHeight;
            if (i === 0) {
                doc.setFontSize(12)
                doc.text(20, yPosition, 'How big are the companies in the industry?')
                doc.addImage(dataElement, 'PNG', xPosition, yPosition + 5, imgWidth, imgHeight);
            } else if (i === 3) {
                doc.addImage(dataElement, 'PNG', 20, yPosition + 5, imgWidth, imgHeight);
            } else {
                doc.addImage(dataElement, 'PNG', xPosition, yPosition + 5 , imgWidth, imgHeight);
            }
        }
        doc.addImage(dividerElement, 'PNG', 20, 50 + 2 * chartCardHeight, 170, dividerHeight);
        doc.save('doc.pdf');
    }

    getChartsData() {
        this.props.getSurvivalRate();
        this.props.getGreatnessIndustry();
        this.props.getCostsProductivity();
        this.props.getCompanySize();
    }
    componentDidMount() {
        this.getChartsData();
        this.survivalRate[0] && this.survivalRate[0].focus();
        this.bigIndustry[0] && this.bigIndustry[0].focus();
    }
    render() {
        console.log(this.props.loading);
        const spinner = this.props.loading.survival_rate === true && this.props.loading.greatness_industry === true && this.props.loading.costs_productivity === true && this.props.loading.company_size === true ? true : false;
        //const spinnerTest = true;
        console.log(this.props.costsProductivity);
        const defaultEmptyText = {
            emptyText: 'Not all the data could be taken from the Eurostat'
        }
        return (
            <>
                {spinner === false ?
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <Spin size='large' />
                    </div>
                    :
                    <>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col>
                                {/* <Button type="primary" onClick={this.downloadPDF}>Download industry data</Button> */}
                                <Button type="primary" onClick={this.downloadTestRef}>Download ref</Button>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={24}>
                                <Row style={{ marginTop: "40px" }}>
                                    <Typography.Title style={{ ...aboutTitleTextStyle }}>Company Survival rate (3 year)</Typography.Title>
                                </Row>
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    style={{ marginTop: "14px" }}
                                    dataSource={this.props.survival.survival_rate_data}
                                    itemLayout='vertical'
                                    locale={defaultEmptyText}
                                    renderItem={(item, index) => (
                                        <List.Item >
                                            <div ref={ref => this.survivalRate[index] = ref}>
                                                <Card style={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Text style={{ ...textStyle }}>{item.title}</Text>
                                                            {
                                                                item.id === 1 ? <TooltipComponent code='ovidcsr1' type='text' />
                                                                    : item.id === 2 ? <TooltipComponent code='ovidcsr2' type='text' />
                                                                        : item.id === 3 ? <TooltipComponent code='ovidcsr3' type='text' />
                                                                            : <></>
                                                            }
                                                        </Col>
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
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                <div ref={ref => this.dividerRef[0] = ref}>
                                    <Divider />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col>
                                <Row>
                                    <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is the industry?</Typography.Title>
                                </Row>
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    style={{ marginTop: "14px" }}
                                    dataSource={this.props.greatnessIndustry.greatness_industry_data}
                                    itemLayout='vertical'
                                    locale={defaultEmptyText}
                                    renderItem={(item, index) => {
                                        const data = {
                                            labels: item.timeLabels,
                                            datasets: [
                                                {
                                                    label: item.geoTitle,
                                                    data: item.activityValues,
                                                    fill: false,
                                                    backgroundColor: '#1890FF',
                                                    borderColor: '#1890FF',
                                                    pointStyle: 'rectRounded',
                                                    pointRadius: 0,
                                                    yAxisID: 'y'
                                                },
                                                {
                                                    label: item.geoTitle + '(Total)',
                                                    data: item.totalActivitiesValues,
                                                    fill: false,
                                                    backgroundColor: '#BFBFBF',
                                                    borderColor: '#BFBFBF',
                                                    pointStyle: 'rectRounded',
                                                    pointRadius: 0,
                                                    yAxisID: 'y1'
                                                }
                                            ]
                                        }
                                        const options = {
                                            responsive: true,
                                            maintainAspectRatio: false,
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
                                                    position: 'right',
                                                    grid: {
                                                        drawOnChartArea: false,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: false
                                            },
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                    align: 'start',
                                                    labels: {
                                                        usePointStyle: true
                                                    }
                                                },
                                                title: {
                                                    display: true,
                                                    text: item.variableTitle + ' over time',
                                                    align: 'start',
                                                    color: '#262626',
                                                    padding: {
                                                        bottom: 16
                                                    },
                                                    font: {
                                                        weight: 600,
                                                        size: 14
                                                    }
                                                }
                                            },
                                            layout: {
                                                padding: {
                                                    bottom: 10,
                                                }
                                            },
                                            color: '#262626'
                                        };
                                        return (
                                            <List.Item >
                                                <div ref={ref => this.bigIndustry[index] = ref}>
                                                    <Card style={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                        <Row>
                                                            <Text style={{ ...textStyle }}>{item.variableTitle} {item.industry}</Text>
                                                            {
                                                                item.variableTitle === 'Enterprices' ? <TooltipComponent code='ovidbi1' type='text' />
                                                                    : item.variableTitle === 'Turnover' ? <TooltipComponent code='ovidbi2' type='text' />
                                                                        : item.variableTitle === 'Gross investment' ? <TooltipComponent code='ovidbi3' type='text' />
                                                                            : item.variableTitle === 'Employees in full time' ? <TooltipComponent code='ovidbi4' type='text' />
                                                                                : <></>
                                                            }
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...numberStyle }}>{item.activityValue[1]}{item.unitOfMeasure}</Text>
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

                                                        <Row>
                                                            <Col span={13}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>European Union</Text>
                                                            </Col>
                                                            <Col span={11}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.euActivitiesValue[1] - item.euActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.geo} (Total)</Text>
                                                            </Col>
                                                            <Col span={12}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.totalActivitiesValue[1] - item.totalActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <Row>
                                                            <ChartjsLine data={data} options={options} style={{ width: 344, height: 331 }} />
                                                        </Row>
                                                    </Card>
                                                </div>
                                            </List.Item>
                                        )
                                    }}
                                />
                                <Divider />
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={24}>
                                <Row>
                                    <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is labor costs and productivity?</Typography.Title>
                                </Row>
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    style={{ marginTop: "14px" }}
                                    dataSource={this.props.costsProductivity.costs_productivity_data}
                                    itemLayout='vertical'
                                    locale={defaultEmptyText}
                                    renderItem={(item, index) => {
                                        const data = {
                                            labels: item.timeLabels,
                                            datasets: [
                                                {
                                                    label: item.geoTitle,
                                                    data: item.activityValues,
                                                    fill: false,
                                                    backgroundColor: '#1890FF',
                                                    borderColor: '#1890FF',
                                                    pointStyle: 'rectRounded',
                                                    pointRadius: 0,
                                                    yAxisID: 'y'
                                                },
                                                {
                                                    label: item.geoTitle + '(Total)',
                                                    data: item.totalActivitiesValues,
                                                    fill: false,
                                                    backgroundColor: '#BFBFBF',
                                                    borderColor: '#BFBFBF',
                                                    pointStyle: 'rectRounded',
                                                    pointRadius: 0,
                                                    yAxisID: 'y1'
                                                }
                                            ]
                                        }
                                        const options = {
                                            responsive: true,
                                            maintainAspectRatio: false,
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
                                                    position: 'right',
                                                    grid: {
                                                        drawOnChartArea: false,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: false
                                            },
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                    align: 'start',
                                                    labels: {
                                                        usePointStyle: true
                                                    }
                                                },
                                                title: {
                                                    display: true,
                                                    text: item.variableTitle + ' over time',
                                                    align: 'start',
                                                    color: '#262626',
                                                    padding: {
                                                        bottom: 16
                                                    },
                                                    font: {
                                                        weight: 600,
                                                        size: 14
                                                    }
                                                }
                                            },
                                            layout: {
                                                padding: {
                                                    bottom: 10,
                                                }
                                            },
                                            color: '#262626'
                                        };
                                        return (
                                            <List.Item >
                                                <div ref={ref => this.costsProductivity[index] = ref}>
                                                    <Card style={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                        <Row>
                                                            <div>
                                                                <Text style={{ ...textStyle }}>{item.variableTitle} {item.industry}</Text>
                                                                {
                                                                    item.variableTitle === 'Labour productivity' ? <TooltipComponent code='ovidlcp1' type='text' />
                                                                        : item.variableTitle === 'Share of personnel costs' ? <TooltipComponent code='ovidlcp2' type='text' />
                                                                            : item.variableTitle === 'Average personnel cost' ? <TooltipComponent code='ovidlcp3' type='text' />
                                                                                : <></>
                                                                }
                                                            </div>
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...numberStyle }}>{item.activityValue[1]}{item.unitOfMeasure}</Text>
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

                                                        <Row>
                                                            <Col span={13}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>European Union</Text>
                                                            </Col>
                                                            <Col span={11}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.totalActivitiesValue[1] - item.euActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.geo} (Total)</Text>
                                                            </Col>
                                                            <Col span={12}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.totalActivitiesValue[1] - item.totalActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <Row>
                                                            <ChartjsLine data={data} options={options} style={{ width: 344, height: 331 }} />
                                                        </Row>
                                                    </Card>
                                                </div>
                                            </List.Item>
                                        )
                                    }}
                                />
                                <Divider />
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={24}>                            
                                <Row>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>How big are the companies in the industry?</Typography.Title>
                                </Row>                                
                                    <List
                                        grid={{ gutter: 16, column: 3 }}
                                        style={{ marginTop: "14px" }}
                                        dataSource={this.props.companySize.company_size_data}
                                        itemLayout='vertical'
                                        locale={defaultEmptyText}
                                        renderItem={(item, index) => {
                                            const data = {
                                                labels: item.timeLabels,
                                                datasets: [
                                                    {
                                                        label: item.geoTitle,
                                                        data: item.activityValues,
                                                        fill: false,
                                                        backgroundColor: '#1890FF',
                                                        borderColor: '#1890FF',
                                                        pointStyle: 'rectRounded',
                                                        pointRadius: 0,
                                                        yAxisID: 'y'
                                                    },
                                                    {
                                                        label: item.geoTitle + '(Total)',
                                                        data: item.totalActivitiesValues,
                                                        fill: false,
                                                        backgroundColor: '#BFBFBF',
                                                        borderColor: '#BFBFBF',
                                                        pointStyle: 'rectRounded',
                                                        pointRadius: 0,
                                                        yAxisID: 'y1'
                                                    }
                                                ]
                                            }
                                            const options = {
                                                responsive: true,
                                                maintainAspectRatio: false,
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
                                                        position: 'right',
                                                        grid: {
                                                            drawOnChartArea: false,
                                                        }
                                                    }
                                                },
                                                tooltip: {
                                                    enabled: false
                                                },
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom',
                                                        align: 'start',
                                                        labels: {
                                                            usePointStyle: true
                                                        }
                                                    },
                                                    title: {
                                                        display: true,
                                                        text: item.variableTitle + ' over time',
                                                        align: 'start',
                                                        color: '#262626',
                                                        padding: {
                                                            bottom: 16
                                                        },
                                                        font: {
                                                            weight: 600,
                                                            size: 14
                                                        }
                                                    }
                                                },
                                                layout: {
                                                    padding: {
                                                        bottom: 10,
                                                    }
                                                },
                                                color: '#262626'
                                            };
                                            return (
                                                <List.Item >
                                                    <div ref={ref => this.companySize[index] = ref}>
                                                    <Card style={{borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                        <Row>
                                                            <div>
                                                                <Text style={{ ...textStyle }}>{item.variableTitle} {item.industry}</Text>
                                                                {
                                                                    item.variableTitle === 'Persons employed' ? <TooltipComponent code='ovidbci1' type='text' />
                                                                        : item.variableTitle === 'Gross operating turnover' ? <TooltipComponent code='ovidbci2' type='text' />
                                                                            : <></>
                                                                }
                                                            </div>
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...numberStyle }}>{item.activityValue[1]}{item.unitOfMeasure}</Text>
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

                                                        <Row>
                                                            <Col span={13}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>European Union</Text>
                                                            </Col>
                                                            <Col span={11}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.totalActivitiesValue[1] - item.euActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.euActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.euActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: '8px' }}>
                                                            <Col span={12}>
                                                                <Text style={{ ...textStyleForEUAndTotal }}>{item.geo} (Total)</Text>
                                                            </Col>
                                                            <Col span={12}>
                                                                <div style={{ float: 'right' }}>
                                                                    {item.totalActivitiesValue[1] - item.totalActivitiesValue[0] > 0 ?
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#389E0D' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowUpOutlined />
                                                                            <Text style={{ color: '#389E0D', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                        :
                                                                        <div style={{ ...numberStyleForEUAndTotal, color: '#CF1322' }}>
                                                                            <Text style={{ ...textStyleForEUAndTotal }}>{item.totalActivitiesValue[1]}{item.unitOfMeasure}</Text>
                                                                            <ArrowDownOutlined />
                                                                            <Text style={{ color: '#CF1322', marginLeft: 7 }}>{item.totalActivitiesProgress}%</Text>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <Row>
                                                            <ChartjsLine data={data} options={options} style={{ width: 344, height: 331 }} />
                                                        </Row>
                                                    </Card>
                                                    </div>
                                                </List.Item>
                                            )
                                        }}
                                    />
                            </Col>
                        </Row>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans,
        survival: state.survivalRate,
        greatnessIndustry: state.greatnessIndustry,
        costsProductivity: state.costsProductivity,
        companySize: state.companySize,
        loading: state.chartsLoading
    };
}

export default connect(mapStateToProps, { getSurvivalRate, getGreatnessIndustry, getCostsProductivity, getCompanySize })(withRouter(IndustryDataComponent));
