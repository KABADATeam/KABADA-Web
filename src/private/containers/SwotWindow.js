import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Breadcrumb, Row, Col, Typography, Switch, Tabs, Space } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses';
import OpportunitiesThreats from '../components/OpportunitiesThreats';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { getSwotList, updateSwotState, discardChanges, saveChanges } from "../../appStore/actions/swotAction";

const { TabPane } = Tabs;
const { Text } = Typography;

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
    marginRight: '40px'
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

class SwotWindow extends React.Component {

    onBackClick() {
        this.props.history.push(`/overview`);
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
        if (this.props.swot.updates.is_swot_completed !== null) {
            return 'visible';
        }

        if (this.props.swot.updates.strengths.length > 0) {
            return 'visible';
        }

        if (this.props.swot.updates.opportunities.length > 0) {
            return 'visible';
        }

        return 'hidden';
    }

    componentDidMount() {
        this.props.getSwotList(this.props.businessPlan.id);
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
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>Kabada Intelligence Ltd.</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            SWOT
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>SWOT</Text>
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed </Text><Switch checked={this.props.swot.updates.is_swot_completed === null ? this.props.swot.original.is_swot_completed : this.props.swot.updates.is_swot_completed} onClick={this.onCompleteChange.bind(this)} />
                        </div>
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Strengths and weaknesses" key="1">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>Strengths and weaknesses</Typography.Title>
                                        <Typography.Text style={{ ...textStyle }}>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                                            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                        <br />
                                            <Typography.Link underline style={{ ...textStyle }}>Read more about SWOT</Typography.Link>
                                        </Typography.Text>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <StrengthsWeaknesses />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Opportunities and threats" key="2">
                            <Row style={{ marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={aboutTitleTextStyle}>Opportunities and threats</Typography.Title>
                                        <Typography.Text style={textStyle}>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                                            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                        <br />
                                            <Typography.Link underline style={{ ...textStyle }}>Read more about SWOT</Typography.Link>
                                        </Typography.Text>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <OpportunitiesThreats />
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
        swot: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { getSwotList, updateSwotState, discardChanges, saveChanges })(withRouter(SwotWindow));