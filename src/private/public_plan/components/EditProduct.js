import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Breadcrumb, Row, Col, Typography, Space, Card, Divider, Slider } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, } from '@ant-design/icons';
//import UnsavedChangesHeader from '../UnsavedChangesHeader';
import UnsavedChangesHeader from '../../public_plan/components/UnsavedChangesHeader';
import '../../../css/customTable.css';
import { cardStyle, tableCardBodyStyle, buttonStyle } from '../../../styles/customStyles';
import EditProductInfoComponent from './EditProductInfoComponent';
import EditPriceLevelComponent from './EditPriceLevelComponent';
import EditProductFeaturesComponent from './EditProductFeaturesComponent';
import TooltipComponent from '../../components/Tooltip'
import { getProduct, getProductTypes, getProductPriceLevels, getAditionalIncomeSources, getProductFeatures, updateProduct, getInnovativeLevels, getQualityLevels, getDifferentiationLevels, discardChanges } from "../../../appStore/actions/productActions";

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


class EditProduct extends React.Component {

    state = {
        originalProduct: null
    }

    onBackClick() {
        this.props.onBack();
    }

    onCompleteChange() {
    }
    onCancel = () => {
        this.props.onClose();
    }

    discardChanges = () => {
        this.props.discardChanges(JSON.parse(JSON.stringify(this.state.originalProduct)));
    };

    saveChanges = () => {
        if (this.props.product.title !== '') {
            const postObj = {
                ...this.props.product,
                "id": this.props.productId,
                "innovative_level": this.props.productFeatures.innovative[0].id,
                "quality_level": this.props.productFeatures.quality[0].id,
                "differentiation_level": this.props.productFeatures.differentiation[0].id,
                "business_plan_id": this.props.businessPlan.id
            };

            this.props.updateProduct(postObj, () => {
                this.props.onClose();
            });
        }
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
        const original = this.state.originalProduct;
        const modified = this.props.product;

        if (original === null) {
            return 'hidden';
        }

        if (original.title !== modified.title) {
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
        const index = this.props.productFeatures.priceLevels.findIndex(x => x.id === this.props.product.price_level.price_id);
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
        this.props.getProduct(this.props.productId, (data) => {
            this.setState({
                originalProduct: JSON.parse(JSON.stringify(data))
            });
        });

        if (this.props.productTypes.length === 0) {
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
        const isVisibleHeader = this.getUpdatesWindowState();
        const differentiationMarks = this.getSliderMarks(this.props.productFeatures.differentiation);
        const priceMarks = this.getSliderMarks(this.props.productFeatures.priceLevels);
        const qualityMarks = this.getSliderMarks(this.props.productFeatures.quality);
        const innovativeMarks = this.getSliderMarks(this.props.productFeatures.innovative);

        return (
            <>

                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space style={{ cursor: "pointer" }} onClick={() => this.onBackClick()}>Value propositions</Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.product.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={10} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Edit Product</Text>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[0, 16]}>
                    <Col span={11} offset={4}>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <EditProductInfoComponent />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <EditPriceLevelComponent />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={23} >
                                <EditProductFeaturesComponent />
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
                            onClick={this.onCancel.bind(this)}>
                                Cancel
                            </Button>
                            {/* <Button size="large" type={'primary'} style={{ ...buttonStyle }} onClick={this.saveChanges.bind(this)}>Save</Button> */}
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
        productFeatures: state.productFeaturesLevels,
        productTypes: state.productTypes
    };
}

export default connect(mapStateToProps,
    { 
        getProduct,
        getProductTypes,
        getProductPriceLevels,
        getAditionalIncomeSources,
        getProductFeatures,
        updateProduct,
        getInnovativeLevels,
        getQualityLevels,
        getDifferentiationLevels,
        discardChanges
     })(EditProduct);