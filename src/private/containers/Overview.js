import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space, Select, Avatar } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { discardChanges, saveChanges } from "../../appStore/actions/swotAction";
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { updateStatus, getMembers, deleteMember, getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { withRouter } from 'react-router-dom';
import InviteMemberModal from '../components/overview/InviteMemberModal';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Text } = Typography;
const { Option } = Select;

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

class Overview extends React.Component {

    state = {
        showInviteModal: false
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

    onStatusChange (status) {
        this.props.updateStatus(this.props.businessPlan.id, status);
    }

    onDeleteMember (item) {
        this.props.deleteMember(this.props.businessPlan.id, { "user_id": item.user_id }, () => {
            this.props.getMembers(this.props.businessPlan.id);
        });
    }

    onInviteClick () {
        this.setState({
            showInviteModal: true
        });
    }

    onInviteClose () {
        this.setState({
            showInviteModal: false
        });
    }

    getUpdatesWindowState() {
        return 'hidden';
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getMembers(this.props.businessPlan.id);
                    this.props.getSelectedPlanOverview(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getMembers(this.props.businessPlan.id);
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        }
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
        const membersList = this.props.businessPlan.members === null ? [] : this.props.businessPlan.members;

        console.log(this.props.businessPlan);

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
                        <TabPane tab="My business plan" key="1">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={18}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Card title="Business canvas" style={{ marginTop: '10px' }}>
                                            <List>
                                                <List.Item key='1' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/customer-segments'>Customer segments</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='2' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/value-propositions'>Value proposition</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='3' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/channels'>Channels</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='4' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/customer-relationships'>Customer relationships</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='5' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/revenue-streams'>Revenue streams</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='6' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/key-resources'>Key resources</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='7' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Key activities"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='8' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/key-partners'>Key partners</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='9' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/cost-structure'>Cost structure</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                            </List>
                                        </Card>
                                        <Card style={{ marginTop: '10px' }}>
                                            <List>
                                                <List.Item key='10' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
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
                                                        avatar={<CheckCircleOutlined />}
                                                        title={<Space><Link to='/swot'>SWOT</Link></Space>}
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                            </List>
                                        </Card>
                                        <Card style={{ marginTop: '10px' }}>
                                            <List >
                                                <List.Item key='12' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Team and competencies"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                            </List>
                                        </Card>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <Card style={{width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                                        backgroundImage: this.props.businessPlan.coverImage === null? `url(businessPlan.webp)` : `url(${this.props.businessPlan.coverImage})`,
                                        backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" }}>
                                       <h4 style={{ marginTop: '150px'}}>Cover image</h4>
                                    </Card>
                                    <Card style={{width: '282px', marginTop: "16px", borderRadius: '8px', backgroundColor: '#FFFFFF',
                                        backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" }}>
                                       <h4>Business plan status</h4>
                                       <Select style={{ width: '100%' }} value={this.props.businessPlan.public} onChange={this.onStatusChange.bind(this)}>
                                            <Option key="1" value={false}>Private</Option>
                                            <Option key="2" value={true}>Public</Option>
                                       </Select>
                                    </Card>
                                    <Card style={{width: '282px', marginTop: "16px", borderRadius: '8px', backgroundColor: '#FFFFFF',
                                        backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" }}>
                                       <h4>Members</h4>
                                       <List itemLayout="horizontal" dataSource={membersList} renderItem={item => (
                                            <List.Item actions={[<Button type="link" onClick={this.onDeleteMember.bind(this, item)}><DeleteOutlined /></Button>]}>
                                                <List.Item.Meta
                                                    avatar={<Avatar size="small" icon={<UserOutlined />} />}
                                                    title={item.name + " " + item.surname}
                                                />
                                            </List.Item>
                                            )}>
                                            <List.Item key='2' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                <List.Item.Meta title={<Space><Button type="link" style={{ padding: "0px"}} onClick={this.onInviteClick.bind(this)}>+ Invite members</Button></Space>} />
                                            </List.Item>
                                       </List>
                                    </Card>
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

                {
                    this.state.showInviteModal === false ? null :
                        <InviteMemberModal visible={true} onClose={this.onInviteClose.bind(this)} />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { discardChanges, getMembers, updateStatus, saveChanges, refreshPlan, deleteMember, getSelectedPlanOverview })(withRouter(Overview))