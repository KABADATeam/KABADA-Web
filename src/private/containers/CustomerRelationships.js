import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, defaultButtonStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import RelationshipCategoriesModal from '../components/customer_relationships/RelationshipCategoriesModal';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getCustomerRelationshipsCategories, getCustomerRelationships, saveState, selectRelationshipCategory, deleteCustomerRelationship, getAICustomerRelationshipsPredict } from "../../appStore/actions/customerRelationshipsAction";
import AddCustomerRelationshipModal from '../components/customer_relationships/AddCustomerRelationshipModal';
import EditCustomerRelationshipModal from '../components/customer_relationships/EditCustomerRelationshipModal';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import TooltipComponent from '../components/Tooltip';
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
        this.props.getCustomerRelationshipsCategories();
        const postObj = {
            "location": 'plan::custRelationship::getCust::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
        this.setState({
            relationshipCategory: 1,
            group: 1
        });
    }
    onAddHowToKeepExisting = () => {
        this.props.getCustomerRelationshipsCategories();
        const postObj = {
            "location": 'plan::custRelationship::keepCust::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
        this.setState({
            relationshipCategory: 2,
            group: 2
        });
    }

    onAddHowToMakeSpend = () => {
        this.props.getCustomerRelationshipsCategories();
        const postObj = {
            "location": 'plan::custRelationship::convCust::sample',
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
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
        this.props.getCustomerRelationshipsCategories();
    };

    onCloseRelationshipCategoriesModal = () => {
        this.setState({
            relationshipCategory: null,
            group: null,
            item: null,
        });
        this.props.selectRelationshipCategory(null);
        this.props.getCustomerRelationshipsCategories();
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
        const postObj = {
            "location": `plan::custRelationship::getCust::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
        this.setState({
            item: { ...item, "group": 1 },
        });
    }

    onEditHowToKeepExisting(item) {
        const postObj = {
            "location": `plan::custRelationship::keepCust::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
        this.setState({
            item: { ...item, "group": 2 },
        });
    }

    onEditHowToMakeSpend(item) {
        const postObj = {
            "location": `plan::custRelationship::convCust::${item.id}`,
            "planId": this.props.businessPlan.id
        };
        this.props.getAICustomerRelationshipsPredict(postObj);
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
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getCustomerRelationshipsCategories();
                        this.props.getCustomerRelationships(this.props.businessPlan.id);
                        this.props.getTooltips();
                    });
                }
            } else {
                this.props.getCustomerRelationshipsCategories();
                this.props.getCustomerRelationships(this.props.businessPlan.id);
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }

    render() {

        const howToGetNewColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '26.5%',
                render: (value, row) => value.title,
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '44%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (value, row) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        {row.category.title === "Word of Mouth" ?
                            <>
                                <Button size="small" style={{ ...defaultButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToGetNew.bind(this, row)} ><DeleteOutlined /></Button>
                            </>
                            :
                            <>
                                <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToGetNew.bind(this, row)} >Edit</Button>
                                <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToGetNew.bind(this, row)} ><DeleteOutlined /></Button>
                            </>
                        }
                    </Space>
                ),
            }
        ];

        const howToKeepExistingColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '26.5%',
                render: (value, row) => (value.title)
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '44%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (value, row) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        {row.category.title === "Word of Mouth" ?
                            <Button size="small" style={{ ...defaultButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToKeepExisting.bind(this, row)} ><DeleteOutlined /></Button>
                            :
                            <>
                                <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToKeepExisting.bind(this, row)} >Edit</Button>
                                <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToKeepExisting.bind(this, row)} ><DeleteOutlined /></Button>
                            </>
                        }
                    </Space>
                ),
            }
        ];

        const howToMakeSpendColumns = [
            {
                title: 'Action',
                dataIndex: 'category',
                key: 'category',
                width: '26.5%',
                render: (value, row) => (value.title),
            },
            {
                title: 'Channel',
                dataIndex: 'channels',
                key: 'channels',
                width: '44%',
                render: (value, row) => value.map(function (item, index) {
                    return (index ? ', ' : '') + item;
                }),
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (value, row) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        {row.category.title === "Word of Mouth" ?
                            <Button size="small" style={{ ...defaultButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToMakeSpend.bind(this, row)} ><DeleteOutlined /></Button>
                            :
                            <>
                                <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditHowToMakeSpend.bind(this, row)} >Edit</Button>
                                <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteHowToMakeSpend.bind(this, row)} ><DeleteOutlined /></Button>
                            </>
                        }
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
                            Customer Relationships
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Customer Relationships</Text>
                            <TooltipComponent code="custrelat" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.customerRelationships.is_customer_relationship_completed} onClick={this.onCompletedChange.bind(this)} />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to get new customers?</Typography.Title>
                                <TextHelper code="custrelgetcust" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                dataSource={this.props.customerRelationships.how_to_get_new}
                                columns={howToGetNewColumns}
                                pagination={false}
                                footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToGetNew.bind(this)}><PlusOutlined />Add action</Button></Space>)}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to keep customers?</Typography.Title>
                                <TextHelper code="custrelkeepcust" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                dataSource={this.props.customerRelationships.how_to_keep_existing}
                                columns={howToKeepExistingColumns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToKeepExisting.bind(this)}><PlusOutlined />Add action</Button>)}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>How to convince existing to spend more?</Typography.Title>
                                <TextHelper code="custrelconvince" type="lefttext"/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Table
                                dataSource={this.props.customerRelationships.how_to_make_spend}
                                columns={howToMakeSpendColumns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddHowToMakeSpend.bind(this)}><PlusOutlined />Add action</Button>)}
                            />
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

export default connect(mapStateToProps, { getSelectedPlanOverview, logout, getCustomerRelationshipsCategories, getCustomerRelationships, refreshPlan, saveState, selectRelationshipCategory, deleteCustomerRelationship, getAICustomerRelationshipsPredict, getTooltips })(withRouter(CustomerRelationships));