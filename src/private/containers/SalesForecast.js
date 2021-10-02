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
            render: text => <input className="input-in-table" placeholder={text} />,
        },
        {
            title: 'Qty',
            dataIndex: 'Qty',
            key: 'Qty',
            width: '5%',
            render: text => <input className="input-in-table" placeholder={text} />,
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
                    <Breadcrumb className="margin-top-links">
                        <Breadcrumb.Item className="margin-top-links">
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="margin-top-links">
                            <Space><Link to='/overview'>{businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space>Sales Forecast</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row className="margin-heading" align="middle">
                    <Col span={12} offset={4}>
                        <div className="button-style-heading-section">
                            <Button className="back-button-style" icon={<ArrowLeftOutlined />} onClick={() => onBackClick()}></Button>
                            <Text className="titleTextStyle" >Sales Forecust</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="button-style-heading-section">
                            <Text className="mark-as-completed-style">Mark as completed: </Text><Switch className="margin-left-8px" />
                        </div>

                    </Col>
                </Row>

                <Tabs defaultActiveKey="1" >
                    {product.products.map(x => (
                        <>
                            <TabPane tab={x.name} key={x.id}>
                                <Row className="margin-top-links about-Title-section-Style" align="middle">
                                    <Col span={6} >
                                        <div style={{ marginRight: '40px', position: "absolute" }}>
                                            <Typography.Title className="about-Title-heading-Style">{x.name}</Typography.Title>
                                            <Typography.Text className="text-Style">
                                                Product description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                                You can add products at Value proposition
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12} offset={2} className="margin-top-5px" >
                                        <Card className="card-style-height-border-radius"  >
                                            <Row>

                                                <Col span={9}><p className="card-style-font">When Ready?</p></Col>
                                                <Col span={3} offset={12}>

                                                    <Input.Group compact className="card-input-Group-style">
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
                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >
                                        <Card className="card-style-height-border-radius"  >
                                            <Row>
                                                <Col span={9}><p className="card-style-font">Do you have plan to export?</p></Col>
                                                <Col span={3} offset={12}>
                                                    <Input.Group compact className="card-input-Group-style">
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



                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >

                                        <Table title={() => 'Sales forecast in EU'} columns={columns} dataSource={dataSource} pagination={false} />
                                    </Col>
                                </Row>

                                <Row align="middle" className="margin-top-20px">
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
