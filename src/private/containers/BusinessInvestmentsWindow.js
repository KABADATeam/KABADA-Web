import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tab, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, RightSquareFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import WorkingCapital from '../components/businessFinancialInvestments/WorkingCapital';
import BusinessFinancing from '../components/businessFinancialInvestments/BusinessFinancing';
import { getBusinessStartUpInvestmentInformation } from "../../appStore/actions/businessInvestmentAction";
import { getCountryShortCode } from '../../appStore/actions/countriesActions';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'

const { Text } = Typography;
const { TabPane } = Tabs

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
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

class BusinessInvestmentsWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }
    //get physical and intellectual assets
    

    getUpdatesWindowState(value) {
        if (value === false) {
            return 'visible'
        } else if (value === true) {
            return 'hidden'
        } else {
            return 'hidden'
        }
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id)
                    const obj = { id: this.props.businessPlan.id }
                    this.props.getCountryShortCode(obj, (data) => {
                        this.props.getCountryVat(this.props.country.countryShortCode);
                        this.setState({
                            vats: this.props.countryVats
                        });
                    });
                });
            }
        } else {
            this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlan.id)

        }
    }


    render() {
        return (
            <>
                <UnsavedChangesHeader
                    visibility={this.state.visibleHeader}
                //discardChanges={this.discardChanges}
                //saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Financial projections
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Business start-up investments</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch />
                        </div>
                    </Col>
                </Row>
                <Col span={16} offset={4}>
                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab="Working capital" key="1">
                            <WorkingCapital data={this.props.investments}/>
                        </TabPane>
                        <TabPane tab="Business Financing" key="2">
                            <BusinessFinancing data={this.props.investments}/>
                        </TabPane>
                    </Tabs>
                </Col>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        countryCode: state.countryShortCode,
        countryVats: state.countryVats,
        investments: state.businessInvestments

    };
}
export default connect(mapStateToProps, { refreshPlan, getBusinessStartUpInvestmentInformation, getCountryShortCode })(BusinessInvestmentsWindow);