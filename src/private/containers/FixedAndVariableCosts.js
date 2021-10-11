import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getFinancialProjectionsCosts, getCountryVat } from '../../appStore/actions/financialProjectionsActions';
import { getCountryShortCode } from '../../appStore/actions/countriesActions'
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";

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
    };
  }
  onBackClick() {
    this.props.history.push(`/overview`);
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
  // Settomg array of fixed costs. just restructuring to be simplier
  setItems = (fixedArray, variableArray) => {
    // console.log('SetItems function'+JSON.stringify(fixedArray))
    const array = []
    //looping through fixed array and pushing all items to array
    fixedArray.forEach(element => {
      // for each object in types array create new object and add it to array
      element.types.forEach(element1 => {
        const obj = {
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          first_expenses: element1.first_expenses
        }
        array.push(obj)
      });
    });
    //looping through variable array and pushing all items to array. so now array will have
    //both fixed and variable costs
    variableArray.forEach(element => {
      element.types.forEach(element1 => {
        const obj = {
          category_title: element.category_title,
          category_id: element.category_id,
          cost_item_id: element1.cost_item_id,
          price: element1.price === null ? 0 : element1.price,
          vat: element1.vat,
          first_expenses: element1.first_expenses
        }
        array.push(obj)
      })
    })

    this.setState({
      cost_items: array
    });
    console.log('Fixed and Variable array array' + JSON.stringify(this.state.cost_items))

  }

  updateCostItemsProperties = (value, record, inputName) => {
    const array = this.state.cost_items;
    // loop though each object in cost_items array. check for item with given id
    //update price,firstexpenses, or vat rate fields. depending on given input name
    array.forEach(element => {
      if (element.cost_item_id === record.cost_item_id) {
        if (inputName === "price") {
          element.price = value;
        } else if (inputName === "vat") {
          element.vat = value;
        } else if (inputName === "first_expenses") {
          element.first_expenses = value;
        }
      }
    });
    this.setState({
      cost_items: array
    });
    // props.changeItemsCosts(array);
    console.log(JSON.stringify(this.state.cost_items));

    //if array is not equal to original one then
    // if (arraysEqual(original_items, array) === false) {
    //     props.setSaveVisible();
    // }
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
            console.log(JSON.stringify(this.props.financialProjections.fixed))
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
        console.log(JSON.stringify(this.props.financialProjections.fixed))
        this.setItems(this.props.financialProjections.fixed, this.props.financialProjections.variable);
        this.monthsSet();
      });
    }
  }


  render() {
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
          <InputNumber
            min={0}
            size="large"
            defaultValue={text === null ? 0 : text}
            onChange={e => this.updateCostItemsProperties(e, record, "price")}
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
            <Select defaultValue={text === null ? "1st mo." : text} onChange={e => this.updateCostItemsProperties(e, record, "first_expenses")}>
              {this.state.selectedPeriod.map((value, index) => (
                <Option value={value + "mo."}>{value + "mo."}</Option>
              ))}
            </Select>
          </Input.Group>
        )
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
        dataIndex: 'price',
        width: '20%',
        render: (text, record, index) => (
          <InputNumber
            min={0}
            size="large"
            defaultValue={text === null ? 0 : text}
            onChange={e => this.updateCostItemsProperties(e, record, "price")}
          />
        )
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
      },
      {
        title: 'First expenses',
        dataIndex: 'first_expenses',
        width: '15%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={text === null ? "1st mo." : text} onChange={e => this.updateCostItemsProperties(e, record, "first_expenses")}>
              <Option value={"1st mo."}>{"1st mo."}</Option>
              <Option value={"2nd mo."}>{"2nd mo."}</Option>
              <Option value={"3rd mo."}>{"3rd mo."}</Option>
              <Option value={"4th mo."}>{"4th mo."}</Option>
              <Option value={"5th mo."}>{"5th mo."}</Option>
              <Option value={"6th mo."}>{"6th mo."}</Option>
              <Option value={"7th mo."}>{"7th mo."}</Option>
              <Option value={"8th mo."}>{"8th mo."}</Option>
              <Option value={"9th mo."}>{"9th mo."}</Option>
              <Option value={"10th mo."}>{"10th mo."}</Option>
              <Option value={"11th mo."}>{"11th mo."}</Option>
              <Option value={"11th mo."}>{"11th mo."}</Option>
              <Option value={"12th mo."}>{"12th mo."}</Option>
            </Select>
          </Input.Group>
        )
      },
    ];
    return (
      <>
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
                        <Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={fixed_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
                        </Col>

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
                        <Col span={17}>
                          <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                              rowKey="id"
                              columns={variable_costs_columns}
                              dataSource={obj.types}
                              pagination={false}
                              title={() => obj.category_title}
                            />
                          </Card>
                        </Col>

                      </Row>
                    </Col>
                  </div>)
              })}
            </TabPane>
          </Tabs>
        </Col>
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
export default connect(mapStateToProps, { getSelectedPlanOverview, getCountryShortCode, getFinancialProjectionsCosts, getCountryVat, refreshPlan })(withRouter(FixedAndVariableCosts));
