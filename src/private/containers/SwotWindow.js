import React from 'react';
import { Button, Breadcrumb, Row, Col, Typography, Switch, Tabs } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses';
import OpportunitiesThreats from '../components/OpportunitiesThreats';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { getSwotList } from "../../appStore/actions/swotAction";

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
            isVisibleHeader: 'hidden',
            originalSwotList: {},
            sw: [],
            ot: [],
            editingOt: false,
            editingSw: false,
        };
    }

    componentDidMount() {
        this.props.getSwotList()
            .then(
                () => {
                    this.setState({
                        sw: this.props.swotList.strengthWeakness,
                        ot: this.props.swotList.opportunityThreat,
                        originalSwotList: JSON.parse(JSON.stringify(this.props.swotList))
                    });
                },
                (error) => {
                    this.setState({
                        sw: [],
                        ot: []
                    });
                }
            );
    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    hideChangesHeader = () => {
        this.setState({
            isVisibleHeader: 'hidden',
        });
    };

    showChangesHeader = () => {
        this.setState({
            isVisibleHeader: 'visible',
        });
    };

    discardChanges = () => {
        const originalData = JSON.parse(JSON.stringify(this.state.originalSwotList))
        this.setState({
            sw: originalData.strengthWeakness,
            ot: originalData.opportunityThreat,
            editingOt: false,
            editingSw: false,
        });

        this.hideChangesHeader();
    };

    onAddNewRow = (value) => {
        this.setState({
            sw: [
                ...this.state.sw,
                value
            ],
            editingSw: true,
        });
    }

    onDeleteRow = (value) => {
        let newData = this.state.sw.filter((item) => item.key !== value);
        this.setState({
            sw: newData,
            editingSw: false,
        });
    }

    onAddNewRowOt = (value) => {
        this.setState({
            ot: [
                ...this.state.ot,
                value
            ],
            editingOt: true,
        });
    }

    onDeleteRowOt = (value) => {
        let newData = this.state.ot.filter((item) => item.key !== value);
        this.setState({
            ot: newData,
            editingOt: false,
        });
    }

    onEditingChange = () => {
        this.setState({
            editingOt: false,
            editingSw: false,
        })
    }

    saveChanges = () => {
        console.log("save changes");
        this.hideChangesHeader();
        //this.props.update(this.state.swotList);
    };

    render() {
        console.log(this.state.originalSwotList);
        console.log(this.state.sw);
        console.log(this.state.businessPlan);
        const isVisibleHeader = this.state.isVisibleHeader;
        return (
            <>
                <UnsavedChangesHeader
                    visibility={isVisibleHeader}
                    handleHiding={this.hideChangesHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
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
                                    <StrengthsWeaknesses
                                        swList={this.state.sw}
                                        handleHeader={this.showChangesHeader}
                                        handleAddRow={this.onAddNewRow}
                                        handleDeleteRow={this.onDeleteRow}
                                        editing={this.state.editingSw}
                                        handleEditingChange={this.onEditingChange}
                                    />
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
                                    <OpportunitiesThreats
                                        otList={this.state.ot}
                                        handleHeader={this.showChangesHeader}
                                        handleAddRow={this.onAddNewRowOt}
                                        handleDeleteRow={this.onDeleteRowOt}
                                        editing={this.state.editingOt}
                                        handleEditingChange={this.onEditingChange}
                                    />
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
        swotList: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { getSwotList })(SwotWindow)