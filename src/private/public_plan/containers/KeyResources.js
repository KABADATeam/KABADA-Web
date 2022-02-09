import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import KeyResourcesCategoriesModal from "../../components/KeyResourcesCategoriesModal";
import EditKeyResourceModal from "../../public_plan/components/EditKeyResourceModal";
import { getResourcesList, getResourcesCategoriesList, deleteItem, saveEditable, saveChanges } from "../../../appStore/actions/resourcesAction";
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import { logout } from '../../../appStore/actions/authenticationActions';
import Cookies from 'js-cookie';
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

class PublicKeyResources extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_categories_modal_visible: false,
            is_edit_resource_modal_visible: false
        };
    }

    onBackClick() {
        this.props.history.push(`/public/overview`);
    }

    onCloseEditItemModal = () => {
        this.setState({
            is_edit_resource_modal_visible: false
        });
    };


    onEditItem(item) {
        this.props.saveEditable(item);
        this.setState({
            is_edit_resource_modal_visible: true
        });
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPublicPlan(localStorage.getItem("public_plan"), () => {
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
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...buttonStyle }} onClick={this.onEditItem.bind(this, record)} >View</Button>
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
                            Key Resources
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Resource</Text>
                            <TooltipComponent code="keyresources" type="title" />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key resources</Typography.Title>
                                <TextHelper code='keyresourceshelp' type='lefttext' />
                            </div>
                        </Col>
                        <Col span={16}>
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
                            />
                        </Col>
                        <KeyResourcesCategoriesModal visibility={this.state.is_categories_modal_visible} handleClose={this.onCloseNewItemModal} handleOpen={this.onOpenCategoriesModal} />
                        <EditKeyResourceModal visibility={this.state.is_edit_resource_modal_visible} handleClose={this.onCloseEditItemModal} />
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

export default connect(mapStateToProps, { getSelectedPlanOverview, getResourcesList, getResourcesCategoriesList, deleteItem, saveChanges, saveEditable, refreshPublicPlan, logout })(withRouter(PublicKeyResources));