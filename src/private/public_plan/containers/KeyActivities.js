import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Space, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
//import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { refreshPlan } from "../../../appStore/actions/refreshAction";
import { getKeyActivitiesList, getCategories, saveState } from "../../../appStore/actions/keyActivitiesAction";
import ProductComponent from "../../public_plan/components/ProductComponent";
import KeyActivityTypesModal from "../../components/key_activities/KeyActivityTypesModal";
import AddKeyActivityModal from "../../components/key_activities/AddKeyActivityModal";
import EditKeyActivityModal from "../../public_plan/components/EditKeyActivityModal"

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
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

class KeyActivities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityCategoriesModalVisibility: false, 
            addSubTypeModalVisibility: false, 
            productID: null,
            item: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }
    openCategoriesModal = () => {
        this.setState({
            activityCategoriesModalVisibility: true,
        });
    }
    getProductID = (id) => {
        this.setState({
            productID: id
        })
    }
    onCloseCategoriesModal = () => {
        this.setState({
            activityCategoriesModalVisibility: false
        })
    }
    openAddSubTypeModal = () => {
        this.setState({
            addSubTypeModalVisibility: true,
            activityCategoriesModalVisibility: false
        })
    }
    onCloseAddSubTypeModal = () => {
        this.setState({
            addSubTypeModalVisibility: false,
            activityCategoriesModalVisibility: true
        })
    }
    openEditKeyActivityModal = (item) => {
        this.setState({
            item: { ...item},
        })
    }
    onCloseEditKeyActivityModal = () => {
        this.setState({
            item: null,
        })
    }
    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state);
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getKeyActivitiesList(this.props.businessPlan.id)
                    this.props.getCategories()
                });                
            }
        } else {
            this.props.getKeyActivitiesList(this.props.businessPlan.id)
            this.props.getCategories()
        }
    }
    render() {

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
                            Key activities
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Activities</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                </Row>
                <Col span={16} offset={4}>
                    <Divider />
                </Col>
                <List
                    dataSource={this.props.activities.products}
                    renderItem={item => (
                        <List.Item>
                            <ProductComponent data={item} onOpen={this.openCategoriesModal} onClose={this.closeCategoriesModal} getProductID={this.getProductID} onOpenEditModal={this.openEditKeyActivityModal} />
                        </List.Item>
                    )}
                                        
                />
                {
                        this.state.activityCategoriesModalVisibility === true ? 
                            <KeyActivityTypesModal visibility={true} onClose={this.onCloseCategoriesModal} onOpen={this.openAddSubTypeModal}/>
                            : null
                }
                {
                        this.state.addSubTypeModalVisibility === true ? 
                            <AddKeyActivityModal visibility={true} onClose={this.onCloseAddSubTypeModal} productID={this.state.productID}/>
                            : null
                }
                {
                        this.state.item !== null ? 
                            <EditKeyActivityModal visibility={true} item={this.state.item} onClose={this.onCloseEditKeyActivityModal} productID={this.state.productID} />
                            : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        activities: state.keyActivities,
        categories: state.keyActivitiesCategoriesList
    };
}

export default connect(mapStateToProps, {refreshPlan, getCategories, getKeyActivitiesList, saveState})(KeyActivities);