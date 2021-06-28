import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Space, Card, Divider, Slider } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, } from '@ant-design/icons';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import '../../css/customTable.css';
import { cardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles';
import ProductInfoComponent from '../components/ProductInfoComponent';
import PriceLevelComponent from '../components/PriceLevelComponent';
import ProductFeaturesComponent from '../components/ProductFeaturesComponent';

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}

const categoryTextStyle = {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px',
}

const sliderTextStyle = {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '20px',
}

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    fontWeight: 600,
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",

    border: "1px solid #BFBFBF",
    boxSizing: "border-box",

    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent"
}


class NewProduct extends React.Component {

    onBackClick() {
        this.props.history.push(`/value-propositions`);
    }

    onCompleteChange() {
    }

    discardChanges = () => {
        this.props.discardChanges();
    };

    saveChanges = () => {

    };

    getUpdatesWindowState() {
        return 'hidden';
    }

    componentDidMount() {
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();

        const priceMarks = {
            0: {
                style: { ...sliderTextStyle, paddingLeft: '15px' },
                label: 'Free',
            },
            100: {
                style: { ...sliderTextStyle, paddingRight: '15px' },
                label: "High-end",
            }
        };

        const differentiationMarks = {
            0: {
                style: { ...sliderTextStyle, paddingLeft: '15px' },
                label: 'Not',
            },
            100: {
                style: { ...sliderTextStyle, paddingRight: '25px' },
                label: 'Highly',
            }
        };

        const qualityMarks = {
            0: {
                style: { ...sliderTextStyle, paddingLeft: '15px' },
                label: 'Basic',
            },
            100: {
                style: { ...sliderTextStyle, paddingRight: '40px' },
                label: 'Premium',
            }
        };

        const innovativeMarks = {
            0: {
                style: { ...sliderTextStyle, paddingLeft: '15px' },
                label: 'Not',
            },
            100: {
                style: { ...sliderTextStyle, paddingRight: '25px' },
                label: 'Highly',
            }
        };

        return (
            <>
                <UnsavedChangesHeader
                    visibility={isVisibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>Kabada Intelligence Ltd.</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/value-propositions'>Value propositions</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            New Product
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={10} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>New Product</Text>
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                        </div>
                    </Col>
                </Row>

                <Row gutter={[0, 16]}>
                    <Col span={11} offset={4}>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <ProductInfoComponent />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <PriceLevelComponent />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <ProductFeaturesComponent />
                            </Col>
                        </Row>
                    </Col >
                    <Col span={5}>
                        <Card style={{ ...cardStyle, padding: 20, background: '#FAFAFA' }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <p>
                                <Text style={{ ...infoTextStyle, marginBottom: "20px" }}>Summary</Text>
                            </p>

                            <Text style={categoryTextStyle}>Price</Text>
                            <Slider marks={priceMarks} disabled={true}></Slider>
                            <Text style={categoryTextStyle}>Innovative</Text>
                            <Slider marks={innovativeMarks} disabled={true}></Slider>
                            <Text style={categoryTextStyle}>Quality</Text>
                            <Slider marks={qualityMarks} disabled={true}></Slider>
                            <Text style={categoryTextStyle}>Differentiation</Text>
                            <Slider marks={differentiationMarks} disabled={true}></Slider>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <Divider />
                        <Space style={{ display: 'flex', float: 'right' }}>
                            <Button size="large" style={{ ...buttonStyle }}
                                onClick={this.discardChanges.bind(this)}>
                                Discard
                            </Button>
                            <Button size="large" type={'primary'} style={{ ...buttonStyle }} onClick={this.saveChanges.bind(this)}>Save</Button>
                        </Space>
                    </Col>
                </Row>
            </>
        );
    }
}


export default NewProduct;