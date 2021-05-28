import React from 'react';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Tabs, Descriptions } from 'antd';
import { buttonStyle } from '../../styles/customStyles';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses';
import OpportunitiesThreats from '../components/OpportunitiesThreats';
import { Link } from 'react-router-dom';
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
                    <Col span={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>SWOT</Text> <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                        </div>
                    </Col>
                    <Col span={11}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed </Text><Switch />
                        </div>
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Strengths and weaknesses" key="1">
                            <Row>
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
                            <Row>
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
        loading: state.loading,
        error: state.error,
        message: state.message,
        userSettings: state.userSettings,
    };
}

export default connect(mapStateToProps)(SwotWindow)