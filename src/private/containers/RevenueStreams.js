import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import AddSegmentModal from '../components/revenue_streams/AddSegmentModal';
import EditSegmentModal from '../components/revenue_streams/EditSegmentModal';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getStreamTypes, getPrices, getRevenues, saveState, deleteRevenue } from "../../appStore/actions/revenueStreamActions";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";

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
            segmentNumber: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onAddFirstRevenueStream = () => {
        this.setState({
            segmentNumber: 1
        });
    }

    onAddSecondRevenueStream = () => {
        this.setState({
            segmentNumber: 2
        });
    }

    onAddNewOther = () => {
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
        this.setState({
            item: { ...item, "segment": 1 }
        });
    }

    onEditSecondSegment(item) {
        this.setState({
            item: { ...item, "segment": 2 }
        });
    }

    onEditOther(item) {
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
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getRevenues(this.props.businessPlan.id);
                    this.props.getStreamTypes();
                    this.props.getPrices();
                });
            }
        } else {
            this.props.getRevenues(this.props.businessPlan.id);
            this.props.getStreamTypes();
            this.props.getPrices();
        }
    }

    render() {
        const firstSegmentColumns = [
            {
                title: 'Type',
                dataIndex: 'stream_type_name',
                key: 'stream_type_name',
                width: '25%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '20%',
            },
            {
                title: 'Types of pricing',
                dataIndex: 'price_type_name',
                key: 'price_type_name',
                width: '45%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
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
                width: '25%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '20%',
            },
            {
                title: 'Types of pricing',
                dataIndex: 'price_type_name',
                key: 'price_type_name',
                width: '45%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
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
                width: '25%',
            },
            {
                title: 'Prices',
                dataIndex: 'price_category_name',
                key: 'price_category_name',
                width: '20%',
            },
            {
                title: 'Type of pricing',
                dataIndex: 'price_type_name',
                key: 'price_type_name',
                width: '45%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditOther.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteOtherSegment.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        return (
            <>
                <Col span={16} offset={4}>
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
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Revenue streams</Text>
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.revenues.is_revenue_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>


                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Col offset={4} span={16}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Customer segment 1</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Plan a separate Revenue Streams for each Customer Segment as each of them may have different pricing requirements.  You can, actually  have several Revenue streams for each Segment.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.revenues.segment_1}
                                    columns={firstSegmentColumns}
                                    pagination={false}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onAddFirstRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button></Space>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Customer segment 2</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Plan a separate Revenue Streams for each Customer Segment as each of them may have different pricing requirements.  You can, actually  have several Revenue streams for each Segment.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.revenues.segment_2}
                                    columns={secondSegmentColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddSecondRevenueStream.bind(this)}><PlusOutlined />Add Revenue Stream</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Other</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.revenues.other}
                                    columns={otherColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddNewOther.bind(this)}><PlusOutlined />Add Other Revenue Stream</Button>)}
                                />
                            </Card >
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
                        <EditSegmentModal visibility={true} item={this.state.item} onClose={this.onCloseEditSegmentModal} />
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

export default connect(mapStateToProps, { getSelectedPlanOverview, getRevenues, getStreamTypes, getPrices, saveState, deleteRevenue, refreshPlan })(withRouter(RevenueStreams));