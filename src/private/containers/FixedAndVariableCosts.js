import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import VariableCostPopUp from '../components/fixed_and_variable_costs/VariableCostPopUp';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getFinancialProjectionsCosts, updateFixedAndVarCosts, saveState, updateFixedCosts, updateVariableCosts, discardChanges,setItemsForSave,getWindowsState} from '../../appStore/actions/financialProjectionsActions';
import { getCountryVat } from '../../appStore/actions/vatsActions'
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import '../../css/FixedAndVarStyles.css'
import TooltipComponent from '../components/Tooltip';
import TextHelper from '../components/TextHelper';
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
        this.setState(prevState => ({
            variablePopUp: {
                ...prevState.variablePopUp,
                category_id: null,
                category_title: null,
                values: null,
                record: {},
                visible: false
            }
        }))
    }
    //passing prices array 
    handleOk = () => {
        this.setState(prevState => ({
            variablePopUp: {
                ...prevState.variablePopUp,
                category_id: null,
                category_title: null,
                values: null,
                record: {},
                visible: false
            }
        }))
    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getFinancialProjectionsCosts(this.props.businessPlan.id);
        });
    }


    discardChanges = () => {
        this.props.discardChanges();
        this.setState({
            visibleHeader: 'hidden'
        });
    }
    saveChanges = () => {
        // postObject for update
        this.props.setItemsForSave(() => {
            const postObject = {
                business_plan_id: this.props.businessPlan.id,
            }
            this.props.updateFixedAndVarCosts(postObject, () => {
                this.props.getWindowsState();
            });
        })
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

    onFixedChange = (value, record, inputName) => {
        if (inputName === "first_expenses") {
            const obj = {
                ...record,
                [inputName]: Number(value)
            }
            this.props.updateFixedCosts(inputName, value, obj)
        }else{
            const obj = {
                ...record,
                [inputName]: value
            }
            this.props.updateFixedCosts(inputName, value, obj)
            
        }
    }

    onVariableChange = (value, record, inputName) => {
        const obj = {
            ...record,
            [inputName]: value
        }
        this.props.updateVariableCosts(inputName, value, obj)
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getFinancialProjectionsCosts(this.props.businessPlan.id)
                        const obj = { id: this.props.businessPlan.id }
                        this.props.getCountryShortCode(obj, (data) => {
                            this.props.getCountryVat(this.props.country.countryShortCode, () => {
                                this.setState({
                                    vats: this.props.countryVats
                                });
                            });

                        });
                        this.monthsSet();
                       this.props.getTooltips(); 
                    });
                }
            } else {
                this.props.getFinancialProjectionsCosts(this.props.businessPlan.id)
                const obj = { id: this.props.businessPlan.id }
                this.props.getCountryShortCode(obj, (data) => {
                    this.props.getCountryVat(this.props.country.countryShortCode, () => {
                        this.setState({
                            vats: this.props.countryVats
                        });
                    });

                });
                this.monthsSet();
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }



    render() {
        // console.log(this.state.variable);
        // console.log(this.state.fixed);
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
                title: 'Euro/mo. without Labor taxes',
                dataIndex: 'price',
                width: '16.2%',
                render: (text, record, index) => (
                    <Input
                        // min={0}
                        size="large"
                        type={"number"}
                        className={"numInput"}
                        defaultValue={text === null ? 0 : text}
                        value={text === null?0:text}
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
                        <Select value={text === null ? 1 : text} onChange={e => this.onFixedChange(e, record, "first_expenses")}>
                            {this.state.selectedPeriod.map((value, index) => (
                                <Option value={value}>{value + "st mo."}</Option>
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
                title: 'Euro/mo. without Labor taxes',
                dataIndex: 'price',
                width: '24%',
                render: (text, record, index) => (
                    <Input
                        // min={0}
                        size="large"
                        type={"number"}
                        className={"numInput"}
                        defaultValue={text === null ? 0 : text}
                        value={text === null?0:text}
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
                        <Select value={text === null ? 1 : text} onChange={e => this.onFixedChange(e, record, "first_expenses")}>
                            {this.state.selectedPeriod.map((value, index) => (
                                <Option value={value}>{value + "st mo."}</Option>
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
                title: 'Euro/mo. without Labor taxes',
                dataIndex: 'monthly_expenses',
                width: '41.7%',
                render: (text, record, index) => {
                    return (<Input
                        defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
                        value={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : text }
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
                title: 'Euro/mo. without Labor taxes',
                dataIndex: 'monthly_expenses',
                width: '24%',
                render: (text, record, index) => {
                    return (<Input
                        defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
                        value={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : text}
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
                        <Select defaultValue={text === null ? this.state.vats.standardRate : text} value={text === null ? this.state.vats.standardRate : text} onChange={e => this.onVariableChange(e, record, "vat")}>
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
                    visibility={this.props.financialProjections.windows_state}
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
                            {this.props.financialProjections.fixed.map((obj, index) => {
                                return (
                                    <div style={{ marginBottom: 24 }}>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={8}>
                                                    {index === 0 ?
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Fixed Costs</Typography.Title>
                                                            <TextHelper code="fixedcost" type="lefttext" />
                                                        </div> : <div></div>}
                                                </Col>
                                                {/* returns second column with table */}
                                                {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                                                {obj.category_title === "Salaries" ? <Col span={16}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={fixed_salaries_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col> : <Col span={16}>
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
                            {this.props.financialProjections.variable.map((obj, index) => {
                                return (
                                    <div style={{ marginBottom: 24 }}>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={8}>
                                                    {index === 0 ?
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Variable Costs</Typography.Title>
                                                            <TextHelper code="variablecost" type="lefttext" />
                                                        </div> : <div></div>}
                                                </Col>
                                                {/* returns second column with table */}
                                                {obj.category_title === "Salaries" ? <Col span={16}>
                                                    <Table
                                                        rowKey="id"
                                                        columns={variable_salaries_costs_columns}
                                                        dataSource={obj.types}
                                                        pagination={false}
                                                        title={() => obj.category_title}
                                                    />
                                                </Col> : <Col span={16}>
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
                    <VariableCostPopUp
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
export default connect(mapStateToProps, { 
    getSelectedPlanOverview, 
    updateFixedCosts, 
    updateVariableCosts, 
    getCountryShortCode, 
    getFinancialProjectionsCosts, 
    getCountryVat, 
    updateFixedAndVarCosts, 
    saveState, 
    refreshPlan, 
    logout, 
    discardChanges,
    setItemsForSave,
    getWindowsState,
    getTooltips 
})(withRouter(FixedAndVariableCosts));
