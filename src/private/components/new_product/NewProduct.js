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
    state = {
        title: '',
        product_type: '',
        description: '',
        price_level: '',
        selected_additional_income_sources: [],
        product_features: [],
        differentiation_level: '',
        innovative_level: '',
        quality_level: ''
    }

    onBackClick() {
        this.props.history.push(`/value-propositions`);
    }

    onCompleteChange() {
    }

    discardChanges = () => {
        this.props.history.push(`/value-propositions`);
    };

    saveChanges = () => {
        const postObj = {
            ...this.props.product,
            "innovative_level": this.props.productFeatures.innovative[this.props.product.innovative_level_index].id,
            "quality_level": this.props.productFeatures.quality[this.props.product.quality_level_index].id,
            "differentiation_level": this.props.productFeatures.differentiation[this.props.product.differentiation_level_index].id,
            "business_plan_id": this.props.businessPlan.id
        };
        console.log(postObj)
        this.props.saveProduct(postObj, () => {
            this.props.history.push(`/value-propositions`);
        });
    };

    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.sort();
        b = b.sort();
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    getUpdatesWindowState() {
        const original = this.state;
        const modified = this.props.product;

        if (original === null) {
            return 'hidden';
        }

        if (original.title !== modified.title) {
            console.log(original)
            console.log(modified)
            console.log('visible')
            return 'visible';
        }

        if (original.description !== modified.description) {
            return 'visible';
        }

        if (original.product_type !== modified.product_type) {
            return 'visible';
        }

        if (original.price_level !== modified.price_level) {
            return 'visible';
        }

        if (this.arraysEqual(original.selected_additional_income_sources, modified.selected_additional_income_sources) === false) {
            return 'visible';
        }

        if (this.arraysEqual(original.product_features, modified.product_features) === false) {
            return 'visible';
        }

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
    getInnovativeSliderDefaultValue() {
        const index = this.props.product.innovative_level_index;
        const k = 100 / (this.props.productFeatures.innovative.length - 1);
        return index * k;
    }
    getQualitySliderDefaultValue() {
        const index = this.props.product.quality_level_index;
        const k = 100 / (this.props.productFeatures.quality.length - 1);
        return index * k;
    }
    getDifferentiationSliderDefaultValue() {
        const index = this.props.product.differentiation_level_index;
        const k = 100 / (this.props.productFeatures.differentiation.length - 1);
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
                            <Slider marks={innovativeMarks} disabled={true} included={true} step={null} value={this.getInnovativeSliderDefaultValue()}></Slider>
                            <Text style={categoryTextStyle}>Quality</Text>
                            <Slider marks={qualityMarks} disabled={true} included={true} step={null} value={this.getQualitySliderDefaultValue()}></Slider>
                            <Text style={categoryTextStyle}>Differentiation</Text>
                            <Slider marks={differentiationMarks} included={true} step={null} disabled={true} value={this.getDifferentiationSliderDefaultValue()}></Slider>
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