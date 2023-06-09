import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Breadcrumb, Row, Col, Typography, Switch, Space, Result, Image, Table, Tooltip } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle } from '../../styles/customStyles';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProduct, getProducts, deleteProduct, saveState, getValuePropositionAIPredict } from "../../appStore/actions/productActions";
import EditProduct from "../components/new_product/EditProduct";
import '../../css/customTable.css';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import TooltipComponent from "../components/Tooltip";
import { logout } from '../../appStore/actions/authenticationActions';
import Cookies from 'js-cookie';
import MD5 from 'crypto-js/md5';

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    color: "#8C8C8C",
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


class ValuePropositions extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedProduct: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onCompleteChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    addKeyProduct = () => {
        this.props.history.push(`/new-product`);
        const postObj = {
            "location": 'plan::valueProposition::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getValuePropositionAIPredict(postObj);
    }

    deleteItem = (item) => {
        this.props.deleteProduct(item.id);
    }

    onEditItem = (item) => {
        const postObj = {
            "location": `plan::valueProposition::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getValuePropositionAIPredict(postObj);
        this.setState({
            selectedProduct: item.id
        });
        localStorage.setItem('product-id', item.id);
        let linkHash = MD5(item.id).toString();
        this.props.history.push(`/value-propositions/${linkHash}`);
    }

    componentDidMount() {
        
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getProducts(this.props.businessPlan.id);
                        this.props.getTooltips();
                    });
    
                }
            } else {
                this.props.getProducts(this.props.businessPlan.id);
            }
        }else{
            this.props.logout()
            this.props.history.push('/')
        }
        
    }

    render() {
        const valuePropositionsColumns = [
            {
                title: 'Product name',
                dataIndex: 'name',
                key: 'name',
                width: '16.67%',
            },
            {
                title: 'Product type',
                dataIndex: 'product_type',
                key: 'product_type',
                width: '16.67%',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '16.67%',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: '16.67%',
            },
            {
                title: "",
                dataIndex: 'action',
                key: 'action',
                width: '33,33%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditItem.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={() => this.deleteItem(record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const data = this.props.products.products;
        const keyProductsCount = data.length;

        // if (this.state.selectedProduct !== null) {
        //     return (
        //         <EditProduct onBack={() => this.setState({ selectedProduct: null })} productId={this.state.selectedProduct} onClose={() => this.setState({ selectedProduct: null })} />
        //     );
        // } else {
            return (
                <>
                    <Col span={20} offset={2}>
                        <Breadcrumb style={{ marginTop: "40px" }}>
                            <Breadcrumb.Item>
                                <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Value propositions
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

                    <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                        <Col span={12} offset={2}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Value propositions</Text>
                                <TooltipComponent code="vp1" type="title"/>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                                <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed </Text><Switch checked={this.props.products.is_proposition_completed} onClick={this.onCompleteChange.bind(this)} />
                                <Button style={{ ...buttonStyle, marginLeft: "32px" }} disabled={keyProductsCount >= 3 ? true : false} size="large" type="primary" onClick={this.addKeyProduct.bind(this)}>Add key product</Button>
                            </div>
                        </Col>
                    </Row>

                    <Col span={20} offset={2}>
                        {keyProductsCount === 0 ?
                            (
                                <Row style={{ marginBottom: "50px" }} justify="center">
                                    <Col span={13} >
                                        <Result
                                            icon={
                                                <Image
                                                    preview={false}
                                                    width={226}
                                                    src="image.png"
                                                />}
                                            title={
                                                <>
                                                    <Text>Add Key Products</Text><br />
                                                    <Text style={infoTextStyle}>Please add here few (maximum 3) most important products, with which your business will provide value to the customer. Product can be physical good or service.</Text>
                                                </>
                                            }
                                            extra={<Button style={{ ...buttonStyle }} size="large" type="primary" onClick={this.addKeyProduct.bind(this)}>Add key product</Button>}
                                        />
                                    </Col>
                                </Row>
                            ) :
                            (
                                <Row style={{ marginBottom: "50px" }} justify="center">
                                    <Col span={24} >
                                        <Table
                                            dataSource={data}
                                            columns={valuePropositionsColumns}
                                            pagination={false}
                                            footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Maximum products: {keyProductsCount}/3 <TooltipComponent code="vp2" type="text"/></Text></Space>)}
                                        />
                                    </Col>
                                </Row>
                            )}
                    </Col>
                </>
            );
        // }
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        products: state.products
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, refreshPlan, getProducts, deleteProduct, saveState, logout, getValuePropositionAIPredict, getProduct, getTooltips})(ValuePropositions);