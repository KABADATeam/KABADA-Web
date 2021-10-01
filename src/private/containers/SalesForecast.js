import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts } from '../../appStore/actions/salesForecastActions';
import '../../css/SalesForecast.css'

function SalesForecast() {

    const { Text } = Typography;
    const { TabPane } = Tabs;

    const { Option } = Select;

    const dataSource = [
        {
            key: '1',
            month: 1,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '2',
            month: 2,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '3',
            month: 3,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '4',
            month: 4,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '5',
            month: 5,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '6',
            month: 6,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '7',
            month: 7,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '8',
            month: 8,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '9',
            month: 9,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '10',
            month: 10,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '11',
            month: 11,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '12',
            month: 12,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        },

    ];

    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',


        },
        {
            title: 'Euro/pc without VAT',
            dataIndex: 'withoutVAT',
            key: 'withoutVAT',
            width: '5%',
            render: text => <input style={{ width: '87px' }} placeholder={text} />,
        },
        {
            title: 'Qty',
            dataIndex: 'Qty',
            key: 'Qty',
            width: '5%',
            render: text => <input style={{ width: '87px' }} placeholder={text} />,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '5%',
        },
        {
            title: 'VAT',
            dataIndex: 'vat',
            key: 'vat',
            width: '10%',
            render: () => (
                <Input.Group compact>
                    <Select defaultValue="21%">
                        <Option value="21">21 %</Option>
                        <Option value="30">30 %</Option>
                        <Option value="40">40 %</Option>
                    </Select>
                </Input.Group>
            )
        },
        {
            title: 'When paid',
            dataIndex: 'paid',
            key: 'paid',
            width: '10%',
            render: () => (
                <Input.Group compact>
                    <Select defaultValue="Immediate">
                        <Option value="Immediate">Immediate</Option>
                        <Option value="Later">Later</Option>
                        <Option value="Immediate1">Immediate</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];


    const titleTextStyle = {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "30px",
        lineHeight: "38px"
    }

    const aboutTitleTextStyle = {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '28px',
        marginBottom: '16px',
    }

    const textStyle = {
        fontSize: '14px',
        color: '#8C8C8C',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '22px',
        marginRight: '40px',
    }

    const titleButtonStyle = {
        width: "40px",
        height: "40px",
        border: "1px solid #BFBFBF",
        boxSizing: "border-box",
        filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
        borderRadius: "4px",
        backgroundColor: "transparent",
    }
        ;

    const businessPlan = useSelector((state) => state.selectedBusinessPlan)
    const { id: busineessPlanId } = businessPlan;
    const product = useSelector(state => state.salesForecast)

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        if (busineessPlanId === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                history.push(`/`);
            } else {
                dispatch(refreshPlan(localStorage.getItem("plan")), () => {
                    dispatch(getProducts(businessPlan.id));
                });
            }
        } else {
            dispatch(getProducts(businessPlan.id));
            console.log(businessPlan.id + "test")

        }
    }, [dispatch, busineessPlanId, businessPlan, history]);

    const onBackClick = () => {
        history.push(`/overview`)
    }

    return (
        <Row align="middle">
            <Col span={20} offset={2}>
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/overview'>{businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space>Sales Forecast</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Sales Forecust</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch />
                        </div>

                    </Col>
                </Row>

                <Tabs defaultActiveKey="1" >
                    {product.products.map(x => (
                        <>
                            <TabPane tab={x.name} key={x.id}>
                                <Row align="middle" style={{ marginTop: "9px" }}>
                                    <Col span={6}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>{x.name}</Typography.Title>
                                            <Typography.Text style={{ ...textStyle }}>
                                                Product description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

                                                You can add products at Value proposition
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12} offset={2} >
                                        <Card style={{ borderRadius: "15px", height: "72px" }}  >
                                            <Row>

                                                <Col span={9}><p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: "600" }}>When Ready?</p></Col>
                                                <Col span={3} offset={12}>


                                                    <Input.Group compact style={{ width: "94px", marginTop: "-8px" }}>
                                                        <Select defaultValue="Option1">
                                                            <Option value="Option1">1st Mo.</Option>
                                                            <Option value="Option2">2st Mo.</Option>
                                                        </Select>

                                                    </Input.Group>
                                                </Col>
                                            </Row>
                                        </Card>

                                    </Col>
                                </Row>

                                <Row align="middle" style={{ marginTop: "-25px" }}>
                                    <Col span={12} offset={8} >
                                        <Card style={{ borderRadius: "15px", height: "72px" }}  >
                                            <Row>
                                                <Col span={9}><p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: "600", }}>Do you have plan to export?</p></Col>
                                                <Col span={3} offset={12}>


                                                    <Input.Group compact style={{ width: "94px", height: "10px", marginTop: "-8px" }}>
                                                        <Select defaultValue="Option1">
                                                            <Option value="Option1">Yes</Option>
                                                            <Option value="Option2">NO</Option>
                                                        </Select>

                                                    </Input.Group>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row align="middle" style={{ marginTop: "20px" }}>
                                    <Col span={12} offset={8} >

                                        <Table title={() => 'Sales forecast in EU'} columns={columns} dataSource={dataSource} pagination={false} />
                                    </Col>
                                </Row>

                                <Row align="middle" style={{ marginTop: "20px" }}>
                                    <Col span={12} offset={8} >

                                        <Table title={() => 'Sales forecast outside EU'} columns={columns} dataSource={dataSource} pagination={false} />
                                    </Col>
                                </Row>


                            </TabPane>
                        </>
                    ))}
                </Tabs>


            </Col>
        </Row >
    )
}

export default SalesForecast
