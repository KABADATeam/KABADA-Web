import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState, getProductByID, updateSalesForecast, saveState } from '../../appStore/actions/salesForecastActions';
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
            exportPlan: false,
            totalinEu: 0,
            totalOutEu: 0,
            isVisibleHeader: 'hidden',
            tabKey: "",
            completed: false,
            vty: {},
            inEuData: [],
            outEuData: [],
            checked: [],
            update: []
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

        console.log(text, record.month)
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
        // clone salesForecast products. not change directly
        //const array = JSON.parse(JSON.stringify(this.props.salesForecast.products));
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
            update: array,

        })

        //console.log("jgajhfgjhasgfhjasg" + JSON.stringify(this.state.update));

    }

    createData = () => {
        const array = this.props.salesForecast.products;
        array.map((element, index) => {

            if (element.sales_forecast_eu === null) {

                element.sales_forecast_eu = this.dataSourceTableInEu;
                console.log('DAAAAAAAAAAADDDADDAAAAAAAAA111111111111111111');
            }
            if (element.sales_forecast_non_eu === null) {

                element.sales_forecast_non_eu = this.dataSourceTableOutEu;
                console.log('DAAAAAAAAAAADDDADDAAAAAAAAA');
            }


        });
        this.setState({
            update: array,

        })

        const obj = {
            "products": this.state.update
        }
        //console.log(JSON.stringify(this.state.update) + "this is what we have");
        // console.log(product_id + "this is what we have");
        this.props.updateSalesForecast(obj);
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
                        this.createData();
                        //console.log(JSON.stringify(this.props.salesForecast.products) + "ffdfdfdf")
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
            console.log(this.props.businessPlan.id)

            this.props.getProductByID(this.props.businessPlan.id, () => {

                this.setTotal();
                const array = this.props.salesForecast.products;
                array.map((element, index) => {
                    if (element.sales_forecast_eu === null && element.sales_forecast_non_eu === null) {
                        this.createData();
                    }
                });
                //this.getKey(this.state.update[0].product_id)



                this.setState({
                    inEuData: this.dataSourceTableInEu,
                    outEuData: this.dataSourceTableOutEu,

                })
                this.getKey(this.state.update[0].product_id)
                //console.log(this.state.update[0].product_id);
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

        this.props.getProductByID(this.props.businessPlan.id, () => {
            this.setTotal();
        });
        this.setState({
            isVisibleHeader: 'hidden'
        })
    }

    onMonthChange = (value) => {

        this.state.update.map(x => {
            if (x.product_id === this.state.tabKey) {
                x.when_ready = value;

                console.log(value + '=/==*=***=*=*=*=');
                console.log("selected value " + x.when_ready);


                this.setState({
                    readyMonth: value
                })


            }
            const array = []
            //loop through array. loop while index is not greater that provided value. add id's to array
            this.state.update.map((obj, index) => {

                obj.sales_forecast_eu.map((x, index1) => {
                    if (index1 >= value - 1) {
                        array.push(x.month)
                        //console.log(x.month);
                    }
                })

            });

            this.setState({
                checked: array
            })

        })
        //this.getUpdatesWindowState();

    }

    isDisabled = (month) => {
        return (
            this.state.checked.length > 0 && this.state.checked.indexOf(month) === -1
        );
    };


    originalExportPlan = false;



    getUpdatesWindowState = () => {
        const array = this.props.salesForecast.products;

        const original = array.map((x) => x.sales_forecast_eu)

        const modified = this.state.update.map((y) => y.sales_forecast_eu)


        if (JSON.stringify(original) !== JSON.stringify(modified)) {

            this.setState({
                isVisibleHeader: 'visible'
            })
        } else {
            this.setState({
                isVisibleHeader: 'hidden'
            })

        }
        if (this.state.exportPlan !== this.props.salesForecast.products.export) {
            this.setState({
                isVisibleHeader: 'visible'
            })

        } else {
            this.setState({
                isVisibleHeader: 'hidden'
            })

        }
        // console.log(this.state.exportPlan);
        // console.log(this.state.update.map(x => x.export));
        // console.log('Original array: ' + JSON.stringify(original))
        // console.log('modifed array:' + JSON.stringify(modified))

    }

    changePlan = (id, e) => {
        //this.props.changState(id)
        this.state.update.map((x) => {
            if (x.product_id === this.state.tabKey) {
                x.export = e;
                this.getUpdatesWindowState();
            }

        })

    }

    saveChanges = () => {

        const sales = this.state.update.map((x) => x.sales_forecast_eu)
        sales.map((element, index) => {
            element.map((x, index) => {
                this.state.update.map((x) => {
                    if (x.product_id === this.state.tabKey) {
                        if (index < this.state.readyMonth - 1) {
                            x.price = 0;
                            x.qty = 0;
                            x.total = 0;
                        }
                    }

                })
            })
        })

        const obj = {
            "products": this.state.update
        }
        console.log(this.state.update.map((x) => x.sales_forecast_eu))
        console.log(obj)
        this.props.updateSalesForecast(obj);
        this.setState({
            isVisibleHeader: 'hidden'
        })

    }

    getKey = (e) => {

        this.setState({
            tabKey: e
        }, () => {
            const update = this.state.update;
            update.map((x) => {
                if (x.product_id === this.state.tabKey) {

                    this.setState({
                        readyMonth: x.when_ready
                    }, () => {

                        this.onMonthChange(this.state.readyMonth)
                    });
                }
            })

        })

    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getProductByID(this.props.businessPlan.id);
        });
        console.log(state);
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
                width: '15%',
                render: (text, record, index) => {
                    return (
                        <InputNumber
                            key={record.id}
                            className={"numInput"}
                            disabled={this.isDisabled(record.month)}
                            defaultValue={text === null ? 0 : text}
                            value={text}
                            onChange={(e) => this.inEuChange(e, record, 'price')} />

                    )
                },
            },
            {
                title: 'qty',
                dataIndex: 'qty',
                key: 'qty',
                width: '5%',
                render: (text, record, index) =>
                    <InputNumber key={record.id} disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} value={text} onChange={(e) => this.inEuChange(e, record, 'qty')} />,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '5%',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} value={'€' + text} onChange={(e) => this.inEuChange(e, record, 'total')} >
                        {this.state.update.map(x => x.sales_forecast_eu) === null ? this.state.inEuData[index].total : '€' + text}
                    </Text>
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '10%',
                render: (text, record, index) => (
                    <Select defaultValue={text === null ? 'Null' : text} value={text} onChange={e => this.inEuChange(e, record, "vat")} disabled={this.isDisabled(record.month)}>
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
                        <Select defaultValue={text === null ? 0 : text} value={text} onChange={(e) => this.inEuChange(e, record, 'paid')} disabled={this.isDisabled(record.month)}>
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
                                <Text className="mark-as-completed-style">Mark as completed: </Text><Switch className="margin-left-8px" checked={this.props.salesForecast.is_sales_forecast_completed} onClick={this.onCompletedChange.bind(this)} />
                            </div>

                        </Col>
                    </Row>

                    <Tabs defaultActiveKey={this.state.tabKey} onChange={e => this.getKey(e)} >
                        {this.props.salesForecast.productsTitles.map((x) => {
                            return (
                                <>
                                    <TabPane tab={x.name} key={x.id}  >

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
                                                                <Card style={{ borderRadius: '15px' }}  >
                                                                    <Row style={{ marginBottom: '20px' }}>

                                                                        <Col span={8} ><p className="card-style-font">When Ready ?</p></Col>
                                                                        <Col span={4} offset={12} >

                                                                            <Input.Group compact >
                                                                                <SalesForecastSelect defaultValue={element.when_ready === 0 ? 1 + "st mo." : element.when_ready + "th mo."} onChange={this.onMonthChange} dataSource={dataSourceMonth} />
                                                                            </Input.Group>

                                                                        </Col>


                                                                    </Row>
                                                                    <hr style={{ borderColor: '#D9D9D9' }} />
                                                                    <Row style={{ marginTop: '20px' }}>

                                                                        <Col span={9}><p className="card-style-font">Do you have plan to export? </p></Col>
                                                                        <Col span={3} offset={12}>
                                                                            <Input.Group compact >
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
                                                                <SalesForecastTable title='Sales forecast in EU' columns={columns} dataSource={element.sales_forecast_eu === null ? dataSourceTableInEu : element.sales_forecast_eu} />
                                                            </Col>

                                                        </Row>

                                                        <Row align="middle" className={`margin-top-20px ${element.export === false ? `display-none` : ``}`} >
                                                            <Col span={12} offset={8} >
                                                                <SalesForecastTable title='Sales forecast outside EU' columns={columnsOutEU} dataSource={element.sales_forecast_non_eu === null ? dataSourceTableOutEu : element.sales_forecast_non_eu} />
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

export default connect(mapStateToProps, { getCountryShortCode, getCountryVat, refreshPlan, changState, getProducts, getProductByID, updateSalesForecast, saveState })(withRouter(SalesForecast))
