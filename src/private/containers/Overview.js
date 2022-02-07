import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space, Select, Avatar, Dropdown, Menu, message, Popconfirm, Collapse, Tooltip, Steps, Divider, Input } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusSquareOutlined, EllipsisOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { discardChanges, saveChanges } from "../../appStore/actions/swotAction";
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { uploadFile } from '../../appStore/actions/userFileAction';
import { updatePlanData, updateImage } from '../../appStore/actions/planActions';
import { updateStatus, getMembers, deleteMember, getSelectedPlanOverview, getSelectedPlanDetails, getImage, removePlan, downloadDOCFile, downloadPDFFile, downloadCashFlow } from "../../appStore/actions/planActions";
import { getSurvivalRate } from '../../appStore/actions/eurostat/eurostatSurvivalRateAction';
import { saveState as saveValuePropositions } from '../../appStore/actions/productActions'
import { saveState as saveCustomerSegments } from "../../appStore/actions/customerSegmentAction";
import { saveState as saveChannelsCompleted } from "../../appStore/actions/channelActions";
import { saveState as saveCustomerRelationshipsCompleted } from "../../appStore/actions/customerRelationshipsAction";
import { saveState as saveRevenueStreamsCompleted } from "../../appStore/actions/revenueStreamActions";
import { saveChanges as saveResourcesCompleted } from "../../appStore/actions/resourcesAction";
import { saveState as saveKeyActivitiesCompleted } from "../../appStore/actions/keyActivitiesAction";
import { saveState as saveKeyPartnersCompleted } from "../../appStore/actions/partnersAction";
import { saveState as saveCostStructureCompleted } from "../../appStore/actions/costStructureAction"
import { saveState as saveSwotCompleted } from "../../appStore/actions/swotAction";
import { saveState as saveAssetsCompleted } from '../../appStore/actions/assetsAction';
import { saveState as saveFixedAndVariableCompleted } from '../../appStore/actions/financialProjectionsActions';
import { saveState as saveBusinessInvestmentsCompleted } from "../../appStore/actions/businessInvestmentAction";
import {  saveState as saveSalesForecastCompleted } from '../../appStore/actions/salesForecastActions';
import { savePersonalCharacteristics as savePersonalCharacteristicsCompleted } from '../../appStore/actions/personalCharacteristicsActions';


import { withRouter } from 'react-router-dom';
import InviteMemberModal from '../components/overview/InviteMemberModal';
import EditBusinessPlanModal from '../components/overview/EditBusinessPlanModal';
import FullPageLoader from '../components/overview/FullPageLoader';
import { UserOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import IndustryRisks from '../components/Industry_Risks/IndustryRisks'
import { getCountryShortCodeV2 } from '../../appStore/actions/countriesActions'
import { logout } from '../../appStore/actions/authenticationActions';
import IndustryDataComponent from '../components/industry_data/IndustryDataComponent';
import html2canvas from 'html2canvas';
import TooltipComponent from '../components/Tooltip';
import TextHelper from '../components/TextHelper';
import Cookies from 'js-cookie';
import EditBusinessPlanItem from '../components/overview/EditBusinessPlanItem';

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

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInviteModal: false,
            showEditBusinessPlanModal: false,
            selectedImage: null
        }
        this.fileSelectRef = React.createRef();
    }
    getActivityID = (nace, industryCode, activityCode) => {
        console.log(activityCode);
        console.log(industryCode);
        console.log(nace);
        const firstLevelActivities = nace.find(item => item.code === industryCode);
        if (firstLevelActivities.code === activityCode) {
            return firstLevelActivities.id;
        } else {
            if (firstLevelActivities.activities !== null) {
                const secondLevelActivities = firstLevelActivities.activities.find(item => item.code === activityCode);
                if (secondLevelActivities !== undefined) {
                    return secondLevelActivities.id;
                } else {
                    const activity2nd = activityCode.split('.').slice(0, 2).join('.');
                    console.log(activity2nd);
                    const secondLevelActivities = firstLevelActivities.activities.find(item => item.code === activity2nd);
                    console.log(secondLevelActivities);
                    if (secondLevelActivities.code === activityCode) {
                        return secondLevelActivities.id;
                    } else {
                        const secondLvlCode = activityCode.split('.').slice(0, 2).join('.');
                        const activity3nd = secondLvlCode + '.' + activityCode.split('.')[2].slice(0, 1);
                        const thirdLevelActivities = secondLevelActivities.activities.length > 1 ? secondLevelActivities.activities.find(item => item.code === activity3nd) : secondLevelActivities.activities[0];
                        if (thirdLevelActivities.code === activityCode) {
                            return thirdLevelActivities.id;
                        } else {
                            const activity4nd = activityCode.split('.').slice(0, 3).join('.');
                            const fourthLevelActivities = thirdLevelActivities.activities.find(item => item.code === activity4nd);
                            return fourthLevelActivities.id;
                        }
                    }
                }
            } else {
            }
        }
    }
    onImageChange = (e) => {
        this.setState({
            selectedImage: e.target.files[0]
        })
        const formData = new FormData();
        const oldCountry = this.props.countries.find(item => item.title === this.props.businessPlan.countryTitle).id;
        const oldLanguage = this.props.planLanguages.find(item => item.title === 'English').id;
        const oldActivity = this.getActivityID(this.props.nace, this.props.businessPlan.overview.nace.industry_code, this.props.businessPlan.activityCode);
        formData.append('files[]', e.target.files[0]);
        formData.getAll('files[]')
        let postObject = {
            "Id": this.props.businessPlan.id,
            "Title": this.props.businessPlan.name,
            "ActivityId": oldActivity,
            "CountryId": oldCountry,
            "LanguageId": oldLanguage
        }
        let reducerObject = {
            "id": this.props.businessPlan.id,
            'name': this.props.businessPlan.name,
            'activityId': oldActivity,
            'activityCode': this.props.businessPlan.activityCode,
            'countryId': oldCountry,
            'languageId': oldLanguage,
        }
        this.props.uploadFile(formData)
            .then(
                () => {
                    console.log("image changed");
                    console.log(this.props.uploadedFile)
                    postObject = { ...postObject, 'Img': this.props.uploadedFile }
                    reducerObject = { ...reducerObject, 'planImage': this.props.uploadedFile }
                    this.props.updateImage(reducerObject);
                    this.props.updatePlanData(postObject, reducerObject)
                });
    }
    onFileUpload = (e) => {
        this.fileSelectRef.current.click();
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
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
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
        } else {
            this.props.history.push('/')
        }
        this.setState({
            selectedFile: []
        })
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
        const membersList = this.props.businessPlan.members === null ? [] : this.props.businessPlan.members;
        const overview = this.props.businessPlan.overview;
        // const isCashFlowAvatarState = overview.assets.is_completed === true && overview.fixed_and_variables_costs.is_completed === true && overview.sales_forecast.is_completed === true && overview.business_start_up_investments.is_completed === true;
        // console.log(isCashFlowAvatarState);
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
                                                                <Button style={{ paddingLeft: '0px', ...pageTitleTextStyle }} type="text" onClick={this.onEditBusinessPlan.bind(this)}>Edit Bussines Plan</Button>
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
                                                                <Link to='/value-propositions' style={canvasElementTextStyle}>Value proposition</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.value_proposition_description === "" ? "Proposed products" : this.props.businessPlan.value_proposition_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {/* DROPDOWN FOR EDIT VALUE PROPOSITIONS */}
                                                {overview !== null && overview.value_proposition !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/value-propositions'}
                                                            isCompleted={overview.value_proposition.is_completed}
                                                            save={this.props.saveValuePropositions}
                                                        />
                                                    </div> : null
                                                }


                                            </List.Item>
                                            <List.Item key='3'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.customer_segments_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/customer-segments' style={canvasElementTextStyle}>Customer segments</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.customer_segments_description === "" ? "Customer segments" : this.props.businessPlan.customer_segments_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.customer_segments !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/customer-segments'}
                                                            isCompleted={overview.customer_segments.is_completed}
                                                            save={this.props.saveCustomerSegments}
                                                        />
                                                    </div> : null}

                                            </List.Item>
                                            <List.Item key='4'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.channels_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/channels' style={canvasElementTextStyle}>Channels</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.channels_description === null ? "Channels list" : this.props.businessPlan.channels_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.channels !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/channels'}
                                                            isCompleted={overview.channels.is_completed}
                                                            save={this.props.saveChannelsCompleted}
                                                        />
                                                    </div> : null}

                                            </List.Item>
                                            <List.Item key='5'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.customer_relationship_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/customer-relationships' style={canvasElementTextStyle}>Customer relationships</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.customer_relationship_description === "" ? "Customer relationships" : this.props.businessPlan.customer_relationship_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                <div style={{ marginRight: '28px' }}>
                                                    {overview !== null && overview.customer_relationship !== null ?
                                                        <EditBusinessPlanItem link={'/customer-relationships'}
                                                            isCompleted={overview.customer_relationship.is_completed}
                                                            save={this.props.saveCustomerRelationshipsCompleted}
                                                        /> : null}

                                                </div>
                                            </List.Item>
                                            <List.Item key='6'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.revenue_streams_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/revenue-streams' style={canvasElementTextStyle}>Revenue streams</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.revenue_streams_description === "" ? "Customer segments revenue streams" : this.props.businessPlan.revenue_streams_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.revenue_streams !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/revenue-streams'}
                                                            isCompleted={overview.revenue_streams.is_completed}
                                                            save={this.props.saveRevenueStreamsCompleted}
                                                        />
                                                    </div> : null}
                                            </List.Item>
                                            <List.Item key='7'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_resources_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-resources' style={canvasElementTextStyle}>Key resources</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_resources_description === "" ? "Key resources list" : this.props.businessPlan.key_resources_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.key_resources !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/key-resources'}
                                                            isCompleted={overview.key_resources.is_completed}
                                                            save={this.props.saveResourcesCompleted}
                                                        />
                                                    </div> : null}
                                            </List.Item>
                                            <List.Item key='8'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_activities_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-activities' style={canvasElementTextStyle}>Key activities</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_activities_description === "" ? "Key activities list" : this.props.businessPlan.key_activities_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.key_activities !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/key-activities'}
                                                            isCompleted={overview.key_activities.is_completed}
                                                            save={this.props.saveKeyActivitiesCompleted}
                                                        />
                                                    </div> : null}
                                            </List.Item>
                                            <List.Item key='9'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.key_partners_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/key-partners' style={canvasElementTextStyle}>Key partners</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.key_partners_description === null ? "Key partners list" : this.props.businessPlan.key_partners_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.key_partners !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/key-partners'}
                                                            isCompleted={overview.key_partners.is_completed}
                                                            save={this.props.saveKeyPartnersCompleted}
                                                        />
                                                    </div> : null}
                                            </List.Item>
                                            <List.Item key='10'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.cost_structure_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Link to='/cost-structure' style={canvasElementTextStyle}>Cost structure</Link>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>
                                                                    {this.props.businessPlan.cost_structure_description === "" ? "Fixed and variable costs" : this.props.businessPlan.cost_structure_description}
                                                                </Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.cost_structure !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/cost-structure'}
                                                            isCompleted={overview.cost_structure.is_completed}
                                                            save={this.props.saveCostStructureCompleted}
                                                        />
                                                    </div> : null}
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
                                                                    <Link to='/swot' style={canvasElementTextStyle}>SWOT</Link>
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
                                                {overview !== null && overview.swot !== null ?
                                                    <div style={{ marginRight: '28px' }}>
                                                        <EditBusinessPlanItem link={'/swot'}
                                                            isCompleted={overview.swot.is_completed}
                                                            save={this.props.saveSwotCompleted}
                                                        />
                                                    </div> : null}
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
                                            style={{ marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
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
                                                                        <Link to='/assets' style={canvasElementTextStyle}>Assets</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                    {overview !== null && overview.assets !== null ?
                                                                        <div style={{ ...financialTitleButtonPositionStyle, marginRight: '8px' }}>
                                                                            <EditBusinessPlanItem link={'/assets'}
                                                                                isCompleted={overview.assets.is_completed}
                                                                                save={this.props.saveAssetsCompleted}
                                                                            />
                                                                        </div> : null}
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
                                                                        <Link to="/fixed-and-variable-costs" style={canvasElementTextStyle}>Fixed and Variable Costs</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                    {overview !== null && overview.fixed_and_variables_costs !== null ?
                                                                        <div style={{ ...financialTitleButtonPositionStyle, marginRight: '8px' }}>
                                                                            <EditBusinessPlanItem link={'/fixed-and-variable-costs'}
                                                                                isCompleted={overview.fixed_and_variables_costs.is_completed}
                                                                                save={this.props.saveFixedAndVariableCompleted}
                                                                            />
                                                                        </div> : null}
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
                                                                        <Link to="/sales-forecast" style={canvasElementTextStyle}>Sales Forecast</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                    {overview !== null && overview.sales_forecast !== null ?
                                                                        <div style={{ ...financialTitleButtonPositionStyle, marginRight: '8px' }}>
                                                                            <EditBusinessPlanItem link={'/sales-forecast'}
                                                                                isCompleted={overview.sales_forecast.is_completed}
                                                                                save={this.props.saveSalesForecastCompleted}
                                                                            />
                                                                        </div> : null}
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
                                                                        <Link to="/business-start-up-investments" style={canvasElementTextStyle}>Business start-up investments</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                {overview !== null && overview.business_start_up_investments !== null ?
                                                                    <div style={{ ...financialTitleButtonPositionStyle, marginRight: '8px' }}>
                                                                        <EditBusinessPlanItem link={'/business-start-up-investments'}
                                                                            isCompleted={overview.business_start_up_investments.is_completed}
                                                                            save={this.props.saveBusinessInvestmentsCompleted}
                                                                        />
                                                                    </div>:null}
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
                                                                        <Link to="/cash-flow" style={canvasElementTextStyle}>Cash Flow</Link>
                                                                    </div>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <div style={{ ...financialTitleButtonPositionStyle, marginRight: '0px' }}>
                                                                        <Button style={{ borderRadius: '4px' }}><Link to="/cash-flow" style={canvasElementTextStyle}>See cash flow</Link></Button>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>}
                                                />
                                            </List.Item>
                                        </List>
                                        <List itemLayout='horizontal' style={{ height: '78px', marginTop: '16px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                                            <List.Item key='17'>
                                                <List.Item.Meta
                                                    style={{ padding: '0px 20px 0px' }}
                                                    avatar={this.props.businessPlan.personal_characteristics_state === true ? <Avatar src="complete.png" style={avatarStyle} /> : <Avatar src="incomplete.png" style={avatarStyle} />}
                                                    title={
                                                        <div>
                                                            <Row>
                                                                <Col>
                                                                    <Link to='/personal-characteristics' style={canvasElementTextStyle}>Personal-characteristics</Link>
                                                                </Col>
                                                                <Col>
                                                                    <TooltipComponent code="ovmbp4" type="text" />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Text style={descriptionTextStyle}>{this.props.businessPlan.personal_characteristics_description === "" || this.props.businessPlan.personal_characteristics_description === null ? "Descriptions" : this.props.businessPlan.personal_characteristics_description}</Text>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                                {overview !== null && overview.personal_characteristics !== null ?
                                                <div style={{ marginRight: '28px' }}>
                                                    {/* <EditBusinessPlanItem link={'/personal-characteristics'}
                                                        isCompleted={overview.personal_characteristics.is_completed}
                                                    /> */}
                                                </div>:null}
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
                                            {/* <Button type="link" style={{ paddingLeft: '0px', fontWeight: 600, fontSize: '14px' }} onClick={this.onEditBusinessPlan.bind(this)}>Change</Button> */}
                                            <input accept="image/*" type="file" id="select-image" ref={this.fileSelectRef} onChange={e => this.onImageChange(e)} style={{ display: 'none' }} />
                                            <label htmlFor='select-image'>
                                                <Button type="link" style={{ paddingLeft: '0px', fontWeight: 600, fontSize: '14px' }} onClick={e => this.onFileUpload(e)}>Change</Button>
                                            </label>
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
                                                                <Col span={3}>
                                                                    <Avatar size={32} icon={<UserOutlined />} src={item.photo ? "data:image/png;base64," + item.photo : ""} />
                                                                </Col>
                                                                <Col span={19}>

                                                                    <div style={{ ...financialTitlePositionStyle }}>
                                                                        <Text style={{ ...membersListStyle, marginLeft: 8 }}>{item.name && item.surname !== '' ? item.name + " " + item.surname : item.email.split('@')[0]}</Text>
                                                                    </div>
                                                                </Col>
                                                                <Col span={2}>
                                                                    <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}><Button type="link" icon={<Avatar size='small' icon={<DeleteOutlined />} />} onClick={this.onDeleteMember.bind(this, item)} /></div>

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
                                <Row style={{ marginBottom: "50px", marginTop: "40px" }}>
                                    <Col span={8}>
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={aboutTitleTextStyle}>{this.props.businessPlan.activityCode} Industry risks</Typography.Title>
                                            <TextHelper code="ovir" type="lefttext" />
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <IndustryRisks />
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
        downloadLoading: state.downloadLoading,
        uploadedFile: state.uploadedFile,
        countries: state.countries,
        activities: state.activities,
        industries: state.industries,
        planLanguages: state.planLanguages,
        nace: state.nace
    };
}

export default connect(mapStateToProps, { getImage, logout, discardChanges, getSelectedPlanDetails, getMembers, updateStatus, saveChanges, refreshPlan, deleteMember, getSelectedPlanOverview, removePlan, getSurvivalRate, getCountryShortCodeV2, downloadDOCFile, downloadPDFFile, downloadCashFlow, uploadFile, updateImage, updatePlanData, saveValuePropositions, saveCustomerSegments, saveChannelsCompleted, saveCustomerRelationshipsCompleted, saveRevenueStreamsCompleted, saveResourcesCompleted, saveKeyActivitiesCompleted, saveKeyPartnersCompleted, saveCostStructureCompleted, saveSwotCompleted, saveAssetsCompleted, saveFixedAndVariableCompleted,saveSalesForecastCompleted,saveBusinessInvestmentsCompleted,savePersonalCharacteristicsCompleted })(withRouter(Overview))