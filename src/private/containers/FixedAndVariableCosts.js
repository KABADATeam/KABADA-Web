import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber,Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined,InfoCircleFilled } from '@ant-design/icons';
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import VariableCostPopUp from '../components/fixed_and_variable_costs/VariableCostPopUp';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getFinancialProjectionsCosts, updateFixedAndVarCosts } from '../../appStore/actions/financialProjectionsActions';
import {getCountryVat} from '../../appStore/actions/vatsActions'
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import '../../css/FixedAndVarStyles.css'

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
      fixed_costs: [],
      variable_costs: [],
      price: {},
      vats: {},
      selectedPeriod: [],
      cost_items: [],
      original_cost_items: [],
      variablePopUp: {
        category_id: null,
        category_title: null,
        record: {},
        values: null,
        visible: false
      },
      visibleHeader: 'hidden'
    };
  }
  showModal = (record, data, index) => {
    // creating object which will hold visible value,category_id and ...
    console.log('Fixed and costs monthly_expenses:'+JSON.stringify(data))
    const obj = {
      category_id: null,
      category_title: null,
      values: data,
      record: {},
      visible: true
    }
    const items = this.state.cost_items;
    items.forEach(element => {
      if (element.cost_item_id === record.cost_item_id) {
        obj.category_id = element.category_id;
        obj.category_title = element.category_title;
        obj.record = record
      }
    })

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
  handleOk = (array, record) => {
    const obj = {
      category_id: null,
      category_title: null,
      values: null,
      record: {},
      visible: false
    }
    this.setState({
      variablePopUp: obj,
    });
  }

  onBackClick() {
    this.props.history.push(`/overview`);
  }

  saveChanges = () => {
    // loop through cost_items state array. put only required fields to items array
    const items = []
    const array = this.state.cost_items;
    array.map((element, index) => {
      if (element.type === "Variable") {
        const obj = {
          cost_item_id: element.cost_item_id,
          price: element.price,
          vat: element.vat,
          first_expenses: element.first_expenses,
          monthly_expenses: element.monthly_expenses,
        }
        items.push(obj)
      } else if(element.type === 'Fixed') {
        const obj = {
          cost_item_id: element.cost_item_id,
          price: element.price,
          vat: element.vat,
          first_expenses: element.first_expenses,
          monthly_expenses: element.monthly_expenses
        }
        items.push(obj);
      }
    })
    // postObject for post request
    const postObject = {
      business_plan_id: this.props.businessPlan.id,
      cost_items: items
    }
    this.props.updateFixedAndVarCosts(postObject);
    this.setState({
      visibleHeader: 'hidden'
    });
  }

  discardChanges = () => {
    console.log('Discarding changes')
  }

  //setting array of months available
  monthsSet = () => {
    const months = []
    for (var a = 1; a < 13; a++) {
      months.push(a);
    }
    this.setState({
      selectedPeriod: months,
    })
  }
  // function to get cost_items array. which is basically array
  // which consist of all fixed and variable costs. they are connected to cost_items array(state)
  // which i later change based on user input
  setItems = (fixedArray, variableArray) => {
    const array = []
    var indexas = 0;
    //looping through fixed array and pushing all items to array
    fixedArray.forEach(element => {
      // for each object in types array create new object and add it to array
      element.types.forEach(element1 => {
        const obj = {
          type: 'Fixed',
          name: element.type_title,
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          type_title: element1.type_title,
          pos: indexas,
          first_expenses: element1.first_expenses === null ? 1 : element1.first_expenses,
          monthly_expenses: element1.monthly_expenses,
        }
        array.push(obj);
        indexas = indexas + 1;
      });
    });
    //looping through variable array and pushing all items to array. so now array will have
    //both fixed and variable costs
    variableArray.forEach(element => {
      element.types.forEach(element1 => {
        const obj = {
          type: 'Variable',
          name: element.type_title,
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          type_title: element1.type_title,
          pos: indexas,
          first_expenses: element1.first_expenses === null ? 1 : element1.first_expenses,
          monthly_expenses: element1.monthly_expenses
        }
        array.push(obj);
        indexas = indexas + 1;
      })
    })

    this.setState({
      cost_items: array,
    });
  }
  // function to get original_cost_items array. which is basically array
  // which consist of all fixed and variable costs. they are connected to original_cost_items array(state).
  // this array doesnt change. i later compare cost_items and original_cost_items to display UnsavedChangesHeader
  getOriginalCostArray = (fixedArray, variableArray) => {
    const array = []
    //looping through fixed array and pushing all items to array
    var indexas = 0;
    fixedArray.forEach(element => {
      // for each object in types array create new object and add it to array
      element.types.forEach(element1 => {
        const obj = {
          type: 'Fixed',
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          type_title: element1.type_title,
          pos: indexas,
          first_expenses: element1.first_expenses === null ? 1 : element1.first_expenses,
          monthly_expenses: element1.monthly_expenses
        }
        array.push(obj)
        indexas = indexas + 1;
      });
    });
    //looping through variable array and pushing all items to array. so now array will have
    //both fixed and variable costs
    variableArray.forEach(element => {
      element.types.forEach(element1 => {
        const obj = {
          type: 'Variable',
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          type_title: element1.type_title,
          pos: indexas,
          first_expenses: element1.first_expenses === null ? 1 : element1.first_expenses,
          monthly_expenses: element1.monthly_expenses
        }
        array.push(obj);
        indexas = indexas + 1;
      })
    })

    this.setState({
      original_cost_items: array
    })
  }
  //to update state (cost_items) which holds both variable and fixed costs
  updateCostItemsProperties = (value, record, inputName) => {
    const array = this.state.cost_items;
    // loop though each object in cost_items array. check for item with given id
    //update price,firstexpenses, or vat rate fields. depending on given input name
    array.forEach(element => {
      if (element.cost_item_id === record.cost_item_id) {
        if (inputName === "price") {
          element.price = Number(value);
        } else if (inputName === "vat") {
          element.vat = value;
        } else if (inputName === "first_expenses") {
          // get first character of string ('1st mo.). convert '1' to number
          const st = value.charAt(0);
          element.first_expenses = Number(st)
        }
      }
    });
    
    this.setState({
      cost_items: array
    });

    const visibilityString = this.getUpdatesWindowState();
    this.setState({
      visibleHeader: visibilityString
    });

    console.log(JSON.stringify(this.state.cost_items))
    console.log('Original'+JSON.stringify(this.state.original_cost_items))
  
  }
  // function to check if cost_items array value are equal to original_cost_items
  // if it doesnt equal then return false. and then i would be able to display UnsavedChangesHeader component to
  // save or discard changes
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
    for (var i = 0; i < original.length; ++i) {
      if (original[i].price !== modified[i].price || original[i].vat !== modified[i].vat || original[i].first_expenses !== modified[i].first_expenses) {
        // console.log('Original price:' + original[i].price + ", modified price is: " + modified[i].price)
        console.log('They are not equal')
        return false;
      }
    }
    return true;
  }

  // method to check if UnsavedChangesHeader should be visible or not.
  // with help of arrayEqual method i can compare if cost_items is equal or not to 
  // original array.
  getUpdatesWindowState() {
    const original = this.state.original_cost_items;
    const modified = this.state.cost_items;

    if (original === null) {
      return 'hidden';
    }
    if (modified === null) {
      return 'hidden';
    }
    if (this.arraysEqual(original, modified) === false) {
      return 'visible';
    }
    return 'hidden';
  }


  componentDidMount() {
    if (this.props.businessPlan.id === null) {
      if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
        this.props.history.push(`/`);
      } else {
        this.props.refreshPlan(localStorage.getItem("plan"), () => {
          this.props.getFinancialProjectionsCosts(this.props.businessPlan.id, () => {
            const obj = { id: this.props.businessPlan.id }
            this.props.getCountryShortCode(obj, (data) => {
              this.props.getCountryVat(this.props.country.countryShortCode);
              this.setState({
                vats: this.props.countryVats
              });
            });
            this.getOriginalCostArray(this.props.financialProjections.fixed, this.props.financialProjections.variable);
            this.setItems(this.props.financialProjections.fixed, this.props.financialProjections.variable);
            this.monthsSet();
          });

        });
      }
    } else {
      this.props.getFinancialProjectionsCosts(this.props.businessPlan.id, () => {
        const obj = { id: this.props.businessPlan.id }
        this.props.getCountryShortCode(obj, (data) => {
          this.props.getCountryVat(this.props.country.countryShortCode);
          this.setState({
            vats: this.props.countryVats
          });
        });
        this.getOriginalCostArray(this.props.financialProjections.fixed, this.props.financialProjections.variable);
        this.setItems(this.props.financialProjections.fixed, this.props.financialProjections.variable);
        this.monthsSet();
      });
    }
  }


  render() {
    //everytime screen rerenders it will call getUpdatesWindowState method which set const isVisibleHeader to 'visible' or 'hidden'
    const fixed_costs_columns = [
      {
        title: 'Name',
        dataIndex: 'type_title',
        width: '55%',
      },
      {
        title: 'Euro/mo. without VAT',
        dataIndex: 'price',
        width: '20%',
        render: (text, record, index) => (
          <Input
            // min={0}
            // size="large"
            type={"number"}
            className={"numInput"}
            defaultValue={text === null ? 0 : text}
            onChange={e => this.updateCostItemsProperties(e.target.value, record, "price")}
          />
        )
      },
      {
        title: 'VAT Rate',
        dataIndex: 'vat',
        width: '10%',
        render: (text, record, index) => (
          <Select defaultValue={text === null ? 'Null' : text} onChange={e => this.updateCostItemsProperties(e, record, "vat")}>
            <Option value={this.props.countryVats.standardRate}>{this.props.countryVats.standardRate + "%"}</Option>
            <Option value={this.props.countryVats.reducedRates2}>{this.props.countryVats.reducedRates2 + "%"}</Option>
            <Option value={this.props.countryVats.reducedRates1}>{this.props.countryVats.reducedRates1 + "%"}</Option>
            <Option value={this.props.countryVats.superReducedRate}>{this.props.countryVats.superReducedRate === null ? "Null" : this.props.countryVats.superReducedRate}</Option>
          </Select>
        )
      },
      {
        title: 'First expenses',
        dataIndex: 'first_expenses',
        width: '15%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={text === null ? "1st mo." : text + "st mo."} onChange={e => this.updateCostItemsProperties(e, record, "first_expenses")}>
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
        title: 'Name',
        dataIndex: 'type_title',
        width: '55%',
      },
      {
        title: 'Euro/mo. without VAT',
        dataIndex: 'price',
        width: '20%',
        render: (text, record, index) => (
          <Input
            // min={0}
            // size="large"
            type={"number"}
            className={"numInput"}
            defaultValue={text === null ? 0 : text}
            onChange={e => this.updateCostItemsProperties(e.target.value, record, "price")}
          />
        )
      },
      {
        title: 'First expenses',
        dataIndex: 'first_expenses',
        width: '15%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={text === null ? "1st mo." : text + "st mo."} onChange={e => this.updateCostItemsProperties(e, record, "first_expenses")}>
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
        title: 'Name',
        dataIndex: 'type_title',
        width: '65%',
      },
      {
        title: 'Euro/mo. without VAT',
        dataIndex: 'monthly_expenses',
        width: '35%',
        render: (text, record, index) => {
          return (<Input
            defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
            value={text}
            onClick={(e) => this.showModal(record, text, index)} />)
        }
      },
    ];

    const variable_costs_columns = [
      {
        title: 'Name',
        dataIndex: 'type_title',
        width: '55%',
      },
      {
        title: 'Euro/mo. without VAT',
        dataIndex: 'monthly_expenses',
        width: '20%',
        render: (text, record, index) => {
          return (<Input
            defaultValue={text === null ? '0,0,0,0,0,0,0,0,0,0,0,0' : String(text)}
            value={text}
            onClick={(e) => this.showModal(record, text, index)} />)
        }
      },
      {
        title: 'VAT Rate',
        dataIndex: 'vat',
        width: '10%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={text === null ? 'Null' : text} onChange={e => this.updateCostItemsProperties(e, record, "vat")}>
              <Option value={this.props.countryVats.standardRate}>{this.props.countryVats.standardRate + "%"}</Option>
              <Option value={this.props.countryVats.reducedRates2}>{this.props.countryVats.reducedRates2 + "%"}</Option>
              <Option value={this.props.countryVats.reducedRates1}>{this.props.countryVats.reducedRates1 + "%"}</Option>
              <Option value={this.props.countryVats.superReducedRate}>{this.props.countryVats.superReducedRate === null ? "Null" : this.props.countryVats.superReducedRate}</Option>
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
        <Col span={16} offset={4}>
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
        <Row align="middle" styke={{ marginTop: "9px" }}>
          <Col span={12} offset={4}>
            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
              <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
              <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Fixed and Variables Costs</Text>
              <Tooltip title="Tooltip text">
                <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
              </Tooltip>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
              <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={false} />
            </div>
          </Col>
        </Row>

        <Col span={16} offset={4}>
          <Divider />
        </Col>
        <Col offset={4} span={16}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Fixed Costs" key="1">
              {this.props.financialProjections.fixed.map((obj, index) => {
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
                        {obj.category_title === "Salaries"?<Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={fixed_salaries_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
                        </Col>:<Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={fixed_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
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
                        {obj.category_title === "Salaries"?<Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={variable_salaries_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
                        </Col>:<Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={variable_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
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
            cost_items={this.state.cost_items} businessPlanId={this.props.businessPlan.id}/>
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
export default connect(mapStateToProps, { getSelectedPlanOverview, getCountryShortCode, getFinancialProjectionsCosts, getCountryVat, updateFixedAndVarCosts, refreshPlan })(withRouter(FixedAndVariableCosts));
