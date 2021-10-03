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
        this.props.getCountryVat(this.props.country.shortCode);
        this.setState({
          vats: this.props.countryVats
        });
      });
    }
  }


  render() {
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
