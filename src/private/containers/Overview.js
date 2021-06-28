import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Tag, Tabs, Card, List, Space } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { discardChanges, saveChanges } from "../../appStore/actions/swotAction";
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

class Overview extends React.Component {

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

    getUpdatesWindowState() {
        //if (this.props.swot.updates.is_swot_completed !== null) {
        //    return 'visible';
        //}

        //if (this.props.swot.updates.strengths.length > 0) {
        //    return 'visible';
        //}

        //if (this.props.swot.updates.opportunities.length > 0) {
        //    return 'visible';
        //}

        return 'hidden';
    }

    componentDidMount() {
        
    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();

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
                            <a href="personal-business-plans">My Business plans</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="overview">Kabada Intelligence Ltd.</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Kabada Intelligence Ltd.</Text>
                            <Tag color="#BAE7FF" style={{borderRadius: 50, color: "#262626", marginLeft: '10px'}}> 0% Completed</Tag>
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
                                                        title="Customer segments"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='2' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Value proposition"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='3' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Channels (Revisit)"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='4' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Customer relationships"
                                                        description="Description goes here" />
                                                    <div>...</div>
                                                </List.Item>
                                                <List.Item key='5' style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <List.Item.Meta
                                                        avatar={<CheckCircleOutlined />}
                                                        title="Revenue streams"
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
                                                        title="Cost structure"
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
                                        backgroundImage: this.props.businessPlan.planImage === null? `url(businessPlan.webp)` : `url(${this.props.businessPlan.img})`,
                                        backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" }}>
                                       <h4 style={{ marginTop: '150px'}}>Cover image</h4>
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
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { discardChanges, saveChanges })(withRouter(Overview))