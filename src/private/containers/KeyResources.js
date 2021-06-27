import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import KeyResourcesModal from "../components/KeyResourcesModal";
import EditKeyResourceModal from "../components/EditKeyResourceModal";
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { getResourcesList, getResourcesCategoriesList, deleteItem, updateResourcesState, discardChanges, saveChanges, saveEditable } from "../../appStore/actions/resourcesAction";

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
            isVisible: false,
            isEditableVisible: false
        };
    }

    componentDidMount() {
        this.props.getResourcesList(this.props.businessPlan.id);
        this.props.getResourcesCategoriesList();
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onCompleteChange(state) {
        this.props.updateResourcesState(state);
    }

    addNewItem = () => {
        this.setState({
            isVisible: true
        });
    }

    closeNewItemModal = () => {
        this.setState({
            isVisible: false
        });
    };

    closeEditItemModal = () => {
        this.setState({
            isEditableVisible: false
        });
    };

    deleteItem(item) {
        this.props.deleteItem(item.resource_id);
    }

    editItem(item) {
        this.props.saveEditable(item);
        this.setState({
            isEditableVisible: true
        });
    }

    getUpdatesWindowState() {
        if (this.props.resources.updates.is_resources_completed !== null) {
            return 'visible';
        }

        return 'hidden';
    }

    discardChanges = () => {
        this.props.discardChanges();
    };

    saveChanges = () => {
        this.props.saveChanges(this.props.businessPlan.id);
    };

    render() {
        console.log(this.props.resources);
        const isVisibleHeader = this.getUpdatesWindowState();
        const data = this.props.resources.original.key_resources.map(obj=> ({ ...obj, type: obj.category.description }));
        const columns = [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: '30%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: 'Ownership',
                dataIndex: 'ownership',
                key: 'ownership',
                width: '30%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.editItem.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.deleteItem.bind(this, record)} ><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];

        return (
            
            <>
                <UnsavedChangesHeader
                    visibility={isVisibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>Kabada Intelligence Ltd.</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Key Resources
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col offset={4}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Resource</Text> <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                        </div>
                    </Col>
                    <Col span={11}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.resources.updates.is_resources_completed === null ? this.props.resources.original.is_resources_completed : this.props.resources.updates.is_resources_completed} onClick={this.onCompleteChange.bind(this)} />
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
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
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
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addNewItem.bind(this)}><PlusOutlined />Add key resource</Button>)}
                                />
                            </Card >
                        </Col>
                        <KeyResourcesModal visibility={this.state.isVisible} handleClose={this.closeNewItemModal} />
                        <EditKeyResourceModal visibility={this.state.isEditableVisible} handleClose={this.closeEditItemModal}/>
                    </Row>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        businessPlan: state.selectedBusinessPlan,
        resources: state.resourcesList
    };
}

export default connect(mapStateToProps, { getResourcesList, getResourcesCategoriesList, deleteItem, updateResourcesState, discardChanges, saveChanges, saveEditable })(withRouter(KeyResources));