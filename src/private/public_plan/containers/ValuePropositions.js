import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Breadcrumb, Row, Col, Typography, Space, Result, Image, Table } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle } from '../../../styles/customStyles';
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getProducts, deleteProduct, saveState } from "../../../appStore/actions/productActions";
//import EditProduct from "../../components/new_product/EditProduct";
import EditProduct from "../components/EditProduct";
import '../../../css/customTable.css';
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";

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


class PublicValuePropositions extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedProduct: null
        };
    }

    onBackClick() {
        this.props.history.push(`/public/overview`);
    }

    onCompleteChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    addKeyProduct = () => {
        this.props.history.push(`/new-product`);
    }

    deleteItem = (item) => {
        this.props.deleteProduct(item.id);
    }

    onEditItem = (item) => {
        this.setState({
            selectedProduct: item.id
        });
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("public_plan"), () => {
                    this.props.getProducts(this.props.businessPlan.id);
                });

            }
        } else {
            this.props.getProducts(this.props.businessPlan.id);
        }
    }

    render() {
        const valuePropositionsColumns = [
            {
                title: 'Product name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
            },
            {
                title: 'Product type',
                dataIndex: 'product_type',
                key: 'product_type',
                width: '20%',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '20%',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: '20%',
            },
            {
                title: "",
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditItem.bind(this, record)} >View</Button>
                        {/* <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.deleteItem.bind(this, record)} ><DeleteOutlined /></Button> */}
                    </Space>
                ),
            }
        ];

        const data = this.props.products.products;
        const keyProductsCount = data.length;

        if (this.state.selectedProduct !== null) {
            return (
                <EditProduct onBack={() => this.setState({ selectedProduct: null })} productId={this.state.selectedProduct} onClose={() => this.setState({ selectedProduct: null })} />
            );
        } else {
            return (
                <>
                    <Col span={16} offset={4}>
                        <Breadcrumb style={{ marginTop: "40px" }}>
                            <Breadcrumb.Item>
                                <Space><Link to='/public-business-plans'>Public Business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Value propositions
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

                    <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                        <Col span={10} offset={4}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Value propositions</Text>
                                <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                            </div>
                        </Col>
                        {/* <Col span={6}>
                            {<div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                                <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed </Text><Switch checked={this.props.products.is_proposition_completed} onClick={this.onCompleteChange.bind(this)} />
                                <Button style={{ ...buttonStyle, marginLeft: "32px" }} disabled={keyProductsCount >= 3 ? true : false} size="large" type="primary" onClick={this.addKeyProduct.bind(this)}>Add key product</Button>
                            </div>}
                        </Col> */}
                    </Row>

                    <Col span={16} offset={4}>
                        {keyProductsCount === 0 ?
                            (
                                <Row style={{ marginBottom: "50px" }} justify="center">
                                    <Col span={13} >
                                        <Result
                                            icon={
                                                <Image
                                                    width={226}
                                                    src="image.png"
                                                    preview={false}
                                                />}
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
                                            footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Maximum products: {keyProductsCount}/3 <InfoCircleFilled style={{ fontSize: '16px', color: '#BFBFBF', marginLeft: '5px' }} /></Text></Space>)}
                                        />
                                    </Col>
                                </Row>
                            )}
                    </Col>
                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        products: state.products
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, refreshPlan, getProducts, deleteProduct, saveState })(PublicValuePropositions);