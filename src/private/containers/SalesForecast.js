import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Col, Space, Row, Button, Typography, Switch, Card, Tabs, Input, Select, InputNumber, Divider } from 'antd';
import { ArrowLeftOutlined, CaretDownFilled } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getProducts, changState, getProductByID, updateSalesForecast, saveState } from '../../appStore/actions/salesForecastActions';
import { getCountryVat } from '../../appStore/actions/vatsActions'
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import SalesForecastTable from '../components/sales_Forecast/SalesForecastTable';
import SalesForecastSelect from '../components/sales_Forecast/SalesForecastSelect';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import '../../css/SalesForecast.css';
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { logout } from '../../appStore/actions/authenticationActions';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import TooltipComponent from '../components/Tooltip';
import Cookies from 'js-cookie';

const { Text } = Typography;
const { TabPane } = Tabs;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
}

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
    }

    createData = () => {
        const array = this.props.salesForecast.products;
        array.map((element, index) => {

            if (element.sales_forecast_eu === null) {

                element.sales_forecast_eu = this.dataSourceTableInEu;
                this.props.getProductByID(this.props.businessPlan.id, () => {
                    this.setTotal();
                });
            }
            if (element.sales_forecast_non_eu === null) {

                element.sales_forecast_non_eu = this.dataSourceTableOutEu;
                this.props.getProductByID(this.props.businessPlan.id, () => {
                    this.setTotal();
                });
            }


        });
        this.setState({
            update: array,

        })

        const obj = {
            "products": this.state.update
        }
        this.props.updateSalesForecast(obj);


    }



    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
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
                        this.props.getTooltips();

                        this.props.getProductByID(this.props.businessPlan.id, () => {
                            this.setTotal();
                            this.createData();
                            this.setState({
                                inEuData: this.dataSourceTableInEu,
                                outEuData: this.dataSourceTableOutEu,
                            })
                            this.getKey(this.state.update[0].product_id);
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
                    this.getKey(this.state.update[0].product_id);
                    this.state.update.map((x) => {
                        if (x.product_id === this.state.tabKey) {
                            this.onMonthChange(x.when_ready)
                        }
                    })

                });
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
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
                this.setState({
                    readyMonth: value
                });
            }
            const array = []
            //loop through array. loop while index is not greater that provided value. add id's to array
            this.state.update.map((obj, index) => {

                obj.sales_forecast_eu.map((x, index1) => {
                    if (index1 >= value - 1) {
                        array.push(x.month)
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
                width: '23.7%',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} >{record.month}</Text>

            },
            {
                title: 'Euro/pc without VAT',
                dataIndex: 'price',
                key: 'price',
                width: '22.7%',
                align: 'right',
                render: (text, record, index) => {
                    return (
                        <InputNumber
                            key={record.id}
                            className={"numInput"}
                            disabled={this.isDisabled(record.month)}
                            defaultValue={text === null ? 0 : text}
                            value={text}
                            onChange={(e) => this.inEuChange(e, record, 'price')}
                            style={{ width: 87 }}
                        />

                    )
                },
            },
            {
                title: 'Qty',
                dataIndex: 'qty',
                key: 'qty',
                width: '10%',
                align: 'right',
                render: (text, record, index) =>
                    <InputNumber style={{ width: 49 }} key={record.id} disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} value={text} onChange={(e) => this.inEuChange(e, record, 'qty')} />,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '12.2%',
                align: 'center',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} value={'€' + text} onChange={(e) => this.inEuChange(e, record, 'total')} >
                        {this.state.update.map(x => x.sales_forecast_eu) === null ? this.state.inEuData[index].total : '€' + text}
                    </Text>
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '13.1%',
                align: 'right',
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
                width: '18.3%',
                align: 'right',
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
                width: '36.7%',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} >{record.month}</Text>

            },
            {
                title: 'Euro/pc without VAT',
                dataIndex: 'price',
                key: 'price',
                width: '22.8%',
                align: 'right',
                render: (text, record, index) => (
                    <InputNumber style={{ width: 87 }} disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.outEuChange(e, record, 'price')} />
                ),
            },
            {
                title: 'Qty',
                dataIndex: 'qty',
                key: 'qty',
                width: '10%',
                align: 'right',
                render: (text, record, index) =>
                    <InputNumber style={{ width: 49 }} disabled={this.isDisabled(record.month)} defaultValue={text === null ? 0 : text} onChange={(e) => this.outEuChange(e, record, 'qty')} />,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '12.2%',
                align: 'right',
                render: (text, record, index) =>
                    <Text disabled={this.isDisabled(record.month)} >
                        {this.state.update.map(x => x.sales_forecast_non_eu) === null ? this.state.outEuData[index].total : '€' + text}
                    </Text>,
            },
            {
                title: 'When paid',
                dataIndex: 'paid',
                key: 'paid',
                width: '18.3%',
                align: 'right',
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
            <>
                <UnsavedChangesHeader
                    visibility={this.state.isVisibleHeader}
                    saveChanges={this.saveChanges}
                    discardChanges={this.onDiscardChanges}
                />
                <Col span={20} offset={2}>
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
                    <Col span={16} offset={2}>
                        <div className="button-style-heading-section">
                            <Button className="back-button-style" icon={<ArrowLeftOutlined />} onClick={() => this.onBackClick()}></Button>
                            <Text className="titleTextStyle" >Sales forecast</Text>
                            <TooltipComponent code="salesforecast1" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="button-style-heading-section" style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text className="mark-as-completed-style">Mark as completed: </Text><Switch className="margin-left-8px" checked={this.props.salesForecast.is_sales_forecast_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>

                    </Col>
                </Row>
                <Col span={20} offset={2}>
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
                                                            <Col span={8} >
                                                                <div style={{ marginRight: '40px', position: "absolute" }}>
                                                                    <Typography.Title className="about-Title-heading-Style">{x.name}</Typography.Title>
                                                                    <Typography.Text className="text-Style">
                                                                        Product description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                                                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                                                        You can add products at Value proposition
                                                                    </Typography.Text>
                                                                </div>
                                                            </Col>
                                                            <Col span={16} className="margin-top-5px" >
                                                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Col span={12}>
                                                                            <div style={{ marginTop: 24, marginLeft: 16 }}>
                                                                                <Text style={{ ...titleTextStyle }}>What Ready?</Text>
                                                                                <TooltipComponent code="salesforecast2" type="text" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={12}>
                                                                            <div style={{ float: "right", marginTop: 16, marginRight: 16 }}>
                                                                                <Input.Group compact >
                                                                                    <SalesForecastSelect defaultValue={element.when_ready === 0 ? 1 + "st mo." : element.when_ready + "th mo."} onChange={this.onMonthChange} dataSource={dataSourceMonth} />
                                                                                </Input.Group>
                                                                            </div>
                                                                        </Col>
                                                                    </div>
                                                                    <Divider />
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Col span={12}>
                                                                            <div style={{ marginTop: 4, marginLeft: 16 }}>
                                                                                <Text style={{ ...titleTextStyle }}>Do you have plan to export?</Text>
                                                                                <TooltipComponent code="salesforecast3" type="text" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={12}>
                                                                            <div style={{ float: "right", marginBottom: 16, marginRight: 16 }}>
                                                                                <Input.Group compact >
                                                                                    <Select defaultValue={element.export === false ? 'No' : 'yes'} onChange={(e) => this.changePlan(x.id, e)} style={{ width: 71 }} suffixIcon={<CaretDownFilled />} >
                                                                                        <Option value={true} >Yes</Option>
                                                                                        <Option value={false} >No</Option>
                                                                                    </Select>
                                                                                    {/* <SalesForecastSelect defaultValue={element.export === false ? 'NO' : 'Yes'} dataSource={dataSourceExport} onChange={(e) => this.changePlan(x.id, e)} /> */}
                                                                                </Input.Group>
                                                                            </div>
                                                                        </Col>
                                                                    </div>
                                                                </Card >
                                                                <Row align="middle" className="margin-top-20px">
                                                                    <Col span={24}>
                                                                        <SalesForecastTable title='Sales forecast in EU' columns={columns} dataSource={element.sales_forecast_eu === null ? dataSourceTableInEu : element.sales_forecast_eu} />
                                                                    </Col>
                                                                </Row>
                                                                <Row align="middle" className={`margin-top-20px ${element.export === false ? `display-none` : ``}`} >
                                                                    <Col span={24}>
                                                                        <SalesForecastTable title='Sales forecast outside EU' columns={columnsOutEU} dataSource={element.sales_forecast_non_eu === null ? dataSourceTableOutEu : element.sales_forecast_non_eu} />
                                                                    </Col>
                                                                </Row>
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

            </>
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

export default connect(mapStateToProps, { 
    getCountryShortCode, 
    getCountryVat, 
    refreshPlan, 
    changState, 
    getProducts, 
    getProductByID, 
    updateSalesForecast, 
    saveState, 
    logout,
    getTooltips 
})(withRouter(SalesForecast))
