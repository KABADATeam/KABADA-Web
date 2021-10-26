import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, InputNumber, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState, getProductByID, updateSalesForecast } from '../../appStore/actions/salesForecastActions';
import { getCountryVat } from '../../appStore/actions/vatsActions'
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import SalesForecastTable from '../components/sales_Forecast/SalesForecastTable';
import SalesForecastSelect from '../components/sales_Forecast/SalesForecastSelect';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import '../../css/SalesForecast.css'

const { Text } = Typography;
const { TabPane } = Tabs;

const { Option } = Select;
class SalesForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readyMonth: 1,
            exportPlan: true,
            totalinEu: 0,
            totalOutEu: 0,
            isVisibleHeader: 'hidden',
            tabKey: "",
            vty: {},
            inEuData: [],
            outEuData: [],
            checked: [],
            update: [],
        }
    }

    dataSourceTableInEu = [
        {
            id: 1,
            month: 1,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {

            id: 2,
            month: 2,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 3,
            month: 3,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {

            id: 4,
            month: 4,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 5,
            month: 5,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 6,
            month: 6,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {

            id: 7,
            month: 7,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 8,
            month: 8,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 9,
            month: 9,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 10,
            month: 10,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 11,
            month: 11,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        }, {
            id: 12,
            month: 12,
            price: 0,
            qty: 0,
            total: 0,
            vat: 21,
            paid: 'Immediate',
        },

    ];
    dataSourceTableOutEu = [
        {
            id: 1,
            month: 1,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 2,
            month: 2,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 3,
            month: 3,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 4,
            month: 4,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 5,
            month: 5,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 6,
            month: 6,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {

            id: 7,
            month: 7,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 8,
            month: 8,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 9,
            month: 9,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 10,
            month: 10,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 11,
            month: 11,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        }, {
            id: 12,
            month: 12,
            price: 0,
            qty: 0,
            total: 0,
            paid: 'Immediate',
        },

    ];



    inEuChange = (text, record, inputName) => {

        console.log(text, record.id)
        const array = this.state.update;
        array.forEach(element => {
            if (element.product_id === this.state.tabKey) {
                if (element.sales_forecast_eu === null) {
                    element.sales_forecast_eu = this.dataSourceTableInEu

                } else {
                    element.sales_forecast_eu.forEach((element2) => {
                        if (element2.month === record.month) {
                            if (inputName === 'price') {
                                element2.price = text;
                                element2.total = element2.price * element2.qty;
                                this.setState({
                                    totalinEu: element2.total
                                })
                            }
                            if (inputName === 'qty') {
                                element2.qty = text;
                                element2.total = element2.price * element2.qty;
                                this.setState({
                                    totalinEu: element2.total
                                })
                            }
                            if (inputName === 'total') {
                                element2.total = text;
                            }
                            if (inputName === 'vat') {
                                element2.vat = text;
                            }
                            if (inputName === 'paid') {
                                element2.paid = text;
                            }
                        }
                    })
                }
            }

        })
        this.setState({

            update: array
        })
        this.getUpdatesWindowState();


    }

    outEuChange = (text, record, inputName) => {

        console.log(text, record.id)
        const array = this.state.update;
        array.forEach(element => {
            if (element.product_id === this.state.tabKey) {
                if (element.sales_forecast_eu === null) {
                    element.sales_forecast_eu = this.dataSourceTableInEu

                } else {
                    element.sales_forecast_non_eu.forEach((element2) => {
                        if (element2.month === record.month) {
                            if (inputName === 'price') {
                                element2.price = text;
                                element2.total = element2.price * element2.qty;
                                this.setState({
                                    totalOutEu: element2.total
                                })
                            }
                            if (inputName === 'qty') {
                                element2.qty = text;
                                element2.total = element2.price * element2.qty;
                                this.setState({
                                    totalOutEu: element2.total
                                })
                            }
                            if (inputName === 'total') {
                                element2.total = text;
                            }
                            if (inputName === 'vat') {
                                element2.vat = text;
                            }
                            if (inputName === 'paid') {
                                element2.paid = text;
                            }
                        }
                    })
                }
            }

        })

        //setoutEuData(array);
        this.setState({
            update: array
        })
        this.getUpdatesWindowState();
        //console.log(outEuData)
    }

    setTotal = () => {
        // const array = this.props.salesForecast.products.map(x => x.sales_forecast_eu);
        const array = this.props.salesForecast.products;
        array.map((element, index) => {

            if (element.sales_forecast_eu === null) {
                if (element.product_id === this.state.tabKey) {
                    element.sales_forecast_eu = this.dataSourceTableInEu;
                }

            } else {
                element.sales_forecast_eu.map((element1, index1) => {

                    element1.total = element1.qty * element1.price;
                    return element1;
                })
            }
            if (element.sales_forecast_non_eu === null) {
                if (element.product_id === this.state.tabKey) {
                    element.sales_forecast_non_eu = this.dataSourceTableOutEu;
                }
            } else {
                element.sales_forecast_non_eu.map((element2, index2) => {

                    element2.total = element2.qty * element2.price;
                    return element2;
                });
            }

        });

        this.setState({
            update: array
        })


        console.log("jgajhfgjhasgfhjasg" + JSON.stringify(this.state.update));

    }



    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getProducts(this.props.businessPlan.id)
                    const obj = { id: this.props.businessPlan.id }
                    this.props.getCountryShortCode(obj, (data) => {
                        this.props.getCountryVat(this.props.country.countryShortCode);
                        this.setState({
                            vty: this.props.countryVats
                        });
                    });


                    this.props.getProductByID(this.props.businessPlan.id, () => {
                        this.setTotal();
                        console.log(JSON.stringify(this.props.salesForecast.products) + "ffdfdfdf")
                        this.setState({
                            inEuData: this.dataSourceTableInEu,
                            outEuData: this.dataSourceTableOutEu,
                        })
                        this.getKey(this.state.update[0].product_id)
                        console.log(this.state.update[0].product_id);
                        this.state.update.map((x) => {
                            if (x.product_id === this.state.tabKey) {
                                this.onMonthChange(x.when_ready)
                            }
                        })
                    });



                });
            }
        } else {
            this.props.getProducts(this.props.businessPlan.id);
            const obj = { id: this.props.businessPlan.id }
            this.props.getCountryShortCode(obj, (data) => {
                this.props.getCountryVat(this.props.country.countryShortCode);
                this.setState({
                    vty: this.props.countryVats
                });
            });

            this.props.getProductByID(this.props.businessPlan.id, () => {
                this.setTotal();
                console.log(JSON.stringify(this.state.update) + "ffdfdfdf")
                this.setState({
                    inEuData: this.dataSourceTableInEu,
                    outEuData: this.dataSourceTableOutEu,

                })
                this.getKey(this.state.update[0].product_id)
                console.log(this.state.update[0].product_id);
                this.state.update.map((x) => {
                    if (x.product_id === this.state.tabKey) {
                        this.onMonthChange(x.when_ready)
                    }
                })

            });



        }
    }

    onBackClick = () => {
        this.props.history.push(`/overview`)
    }

    onDiscardChanges = () => {
        //this.props.history.push(`/overview`)
        this.props.getProductByID(this.props.businessPlan.id, () => {
            this.setTotal();
            console.log(JSON.stringify(this.state.update) + "ffdfdfdf")
            // this.setState({
            //     inEuData: this.dataSourceTableInEu,
            //     outEuData: this.dataSourceTableOutEu,
            // })
        });

        this.props.history.push(`/sales-forecast`)
    }

    onMonthChange = (value) => {

        this.state.update.map(x => {
            if (x.product_id === this.state.tabKey) {
                x.when_ready = value;

                console.log(value + '=/==*=***=*=*=*=*=*=*==**=*=*=*');
                console.log("selected value " + x.when_ready);

            }
            const array = []
            //loop through array. loop while index is not greater that provided value. add id's to array
            this.state.update.map((obj, index) => {
                if (obj.sales_forecast_eu === null) {
                    return; //something 
                } else {
                    obj.sales_forecast_eu.map((x, index1) => {
                        if (index1 >= value - 1) {
                            array.push(x.month)
                            console.log(x.month);
                        }
                    })
                }
            });

            this.setState({
                checked: array
            })

        })

    }

    isDisabled = (month) => {
        return (
            this.state.checked.length > 0 && this.state.checked.indexOf(month) === -1
        );
    };


    originalExportPlan = false;



    getUpdatesWindowState = () => {
        const original = this.state.dataSourceTableInEu;
        const modified = this.state.inEuData;



        if (JSON.stringify(original) !== JSON.stringify(modified) || JSON.stringify(this.state.dataSourceTableOutEu) !== JSON.stringify(this.state.outEuData)) {

            this.setState({
                isVisibleHeader: 'visible'
            })
        } else {
            this.setState({
                isVisibleHeader: 'hidden'
            })

        }
        if (this.state.exportPlan !== this.originalExportPlan) {
            this.setState({
                isVisibleHeader: 'visible'
            })

        } else {
            this.setState({
                isVisibleHeader: 'hidden'
            })

        }


    }

    changePlan = (id, e) => {
        //this.props.changState(id)
        this.state.update.map((x) => {
            if (x.product_id === this.state.tabKey) {
                x.export = e;
                this.getUpdatesWindowState(x.when_ready);
            }

        })
        // this.setState({
        //     exportPlan: e
        // });

        //console.log(vty)
    }

    saveChanges = () => {
        //const product_id = this.state.update.map(x => x.product_id)
        //const product_id = this.state.update.map(x => x.product_id)
        const obj = {
            "products": this.state.update
        }
        console.log(JSON.stringify(this.state.update) + "this is what we have");
        // console.log(product_id + "this is what we have");
        this.props.updateSalesForecast(obj);
        this.setState({
            isVisibleHeader: 'hidden'
        })
        //setIsVisibleHeader('hidden')
        // console.log(this.state.exportPlan);
        // console.log(this.state.readyMonth);
        // console.log(inEuData);
        // console.log(outEuData);
        //console.log(JSON.stringify(obj));
        //history.push(`/sales-forecast`);

    }

    getKey = (key) => {
        console.log(key);
        this.setState({
            tabKey: key
        })
        this.state.update.map(x => {
            if (x.product_id === this.state.tabKey) {
                this.onMonthChange(x.when_ready);
            }
        })

    }
    render() {
        const dataSourceTableInEu = [
            {
                id: 1,
                month: 1,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {

                id: 2,
                month: 2,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 3,
                month: 3,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {

                id: 4,
                month: 4,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 5,
                month: 5,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 6,
                month: 6,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {

                id: 7,
                month: 7,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 8,
                month: 8,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 9,
                month: 9,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 10,
                month: 10,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 11,
                month: 11,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            }, {
                id: 12,
                month: 12,
                price: 0,
                qty: 0,
                total: 0,
                vat: 21,
                paid: 'Immediate',
            },

        ];
        const dataSourceTableOutEu = [
            {
                id: 1,
                month: 1,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {

                id: 2,
                month: 2,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 3,
                month: 3,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {

                id: 4,
                month: 4,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 5,
                month: 5,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 6,
                month: 6,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {

                id: 7,
                month: 7,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 8,
                month: 8,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 9,
                month: 9,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 10,
                month: 10,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 11,
                month: 11,
                price: 0,
                qty: 0,
                total: 0,
                paid: 'Immediate',
            }, {
                id: 12,
                month: 12,
                price: 0,
                qty: 0,
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
                    <Text disabled={this.isDisabled(record.month)} >{record.month}</Text>

            },
            {
                title: 'Euro/pc without VAT',
                dataIndex: 'price',
                key: 'price',
                width: '5%',
                render: (text, record, index) => (
                    <InputNumber disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.inEuChange(e, record, 'price')} />
                ),
            },
            {
                title: 'qty',
                dataIndex: 'qty',
                key: 'qty',
                width: '5%',
                render: (text, record, index) =>
                    <InputNumber disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.inEuChange(e, record, 'qty')} />,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '5%',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} onChange={(e) => this.inEuChange(e, record, 'total')} >
                        {this.state.update.map(x => x.sales_forecast_eu) === null ? this.state.inEuData[index].total : text}
                    </Text>
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '10%',
                render: (text, record, index) => (
                    <Select defaultValue={text === null ? 'Null' : text} onChange={e => this.inEuChange(e, record, "vat")} disabled={this.isDisabled(record.month)}>
                        <Option value={this.props.countryVats.standardRate}>{this.props.countryVats.standardRate + "%"}</Option>
                        <Option value={this.props.countryVats.reducedRates2}>{this.props.countryVats.reducedRates2 + "%"}</Option>
                        <Option value={this.props.countryVats.reducedRates1}>{this.props.countryVats.reducedRates1 + "%"}</Option>
                        <Option value={this.props.countryVats.superReducedRate}>{this.props.countryVats.superReducedRate === null ? "Null" : this.props.countryVats.superReducedRate}</Option>
                    </Select>
                )
            },
            {
                title: 'When paid',
                dataIndex: 'paid',
                key: 'paid',
                width: '10%',
                render: (text, record) => (
                    <Input.Group compact>
                        <Select defaultValue={text === null ? 0 : text} onChange={(e) => this.inEuChange(e, record, 'paid')} disabled={this.isDisabled(record.month)}>
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
                    <Text disabled={this.isDisabled(record.month)} >{record.month}</Text>

            },
            {
                title: 'Euro/pc without VAT',
                dataIndex: 'price',
                key: 'price',
                width: '5%',
                render: (text, record, index) => (
                    <InputNumber disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.outEuChange(e, record, 'price')} />
                ),
            },
            {
                title: 'qty',
                dataIndex: 'qty',
                key: 'qty',
                width: '5%',
                render: (text, record, index) =>
                    <InputNumber disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.outEuChange(e, record, 'qty')} />,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '5%',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} >
                        {this.state.update.map(x => x.sales_forecast_non_eu) === null ? this.state.outEuData[index].total : text}
                    </Text>,
            },
            {
                title: 'When paid',
                dataIndex: 'paid',
                key: 'paid',
                width: '10%',
                render: (text, record) => (
                    <Input.Group compact>
                        <Select defaultValue={text === null ? 0 : text} onChange={(e) => this.outEuChange(e, record, 'paid')} disabled={this.isDisabled(record.month)} >
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
                value: 1
            }, {
                key: '2',
                name: '2nd mo.',
                value: 2
            }, {
                key: '3',
                name: '3rd mo.',
                value: 3
            }, {
                key: '4',
                name: '4th mo.',
                value: 4
            }, {
                key: '5',
                name: "5th mo.",
                value: 5
            }, {
                key: '6',
                name: '6th mo.',
                value: 6
            }, {
                key: '7',
                name: '7th mo.',
                value: 7
            }, {
                key: '8',
                name: '8th mo.',
                value: 8
            }, {
                key: '9',
                name: '9th mo.',
                value: 9
            }, {
                key: '10',
                name: '10th mo.',
                value: 10
            }, {
                key: '11',
                name: '11th mo.',
                value: 11
            }, {
                key: '12',
                name: '12th mo.',
                value: 12
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
        return (
            <Row align="middle" >
                <UnsavedChangesHeader
                    visibility={this.state.isVisibleHeader}
                    saveChanges={this.saveChanges}
                    discardChanges={this.onDiscardChanges}
                />
                <Col span={20} offset={3}>
                    <Col span={16} offset={0}>
                        <Breadcrumb className="margin-top-links">
                            <Breadcrumb.Item className="margin-top-links">
                                <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="margin-top-links">
                                <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space>Sales forecast</Space>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

                    <Row className="margin-heading" align="middle">
                        <Col span={12} offset={0}>
                            <div className="button-style-heading-section">
                                <Button className="back-button-style" icon={<ArrowLeftOutlined />} onClick={() => this.onBackClick()}></Button>
                                <Text className="titleTextStyle" >Sales forecast</Text>
                            </div>
                        </Col>
                        <Col span={4} offset={6}>
                            <div className="button-style-heading-section">
                                <Text className="mark-as-completed-style">Mark as completed: </Text><Switch className="margin-left-8px" />
                            </div>

                        </Col>
                    </Row>

                    <Tabs defaultActiveKey={this.state.tabKey} onChange={this.getKey} >
                        {this.props.salesForecast.productsTitles.map((x) => {
                            return (
                                <>
                                    <TabPane tab={x.name} key={x.id} >

                                        {this.state.update.map((element, index) => {
                                            if (element.product_id === x.id) {
                                                return (
                                                    <>
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

                                                            < Col span={12} offset={2} className="margin-top-5px" >
                                                                <Card className="card-style-height-border-radius"  >
                                                                    <Row>

                                                                        <Col span={9}><p className="card-style-font">When Ready?</p></Col>
                                                                        <Col span={3} offset={12}>

                                                                            <Input.Group compact className="card-input-Group-style">
                                                                                <SalesForecastSelect defaultValue={element.when_ready === 0 ? this.state.readyMonth + "st mo." : element.when_ready + "th mo."} onChange={this.onMonthChange} dataSource={dataSourceMonth} />

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

                                                                        <Col span={9}><p className="card-style-font">Do you have plan to export? </p></Col>
                                                                        <Col span={3} offset={12}>
                                                                            <Input.Group compact className="card-input-Group-style" >
                                                                                <Select defaultValue={element.export === false ? 'NO' : 'yes'} onChange={(e) => this.changePlan(x.id, e)}  >
                                                                                    <Option value={true} >Yes</Option>
                                                                                    <Option value={false} >NO</Option>
                                                                                </Select>
                                                                                {/* <SalesForecastSelect defaultValue={element.export === false ? 'NO' : 'Yes'} dataSource={dataSourceExport} onChange={(e) => this.changePlan(x.id, e)} /> */}
                                                                            </Input.Group>

                                                                        </Col>
                                                                    </Row>
                                                                </Card>
                                                            </Col>
                                                        </Row>



                                                        <Row align="middle" className="margin-top-20px">
                                                            <Col span={12} offset={8} >
                                                                <Table columns={columns} dataSource={element.sales_forecast_eu === null || element === [] ? dataSourceTableInEu : element.sales_forecast_eu} pagination={false} />
                                                            </Col>

                                                        </Row>

                                                        <Row align="middle" className={`margin-top-20px ${element.export === false ? `display-none` : ``}`} >
                                                            <Col span={12} offset={8} >
                                                                <Table columns={columnsOutEU} dataSource={element.sales_forecast_non_eu === null ? dataSourceTableOutEu : element.sales_forecast_non_eu} pagination={false} />
                                                            </Col>
                                                        </Row>
                                                    </>

                                                )
                                            }



                                        })}
                                    </TabPane>
                                </>
                            )
                        }



                        )}
                    </Tabs>

                </Col>
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        country: state.countryShortCode,
        countryVats: state.countryVats,
        salesForecast: state.salesForecast
    };

}

export default connect(mapStateToProps, { getCountryShortCode, getCountryVat, refreshPlan, changState, getProducts, getProductByID, updateSalesForecast })(withRouter(SalesForecast))
