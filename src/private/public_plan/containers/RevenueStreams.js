import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import AddSegmentModal from '../../components/revenue_streams/AddSegmentModal';
import EditSegmentModal from '../../public_plan/components/EditSegmentModal';
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getStreamTypes, getPrices, getRevenues, saveState, deleteRevenue } from "../../../appStore/actions/revenueStreamActions";
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";

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

class PublicRevenueStreams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            segmentNumber: null
        };
    }

    onBackClick() {
        this.props.history.push(`/public/overview`);
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
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("public_plan"), () => {
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
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditFirstSegment.bind(this, record)} >View</Button>
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
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditSecondSegment.bind(this, record)} >View</Button>
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
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditOther.bind(this, record)} >View</Button>
                    </Space>
                ),
            }
        ];

        return (
            <>
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/public-business-plans'>Public Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
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
                            <Tooltip title="Tooltip text">
                                <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                            </Tooltip>
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

export default connect(mapStateToProps, { getSelectedPlanOverview, getRevenues, getStreamTypes, getPrices, saveState, deleteRevenue, refreshPlan })(withRouter(PublicRevenueStreams));