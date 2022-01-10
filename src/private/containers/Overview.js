import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space, Select, Avatar, Dropdown, Menu, message, Popconfirm, Collapse, Tooltip, Steps, Divider } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusSquareOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { discardChanges, saveChanges } from "../../appStore/actions/swotAction";
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { updateStatus, getMembers, deleteMember, getSelectedPlanOverview, getSelectedPlanDetails, getImage, removePlan, downloadDOCFile, downloadPDFFile, downloadCashFlow } from "../../appStore/actions/planActions";
import { getSurvivalRate } from '../../appStore/actions/eurostat/eurostatSurvivalRateAction';
import { withRouter } from 'react-router-dom';
import InviteMemberModal from '../components/overview/InviteMemberModal';
import EditBusinessPlanModal from '../components/overview/EditBusinessPlanModal';
import FullPageLoader from '../components/overview/FullPageLoader';
import { UserOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import IndustryRisks from '../components/Industry_Risks/IndustryRisks'
import { getCountryShortCodeV2 } from '../../appStore/actions/countriesActions'
import IndustryDataComponent from '../components/industry_data/IndustryDataComponent';
import html2canvas from 'html2canvas';

const { TabPane } = Tabs;
const { Text } = Typography;
const { Option } = Select;
const { Meta } = Card;
const { Panel } = Collapse;
const { Step } = Steps;

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

const membersListStyle = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "22px"
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
const canvasElementTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "22px",
    color: '#262626'
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
    constructor(props) {
        super(props);
        this.state = {
            showInviteModal: false,
            showEditBusinessPlanModal: false
        }
    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    onCompleteChange(state) {
        this.props.updateSwotState(state);
    }

    discardChanges = () => {
        this.props.discardChanges();
    };

    saveChanges = () => {
        this.props.saveChanges(this.props.businessPlan.id, () => {
            this.props.getSwotList(this.props.businessPlan.id);
        });
    };

    onStatusChange(status) {
        this.props.updateStatus(this.props.businessPlan.id, status);
        message.info("Business plan status is changed")
    }

    onDeleteMember(item) {
        this.props.deleteMember(this.props.businessPlan.id, { "user_id": item.user_id }, () => {
            this.props.getMembers(this.props.businessPlan.id);
        });
    }

    onInviteClick() {
        this.setState({
            showInviteModal: true
        });
    }

    onInviteClose() {
        this.setState({
            showInviteModal: false
        });
    }

    getUpdatesWindowState() {
        return 'hidden';
    }

    onEditBusinessPlan() {
        this.setState({
            showEditBusinessPlanModal: true
        });
    }

    onEditBusinessPlanClose() {
        this.setState({
            showEditBusinessPlanModal: false
        });
    }

    onMoreActionsMenuClick = () => {
        this.props.removePlan(this.props.businessPlan.id)
        this.props.history.push(`/personal-business-plans`);
    };
    getuseremail = () => {
        const email = this.props.userInf.email.split('@');
        return email[0]
    }
    downloadDOCFile = () => {
        console.log('ok')
        this.props.downloadDOCFile(this.props.businessPlan.id, this.props.businessPlan.name);
    }
    downloadPDFFile = () => {
        console.log('ok')
        this.props.downloadPDFFile(this.props.businessPlan.id, this.props.businessPlan.name);
    }
    downloadCashFlow = () => {
        console.log('ok')
        this.props.downloadCashFlow(this.props.businessPlan.id, this.props.businessPlan.name);
    }
    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getMembers(this.props.businessPlan.id);
                    this.props.getSelectedPlanDetails(this.props.businessPlan.id);
                    this.props.getSelectedPlanOverview(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getMembers(this.props.businessPlan.id);
            this.props.getSelectedPlanDetails(this.props.businessPlan.id);
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        }
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
        const membersList = this.props.businessPlan.members === null ? [] : this.props.businessPlan.members;
        const overview = this.props.businessPlan.overview;
        console.log(overview);
        console.log(membersList);
        const exportAsMenu = (
            <Menu>
                <Menu.Item key="1" onClick={this.downloadDOCFile}>
                    Download DOC file
                </Menu.Item>
                <Menu.Item key="2" onClick={this.downloadPDFFile}>
                    Download PDF file
                </Menu.Item>
                <Menu.Item key="3" onClick={this.downloadCashFlow}>
                    Download Cash Flow
                </Menu.Item>
            </Menu>
        );
        const moreActionsMenu = (
            <Menu >
                <Menu.Item key="1">
                    <Popconfirm
                        title="Are you sure to delete this business plan?"
                        onConfirm={this.onMoreActionsMenuClick}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );

        console.log(this.props.businessPlan.coverImage);
        console.log(this.props.businessPlan);


        if (this.props.businessPlan.overview === undefined) {
            return (<div></div>)
        } else {
            return (
                <>
                    <UnsavedChangesHeader
                        visibility={isVisibleHeader}
                        discardChanges={this.discardChanges}
                        saveChanges={this.saveChanges}
                    />
                    <Col span={20} offset={2}>
                        <Breadcrumb style={{ marginTop: "40px" }}>
                            <Breadcrumb.Item>
                                <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                        </Breadcrumb>

                        <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                            <Col span={14}>
                                <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                    <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                    <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>{this.props.businessPlan.name}</Text>
                                    <Tag color="#BAE7FF" style={{ borderRadius: 50, color: "#262626", marginLeft: '10px' }}> {this.props.businessPlan.percentage}% Completed</Tag>
                                </div>
                            </Col>
                            <Col span={10}>
                                <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                                    <Space wrap>
                                        <Dropdown overlay={moreActionsMenu}>
                                            <a className="ant-dropdown-link">
                                                More Actions <DownOutlined />
                                            </a>
                                        </Dropdown>
                                        <Dropdown overlay={exportAsMenu}>
                                            <a className="ant-dropdown-link">
                                                Export As <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={20} offset={2}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="My business plan" key="1">
                                <Row style={{ marginTop: "40px" }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={18}>
                                        <List itemLayout='horizontal' style={{ height: '78px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='1'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 16px' }}
                                                    avatar={<Avatar src="complete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Button style={{ paddingLeft: '0px', ...pageTitleTextStyle }} type="text" onClick={this.onEditBusinessPlan.bind(this)}>Create Bussines Plan</Button>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>{overview.nace === "" || overview.nace === null ? "NACE: " : "NACE: " + overview.nace.activity_code}</Text>
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
                                                    <Tooltip title="Tooltip text">
                                                        <InfoCircleFilled style={{ width: '17.5px', height: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                                                    </Tooltip>
                                                </>
                                            }
                                            style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='2'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.value_proposition.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/value-propositions' style={canvasElementTextStyle}>Value proposition</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.value_proposition.description === "" ? "Proposed products" : overview.value_proposition.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='3'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.customer_segments.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/customer-segments' style={canvasElementTextStyle}>Customer segments</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.customer_segments.description === "" ? "Customer segments" : overview.customer_segments.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='4'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.channels.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/channels' style={canvasElementTextStyle}>Channels</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.channels.description === "" ? "Customer segments" : overview.channels.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='5'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.customer_relationship.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/customer-relationships' style={canvasElementTextStyle}>Customer relationships</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.customer_relationship.description === "" ? "Customer relationships" : overview.customer_relationship.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='6'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.revenue_streams.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/revenue-streams' style={canvasElementTextStyle}>Revenue streams</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.revenue_streams.description === "" ? "Customer segments revenue streams" : overview.revenue_streams.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='7'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.key_resources.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-resources' style={canvasElementTextStyle}>Key resources</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.key_resources.description === "" ? "Key resources list" : overview.key_resources.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='8'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.key_activities.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-activities' style={canvasElementTextStyle}>Key activities</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.key_activities.description === "" ? "Key activities list" : overview.key_activities.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='9'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.key_partners.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-partners' style={canvasElementTextStyle}>Key partners</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.key_partners.description === "" ? "Key partners list" : overview.key_partners.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='10'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.cost_structure.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/cost-structure' style={canvasElementTextStyle}>Cost structure</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {overview.cost_structure.description === "" ? "Fixed and variable costs" : overview.cost_structure.description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                        </List>
                                        <List
                                            header={
                                                <>
                                                    <Text style={{ ...pageTitleTextStyle, marginLeft: '20px' }}>
                                                        Financial projections
                                                    </Text>
                                                    <Tooltip title="Tooltip text">
                                                        <InfoCircleFilled style={{ width: '17.5px', height: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                                                    </Tooltip>
                                                </>}
                                            style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='11'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={overview.assets.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/assets' style={canvasElementTextStyle}>Assets</Link>
                                                            </Row>                                                
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>...</div>
                                            </List.Item>
                                            <List.Item key='12' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                <List.Item.Meta
                                                    avatar={overview.assets.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={<Space><Link to='/assets'>Assets</Link></Space>}
                                                />
                                                <div>...</div>
                                            </List.Item>

                                            <List.Item key='13' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                <List.Item.Meta
                                                    avatar={overview.fixed_and_variables_costs.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={<Space><Link to="/fixed-and-variable-costs">Fixed and Variable Costs</Link></Space>}
                                                />
                                                <div>...</div>
                                            </List.Item>

                                            <List.Item key='14' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                <List.Item.Meta
                                                    avatar={overview.sales_forecast.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={<Space><Link to="/sales-forecast">Sales Forecast</Link></Space>}
                                                />
                                                <div>...</div>
                                            </List.Item>
                                            <List.Item key='15' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                <List.Item.Meta
                                                    avatar={overview.business_start_up_investments.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={<Space><Link to='/business-start-up-investments'>Business start-up investments</Link></Space>}
                                                />
                                                <div>...</div>
                                            </List.Item>
                                            <List.Item key='16' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                <List.Item.Meta
                                                    avatar={overview.assets.is_completed === true && overview.fixed_and_variables_costs.is_completed === true && overview.sales_forecast.is_completed === true && overview.business_start_up_investments.is_completed === true ?
                                                        <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={<Space><Link to="/cash-flow">Cash Flow</Link></Space>}
                                                />
                                                <div>...</div>
                                            </List.Item>
                                        </List>

                                        <Card style={{ marginTop: '10px' }}>
                                            <List>
                                                <List.Item key='17' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                    <List.Item.Meta
                                                        avatar={overview.swot.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                        title={<Space><Link to='/swot'>SWOT</Link></Space>}
                                                        description={overview.swot.description === "" || overview.swot.description === null ? "Strengths/Weaknesses and Threats/Oportunities" : overview.swot.description} />
                                                    <div>...</div>
                                                </List.Item>
                                            </List>
                                        </Card>
                                        <Card style={{ marginTop: '10px', height: '78px' }}>
                                            <List>
                                                <List.Item key='18' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                    <List.Item.Meta
                                                        avatar={overview.personal_characteristics.is_completed === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                        title={<Space><Link to='/personal-characteristics'>Personal characteristics</Link></Space>}
                                                        description="description" />
                                                    <div>...</div>
                                                </List.Item>
                                            </List>
                                        </Card>

                                    </Col>
                                    <Col span={6}>
                                        <Card
                                            style={{
                                                height: '246px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                                                backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 252, 0) 62%, rgba(255, 255, 255, 1) 38%), ' + (this.props.businessPlan.coverImage ? `url(${this.props.businessPlan.coverImage})` : `url(businessPlan.webp)`),
                                                objectFit: 'cover', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top',
                                            }}>
                                            <h4 style={{ marginTop: '145px', marginBottom: 0, fontSize: '16px' }}>Cover image</h4>
                                            <Button type="link" style={{ paddingLeft: '0px', fontWeight: 600, fontSize: '14px' }} onClick={this.onEditBusinessPlan.bind(this)}>Change</Button>
                                        </Card>
                                        <Card style={{
                                            marginTop: "16px", borderRadius: '8px', backgroundColor: '#FFFFFF'
                                        }}>
                                            <Meta
                                                title="Business plan status"
                                                description={
                                                    <Select style={{ width: '100%' }} value={this.props.businessPlan.public} onChange={this.onStatusChange.bind(this)}>
                                                        <Option key="1" value={false}>Private</Option>
                                                        <Option key="2" value={true}>Public</Option>
                                                    </Select>
                                                }
                                            />
                                        </Card>
                                        <Card style={{
                                            marginTop: "20px", borderRadius: '8px', backgroundColor: '#FFFFFF'
                                        }}>
                                            <Meta
                                                title="Members"
                                                description={
                                                    <List style={{ marginTop: 20 }} itemLayout="horizontal" dataSource={membersList} renderItem={item => (
                                                        <div>
                                                            <Row align='middle' style={{ marginBottom: "8px" }}>
                                                                <Col>
                                                                    <Avatar size={32} icon={<UserOutlined />} src={item.photo ? "data:image/png;base64," + item.photo : ""} />
                                                                </Col>
                                                                <Col>
                                                                    <Text style={{ membersListStyle, marginLeft: 8 }}>{item.name && item.surname !== '' ? item.name + " " + item.surname : item.email.split('@')[0]}</Text>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )} />
                                                }
                                            />
                                            <Button type="link" style={{ padding: "0px", marginTop: "8px" }} onClick={this.onInviteClick.bind(this)}>+ Invite members</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Industry data" key="2">
                                <IndustryDataComponent />
                            </TabPane>
                            <TabPane tab="Industry risks" key="3">
                                <Row style={{ marginBottom: "50px" }}>
                                    <Col span={6}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={aboutTitleTextStyle}>{overview.nace.activity_code} Industry risks</Typography.Title>
                                            <Typography.Text className="text-Style">
                                                Product description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                                You can add products at Value proposition
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <IndustryRisks />

                                    </Col>
                                    <Col span={16}>

                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                    {
                        this.state.showInviteModal === false ? null :
                            <InviteMemberModal visible={true} onClose={this.onInviteClose.bind(this)} />
                    }
                    {
                        this.state.showEditBusinessPlanModal === false ? null :
                            <EditBusinessPlanModal updatingPlan={this.props.businessPlan} onClose={this.onEditBusinessPlanClose.bind(this)} />
                    }

                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        uploadedFile: state.uploadedFile,
        survivalRate: state.survivalRate,
        userInf: state.user,
        downloadLoading: state.downloadLoading
    };
}

export default connect(mapStateToProps, { getImage, discardChanges, getSelectedPlanDetails, getMembers, updateStatus, saveChanges, refreshPlan, deleteMember, getSelectedPlanOverview, removePlan, getSurvivalRate, getCountryShortCodeV2, downloadDOCFile, downloadPDFFile, downloadCashFlow })(withRouter(Overview))