import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import AddChannelModal from '../../components/channels/AddChannelModal';
import EditChannelModal from '../../public_plan/components/EditChannelModal';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getChannelTypes, getChannels, deleteChannel, saveState } from "../../../appStore/actions/channelActions";
import { getProducts } from "../../../appStore/actions/productActions";
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

class PublicChannels extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            showAddChannelModal: false
        };
    }

    onBackClick() {
        this.props.history.push(`/public/overview`);
    }

    onAddChannel = () => {
        this.setState({
            showAddChannelModal: true
        });
    }

    onCloseAddChannelModal = () => {
        this.setState({
            showAddChannelModal: false
        });
    };

    onCloseEditChannelModal = () => {
        this.setState({
            item: null
        });
    };

    onDeleteChannel(item) {
        this.props.deleteChannel(item.item.id);
    }

    onEditChannel(item) {
        this.setState({
            item: item.item
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
                this.props.refreshPublicPlan(localStorage.getItem("public_plan"), () => {
                    this.props.getChannelTypes();
                    this.props.getChannels(this.props.businessPlan.id);
                    this.props.getProducts(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getChannelTypes();
            this.props.getChannels(this.props.businessPlan.id);
            this.props.getProducts(this.props.businessPlan.id);
        }
    }

    render() {
        console.log(this.props)
            ;
        const data = this.props.channels.channels.map(item => {
            const channel_name = item.channel_type.name;
            const distribution_names = item.distribution_channels === null ? [] : item.distribution_channels.map(item => item.name);
            const distribution_name = distribution_names.length === 0 ? "-" : distribution_names.join();
            const product_names = item.products.map(item => item.name);
            const product_name = product_names.join();
            return {
                "channel_name": channel_name,
                "distribution_name": distribution_name,
                "product_name": product_name,
                "item": item,
                "key": item.id
            }
        });

        const channelsColumns = [
            {
                title: 'Channels',
                dataIndex: 'channel_name',
                key: 'channel_name',
                width: '24.5%',
            },
            {
                title: 'Distribution channel',
                dataIndex: 'distribution_name',
                key: 'distribution_name',
                width: '25.2%',
            },
            {
                title: 'Product',
                dataIndex: 'product_name',
                key: 'product_name',
                width: '31%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.3%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditChannel.bind(this, record)} >View</Button>
                        {/* <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteChannel.bind(this, record)} ><DeleteOutlined /></Button> */}
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
                            Channels
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Channels</Text>
                            <TooltipComponent code="channel" type="title" />
                        </div>
                    </Col>
                    {/* <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.channels.is_channels_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col> */}
                </Row>


                <Col span={20} offset={2}>
                    <Divider />
                </Col>

                <Col offset={2} span={20}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Channels</Typography.Title>
                                <TextHelper code="channelhelp" type="lefttext" />
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                title={() =>
                                    <>
                                        <Typography style={{ ...tableTitleStyle }}>Channels</Typography>
                                    </>}
                                dataSource={data}
                                columns={channelsColumns}
                                pagination={false}
                            //footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onAddChannel.bind(this)}><PlusOutlined />Add Channel</Button></Space>)}
                            />
                        </Col>
                    </Row>
                </Col>

                {
                    this.state.showAddChannelModal === true ?
                        <AddChannelModal visibility={true} onClose={this.onCloseAddChannelModal} />
                        : null
                }

                {
                    this.state.item !== null ?
                        <EditChannelModal visibility={true} item={this.state.item} onClose={this.onCloseEditChannelModal} />
                        : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        channels: state.channels
    };
}

export default connect(mapStateToProps, { getChannelTypes, getProducts, getChannels, deleteChannel, saveState, refreshPublicPlan, getSelectedPlanOverview })(withRouter(PublicChannels));