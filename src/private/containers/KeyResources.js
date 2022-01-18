import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import KeyResourcesCategoriesModal from "../components/KeyResourcesCategoriesModal";
import EditKeyResourceModal from "../components/EditKeyResourceModal";
import { getResourcesList, getResourcesCategoriesList, deleteItem, saveEditable, saveChanges } from "../../appStore/actions/resourcesAction";
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import TooltipComponent from "../components/Tooltip"
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

class KeyResources extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_categories_modal_visible: false,
            is_edit_resource_modal_visible: false
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onCompletedChange(state) {
        this.props.saveChanges(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    onAddNewItem = () => {
        this.setState({
            is_categories_modal_visible: true
        });
    }

    onOpenCategoriesModal = () => {
        this.setState({
            is_categories_modal_visible: true
        });
    };

    onCloseNewItemModal = () => {
        this.setState({
            is_categories_modal_visible: false
        });
    };

    onCloseEditItemModal = () => {
        this.setState({
            is_edit_resource_modal_visible: false
        });
    };

    onDeleteItem(item) {
        this.props.deleteItem(item.resource_id);
    }

    onEditItem(item) {
        this.props.saveEditable(item);
        this.setState({
            is_edit_resource_modal_visible: true
        });
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getResourcesList(this.props.businessPlan.id);
                        this.props.getResourcesCategoriesList();
                    });
                }
            } else {
                this.props.getResourcesList(this.props.businessPlan.id);
                this.props.getResourcesCategoriesList();
            }
        } else {
            this.props.logout()
            this.props.history.push('/')
        }
    }

    render() {
        const data = this.props.resources.key_resources.map(obj => ({ ...obj, type: obj.category.description }));
        console.log('Data is:' + JSON.stringify(data))
        const columns = [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: '16.5%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '25%',
            },
            {
                title: 'Ownership',
                dataIndex: 'ownership',
                key: 'ownership',
                width: '39%',
                render: (text, record, index) => (
                    <div>
                        {record.selections[0].options[0].selected === true ?
                            <p>{text}</p> : record.selections[0].options[1].selected === true ? <p>Buy</p> :
                                record.selections[0].options[2].selected === true ? <p>Own</p> : ""}
                    </div>
                )
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditItem.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteItem.bind(this, record)} ><DeleteOutlined /></Button>
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
                            Key Resources
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Resource</Text>
                            <TooltipComponent code="keyresources" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.resources.is_resources_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>


                <Col span={20} offset={2}>
                    <Divider />
                </Col>

                <Col offset={2} span={20}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key resources</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    To reach the value proposition a company needs resources, these resources can be seen as the main assets to reach a company’s goal.
                                    Different departments within companies might even require different resources.
                                    These resources are needed to create the value proposition, to serve customer segments and to deliver the product or service to the customer.
                                    In that way the quality of the resources has a direct impact on the client and ultimately on the revenues,
                                    which needs to be known to create a sustainable business model.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Table
                                title={() => <>
                                    <Typography style={{ ...tableTitleStyle }}>Key resources</Typography>
                                    <Typography style={{ ...tableDescriptionStyle }}>
                                        Only state those resources that make you unique compared to your competitors in the market.
                                    </Typography>
                                </>}
                                dataSource={data}
                                columns={columns}
                                pagination={false}
                                footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddNewItem.bind(this)}><PlusOutlined />Add key resource</Button>)}
                            />
                        </Col>
                        {this.state.is_categories_modal_visible !== false ?
                            <KeyResourcesCategoriesModal visibility={this.state.is_categories_modal_visible}
                                handleClose={this.onCloseNewItemModal} handleOpen={this.onOpenCategoriesModal} />
                            : null

                        }
                        {this.state.is_edit_resource_modal_visible !== false ?
                            <EditKeyResourceModal visibility={this.state.is_edit_resource_modal_visible} handleClose={this.onCloseEditItemModal} /> : null}


                    </Row>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        resources: state.resourcesList
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, getResourcesList, getResourcesCategoriesList, deleteItem, saveChanges, saveEditable, logout, refreshPlan })(withRouter(KeyResources));