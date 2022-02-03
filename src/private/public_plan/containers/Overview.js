import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getSelectedPlanOverview, getImage, getSelectedPlanDetails } from "../../../appStore/actions/planActions";
import { withRouter } from 'react-router-dom';
import TooltipComponent from '../../components/Tooltip';
import IndustryDataComponent from '../components/IndustryDataComponent';

const { TabPane } = Tabs;
const { Text } = Typography;

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}
const descriptionTextStyle = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px"
}
const pageTitleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
}
const titleButtonStyle = {
    width: "40px",
    height: "40px",

    border: "1px solid #BFBFBF",
    boxSizing: "border-box",

    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent"
}

const avatarStyle = {
    width: "24px",
    height: "24px",
    marginTop: "10px"
}
const canvasElementTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "22px",
    color: '#262626'
}
const financialAvatarStyle = {
    width: "24px",
    height: "24px",
    marginTop: "0px"
}

const financialTitlePositionStyle = {
    float: 'left',
    display: 'inline-flex',
    alignItems: 'center'
}

const financialTitleButtonPositionStyle = {
    float: 'right',
    display: 'inline-flex',
    alignItems: 'center'
}

class PublicOverview extends React.Component {

    onBackClick() {
        this.props.history.push(`/public-business-plans`);
    }

    componentDidMount() {
        /*if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("public_plan"), () => {
                    this.props.getSelectedPlanOverview(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);

        }*/
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPublicPlan(localStorage.getItem("public_plan"), () => {
                    this.props.getSelectedPlanOverview(this.props.businessPlan.id)
                        .then(() => {
                            if (this.props.businessPlan.overview.planImage)
                                this.props.getImage({ ...this.props.businessPlan, "planImage": this.props.businessPlan.overview.planImage });
                        });
                });
            }
        } else {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id)
                .then(() => {
                    if (this.props.businessPlan.overview.planImage)
                        this.props.getImage({ ...this.props.businessPlan, "planImage": this.props.businessPlan.overview.planImage });
                });
        }
    }

    render() {
        const overview = this.props.businessPlan.overview;

        if (this.props.loading === true || this.props.businessPlan.overview === undefined) {
            return (<div></div>)
        } else {
            let image = {};
            if (this.props.imageLoading === false) {
                image = <Card style={{
                    width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 252, 0) 62%, rgba(255, 255, 255, 1) 38%), ' + (this.props.businessPlan.coverImage ? `url(${this.props.businessPlan.coverImage})` : `url(businessPlan.webp)`),
                    objectFit: 'cover', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top',
                }}>
                    <h4 style={{ marginTop: '150px' }}>Cover image</h4>
                </Card>
            } else {
                image = <div></div>
            }

            return (
                <>
                    <Col span={20} offset={2}>
                        <Breadcrumb style={{ marginTop: "40px" }}>
                            <Breadcrumb.Item>
                                <Space><Link to='/public-business-plans'>Public business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

                    <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                        <Col span={20} offset={2}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>{this.props.businessPlan.name}</Text>
                                <Tag color="#BAE7FF" style={{ borderRadius: 50, color: "#262626", marginLeft: '10px' }}> {this.props.businessPlan.percentage}% Completed</Tag>
                            </div>
                        </Col>
                    </Row>

                    <Col span={20} offset={2}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Business plan" key="1">
                                <Row style={{ marginBottom: "40px" }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={18}>
                                        <List itemLayout='horizontal' style={{ height: '78px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='1'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 16px' }}
                                                    avatar={<Avatar src="complete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Button style={{ paddingLeft: '0px', ...pageTitleTextStyle }} type="text" >Plan {this.props.businessPlan.name}</Button>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>{this.props.businessPlan.activityCode === "" || this.props.businessPlan.activityCode === null ? "NACE: " : "NACE: " + this.props.businessPlan.activityCode}</Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        </List>
                                        <List
                                            header={
                                                <>
                                                    <Text style={{ ...pageTitleTextStyle, marginLeft: '20px' }}>
                                                        Business canvas
                                                    </Text>
                                                    <TooltipComponent code="ovmbp1" type="text" />
                                                </>
                                            }
                                            style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='2'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.value_proposition_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/value-propositions' style={canvasElementTextStyle}>Value proposition</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.value_proposition_description === "" ? "Proposed products" : this.props.businessPlan.value_proposition_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='3'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.customer_segments_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/customer-segments' style={canvasElementTextStyle}>Customer segments</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.customer_segments_description === "" ? "Customer segments" : this.props.businessPlan.customer_segments_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='4'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.channels_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/channels' style={canvasElementTextStyle}>Channels</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.channels_description === null ? "Channels list" : this.props.businessPlan.channels_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='5'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.customer_relationship_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/customer-relationships' style={canvasElementTextStyle}>Customer relationships</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.customer_relationship_description === "" ? "Customer relationships" : this.props.businessPlan.customer_relationship_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='6'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.revenue_streams_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/revenue-streams' style={canvasElementTextStyle}>Revenue streams</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.revenue_streams_description === "" ? "Customer segments revenue streams" : this.props.businessPlan.revenue_streams_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='7'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_resources_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/key-resources' style={canvasElementTextStyle}>Key resources</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_resources_description === "" ? "Key resources list" : this.props.businessPlan.key_resources_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='8'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_activities_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/key-activities' style={canvasElementTextStyle}>Key activities</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_activities_description === "" ? "Key activities list" : this.props.businessPlan.key_activities_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='9'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_partners_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/key-partners' style={canvasElementTextStyle}>Key partners</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_partners_description === null ? "Key partners list" : this.props.businessPlan.key_partners_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                            <List.Item key='10'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.cost_structure_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/public/cost-structure' style={canvasElementTextStyle}>Cost structure</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.cost_structure_description === "" ? "Fixed and variable costs" : this.props.businessPlan.cost_structure_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        </List>
                                        <List itemLayout='horizontal' style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='11'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 16px' }}
                                                    avatar={this.props.businessPlan.swot_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row >
                                                                <Col>
                                                                    <Link to='/public/swot' style={canvasElementTextStyle}>SWOT</Link>
                                                                </Col>
                                                                <Col>
                                                                    <TooltipComponent code="ovmbp3" type="text" />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>{this.props.businessPlan.swot_description === "" || this.props.businessPlan.swot_description === null ? "Strengths/Weaknesses and Threats/Oportunities" : this.props.businessPlan.swot_description}</Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        </List>

                                        <List
                                            header={
                                                <>
                                                    <Text style={{ ...pageTitleTextStyle, marginLeft: '20px' }}>
                                                        Financial projections
                                                    </Text>
                                                    <TooltipComponent code="ovmbp2" type="text" />
                                                </>}
                                            style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}
                                        >
                                            <List.Item key='12'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    description={
                                                        <div>
                                                            <Row>
                                                                <Col span={1}>
                                                                    {this.props.businessPlan.assets_state === true ? <Avatar src="complete.png" style={financialAvatarStyle} /> : <Avatar src="incomplete.png" style={financialAvatarStyle} />}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Link to='/public/assets' style={canvasElementTextStyle}>Assets</Link>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                            <List.Item key='13'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    description={
                                                        <div>
                                                            <Row>
                                                                <Col span={1}>
                                                                    {this.props.businessPlan.fixed_and_variables_costs_state === true ? <Avatar src="complete.png" style={financialAvatarStyle} /> : <Avatar src="incomplete.png" style={financialAvatarStyle} />}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Link to="/public/fixed-and-variable-costs" style={canvasElementTextStyle}>Fixed and Variable Costs</Link>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                            <List.Item key='14'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    description={
                                                        <div>
                                                            <Row>
                                                                <Col span={1}>
                                                                    {this.props.businessPlan.sales_forecast_state === true ? <Avatar src="complete.png" style={financialAvatarStyle} /> : <Avatar src="incomplete.png" style={financialAvatarStyle} />}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Link to="/public/sales-forecast" style={canvasElementTextStyle}>Sales Forecast</Link>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                            <List.Item key='15'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    description={
                                                        <div>
                                                            <Row>
                                                                <Col span={1}>
                                                                    {this.props.businessPlan.business_start_up_investments_state === true ? <Avatar src="complete.png" style={financialAvatarStyle} /> : <Avatar src="incomplete.png" style={financialAvatarStyle} />}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Link to="/public/business-start-up-investments" style={canvasElementTextStyle}>Business start-up investments</Link>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                            <List.Item key='16'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    description={
                                                        <div>
                                                            <Row>
                                                                <Col span={1}>
                                                                    {this.props.businessPlan.assets_state === true && this.props.businessPlan.fixed_and_variables_costs_state === true && this.props.businessPlan.sales_forecast_state === true && this.props.businessPlan.business_start_up_investments_state === true ? <Avatar src="complete.png" style={financialAvatarStyle} /> : <Avatar src="incomplete.png" style={financialAvatarStyle} />}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Link to="/public/cash-flow" style={canvasElementTextStyle}>Cash Flow</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <div style={{ ...financialTitleButtonPositionStyle, marginRight: '0px' }}>
                                                                        <Button style={{ borderRadius: '4px' }}><Link to="/public/cash-flow" style={canvasElementTextStyle}>See cash flow</Link></Button>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                        </List>
                                    </Col>
                                    <Col span={6}>
                                        <Card
                                            style={{
                                                height: '246px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                                                backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 252, 0) 62%, rgba(255, 255, 255, 1) 38%), ' + (this.props.businessPlan.coverImage ? `url(${this.props.businessPlan.coverImage})` : `url(businessPlan.webp)`),
                                                objectFit: 'cover', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top',
                                            }}>
                                            <h4 style={{ marginTop: '145px', marginBottom: 0, fontSize: '16px' }}>Cover image</h4>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Industry data" key="2">
                                <IndustryDataComponent />
                            </TabPane>
                            <TabPane tab="Industry risks" key="3">
                                <Row style={{ marginBottom: "50px" }}>
                                    <Col span={8}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={aboutTitleTextStyle}>Industry risks</Typography.Title>
                                        </div>
                                    </Col>
                                    <Col span={16}>

                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        loading: state.loading,
        imageLoading: state.imageLoading
    };
}

export default connect(mapStateToProps, { refreshPublicPlan, getSelectedPlanOverview, getImage, getSelectedPlanDetails })(withRouter(PublicOverview))