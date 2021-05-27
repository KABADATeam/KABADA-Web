import React from 'react';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Tabs } from 'antd';
import { buttonStyle } from '../../styles/customStyles';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses';
import OpportunitiesThreats from '../components/OpportunitiesThreats';
const { TabPane } = Tabs;
const { Text } = Typography;

const settingsGroupTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
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

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }


    render() {
        return (
            <>
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <a href="personal-business-plans">My Business plans</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="personal-business-plans">Kabada Intelligence Ltd.</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            SWOT
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col offset={4} span={1}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col span={15}>
                        <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>SWOT </Text> <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF' }} />
                        <div style={{ float: 'right' }}><Text>Mark as completed </Text><Switch /> </div>
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Strengths and weaknesses" key="1">
                            <Row>
                                <Col span={4}>
                                    <Text style={settingsGroupTitleTextStyle}>Strengths and weaknesses</Text>
                                </Col>
                                <Col span={12}>
                                    <StrengthsWeaknesses />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Opportunities and threats" key="2">
                            <Row>
                                <Col span={4}>
                                    <Text style={settingsGroupTitleTextStyle}>Opportunities and threats</Text>
                                </Col>
                                <Col span={12}>
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
        loading: state.loading,
        error: state.error,
        message: state.message,
        userSettings: state.userSettings,
    };
}

export default connect(mapStateToProps)(SwotWindow)