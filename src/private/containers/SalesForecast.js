import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState } from '../../appStore/actions/salesForecastActions';
import SalesForecastTable from '../components/sales_Forecast/SalesForecastTable';
//import SalesForecastOutsideEUTable from '../components/sales_Forecast/SalesForecastOutsideEUTable';
import SalesForecastSelect from '../components/sales_Forecast/SalesForecastSelect';
import '../../css/SalesForecast.css'

function SalesForecast() {

    const { Text } = Typography;
    const { TabPane } = Tabs;

    const { Option } = Select;

    const [readyname, setReadyname] = useState("12th mo");
    const [tabKey, setTabKey] = useState("");
    const dataSource = [
        {
            key: '1',
            name: 1,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '2',
            name: 2,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '3',
            name: 3,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '4',
            name: 4,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '5',
            name: 5,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '6',
            name: 6,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '7',
            name: 7,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '8',
            name: 8,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '9',
            name: 9,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '10',
            name: 10,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '11',
            name: 11,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '12',
            name: 12,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        },

    ];

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',


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
                        <Option value="Next name">Next name</Option>
                        <Option value="After two names">After two names</Option>
                        <Option value="After three names">After three names</Option>
                        <Option value="One name in advance">One name in advance</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];
    const columnsOutEU = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',


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
            title: 'When paid',
            dataIndex: 'paid',
            key: 'paid',
            width: '10%',
            render: () => (
                <Input.Group compact>
                    <Select defaultValue="Immediate">
                        <Option value="Immediate">Immediate</Option>
                        <Option value="Next name">Next name</Option>
                        <Option value="After two names">After two names</Option>
                        <Option value="After three names">After three names</Option>
                        <Option value="One name in advance">One name in advance</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];
    const dataSourcename = [
        {
            key: '1',
            name: "1st mo.",
            value: "-1"
        }, {
            key: '2',
            name: '2nd mo.',
            value: "-2"
        }, {
            key: '3',
            name: '3rd mo.',
            value: "-3"
        }, {
            key: '4',
            name: '4th mo.',
            value: "-4"
        }, {
            key: '5',
            name: "5th mo.",
            value: "-5"
        }, {
            key: '6',
            name: '6th mo.',
            value: "-6"
        }, {
            key: '7',
            name: '7th mo.',
            value: "-7"
        }, {
            key: '8',
            name: '8th mo.',
            value: "-8"
        }, {
            key: '9',
            name: '9th mo.',
            value: "-9"
        }, {
            key: '10',
            name: '10th mo.',
            value: "-10"
        }, {
            key: '11',
            name: '11th mo.',
            value: "-11"
        }, {
            key: '12',
            name: '12th mo.',
            value: "-12"
        },

    ];

    const dataSourceExport = [
        {
            key: '1',
            name: 'Yes',
            value: "yes"
        }, {
            key: '2',
            name: 'No',
            value: 'no',
        }

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
            console.log(businessPlan.id);

        }
    }, [dispatch, busineessPlanId, businessPlan, history]);

    const onBackClick = () => {
        history.push(`/overview`)
    }
    const handelname = (value) => {
        console.log("selected value " + value);
        setReadyname(value);
        console.log(readyname)

    }
    const changePlan = (id) => {
        dispatch(changState(id))
    }

    const getKey = (key) => {
        console.log(key);
        setTabKey(key);
    }
    return (
        <Row align="middle">
            <Col span={20} offset={3}>
                <Col span={16} offset={0}>
                    <Breadcrumb className="margin-top-links">
                        <Breadcrumb.Item className="margin-top-links">
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="margin-top-links">
                            <Space><Link to='/overview'>{businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space>Sales forecast</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row className="margin-heading" align="middle">
                    <Col span={12} offset={0}>
                        <div className="button-style-heading-section">
                            <Button className="back-button-style" icon={<ArrowLeftOutlined />} onClick={() => onBackClick()}></Button>
                            <Text className="titleTextStyle" >Sales forecust</Text>
                        </div>
                    </Col>
                    <Col span={4} offset={6}>
                        <div className="button-style-heading-section">
                            <Text className="mark-as-completed-style">Mark as completed: </Text><Switch className="margin-left-8px" />
                        </div>

                    </Col>
                </Row>

                <Tabs defaultActiveKey={tabKey} onChange={getKey} >
                    {product.products.map((x) =>
                        <>
                            <TabPane tab={x.name} key={x.id} >
                                <Row className="margin-top-links about-Title-section-Style" align="middle">
                                    <Col span={6} >
                                        <div style={{ marginRight: '40px', position: "absolute" }}>
                                            <Typography.Title className="about-Title-heading-Style">{x.name}</Typography.Title>
                                            <Typography.Text className="text-Style">
                                                Product description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
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
                                                        <SalesForecastSelect defaultValue={readyname} onChange={handelname} dataSource={dataSourcename} />

                                                    </Input.Group>
                                                </Col>
                                            </Row>
                                        </Card>

                                    </Col>
                                </Row>
                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >
                                        <Card className="card-style-height-border-radius" >
                                            <Row>
                                                <Col span={9}><p className="card-style-font">Do you have plan to export?</p></Col>
                                                <Col span={3} offset={12}>
                                                    <Input.Group compact className="card-input-Group-style" >
                                                        <SalesForecastSelect defaultValue={x.Expoted === true ? "yes" : "No"} dataSource={dataSourceExport} onChange={() => changePlan(x.id)} />
                                                    </Input.Group>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>



                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >
                                        <SalesForecastTable columns={columns} dataSource={dataSource} />
                                    </Col>

                                </Row>

                                <Row align="middle" className={`margin-top-20px ${x.Expoted === false ? `display-none` : ``}`} >
                                    <Col span={12} offset={8} >
                                        <SalesForecastTable columns={columnsOutEU} dataSource={dataSource} />
                                    </Col>
                                </Row>


                            </TabPane>
                        </>

                    )}
                </Tabs>


            </Col>
        </Row >
    )
}

export default SalesForecast
