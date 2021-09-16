import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import { withRouter } from 'react-router-dom';

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

class Overview extends React.Component {

    onBackClick() {
        this.props.history.push(`/public-business-plans`);
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("public_plan"), () => {
                    this.props.getSelectedPlanOverview(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        }
    }

    render() {
        const overview = this.props.businessPlan.overview;
        console.log(overview);

        
        


        if (this.props.loading === true || this.props.businessPlan.overview === undefined) {
            return (<div></div>)
        } else {
            let image = {};
            if (this.props.imageLoading === false) {
                image = <Card style={{width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                            backgroundImage: this.props.businessPlan.coverImage === null? `url(../businessPlan.webp)` : `url(${this.props.businessPlan.coverImage})`,
                            backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" }}>
                            <h4 style={{ marginTop: '150px'}}>Cover image</h4>
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
                        <Col span={12} offset={2}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>{this.props.businessPlan.name}</Text>
                                <Tag color="#BAE7FF" style={{borderRadius: 50, color: "#262626", marginLeft: '10px'}}> {this.props.businessPlan.percentage}% Completed</Tag>
                            </div>
                        </Col>
                        <Col span={4}>
                            
                        </Col>
                    </Row>

                    <Col span={20} offset={2}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Business plan" key="1">
                                <Row style={{ marginBottom: "50px" }}>
                                    <Col span={18}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Card title="Business canvas" style={{ marginTop: '10px' }}>
                                                <List>
                                                    <List.Item key='1' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.customer_segments.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/public/customer-segments'>Customer segments</Link></Space>}
                                                            description={overview.customer_segments.description} />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='2' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.value_proposition.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/value-propositions'>Value proposition</Link></Space>}
                                                            description={overview.value_proposition.description === "" ? "Proposed products" : overview.value_proposition.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='3' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.channels.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/channels'>Channels</Link></Space>}
                                                            description={overview.channels.description === "" || overview.channels.description === null ? "Distribution channels" : overview.channels.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='4' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.customer_relationship.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/customer-relationships'>Customer relationships</Link></Space>}
                                                            description={overview.customer_relationship.description === "" || overview.customer_relationship.description === null ? "Customer relations management" : overview.customer_relationship.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='5' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.revenue_streams.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/revenue-streams'>Revenue streams</Link></Space>}
                                                            description={overview.revenue_streams.description === "" || overview.revenue_streams.description === null ? "Customer segments revenue streams" : overview.revenue_streams.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='6' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.key_resources.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/key-resources'>Key resources</Link></Space>}
                                                            description={overview.key_resources.description === "" || overview.key_resources.description === null ? "Key resources list" : overview.key_resources.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='7' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.key_activities.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/key-activities'>Key activities</Link></Space>}
                                                            description={overview.key_activities.description === "" || overview.key_activities.description === null ? "Key activities list" : overview.key_activities.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='8' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.key_partners.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/key-partners'>Key partners</Link></Space>}
                                                            description={overview.key_partners.description === "" || overview.key_partners.description === null ? "Key partners list" : overview.key_partners.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                    <List.Item key='9' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.cost_structure.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/cost-structure'>Cost structure</Link></Space>}
                                                            description={overview.cost_structure.description === "" || overview.cost_structure.description === null ? "Fixed and variable costs" : overview.cost_structure.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                </List>
                                            </Card>
                                            <Card style={{ marginTop: '10px' }}>
                                                <List>
                                                    <List.Item key='10' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={false === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title="Financial projections"
                                                            description="Description goes here" />
                                                        <div>...</div>
                                                    </List.Item>
                                                </List>
                                            </Card>
                                            <Card style={{ marginTop: '10px' }}>
                                                <List>
                                                    <List.Item key='11' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={overview.swot.is_completed === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title={<Space><Link to='/swot'>SWOT</Link></Space>}
                                                            description={overview.swot.description === "" || overview.swot.description === null ? "Strengths/Weaknesses and Threats/Oportunities" : overview.swot.description } />
                                                        <div>...</div>
                                                    </List.Item>
                                                </List>
                                            </Card>
                                            <Card style={{ marginTop: '10px' }}>
                                                <List >
                                                    <List.Item key='12' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                        <List.Item.Meta
                                                            avatar={false === true ? <Avatar src="../complete.png" style={avatarStyle} />: <Avatar src="../incomplete.png" style={avatarStyle} />}
                                                            title="Team and competencies"
                                                            description="Description goes here" />
                                                        <div>...</div>
                                                    </List.Item>
                                                </List>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        {image}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Industry data" key="2">
                                <Row style={{ marginBottom: "50px" }}>
                                    <Col span={8}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={aboutTitleTextStyle}>Industry data</Typography.Title>
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        
                                    </Col>
                                </Row>
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

export default connect(mapStateToProps, { refreshPlan, getSelectedPlanOverview })(withRouter(Overview))