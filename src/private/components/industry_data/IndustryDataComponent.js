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
        this.survivalRateRef = React.createRef();
        this.bigIndustryRef = React.createRef();
        this.costsProductivityRef = React.createRef();
        this.companySizeRef = React.createRef();
    }
    downloadImage = async () => {
        const element1 = this.survivalRateRef.current;
        const element2 = this.bigIndustryRef.current;
        console.log(element1)
        const canvas = await html2canvas(element1);
        console.log(canvas);
        const data = canvas.toDataURL('image/png');
        console.log(data);
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'image.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }
    downloadPDF = async () => {
        const elements = [];
        const element1 = this.survivalRateRef.current;
        const element2 = this.bigIndustryRef.current;
        const element3 = this.costsProductivityRef.current;
        const element4 = this.companySizeRef.current;
        elements.push(element1, element2, element3, element4);
        console.log(elements)
        const imgWidth = 210;
        const pageHeight = 295;
        const pdf = new jsPDF('p', 'mm');
        for (var i = 0; i < elements.length; i++) {
            const canvas = await html2canvas(elements[i]);
            const dataElement = canvas.toDataURL('image/png');
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = -imgHeight;
            const position = heightLeft - imgHeight;
            console.log('Position ' + position);
            console.log('Po canvas ' + canvas.height);
            console.log('Po formules ' + imgHeight);
            if (i === 0) {
                console.log(0)
                pdf.addImage(dataElement, 'PNG', 0, 0, imgWidth, imgHeight);
            } else if (i === 1) {
                const previuosCanvas = await html2canvas(elements[i - 1]);
                const previuosImgHeight = previuosCanvas.height * imgWidth / previuosCanvas.width;
                console.log(previuosImgHeight);
                pdf.addImage(dataElement, 'PNG', 0, previuosImgHeight, imgWidth, imgHeight);
            } else if (i === 2) {
                pdf.addPage();
                pdf.addImage(dataElement, 'PNG', 0, 0, imgWidth, imgHeight)
            } else if (i === 3) {
                const previuosCanvas = await html2canvas(elements[i - 1]);
                const previuosImgHeight = previuosCanvas.height * imgWidth / previuosCanvas.width;
                pdf.addImage(dataElement, 'PNG', 0, previuosImgHeight, imgWidth, imgHeight);
            }

        }
        pdf.save('Print.pdf')
    }
    getChartsData() {
        this.props.getSurvivalRate();
        this.props.getGreatnessIndustry();
        this.props.getCostsProductivity();
        this.props.getCompanySize();
    }
    componentDidMount() {
        this.getChartsData();
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
                    <div >
                        <div>
                            <Button type="primary" onClick={this.downloadPDF}>Download industry data</Button>
                        </div>
                        <div>
                            <div ref={this.survivalRateRef}>
                                <Row style={{ marginTop: "40px" }}>
                                    <div>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>Company Survival rate (3 year)</Typography.Title>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: "14px" }}>
                                    <List
                                        grid={{ gutter: 16 }}
                                        dataSource={this.props.survival.survival_rate_data}
                                        itemLayout='vertical'
                                        locale={defaultEmptyText}
                                        renderItem={item => (
                                            <List.Item >
                                                <Card style={{ width: '384px', height: '110px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                    <Row>
                                                        <div>
                                                            <Text style={{ ...textStyle }}>{item.title}</Text>
                                                            {
                                                                item.id === 1 ? <TooltipComponent code='ovidcsr1' type='text' />
                                                                    : item.id === 2 ? <TooltipComponent code='ovidcsr2' type='text' />
                                                                        : item.id === 3 ? <TooltipComponent code='ovidcsr3' type='text' />
                                                                            : <></>
                                                            }
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
                            </div>
                            <Divider style={{ width: '1200px' }} />
                            <div ref={this.bigIndustryRef}>
                                <Row>
                                    <div>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is the industry?</Typography.Title>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: "14px" }}>
                                    <List
                                        grid={{ gutter: 16 }}
                                        dataSource={this.props.greatnessIndustry.greatness_industry_data}
                                        itemLayout='vertical'
                                        locale={defaultEmptyText}
                                        renderItem={item => {
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
                                                    <Card style={{ width: '384px', height: '581px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                                        <Row>
                                                            <div>
                                                                <Text style={{ ...textStyle }}>{item.variableTitle} {item.industry}</Text>
                                                                {
                                                                    item.variableTitle === 'Enterprices' ? <TooltipComponent code='ovidbi1' type='text' />
                                                                        : item.variableTitle === 'Turnover' ? <TooltipComponent code='ovidbi2' type='text' />
                                                                            : item.variableTitle === 'Gross investment' ? <TooltipComponent code='ovidbi3' type='text' />
                                                                                : item.variableTitle === 'Employees in full time' ? <TooltipComponent code='ovidbi4' type='text' />
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
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </Row>
                            </div>
                            <Divider style={{ width: '1200px' }} />
                            <div ref={this.costsProductivityRef}>
                                <Row>
                                    <div>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>How big is labor costs and productivity?</Typography.Title>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: "14px" }}>
                                    <List
                                        grid={{ gutter: 16 }}
                                        dataSource={this.props.costsProductivity.costs_productivity_data}
                                        itemLayout='vertical'
                                        locale={defaultEmptyText}
                                        renderItem={item => {
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
                                                    <Card style={{ width: '384px', height: '581px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
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
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </Row>
                            </div>
                            <Divider style={{ width: '1200px' }} />
                            <div ref={this.companySizeRef}>
                                <Row>
                                    <div>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>How big are the companies in the industry?</Typography.Title>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: "14px" }}>
                                    <List
                                        grid={{ gutter: 16 }}
                                        dataSource={this.props.companySize.company_size_data}
                                        itemLayout='vertical'
                                        locale={defaultEmptyText}
                                        renderItem={item => {
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
                                                    <Card style={{ width: '384px', height: '581px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
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
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </Row>
                            </div>
                        </div>
                    </div>
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
