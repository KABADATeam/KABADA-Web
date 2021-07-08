import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Breadcrumb, Row, Col, Typography, Switch, Space, Result, Image, Table } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle } from '../../styles/customStyles';
import '../../css/customTable.css';

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

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onCompleteChange(state) {
    }

    saveChanges = () => {

    };

    addKeyProduct = () => {
        this.props.history.push(`/new-product`);
    }

    deleteItem = (item) => {

    }

    addNewItem = () => {
    }

    editItem = (item) => {

    }

    componentDidMount() {
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
                dataIndex: 'type',
                key: 'type',
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
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.editItem.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.deleteItem.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const data = [
            {
                key: 1,
                name: 'Colorful socks',
                type: 'Physical Good',
                price: 'Free',
                value: 'Premium'
            }
        ];

        const keyProductsCount = data.length;


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
                    <Col span={6}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed </Text><Switch onClick={this.onCompleteChange.bind(this)} />
                            <Button style={{ ...buttonStyle, marginLeft: "32px" }} size="large" type="primary" onClick={this.addKeyProduct.bind(this)}>Add key product</Button>
                        </div>
                    </Col>
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
                                                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                                            />}
                                        title={
                                            <>
                                                <Text>Add Key Products</Text><br />
                                                <Text style={infoTextStyle}>"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu"</Text>
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

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, {})(ValuePropositions);