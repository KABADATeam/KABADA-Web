import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Breadcrumb, Row, Col, Typography, Space, Card, Divider, Slider } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, } from '@ant-design/icons';
import UnsavedChangesHeader from '../UnsavedChangesHeader';
import '../../../css/customTable.css';
import { cardStyle, tableCardBodyStyle, buttonStyle } from '../../../styles/customStyles';
import ProductInfoComponent from './ProductInfoComponent';
import PriceLevelComponent from './PriceLevelComponent';
import ProductFeaturesComponent from './ProductFeaturesComponent';
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getProductTypes, getProductPriceLevels, getAditionalIncomeSources, getProductFeatures, saveProduct, getInnovativeLevels, getQualityLevels, getDifferentiationLevels } from "../../../appStore/actions/productActions";

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
        const postObj = {
            ...this.props.product,
            "innovative_level": this.props.productFeatures.innovative[0].id,
            "quality_level": this.props.productFeatures.quality[0].id,
            "differentiation_level": this.props.productFeatures.differentiation[0].id,
            "business_plan_id": this.props.businessPlan.id
        };

        this.props.saveProduct(postObj, () => {
            this.props.history.push(`/value-propositions`);
        });
    };

    getUpdatesWindowState() {
        return 'hidden';
    }

    getSliderMarks(array) {
        const k = 100 / (array.length - 1);
        const tmp = array.map((item, i) => {
            return {
                [i * k]: {
                    style: { ...sliderTextStyle },
                    label: item.title
                }
            };
        });
        const temp = {};
        for (let i = 0; i < tmp.length; i++) {
            const key = Object.keys(tmp[i])[0]
            const value = tmp[i][key];
            temp[key] = value;
        }
        return temp;
    }

    getPriceSliderDefaultValue() {
        const index = this.props.productFeatures.priceLevels.findIndex(x => x.id === this.props.product.price_level);
        const k = 100 / (this.props.productFeatures.priceLevels.length - 1);
        return index * k;
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getProductTypes();
                    this.props.getProductPriceLevels();
                    this.props.getAditionalIncomeSources();
                    this.props.getProductFeatures();
                    this.props.getInnovativeLevels();
                    this.props.getQualityLevels();
                    this.props.getDifferentiationLevels();
                });
            }
        } else {
            this.props.getProductTypes();
            this.props.getProductPriceLevels();
            this.props.getAditionalIncomeSources();
            this.props.getProductFeatures();
            this.props.getInnovativeLevels();
            this.props.getQualityLevels();
            this.props.getDifferentiationLevels();
        }
    }

    render() {
        //console.log(this.props.product);
        //console.log(this.props.productFeatures);
        const isVisibleHeader = this.getUpdatesWindowState();
        const differentiationMarks = this.getSliderMarks(this.props.productFeatures.differentiation);
        const priceMarks = this.getSliderMarks(this.props.productFeatures.priceLevels);
        const qualityMarks = this.getSliderMarks(this.props.productFeatures.quality);
        const innovativeMarks = this.getSliderMarks(this.props.productFeatures.innovative);

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
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
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
                            <Slider marks={priceMarks} disabled={true} included={true} step={null} value={this.getPriceSliderDefaultValue()}></Slider>
                            <Text style={categoryTextStyle}>Innovative</Text>
                            <Slider marks={innovativeMarks} disabled={true} included={true} step={null} defaultValue={0}></Slider>
                            <Text style={categoryTextStyle}>Quality</Text>
                            <Slider marks={qualityMarks} disabled={true} included={true} step={null} defaultValue={0}></Slider>
                            <Text style={categoryTextStyle}>Differentiation</Text>
                            <Slider marks={differentiationMarks} included={true} step={null} disabled={true} defaultValue={0}></Slider>
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

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        product: state.product,
        productFeatures: state.productFeaturesLevels
    };
}

export default connect(
    mapStateToProps,
    { 
        getProductTypes, 
        getProductPriceLevels, 
        refreshPlan, 
        getAditionalIncomeSources, 
        getProductFeatures, 
        saveProduct, 
        getInnovativeLevels,
        getQualityLevels,
        getDifferentiationLevels
    })(NewProduct);