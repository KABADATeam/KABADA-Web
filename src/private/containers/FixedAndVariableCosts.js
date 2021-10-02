import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getFinancialProjectionsCosts, getCountryShortCode, getCountryVat } from '../../appStore/actions/financialProjectionsActions';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import FixedCosts from '../components/fixed_and_variable_costs/FixedCosts';
import VariableCosts from '../components/fixed_and_variable_costs/VariableCosts';

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const titleTextStyle = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: '20px',
  lineHeight: "38px"
}

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
      vats: {}
    };
  }

  // const [price,setPrice] = useState({});
  // const [editingKey, setEditingKey] = useState('');


  // const businessPlan = useSelector((state) => state.selectedBusinessPlan)
  // const {id: busineessPlanId} = businessPlan;
  // const financialProjections = useSelector((state) => state.financialProjections)
  // const country = useSelector((state)=>state.countryShortCode)
  // const countryVats = useSelector((state)=> state.countryVats)
  // defining function
  onBackClick() {
    this.props.history.push(`/overview`);
  }

  componentDidMount() {
    if (this.props.businessPlan.id === null) {
      if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
        this.props.history.push(`/`);
      } else {
        this.props.refreshPlan(localStorage.getItem("plan"), () => {
          this.props.getFinancialProjectionsCosts(this.props.businessPlan.id);
          const obj = { id: this.props.businessPlan.id }
          this.props.getCountryShortCode(obj, (data) => {
            this.props.getCountryVat(this.props.country.shortCode);
            this.setState({
              vats: this.props.countryVats
            });
          })
        });
      }
    } else {
      this.props.getFinancialProjectionsCosts(this.props.businessPlan.id);
      const obj = { id: this.props.businessPlan.id }
      this.props.getCountryShortCode(obj, (data) => {
        // console.log('Country code in container:'+country.countryCode)
        console.log('Country code in container:' + JSON.stringify(this.props.country))
        this.props.getCountryVat(this.props.country.shortCode);
        this.setState({
          vats: this.props.countryVats
        });
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
          <Input value={text === null ? 0 : text} />
        )
      },
      {
        title: 'VAT Rate',
        dataIndex: 'vat',
        width: '10%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={this.props.countryVats.standardRate === undefined ? 'Null' : this.props.countryVats.standardRate}>
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
            <Select defaultValue={text === null ? "1st mo." : text}>
              <Option value={"1st mo."}>{"1st mo."}</Option>
              <Option value={"2nd mo."}>{"2nd mo."}</Option>
              <Option value={"3rd mo."}>{"3rd mo."}</Option>
              <Option value={"6th mo."}>{"6th mo."}</Option>
              <Option value={"1st y."}>{"1st y."}</Option>
              <Option value={"2nd y."}>{"2nd y."}</Option>
              <Option value={"3rd y."}>{"3rd y."}</Option>
              <Option value={"4th y."}>{"4th y."}</Option>
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
          <Input value={text === null ? 0 : text} />
        )
      },
      {
        title: 'VAT Rate',
        dataIndex: 'vat',
        width: '10%',
        render: (text, record, index) => (
          <Input.Group compact>
            <Select defaultValue={this.props.countryVats.standardRate === undefined ? 'Null' : this.props.countryVats.standardRate}>
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
            <Select defaultValue={text === null ? "1st mo." : text}>
              <Option value={"1st mo."}>{"1st mo."}</Option>
              <Option value={"2nd mo."}>{"2nd mo."}</Option>
              <Option value={"3rd mo."}>{"3rd mo."}</Option>
              <Option value={"6th mo."}>{"6th mo."}</Option>
              <Option value={"1st y."}>{"1st y."}</Option>
              <Option value={"2nd y."}>{"2nd y."}</Option>
              <Option value={"3rd y."}>{"3rd y."}</Option>
              <Option value={"4th y."}>{"4th y."}</Option>
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
              <FixedCosts financialProjections={this.props.financialProjections} countryVats={this.props.countryVats} countryShortCode={this.props.countryShortCode} planId={this.props.businessPlan.id} />
            </TabPane>
            <TabPane tab="Variable Costs" key="2">
              <VariableCosts financialProjections={this.props.financialProjections} countryVats={this.props.countryVats} countryShortCode={this.props.countryShortCode} planId={this.props.businessPlan.id} />
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
  // const businessPlan = useSelector((state) => state.selectedBusinessPlan)
  // const {id: busineessPlanId} = businessPlan;
  // const financialProjections = useSelector((state) => state.financialProjections)
  // const country = useSelector((state)=>state.countryShortCode)
  // const countryVats = useSelector((state)=> state.countryVats)
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
