import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import AddSegmentModal from '../components/revenue_streams/AddSegmentModal';
import EditSegmentModal from '../components/revenue_streams/EditSegmentModal';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getStreamTypes, getPrices, getRevenues, saveState, deleteRevenue, getAIRevenueStreamPredict } from "../../appStore/actions/revenueStreamActions";
import { getCustomerSegments } from "../../appStore/actions/customerSegmentAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import TooltipComponent from "../components/Tooltip";
import TextHelper from '../components/TextHelper';
import Cookies from 'js-cookie';

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}

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
    marginRight: '40px',
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #BFBFBF",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent",
}

class RevenueStreams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            segmentNumber: null,
            AIObject: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onAddFirstRevenueStream = () => {
        const postObj = {
            "location": "plan::revenue::consumer::sample",
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            segmentNumber: 1
        });
    }

    onAddSecondRevenueStream = () => {
        const postObj = {
            "location": "plan::revenue::business::sample",
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            segmentNumber: 2
        });
    }

    onAddNewOther = () => {
        const postObj = {
            "location": "plan::revenue::publicNgo::sample",
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            segmentNumber: 3
        });
    }

    onCloseAddSegmentModal = () => {
        this.setState({
            segmentNumber: null
        });
    };

    onCloseEditSegmentModal = () => {
        this.setState({
            item: null
        });
    };
    // "plan::revenue::consumer::${item.id}"
    // "plan::revenue::business::<id>"
    // "plan::revenue::publicNgo::<id>"
    onDeleteFirstSegment(item) {
        this.props.deleteRevenue({ "id": item.id, "segment": 1 });
    }

    onDeleteSecondSegment(item) {
        this.props.deleteRevenue({ "id": item.id, "segment": 2 });
    }

    onDeleteOtherSegment(item) {
        this.props.deleteRevenue({ "id": item.id, "segment": 3 });
    }

    onEditFirstSegment(item) {
        //"plan::revenue::consumer::8e583491-3675-49a7-bf9a-e07f1a6c81b1"
        const postObj = {
            "location": `plan::custSegs::business::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            item: { ...item, "segment": 1 },
            AIObject: { postObj, "segment": 1 }
        });
    }

    onEditSecondSegment(item) {
        const postObj = {
            "location": `plan::custSegs::business::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            item: { ...item, "segment": 2 }
        });
    }

    onEditOther(item) {
        const postObj = {
            "location": `plan::custSegs::business::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIRevenueStreamPredict(postObj);
        this.setState({
            item: { ...item, "segment": 3 }
        });
    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getRevenues(this.props.businessPlan.id);
                        this.props.getStreamTypes();
                        this.props.getPrices();
                        this.props.getCustomerSegments(this.props.businessPlan.id);
                    });
                }
            } else {
                this.props.getRevenues(this.props.businessPlan.id);
                this.props.getStreamTypes();
                this.props.getPrices();
                this.props.getCustomerSegments(this.props.businessPlan.id);
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }

    render() {
        const firstSegmentColumns = [
            {
                title: 'Type',
                dataIndex: 'stream_type_name',
                key: 'stream_type_name',
                width: '23.5%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '15%',
            },
            {
                title: 'Consumers',
                dataIndex: 'segments',
                key: 'segments',
                width: '42%',
                render: (value, record) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditFirstSegment.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteFirstSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const secondSegmentColumns = [
            {
                title: 'Type',
                dataIndex: 'stream_type_name',
                key: 'stream_type_name',
                width: '23.5%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '15%',
            },
            {
                title: 'Business',
                dataIndex: 'segments',
                key: 'segments',
                width: '42%',
                render: (value, record) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditSecondSegment.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteSecondSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const otherColumns = [
            {
                title: 'Type',
                dataIndex: 'stream_type_name',
                key: 'stream_type_name',
                width: '23.5%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '15%',
            },
            {
                title: 'Public bodies & NGO',
                dataIndex: 'segments',
                key: 'segments',
                width: '42%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditOther.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteOtherSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        return (
            <>
                <Col span={20} offset={2}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Revenue streams
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Revenue streams</Text>
                            <TooltipComponent code="revstrem" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.revenues.is_revenue_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>


                <Col span={20} offset={2}>
                    <Divider />
                </Col>

                <Col offset={2} span={20}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Consumers</Typography.Title>
                                <TextHelper code="revstreamconsumer" type="lefttext" />
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.props.revenues.segment_1.length === 0 ?
                                <Button size="large" style={{ ...buttonStyle, marginBottom: '10px', marginTop: '10px' }} onClick={this.onAddFirstRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button>
                                :
                                <Table
                                    dataSource={this.props.revenues.segment_1}
                                    columns={firstSegmentColumns}
                                    pagination={false}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onAddFirstRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button></Space>)}
                                />
                            }
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business</Typography.Title>
                                <TextHelper code="revstreambusiness" type="lefttext" />
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.props.revenues.segment_2.length === 0 ?
                                <Button size="large" style={{ ...buttonStyle, marginBottom: '10px', marginTop: '10px' }} onClick={this.onAddSecondRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button>
                                :
                                <Table
                                    dataSource={this.props.revenues.segment_2}
                                    columns={secondSegmentColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddSecondRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button>)}
                                />
                            }
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Public bodies & NGO</Typography.Title>
                                <TextHelper code="revstreampublicbodies" type="lefttext" />
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.props.revenues.other.length === 0 ?
                                <Button size="large" style={{ ...buttonStyle, marginBottom: '10px', marginTop: '10px' }} onClick={this.onAddNewOther.bind(this)}><PlusOutlined />Add Other Revenue Stream</Button>
                                :
                                <Table
                                    dataSource={this.props.revenues.other}
                                    columns={otherColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddNewOther.bind(this)}><PlusOutlined />Add Other Revenue Stream</Button>)}
                                />
                            }
                        </Col>
                    </Row>
                </Col>

                {
                    this.state.segmentNumber !== null ?
                        <AddSegmentModal visibility={true} number={this.state.segmentNumber} onClose={this.onCloseAddSegmentModal} />
                        : null
                }
                {
                    this.state.item !== null ?
                        <EditSegmentModal visibility={true} AIObject={this.state.AIObject} item={this.state.item} businessPlanId={this.props.businessPlan.id} onClose={this.onCloseEditSegmentModal} />
                        : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        revenues: state.revenues,
        categories: state.partnersCategories
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, getRevenues, getStreamTypes, getPrices, saveState, deleteRevenue, refreshPlan, logout, getAIRevenueStreamPredict, getCustomerSegments })(withRouter(RevenueStreams));