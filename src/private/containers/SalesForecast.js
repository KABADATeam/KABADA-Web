import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState } from '../../appStore/actions/salesForecastActions';
import { getCountryVat } from '../../appStore/actions/vatsActions';
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import SalesForecastTable from '../components/sales_Forecast/SalesForecastTable';
import SalesForecastSelect from '../components/sales_Forecast/SalesForecastSelect';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import '../../css/SalesForecast.css'

function SalesForecast() {

    const { Text } = Typography;
    const { TabPane } = Tabs;

    const { Option } = Select;

    const [readyMonth, setReadyMonth] = useState("12th mo");
    const [exportPlan, setEportPlan] = useState(true);
    const [tabKey, setTabKey] = useState("");
    const [vty, setVyt] = useState("");
    const [isVisibleHeader, setIsVisibleHeader] = useState("hidden");
    const [totalinEu, setTotalInEu] = useState("0");
    const [totalOutEu, setTotalOutEu] = useState("0");
    const [inEuData, setInEuData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [outEuData, setoutEuData] = useState([]);



    const inEuChange = (text, record, inputName) => {

        console.log(text, record.id)
        const array = inEuData;
        array.forEach(element => {
            if (element.id === record.id) {
                if (inputName === 'withoutVAT') {
                    element.withoutVAT = text;
                    element.total = element.withoutVAT * element.Qty;
                    setTotalInEu(element.total)

                }
                if (inputName === 'Qty') {
                    element.Qty = text;
                    element.total = element.withoutVAT * element.Qty;
                    setTotalInEu(element.total)
                }
                if (inputName === 'vat') {
                    element.vat = text;
                }
                if (inputName === 'paid') {
                    element.paid = text;
                }
            }
        })

        setInEuData(array);
        getUpdatesWindowState();


    }


    const outEuChange = (text, record, inputName) => {

        console.log(text, record.id)
        const array = outEuData;
        array.forEach(element => {
            if (element.id === record.id) {
                if (inputName === 'withoutVAT') {
                    element.withoutVAT = text;
                    element.total = element.withoutVAT * element.Qty;
                    setTotalOutEu(element.total);

                }
                if (inputName === 'Qty') {
                    element.Qty = text;
                    element.total = element.withoutVAT * element.Qty;
                    setTotalOutEu(element.total);

                }
                if (inputName === 'vat') {
                    element.vat = text;
                }
                if (inputName === 'paid') {
                    element.paid = text;
                }
            }
        })

        setoutEuData(array);
        getUpdatesWindowState();
        console.log(outEuData)
    }




    const dataSourceTableInEu = [
        {
            id: 1,
            month: 1,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {

            id: 2,
            month: 2,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 3,
            month: 3,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {

            id: 4,
            month: 4,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 5,
            month: 5,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 6,
            month: 6,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {

            id: 7,
            month: 7,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 8,
            month: 8,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 9,
            month: 9,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 10,
            month: 10,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 11,
            month: 11,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            id: 12,
            month: 12,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            vat: 21 + '%',
            paid: 'Immediate',
        },

    ];
    const dataSourceTableOutEu = [
        {
            id: 1,
            month: 1,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 2,
            month: 2,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 3,
            month: 3,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 4,
            month: 4,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 5,
            month: 5,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 6,
            month: 6,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 7,
            month: 7,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 8,
            month: 8,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 9,
            month: 9,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 10,
            month: 10,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 11,
            month: 11,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 12,
            month: 12,
            withoutVAT: 0,
            Qty: 0,
            total: 0,
            paid: 'Immediate',
        },

    ];


    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
            render: (text, record, index) =>
                <Text disabled={isDisabled(record.id)} >{record.month}</Text>

        },
        {
            title: 'Euro/pc without VAT',
            dataIndex: 'withoutVAT',
            key: 'withoutVAT',
            width: '5%',
            render: (text, record, index) => (
                <InputNumber disabled={isDisabled(record.id)} defaultValue={text === null ? 0 : text} onChange={(e) => inEuChange(e, record, 'withoutVAT')} />
            ),
        },
        {
            title: 'Qty',
            dataIndex: 'Qty',
            key: 'Qty',
            width: '5%',
            render: (text, record, index) =>
                <InputNumber disabled={isDisabled(record.id)} defaultValue={text === null ? 0 : text} onChange={(e) => inEuChange(e, record, 'Qty')} />,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '5%',
            render: (text, record, index) =>
                <Text disabled={isDisabled(record.id)}>{record.total}</Text>
        },
        {
            title: 'VAT Rate',
            dataIndex: 'vat',
            width: '10%',
            render: (text, record, index) => (
                <Select defaultValue={text === null ? 'Null' : text} onChange={e => inEuChange(e, record, "vat")}>
                    <Option value={countryVats.standardRate}>{countryVats.standardRate + "%"}</Option>
                    <Option value={countryVats.reducedRates2}>{countryVats.reducedRates2 + "%"}</Option>
                    <Option value={countryVats.reducedRates1}>{countryVats.reducedRates1 + "%"}</Option>
                    <Option value={countryVats.superReducedRate}>{countryVats.superReducedRate === null ? "Null" : countryVats.superReducedRate}</Option>
                </Select>
            )
        },
        // {
        //     title: 'VAT',
        //     dataIndex: 'vat',
        //     key: 'vat',
        //     width: '15%',
        //     render: (text, record) => (
        //         <Input.Group compact >
        //             <Select defaultValue={text === null ? 0 : text} onChange={(e) => inEuChange(e, record, 'vat')} disabled={isDisabled(record.id)}>
        //                 <Option value="21">21 %</Option>
        //                 <Option value="30">30 %</Option>
        //                 <Option value="40">40 %</Option>
        //             </Select>
        //         </Input.Group>
        //     )
        // },
        {
            title: 'When paid',
            dataIndex: 'paid',
            key: 'paid',
            width: '10%',
            render: (text, record) => (
                <Input.Group compact>
                    <Select defaultValue={text === null ? 0 : text} onChange={(e) => inEuChange(e, record, 'paid')} disabled={isDisabled(record.id)}>
                        <Option value="Immediate">Immediate</Option>
                        <Option value="Next month">Next month</Option>
                        <Option value="After two months">After two months</Option>
                        <Option value="After three months ">After three months</Option>
                        <Option value="One month  in advance">One month in advance</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];
    const columnsOutEU = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
            render: (text, record, index) =>
                <Text disabled={isDisabled(record.id)} >{record.month}</Text>

        },
        {
            title: 'Euro/pc without VAT',
            dataIndex: 'withoutVAT',
            key: 'withoutVAT',
            width: '5%',
            render: (text, record, index) => (
                <InputNumber disabled={isDisabled(record.id)} defaultValue={text === null ? 0 : text} onChange={(e) => outEuChange(e, record, 'withoutVAT')} />
            ),
        },
        {
            title: 'Qty',
            dataIndex: 'Qty',
            key: 'Qty',
            width: '5%',
            render: (text, record, index) =>
                <InputNumber disabled={isDisabled(record.id)} defaultValue={text === null ? 0 : text} onChange={(e) => outEuChange(e, record, 'Qty')} />,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '5%',
            render: (text, record, index) =>
                <Text disabled={isDisabled(record.id)} > {outEuData[index].total} </Text>,
        },
        {
            title: 'When paid',
            dataIndex: 'paid',
            key: 'paid',
            width: '10%',
            render: (text, record) => (
                <Input.Group compact>
                    <Select defaultValue={text === null ? 0 : text} onChange={(e) => outEuChange(e, record, 'paid')} disabled={isDisabled(record.id)} >
                        <Option value="Immediate">Immediate</Option>
                        <Option value="Next month">Next month</Option>
                        <Option value="After two months">After two months</Option>
                        <Option value="After three months ">After three months</Option>
                        <Option value="One month  in advance">One month in advance</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];
    const dataSourceMonth = [
        {
            key: '1',
            name: "1st mo.",
            value: "1"
        }, {
            key: '2',
            name: '2nd mo.',
            value: "2"
        }, {
            key: '3',
            name: '3rd mo.',
            value: "3"
        }, {
            key: '4',
            name: '4th mo.',
            value: "4"
        }, {
            key: '5',
            name: "5th mo.",
            value: "5"
        }, {
            key: '6',
            name: '6th mo.',
            value: "6"
        }, {
            key: '7',
            name: '7th mo.',
            value: "7"
        }, {
            key: '8',
            name: '8th mo.',
            value: "8"
        }, {
            key: '9',
            name: '9th mo.',
            value: "9"
        }, {
            key: '10',
            name: '10th mo.',
            value: "10"
        }, {
            key: '11',
            name: '11th mo.',
            value: "11"
        }, {
            key: '12',
            name: '12th mo.',
            value: "12"
        },

    ];

    const dataSourceExport = [
        {
            key: '1',
            name: 'Yes',
            value: true
        }, {
            key: '2',
            name: 'No',
            value: false,
        }

    ];

    const businessPlan = useSelector((state) => state.selectedBusinessPlan)
    const country = useSelector((state) => state.countryShortCode)
    const countryVats = useSelector((state) => state.countryVats)
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
                    dispatch(getCountryShortCode(businessPlan.id), () => {
                        dispatch(getCountryVat('LT', () => {
                            console.log(JSON.stringify(countryVats))
                            setVyt(countryVats);
                        }));
                    })
                });
            }
        } else {
            dispatch(getProducts(businessPlan.id));
            dispatch(getCountryShortCode(businessPlan.id), () => {
                dispatch(getCountryVat('LT', () => {
                    console.log(JSON.stringify(countryVats))
                    setVyt(countryVats);
                }));
                console.log(JSON.stringify(countryVats))

            })

            console.log(businessPlan.id);
            console.log(JSON.stringify(countryVats))
            setInEuData(dataSourceTableInEu);
            setoutEuData(dataSourceTableOutEu);


        }
    }, [dispatch, busineessPlanId, businessPlan, history, country.countryShortCode, countryVats]);



    const onBackClick = () => {
        history.push(`/overview`)
    }
    const handelname = (value) => {
        console.log("selected value " + value);
        setReadyMonth(value);
        console.log(readyMonth);

        const array = []
        //loop through array. loop while index is not greater that provided value. add id's to array
        dataSourceTableInEu.map((obj, index) => {
            if (index >= value - 1) {
                array.push(obj.id)
                console.log(obj.id)
            }
        });

        setChecked(array);
    }


    const isDisabled = (id) => {
        return (
            checked.length > 0 && checked.indexOf(id) === -1
        );
    };


    let originalExportPlan = false;

    const getUpdatesWindowState = () => {
        const original = dataSourceTableInEu;
        const modified = inEuData;



        if (JSON.stringify(original) !== JSON.stringify(modified) || JSON.stringify(dataSourceTableOutEu) !== JSON.stringify(outEuData)) {
            setIsVisibleHeader('visible')
        } else {
            setIsVisibleHeader('hidden')
        }
        if (exportPlan !== originalExportPlan) {
            setIsVisibleHeader('visible')
        } else {
            setIsVisibleHeader('hidden')
        }


    }
    const changePlan = (id, e) => {
        dispatch(changState(id))
        setEportPlan(e);
        getUpdatesWindowState();
        console.log(vty)
    }

    const saveChanges = () => {
        console.log(exportPlan);
        console.log(readyMonth);
        console.log(inEuData);
        console.log(outEuData);

    }

    const getKey = (key) => {
        console.log(key);
        setTabKey(key);
    }
    return (

        <Row align="middle">
            <UnsavedChangesHeader
                visibility={isVisibleHeader}
                saveChanges={saveChanges}
            />
            <h1>{country.countryShortCode} ff</h1>
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
                            <Text className="titleTextStyle" >Sales forecast</Text>
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
                                                        <SalesForecastSelect defaultValue={readyMonth} onChange={handelname} dataSource={dataSourceMonth} />

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
                                                        <SalesForecastSelect defaultValue={x.Expoted === true ? "yes" : "No"} dataSource={dataSourceExport} onChange={(e) => changePlan(x.id, e)} />
                                                    </Input.Group>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>



                                <Row align="middle" className="margin-top-20px">
                                    <Col span={12} offset={8} >
                                        <SalesForecastTable columns={columns} dataSource={dataSourceTableInEu} />
                                    </Col>

                                </Row>

                                <Row align="middle" className={`margin-top-20px ${x.Expoted === false ? `display-none` : ``}`} >
                                    <Col span={12} offset={8} >
                                        <SalesForecastTable columns={columnsOutEU} dataSource={dataSourceTableOutEu} />
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
