import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState } from '../../appStore/actions/salesForecastActions';
import SalesForecastInEUTable from '../components/sales_Forecast/SalesForecastInEUTable';
import SalesForecastOutsideEUTable from '../components/sales_Forecast/SalesForecastOutsideEUTable';
import SalesForecastSelect from '../components/sales_Forecast/SalesForecastSelect';
import '../../css/SalesForecast.css'

function SalesForecast() {

    const { Text } = Typography;
    const { TabPane } = Tabs;

    const { Option } = Select;

    const [readyMonth, setReadyMonth] = useState("12th mo");
    const [tabKey, setTabKey] = useState("");

    const dataSource = [
        {
            key: '1',
            month: "1st mo."
        }, {
            key: '2',
            month: '2nd mo.',
        }, {
            key: '3',
            month: '3rd mo.',
        }, {
            key: '4',
            month: '4th mo.',
        }, {
            key: '5',
            month: "5th mo.",
        }, {
            key: '6',
            month: '6th mo.',
        }, {
            key: '7',
            month: '7th mo.',
        }, {
            key: '8',
            month: '8th mo.',
        }, {
            key: '9',
            month: '9th mo.',
        }, {
            key: '10',
            month: '10th mo.',
        }, {
            key: '11',
            month: '11th mo.',
        }, {
            key: '12',
            month: '12th mo.',
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

        }
    }, [dispatch, busineessPlanId, businessPlan, history]);

    const onBackClick = () => {
        history.push(`/overview`)
    }
    const handelMonth = (value) => {
        console.log("selected value " + value);
        if (value == 5) {
            console.log("working")

        } else {
            console.log("Not")
        }

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
                                                        <SalesForecastSelect defaultValue={readyMonth} onChange={handelMonth} />
                                                        {/* <Select style={{ width: '100px' }} defaultValue={readyMonth} onChange={handelMonth}>
                                                            {dataSource.map(x => (
                                                                <option key={x.key} value={x.key}>{x.month}</option>
                                                            ))}

                                                        </Select> */}

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
                                                        <Select defaultValue={x.Expoted === true ? "yes" : "No"} onChange={() => changePlan(x.id)}  >
                                                            <Option value="yes" >Yes</Option>
                                                            <Option value="no" >NO</Option>
                                                        </Select>
                                                    </Input.Group>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>



                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >
                                        <SalesForecastInEUTable />
                                    </Col>

                                </Row>

                                <Row align="middle" className={`margin-top-20px ${x.Expoted === false ? `display-none` : ``}`} >
                                    <Col span={12} offset={8} >
                                        <SalesForecastOutsideEUTable />
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
