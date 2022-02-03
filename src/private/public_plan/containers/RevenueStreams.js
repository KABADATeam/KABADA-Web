import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import AddSegmentModal from '../../components/revenue_streams/AddSegmentModal';
import EditSegmentModal from '../../public_plan/components/EditSegmentModal';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getStreamTypes, getPrices, getRevenues, saveState, deleteRevenue } from "../../../appStore/actions/revenueStreamActions";
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import TooltipComponent from "../../components/Tooltip";
import TextHelper from '../../components/TextHelper';

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

    onCloseEditSegmentModal = () => {
        this.setState({
            item: null
        });
    };

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


    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPublicPlan(localStorage.getItem("public_plan"), () => {
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
                render: (obj, record) => (
                    <p>{record.segments + ' '}</p>
                ),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
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
                dataIndex: 'price_type_name',
                key: 'price_type_name',
                width: '42%',
                render: (obj, record) => (
                    <p>{record.segments + ' '}</p>
                ),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
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
                render: (obj, record) => (
                    <p>{record.segments + ' '}</p>
                ),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditOther.bind(this, record)} >View</Button>
                    </Space>
                ),
            }
        ];

        return (
            <>
                <Col span={20} offset={2}>
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
                    <Col span={12} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Revenue streams</Text>
                            <TooltipComponent code="revstrem" type="title" />
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
                                <TextHelper code="revstreamconsumer" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                dataSource={this.props.revenues.segment_1}
                                columns={firstSegmentColumns}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business</Typography.Title>
                                <TextHelper code="revstreambusiness" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                                <Table
                                    dataSource={this.props.revenues.segment_2}
                                    columns={secondSegmentColumns}
                                    pagination={false}
                                />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Public bodies & NGO</Typography.Title>
                                <TextHelper code="revstreampublicbodies" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                                <Table
                                    dataSource={this.props.revenues.other}
                                    columns={otherColumns}
                                    pagination={false}
                                />
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

export default connect(mapStateToProps, { getSelectedPlanOverview, getRevenues, getStreamTypes, getPrices, saveState, deleteRevenue, refreshPublicPlan })(withRouter(PublicRevenueStreams));