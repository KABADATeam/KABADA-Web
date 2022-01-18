import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import VariableCostPopUp from '../components/fixed_and_variable_costs/VariableCostPopUp';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getFinancialProjectionsCosts, updateFixedAndVarCosts, saveState } from '../../appStore/actions/financialProjectionsActions';
import { getCountryVat } from '../../appStore/actions/vatsActions'
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import '../../css/FixedAndVarStyles.css'
import TooltipComponent from '../components/Tooltip';
import Cookies from 'js-cookie';


const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
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


const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: '20px',
    lineHeight: "38px"
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

class FixedAndVariableCosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vats: {},
            selectedPeriod: [],
            fixed_var_costs: {},
            fixed: [],
            variable: [],
            variablePopUp: {
                category_id: null,
                category_title: null,
                record: {},
                values: null,
                visible: false,
            },
            visibleHeader: 'hidden',
        }
    }

    onBackClick = () => {
        this.props.history.push('/overview')
    }

    showModal = (recordas, data, index) => {
        // creating object which will hold visible value,category_id and ...
        const obj = {
            category_id: null,
            category_title: null,
            values: data,
            record: recordas,
            visible: true,
        }
        // clone variable state array. i do not work with it directly.
        // check if element with that id exist and then set values of obj
        const variableArray = JSON.parse(JSON.stringify(this.state.variable));
        variableArray.map((obj, index) => {
            obj.types.map((element, index1) => {
                if (element.cost_item_id === recordas.cost_item_id) {
                    obj.category_id = obj.category_id;
                    obj.category_title = obj.category_title;
                    obj.record = recordas
                }
            });
        });
        this.setState({
            variablePopUp: obj,
        });
    }

    handleModalCancel = () => {
        const obj = {
            category_id: null,
            category_title: null,
            values: null,
            record: {},
            visible: false
        }
        this.setState({
            variablePopUp: obj,
        })
    }
    //passing prices array 
    handleOk = () => {
        const obj = {
            category_id: null,
            category_title: null,
            values: null,
            record: {},
            visible: false
        }
        this.setState({
            variablePopUp: obj,
            visibleHeader: 'hidden'
        });
    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getFinancialProjectionsCosts(this.props.businessPlan.id);
        });
    }


    discardChanges = () => {
        // cloning fixed and variable states from redux state
        const fixedArray = JSON.parse(JSON.stringify(this.props.financialProjections.fixed));
        const variableArray = JSON.parse(JSON.stringify(this.props.financialProjections.variable));
        //setting our fixed and variable states to original from redux that were not changed
        this.setState({
            fixed: fixedArray,
            variable: variableArray,
            visibleHeader: 'hidden'
        });
    }
    saveChanges = () => {
        const items = [];

        // cloning fixed and variable from financialProjections. i dont work directly with states
        const originalFixedArray = JSON.parse(JSON.stringify(this.props.financialProjections.fixed));
        const originalVariableArray = JSON.parse(JSON.stringify(this.props.financialProjections.variable));
        // cloning fixed and variable states. cant work directly with them
        const modifiedFixedArray = JSON.parse(JSON.stringify(this.state.fixed));
        const modifiedVariableArray = JSON.parse(JSON.stringify(this.state.variable));


        // looping through original array and checking if any of attributes where changed in modified array 
        for (var a = 0; a < originalFixedArray.length; a++) {
            for (var b = 0; b < originalFixedArray[a].types.length; b++) {
                console.log(JSON.stringify(originalFixedArray[a].types[b]))
                if (originalFixedArray[a].types[b].price !== modifiedFixedArray[a].types[b].price ||
                    originalFixedArray[a].types[b].vat !== modifiedFixedArray[a].types[b].vat ||
                    originalFixedArray[a].types[b].first_expenses !== modifiedFixedArray[a].types[b].first_expenses ||
                    originalFixedArray[a].types[b].price !== modifiedFixedArray[a].types[b].price) {

                    const modifiedObj = {
                        cost_item_id: modifiedFixedArray[a].types[b].cost_item_id,
                        price: modifiedFixedArray[a].types[b].price,
                        vat: modifiedFixedArray[a].types[b].vat,
                        first_expenses: modifiedFixedArray[a].types[b].first_expenses === null ? 1 : modifiedFixedArray[a].types[b].first_expenses,
                        monthly_expenses: modifiedFixedArray[a].types[b].monthly_expenses
                    }
                    items.push(modifiedObj);
                }
            }
        }

        for (var a = 0; a < originalVariableArray.length; a++) {
            for (var b = 0; b < originalVariableArray[a].types.length; b++) {
                console.log(JSON.stringify(originalVariableArray[a].types[b]))
                if (originalVariableArray[a].types[b].price !== modifiedVariableArray[a].types[b].price ||
                    originalVariableArray[a].types[b].vat !== modifiedVariableArray[a].types[b].vat ||
                    originalVariableArray[a].types[b].monthly_expenses !== modifiedVariableArray[a].types[b].first_expenses) {

                    const modifiedObj = {
                        cost_item_id: modifiedVariableArray[a].types[b].cost_item_id,
                        price: modifiedVariableArray[a].types[b].price,
                        vat: modifiedVariableArray[a].types[b].vat,
                        first_expenses: modifiedVariableArray[a].types[b].first_expenses === null ? 0 : modifiedVariableArray[a].types[b].first_expenses,
                        monthly_expenses: modifiedVariableArray[a].types[b].monthly_expenses
                    }
                    items.push(modifiedObj);
                }
            }
        }
        // postObject for update
        const postObject = {
            business_plan_id: this.props.businessPlan.id,
            cost_items: items
        }

        console.log(JSON.stringify(postObject))
        // dispatching action to update fixedAndVar costs
        this.props.updateFixedAndVarCosts(postObject);
        this.setState({
            visibleHeader: 'hidden'
        });
    }

    monthsSet = () => {
        const months = [];
        for (var a = 1; a < 13; a++) {
            months.push(a);
            this.setState({
                selectedPeriod: months
            });
        }
    }

    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));

        let original = array1;
        let modified = array2;

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.sort();
        b = b.sort();

        original.map((obj, index) => {
            obj.types.map((element, index1) => {
                if (original[index].types[index1].price !== modified[index].types[index1].price ||
                    original[index].types[index1].vat !== modified[index].types[index1].vat ||
                    original[index].types[index1].first_expenses !== modified[index].types[index1].first_expenses
                ) {
                    return false;
                }
            });
        });

        return true;
    }

    getUpdateWindowState = () => {
        // clone of fixed state. i should not interact with it directly
        const originalFixed = JSON.parse(JSON.stringify(this.props.financialProjections.fixed));
        const modifiedFixed = JSON.parse(JSON.stringify(this.state.fixed));
        const originalVariable = JSON.parse(JSON.stringify(this.props.financialProjections.variable))
        const modifiedVariable = JSON.parse(JSON.stringify(this.state.variable));

        if (originalFixed !== modifiedFixed || originalVariable !== modifiedVariable) {
            this.setState({
                visibleHeader: 'visible'
            });
        } else {
            this.setState({
                visibleHeader: 'hidden'
            });
        }
    }

    onFixedChange = (value, record, inputName) => {
        // clone of fixed state
        const originalArray = [...this.props.financialProjections.fixed]
        const arrayOfFixed = JSON.parse(JSON.stringify(this.state.fixed))
        arrayOfFixed.map((obj, index) => {
            obj.types.map((element, index2) => {
                if (element.cost_item_id === record.cost_item_id) {
                    if (inputName === "price") {
                        element.price = value;
                    }
                    if (inputName === "vat") {
                        element.vat = value;
                    }
                    if (inputName === "first_expenses") {
                        // const st = value.charAt(0);
                        const expensesSliced = value.slice(0, -6)
                        element.first_expenses = Number(expensesSliced)
                    }
                }
            });
        });
        this.setState({
            fixed: arrayOfFixed
        });

        this.getUpdateWindowState();

    }

    onVariableChange = (value, record, inputName, updateFrom) => {
        // clone variable state, dont change directly
        const originalArray = [...this.props.financialProjections.variable];
        const arrayOfVariable = JSON.parse(JSON.stringify(this.state.variable));
        arrayOfVariable.map((obj, index) => {
            obj.types.map((element, index1) => {
                if (element.cost_item_id === record.cost_item_id) {
                    if (inputName === "vat") {
                        element.vat = value;
                    }
                    if (inputName === "monthly_expenses") {
                        element.monthly_expenses = value;
                    }
                }
            });
        });
        if (updateFrom === 0) {
            this.setState({
                variable: arrayOfVariable
            });
            this.getUpdateWindowState();
        } if (updateFrom === 1) {
            this.setState({ variable: arrayOfVariable }, () => {
                this.saveChanges();

            });
        }

    }


    setFixedAndVarCosts = () => {
        // cloning financialProjections fixed and variable costs
        // const fixedArray = [...this.props.financialProjections.fixed]
        const fixedClone = JSON.parse(JSON.stringify(this.props.financialProjections.fixed))
        const variableClone = JSON.parse(JSON.stringify(this.props.financialProjections.variable));
        // const variableArray = [...this.props.financialProjections.variable]
        this.setState({
            fixed: fixedClone
        });
        // [{"category_title":"Rent of office","category_id":"df741ccc-d2ef-4797-8c96-8b5be0344f88","types":[{"cost_item_id":"c857933a-317e-4e28-98c7-4aad3d9a8276","type_title":"Other","type_id":"e221190c-00bc-404f-a540-708d0e673454","price":"600","vat":5,"first_expenses":4,"monthly_expenses":null}],"key":"df741ccc-d2ef-4797-8c96-8b5be0344f88"},{"category_title":"Rent of buildings","category_id":"da2dac96-650b-4d54-a984-9c6bae0653c7","types":[{"cost_item_id":"0b57a5b8-cbaa-4dd2-8992-81bf9c6d7e4d","type_title":"Manufacturing buildings","type_id":"2d9ebc0f-7a82-4891-8dc6-1fa64b5fa22d","price":800,"vat":21,"first_expenses":2,"monthly_expenses":null}],"key":"da2dac96-650b-4d54-a984-9c6bae0653c7"},{"category_title":"Utilities","category_id":"25532174-0c07-4293-99c2-10c954ad6367","types":[{"cost_item_id":"590d5af6-fa73-4fcf-913b-55186c8077b1","type_title":"Electricity","type_id":"e6aaacaf-9550-4937-bf13-0d1ff0b69874","price":1000,"vat":21,"first_expenses":3,"monthly_expenses":null}],"key":"25532174-0c07-4293-99c2-10c954ad6367"},{"category_title":"Salaries","category_id":"f5d95c3b-4894-41b1-98b8-b1eb44ef436a","types":[{"cost_item_id":"713bd669-9901-4b55-b57a-10d4c42f1049","type_title":"Management","type_id":"c804bad3-0387-44fb-9817-93085d14ccf9","price":800,"vat":5,"first_expenses":2,"monthly_expenses":null}],"key":"f5d95c3b-4894-41b1-98b8-b1eb44ef436a"}]
        this.setState({
            variable: variableClone
        });
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getFinancialProjectionsCosts(this.props.businessPlan.id, () => {
                            // cloning what is in financialProjections fixed and variable state
                            this.setFixedAndVarCosts();
                            const obj = { id: this.props.businessPlan.id }
                            this.props.getCountryShortCode(obj, (data) => {
                                this.props.getCountryVat(this.props.country.countryShortCode, () => {
                                    this.setState({
                                        vats: this.props.countryVats
                                    });
                                });

                            });

                            this.monthsSet();
                        });

                    });
                }
            } else {
                this.props.getFinancialProjectionsCosts(this.props.businessPlan.id, () => {
                    // cloning what is in financialProjections fixed and variable state
                    this.setFixedAndVarCosts();
                    const obj = { id: this.props.businessPlan.id }
                    this.props.getCountryShortCode(obj, (data) => {
                        this.props.getCountryVat(this.props.country.countryShortCode, () => {
                            this.setState({
                                vats: this.props.countryVats
                            });
                        });
                    });

                    this.monthsSet();
                });
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }



    render() {
        console.log(this.state.variable);
        console.log(this.state.fixed);
        const fixed_costs_columns = [
            {
                title: 'Type',
                dataIndex: 'type_title',
                width: '24.8%',
            },
            {
                title: 'Name',
                dataIndex: 'type_name',
                width: '25.3%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '16.2%',
                render: (text, record, index) => (
                    <Input
                        // min={0}
                        size="large"
                        type={"number"}
                        className={"numInput"}
                        defaultValue={text === null ? 0 : text}
                        value={text}
                        onChange={e => this.onFixedChange(e.target.value, record, "price")}
                    />
                )
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '16%',
                render: (text, record, index) => (
                    <Select defaultValue={text === null ? this.state.vats.standardRate : text} value={text === null ? this.state.vats.standardRate : text} onChange={e => this.onFixedChange(e, record, "vat")}>
                        <Option value={this.state.vats.standardRate}>{this.state.vats.standardRate + "%"}</Option>
                        <Option value={this.state.vats.reducedRates2}>{this.state.vats.reducedRates2 + "%"}</Option>
                        <Option value={this.state.vats.reducedRates1}>{this.state.vats.reducedRates1 + "%"}</Option>
                        {/* <Option value={this.state.vats.superReducedRate}>{this.state.vats.superReducedRate === null ? "Null" : this.state.vats.superReducedRate}</Option> */}
                    </Select>
                )
            },
            {
                title: 'First expenses',
                dataIndex: 'first_expenses',
                width: '17.7%',
                render: (text, record, index) => (
                    <Input.Group compact>
                        <Select value={text === null ? "1st mo." : text + "st mo."} onChange={e => this.onFixedChange(e, record, "first_expenses")}>
                            {this.state.selectedPeriod.map((value, index) => (
                                <Option value={value + "st mo."}>{value + "st mo."}</Option>
                            ))}
                        </Select>
                    </Input.Group>
                )
            },
        ];

        const fixed_salaries_costs_columns = [
            {
                title: 'Type',
                dataIndex: 'type_title',
                width: '24.8%',
            },
            {
                title: 'Name',
                dataIndex: 'type_name',
                width: '33.5%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '24%',
                render: (text, record, index) => (
                    <Input
                        // min={0}
                        size="large"
                        type={"number"}
                        className={"numInput"}
                        defaultValue={text === null ? 0 : text}
                        value={text}
                        onChange={e => this.onFixedChange(e.target.value, record, "price")}
                    />
                )
            },
            {
                title: 'First expenses',
                dataIndex: 'first_expenses',
                width: '17.7%',
                render: (text, record, index) => (
                    <Input.Group compact>
                        <Select value={text === null ? "1st mo." : text + "st mo."} onChange={e => this.onFixedChange(e, record, "first_expenses")}>
                            {this.state.selectedPeriod.map((value, index) => (
                                <Option value={value + "st mo."}>{value + "st mo."}</Option>
                            ))}
                        </Select>
                    </Input.Group>
                )
            },
        ];

        const variable_salaries_costs_columns = [
            {
                title: 'Type',
                dataIndex: 'type_title',
                width: '24.8%',
            },
            {
                title: 'Name',
                dataIndex: 'type_name',
                width: '33.5%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'monthly_expenses',
                width: '41.7%',
                render: (text, record, index) => {
                    return (<Input
                        defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
                        value={text}
                        size="large"
                        onClick={(e) => this.showModal(record, text, index)} />)
                }
            },
        ];

        const variable_costs_columns = [
            {
                title: 'Type',
                dataIndex: 'type_title',
                width: '24.8%',
            },
            {
                title: 'Name',
                dataIndex: 'type_name',
                width: '33.5%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'monthly_expenses',
                width: '24%',
                render: (text, record, index) => {
                    return (<Input
                        defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
                        value={String(text)}
                        size="large"
                        onClick={(e) => this.showModal(record, text, index)} />)
                }
            },
            {
                title: 'VAT Rate',
                dataIndex: 'vat',
                width: '17.7%',
                render: (text, record, index) => (
                    <Input.Group compact>
                        <Select defaultValue={text === null ? this.state.vats.standardRate : text} value={text === null ? this.state.vats.standardRate : text} onChange={e => this.onVariableChange(e, record, "vat", 0)}>
                            <Option value={this.state.vats.standardRate}>{this.state.vats.standardRate + "%"}</Option>
                            <Option value={this.state.vats.reducedRates2}>{this.state.vats.reducedRates2 + "%"}</Option>
                            <Option value={this.state.vats.reducedRates1}>{this.state.vats.reducedRates1 + "%"}</Option>
                            {/* <Option value={this.state.vats.superReducedRate}>{this.state.vats.superReducedRate === null ? "Null" : this.state.vats.superReducedRate}</Option> */}
                        </Select>
                    </Input.Group>
                )
            }
        ];
        return (
            <>
                <UnsavedChangesHeader
                    visibility={this.state.visibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                <Col span={20} offset={2}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space>Financial projections</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Fixed and Variables Costs</Text>
                            <TooltipComponent code="fixedvariablecosts" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.financialProjections.is_fixed_variable_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>
                <Col offset={2} span={20}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Fixed Costs" key="1">
                            {this.state.fixed.map((obj, index) => {
                                return (
                                    <div style={{ marginBottom: 24 }}>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={7}>
                                                    {index === 0 ?
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Fixed Costs</Typography.Title>
                                                            <Typography.Text style={{ ...textStyle }}>
                                                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                                                            </Typography.Text>
                                                        </div> : <div></div>}
                                                </Col>
                                                {/* returns second column with table */}
                                                {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                                                {obj.category_title === "Salaries" ? <Col span={17}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={fixed_salaries_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col> : <Col span={17}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={fixed_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col>}


                                            </Row>
                                        </Col>
                                    </div>)
                            })}
                        </TabPane>
                        <TabPane tab="Variable Costs" key="2">
                            {this.state.variable.map((obj, index) => {
                                return (
                                    <div style={{ marginBottom: 24 }}>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={7}>
                                                    {index === 0 ?
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Variable Costs</Typography.Title>
                                                            <Typography.Text style={{ ...textStyle }}>
                                                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                                                            </Typography.Text>
                                                        </div> : <div></div>}
                                                </Col>
                                                {/* returns second column with table */}
                                                {obj.category_title === "Salaries" ? <Col span={17}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={variable_salaries_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col> : <Col span={17}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={variable_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col>}

                                            </Row>
                                        </Col>
                                    </div>)
                            })}
                        </TabPane>
                    </Tabs>
                </Col>

                {this.state.variablePopUp.visible !== false ?
                    <VariableCostPopUp category_title={this.state.variablePopUp.category_title === null ? 'Yes' : this.state.variablePopUp.category_title}
                        visible={this.state.variablePopUp.visible} handleOk={this.handleOk} handleCancel={this.handleModalCancel} monthly_expenses={this.state.variablePopUp.values} record={this.state.variablePopUp.record}
                        businessPlanId={this.props.businessPlan.id} onVariableChange={this.onVariableChange} saveChanges={this.saveChanges} />
                    : null
                }
            </>
        )
    }
}

// selecting part of data from store. selecting states basically as with useSelector
//It is called every time the store state changes.
const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        financialProjections: state.financialProjections,
        country: state.countryShortCode,
        countryVats: state.countryVats,
    };

}
//connect function connect react component to redux store
//the functions it can use to dispatch actions to the store.
export default connect(mapStateToProps, { getSelectedPlanOverview, getCountryShortCode, getFinancialProjectionsCosts, getCountryVat, updateFixedAndVarCosts, saveState, refreshPlan, logout })(withRouter(FixedAndVariableCosts));
