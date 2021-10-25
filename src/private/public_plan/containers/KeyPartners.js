import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
//import KeyPartnersModal from "../components/KeyPartnersModal";
//import AddKeyPartnerModal from '../components/AddKeyPartnerModal';
import EditKeyPartnerModal from '../../public_plan/components/EditKeyPartnerModal';
import { getPartners, getPartnersCategories, selectCategory, deleteDistributor, deleteSupplier, deleteOther, saveState } from "../../../appStore/actions/partnersAction";
import { refreshPlan } from "../../../appStore/actions/refreshAction";
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

class KeyPartners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCategoriesModalVisible: false,
            isPartnerModalVisible: false,
            isEditPartnerModalVisible: false,
            category: null,
            item: { "type_title" : "" }
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    addNewItem = () => {
        this.setState({
            isCategoriesModalVisible: true,
        });
    }

    onAddNewPartner = () => {
        this.setState({
            isPartnerModalVisible: true
        });
    }

    onAddNewDistributor = () => {
        this.props.selectCategory("distributor", this.props.categories.distributors_types, () => {
            this.setState({
                isCategoriesModalVisible: true
            });
        });
    }

    onAddNewSupplier = () => {
        this.props.selectCategory("supplier", this.props.categories.suppliers_types, () => {
            this.setState({
                isCategoriesModalVisible: true
            });
        });
    }

    onAddNewOther = () => {
        this.props.selectCategory("other", this.props.categories.others_types, () => {
            this.setState({
                isCategoriesModalVisible: true
            });
        });
    }

    onCloseCategoriesModal = () => {
        this.setState({
            isCategoriesModalVisible: false
        });
    };

    onClosePartnerModal = () => {
        this.setState({
            isPartnerModalVisible: false
        });
    };

    onCloseEditPartnerModal = () => {
        this.setState({
            isEditPartnerModalVisible: false,
            item: { "type_title" : "" }
        });
    };

    onBackToCategoriesModal = () => {
        this.setState({
            isPartnerModalVisible: false,
            isCategoriesModalVisible: true
        });
    };

    onDeleteDistributor(item) {
        this.props.deleteDistributor(item.id);
    }

    onDeleteSupplier(item) {
        this.props.deleteSupplier(item.id);
    }

    onDeleteOther(item) {
        this.props.deleteOther(item.id);
    }

    onEditDistributor(item) {
        this.setState({
            isEditPartnerModalVisible: true,
            item: { ...item, "category": "distributor" }
        });
    }

    onEditSupplier(item) {
        this.setState({
            isEditPartnerModalVisible: true,
            item: { ...item, "category": "supplier" }
        });
    }

    onEditOther(item) {
        this.setState({
            isEditPartnerModalVisible: true,
            item: { ...item, "category": "other" }
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
                    this.props.getPartners(this.props.businessPlan.id);
                    this.props.getPartnersCategories();
                });
            }
        } else {
            this.props.getPartners(this.props.businessPlan.id);
            this.props.getPartnersCategories();
        }
    }

    render() {

        const distributorsColumns = [
            {
                title: 'Distributor type',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '38%',
            },
            {
                title: 'Company',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                width: '22%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditDistributor.bind(this, record)} >View</Button>
                        {/*<Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteDistributor.bind(this, record)} ><DeleteOutlined /></Button>*/}
                    </Space>
                ),
            }
        ];

        const suppliersColumns = [
            {
                title: 'Supplier type',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '38%',
            },
            {
                title: 'Company',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                width: '22%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditSupplier.bind(this, record)} >View</Button>
                        {/*<Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteSupplier.bind(this, record)} ><DeleteOutlined /></Button>*/}
                    </Space>
                ),
            }
        ];

        const otherColumns = [
            {
                title: 'Type',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '38%',
            },
            {
                title: 'Company',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                width: '22%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditOther.bind(this, record)} >View</Button>
                        {/*<Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteOther.bind(this, record)} ><DeleteOutlined /></Button>*/}
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
                            Key Partners
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Partners</Text>
                        </div>
                    </Col>
                  { /* <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.partners.is_partners_completed} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                         </Col>*/}
                </Row>


                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Col offset={4} span={16}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key Distributors</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Possible if you distribute your products through your own channels – directly, your own store, homepage. Often the case in some service sectors.
                                    <br /><br />
                                    You can choose type “Many Retailers” if you believe that distribution channels are strongly diversified and no distributor is of high importance
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.partners.distributors}
                                    columns={distributorsColumns}
                                    pagination={false}
                                  //  footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} disabled={this.props.partners.distributors.length === 3 ? true : false} onClick={this.onAddNewDistributor.bind(this)}><PlusOutlined />Add Distributor</Button><Text>Maximum distributors: {this.props.partners.distributors.length}/3 <Tooltip title="Tooltip text"><InfoCircleFilled style={{ fontSize: '16px', color: '#BFBFBF', marginLeft: '5px' }} /></Tooltip></Text></Space>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key Suppliers</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Consider professional associations, networks locally and internationally, employers’ unions, chambers of commerce, trade unions
                                    <br /> <br />
                                    Consider relevant regulatory bodies, watchdogs, supporting institutions, municipalities, state revenue service and similar
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={this.props.partners.suppliers}
                                    columns={suppliersColumns}
                                    pagination={false}
                                   // footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddNewSupplier.bind(this)}><PlusOutlined />Add Suppliers</Button>)}
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
                                    Consider professional associations, networks locally and internationally, employers’ unions, chambers of commerce, trade unions
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Typography style={{ ...tableTitleStyle, marginLeft: "15px", marginTop: "5px", marginBottom: "5px" }}>Various other<InfoCircleFilled style={{ fontSize: '16px', color: '#BFBFBF', marginLeft: '17px' }} /></Typography>
                                <Table
                                    dataSource={this.props.partners.others}
                                    columns={otherColumns}
                                    pagination={false}
                                   // footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddNewOther.bind(this)}><PlusOutlined />Add Other Partners</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                </Col>
              {/*  <KeyPartnersModal visibility={this.state.isCategoriesModalVisible} onForward={this.onAddNewPartner}  onClose={this.onCloseCategoriesModal} />
                <AddKeyPartnerModal visibility={this.state.isPartnerModalVisible} onClose={this.onClosePartnerModal} onBack={this.onBackToCategoriesModal} />*/}
                {
                    this.state.isEditPartnerModalVisible ? 
                        <EditKeyPartnerModal visibility={this.state.isEditPartnerModalVisible} item={this.state.item} onClose={this.onCloseEditPartnerModal} />
                        : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        partners: state.partners,
        categories: state.partnersCategories
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, getPartners, getPartnersCategories, selectCategory, deleteDistributor, deleteSupplier, deleteOther, saveState, refreshPlan })(withRouter(KeyPartners));