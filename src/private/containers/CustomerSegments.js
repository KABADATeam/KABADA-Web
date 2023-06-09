import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import AddConsumerSegmentModal from '../components/customer_segments/AddConsumerSegmentModal';
import EditConsumerSegmentModal from '../components/customer_segments/EditConsumerSegmentModal';
import AddBusinessSegmentModal from '../components/customer_segments/AddBusinessSegmentModal';
import EditBusinessSegmentModal from '../components/customer_segments/EditBusinessSegmentModal';
import AddPublicBodiesSegmentModal from '../components/customer_segments/AddPublicBodiesSegmentModal';
import EditPublicBodiesSegmentModal from '../components/customer_segments/EditPublicBodiesSegmentModal';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getCustomerSegmentProperties, getCustomerSegments, deleteConsumerSegment, deleteBusinessSegment, deleteNgoSegment, saveState, getAIValues } from "../../appStore/actions/customerSegmentAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
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

class CustomerSegments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            consumerSegment: null,
            businessSegment: null,
            publicBodiesSegment: null,
            consumerEditSegment: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onAddConsumerSegment() {
        this.setState({
            consumerSegment: true
        });
        const postObj = {
            "location": 'plan::custSegs::consumer::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, null, 'consumer');
    }

    onAddBusinessSegment = () => {
        this.setState({
            businessSegment: true
        });
        const postObj = {
            "location": 'plan::custSegs::business::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, null, 'business');
    }

    onAddPublicBodiesSegment = () => {
        this.setState({
            publicBodiesSegment: true
        });
        const postObj = {
            "location": 'plan::custSegs::publicNgo::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, null, 'publicNgo');
    }

    onCloseAddSegmentModal = () => {
        this.setState({
            consumerSegment: null,
            businessSegment: null,
            publicBodiesSegment: null,
            item: null,
        });
    };


    onCloseEditSegmentModal = () => {
        this.setState({
            consumerSegment: null,
            businessSegment: null,
            publicBodiesSegment: null,
            consumerEditSegment: null, 
            item: null
        });
    };

    onDeleteConsumerSegment(item) {
        this.props.deleteConsumerSegment({ "id": item.id });
    }

    onDeleteBusinessSegment(item) {
        this.props.deleteBusinessSegment({ "id": item.id });
    }

    onDeletePublicBodiesSegment(item) {
        this.props.deleteNgoSegment({ "id": item.id });
    }

    onEditConsumerSegment(item) {
        this.setState({
            item: { ...item },
            consumerEditSegment: true
        });        
        const postObj = {
            "location": `plan::custSegs::consumer::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, item.id, 'consumer');
    }

    onEditBusinessSegment(item) {
        this.setState({
            item: { ...item },
            businessSegment: true
        });
        const postObj = {
            "location": `plan::custSegs::business::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, item.id, 'business');
    }

    onEditPublicBodiesSegment(item) {
        this.setState({
            item: { ...item },
            publicBodiesSegment: true
        });
        const postObj = {
            "location": `plan::custSegs::publicNgo::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAIValues(postObj, item.id, 'public_bodies_ngo');
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
                        this.props.getCustomerSegmentProperties();
                        this.props.getCustomerSegments(this.props.businessPlan.id);
                        this.props.getTooltips();
                    });
                }
            } else {
                this.props.getCustomerSegmentProperties();
                this.props.getCustomerSegments(this.props.businessPlan.id);
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }

    render() {
        const consumersSegmentsColumns = [
            {
                title: "Name",
                dataIndex: "segment_name",
                width: '28.5%'
            },
            {
                title: 'Age group',
                dataIndex: 'age_titles',
                key: 'age_titles',
                width: '24.5%',
            },
            {
                title: 'Gender',
                dataIndex: 'gender_titles',
                key: 'gender_titles',
                width: '24.5%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '22.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditConsumerSegment.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteConsumerSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const businessSegmentsColumns = [
            {
                title: "Name",
                dataIndex: "segment_name",
                width: '28.5%'
            },
            {
                title: 'Type',
                dataIndex: 'business_type_titles',
                key: 'business_type_titles',
                width: '24.5%',
            },
            {
                title: 'Size',
                dataIndex: 'company_size_titles',
                key: 'company_size_titles',
                width: '24.5%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '22.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditBusinessSegment.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteBusinessSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const publicBodiesNgoSegmentsColumns = [
            {
                title: "Name",
                dataIndex: "segment_name",
                width: '28.5%'
            },
            {
                title: 'Type',
                dataIndex: 'ngo_types_titles',
                key: 'ngo_types_titles',
                width: '24.5%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '47%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditPublicBodiesSegment.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeletePublicBodiesSegment.bind(this, record)} ><DeleteOutlined /></Button>
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
                            Customer segments
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={14} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Customer segments</Text>
                            <TooltipComponent code="custsegm" type="title" />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.customerSegments.is_customer_segments_completed} onClick={this.onCompletedChange.bind(this)} />
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
                                <TextHelper code="custsegconsumers" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>

                            <Table
                                title={() => <>
                                    <Typography style={{ ...tableTitleStyle }}>Consumers segments</Typography>
                                    <Typography style={{ ...tableDescriptionStyle }}>
                                        You are creating several customer segments.
                                    </Typography>
                                </>}
                                dataSource={this.props.customerSegments.consumers}
                                columns={consumersSegmentsColumns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={()=>this.onAddConsumerSegment()}><PlusOutlined />Add segment</Button>)}
                            />

                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business</Typography.Title>
                                <TextHelper code="custsegbusiness" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                title={() => <>
                                    <Typography style={{ ...tableTitleStyle }}>Business segments</Typography>
                                    <Typography style={{ ...tableDescriptionStyle }}>
                                        You are creating several customer segments.
                                    </Typography>
                                </>}
                                dataSource={this.props.customerSegments.business}
                                columns={businessSegmentsColumns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddBusinessSegment.bind(this)}><PlusOutlined />Add segment</Button>)}
                            />

                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Public bodies & NGO</Typography.Title>
                                <TextHelper code="custsegpublicbodngo" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                title={() => <>
                                    <Typography style={{ ...tableTitleStyle }}>Public bodies & NGO segments</Typography>
                                    <Typography style={{ ...tableDescriptionStyle }}>
                                        You are creating several customer segments.
                                    </Typography>
                                </>}
                                dataSource={this.props.customerSegments.public_bodies_ngo}
                                columns={publicBodiesNgoSegmentsColumns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddPublicBodiesSegment.bind(this)}><PlusOutlined />Add segment</Button>)}
                            />
                        </Col>
                    </Row>
                </Col>

                {
                    this.state.consumerSegment !== null ?
                        <AddConsumerSegmentModal visibility={true} onClose={this.onCloseAddSegmentModal} />
                        : null
                }

                {
                    this.state.item !== null && this.state.consumerEditSegment !== null ?
                        <EditConsumerSegmentModal visibility={true} item={this.state.item} onClose={this.onCloseEditSegmentModal} />
                        : null
                }

                {
                    this.state.businessSegment !== null ?
                        <AddBusinessSegmentModal visibility={true} onClose={this.onCloseAddSegmentModal} />
                        : null
                }

                {
                    this.state.item !== null && this.state.businessSegment !== null ?
                        <EditBusinessSegmentModal visibility={true} item={this.state.item} onClose={this.onCloseEditSegmentModal} />
                        : null
                }

                {
                    this.state.publicBodiesSegment !== null ?
                        <AddPublicBodiesSegmentModal visibility={true} onClose={this.onCloseAddSegmentModal} />
                        : null
                }

                {
                    this.state.item !== null && this.state.publicBodiesSegment !== null ?
                        <EditPublicBodiesSegmentModal visibility={true} item={this.state.item} onClose={this.onCloseEditSegmentModal} />
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
        categories: state.partnersCategories,
        customerSegmentProperties: state.customerSegmentProperties,
        customerSegments: state.customerSegments,
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, logout, getCustomerSegmentProperties, getCustomerSegments, refreshPlan, deleteConsumerSegment, deleteBusinessSegment, deleteNgoSegment, saveState, getAIValues, getTooltips })(withRouter(CustomerSegments));