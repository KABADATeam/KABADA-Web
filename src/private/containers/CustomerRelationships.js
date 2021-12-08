import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import RelationshipCategoriesModal from '../components/customer_relationships/RelationshipCategoriesModal';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getCustomerRelationshipsCategories, getCustomerRelationships, saveState, selectRelationshipCategory, deleteCustomerRelationship } from "../../appStore/actions/customerRelationshipsAction";
import AddCustomerRelationshipModal from '../components/customer_relationships/AddCustomerRelationshipModal';
import EditCustomerRelationshipModal from '../components/customer_relationships/EditCustomerRelationshipModal';
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

class CustomerRelationships extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            relationshipCategory: null,
            group: null,
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onAddHowToGetNew = () => {
        this.setState({
            relationshipCategory: 1,
            group: 1
        });
    }

    onAddHowToKeepExisting = () => {
        this.setState({
            relationshipCategory: 2,
            group: 2
        });
    }

    onAddHowToMakeSpend = () => {
        this.setState({
            relationshipCategory: 3,
            group: 3
        });
    }

    onCloseAddRelationshipModal = () => {
        this.setState({
            item: null,
            group: this.state.relationshipCategory
        });
        this.props.selectRelationshipCategory(null);
    };

    onCloseRelationshipCategoriesModal = () => {
        this.setState({
            relationshipCategory: null,
            group: null,
            item: null,
        });
        this.props.selectRelationshipCategory(null);
    };

    onBackAddRelationshipModal = () => {
        this.setState({
            relationshipCategory: null,
            group: null,
            item: null,
        });
    };

    onCloseEditRelationshipModal = () => {
        this.setState({
            relationshipCategory: null,
            group: null,
            item: null,
        });
    };

    openAddRelationshipCategoriesModal = () => {
        this.setState({
            addModalVisibility: true,
            group: null,
        })
    }

    onDeleteHowToGetNew(item) {
        this.props.deleteCustomerRelationship({ "id": item.id, "group": 1 });
    }

    onDeleteHowToKeepExisting(item) {
        this.props.deleteCustomerRelationship({ "id": item.id, "group": 2 });
    }

    onDeleteHowToMakeSpend(item) {
        this.props.deleteCustomerRelationship({ "id": item.id, "group": 3 });
    }

    onEditHowToGetNew(item) {
        this.setState({
            item: { ...item, "group": 1 },
        });
    }

    onEditHowToKeepExisting(item) {
        this.setState({
            item: { ...item, "group": 2 },
        });
    }

    onEditHowToMakeSpend(item) {
        this.setState({
            item: { ...item, "group": 3 },
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
                    this.props.getCustomerRelationshipsCategories();
                    this.props.getCustomerRelationships(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getCustomerRelationshipsCategories();
            this.props.getCustomerRelationships(this.props.businessPlan.id);
        }
    }

    render() {

        const howToGetNewColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '25%',
                render: (value, row) => value.title,
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '65%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (value, row) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToGetNew.bind(this, row)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToGetNew.bind(this, row)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const howToKeepExistingColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '25%',
                render: (value, row) => (value.title)
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '65%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (value, row) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToKeepExisting.bind(this, row)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToKeepExisting.bind(this, row)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        const howToMakeSpendColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '25%',
                render: (value, row) => (value.title),
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '65%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (value, row) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToMakeSpend.bind(this, row)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToMakeSpend.bind(this, row)} ><DeleteOutlined /></Button>
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
                            Customer Relationships
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Customer Relationships</Text>
                            <Tooltip title="Tooltip text">
                                <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                            </Tooltip>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.customerRelationships.is_customer_relationship_completed} onClick={this.onCompletedChange.bind(this)} />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to get new customers?</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    <br /><br />
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.customerRelationships.how_to_get_new}
                                    columns={howToGetNewColumns}
                                    pagination={false}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToGetNew.bind(this)}><PlusOutlined />Add action</Button></Space>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to keep customers?</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    <br /><br />
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.customerRelationships.how_to_keep_existing}
                                    columns={howToKeepExistingColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToKeepExisting.bind(this)}><PlusOutlined />Add action</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to convince existing to spend more?</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.customerRelationships.how_to_make_spend}
                                    columns={howToMakeSpendColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToMakeSpend.bind(this)}><PlusOutlined />Add action</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                </Col>

                {
                    this.state.group !== null ?
                        <RelationshipCategoriesModal visibility={true} group={this.state.relationshipCategory} onClose={this.onCloseRelationshipCategoriesModal} onOpen={this.openAddRelationshipCategoriesModal} />
                        : null
                }
                {
                    this.state.addModalVisibility !== null && this.props.categories.selected_category !== null ?
                        <AddCustomerRelationshipModal visibility={true} group={this.state.relationshipCategory} onClose={this.onCloseAddRelationshipModal} onBack={this.onBackAddRelationshipModal} />
                        : null
                }
                {
                    this.state.item !== null ?
                        <EditCustomerRelationshipModal visibility={true} item={this.state.item} onClose={this.onCloseEditRelationshipModal} />
                        : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        categories: state.customerRelationshipsCategories,
        customerRelationships: state.customerRelationships
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, getCustomerRelationshipsCategories, getCustomerRelationships, refreshPlan, saveState, selectRelationshipCategory, deleteCustomerRelationship })(withRouter(CustomerRelationships));