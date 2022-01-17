import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getCostStructureList, getCategories, deleteFixedCost, deleteVariableCost, selectCostCategory, saveState } from "../../appStore/actions/costStructureAction"
//import FixedCostModal from "../components/cost_structure/FixedCostModal";
import CostCategoriesModal from "../components/cost_structure/CostCategoriesModal"
import EditCostModal from "../components/cost_structure/EditCostModal"
import AddCostModal from "../components/cost_structure/AddCostModal";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import TooltipComponent from "../components/Tooltip";

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

class CostStructure extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            costNumber: null, //fixed is 1, variable is 2
            addModalVisibility: null,
            fixedCostNumber: null
        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    openFixedCostCategories = () => {
        this.setState({
            costNumber: 1,
            fixedCostNumber: 1
        });

    }
    openVarCostCategories = () => {
        this.setState({
            costNumber: 2,
            fixedCostNumber: 2
        });
    }
    openAddCostModal = () => {
        this.setState({
            addModalVisibility: true,
            costNumber: null
        })

    }
    closeAddCostModal = () => {
        this.setState({
            addModalVisibility: null,
            costNumber: this.state.fixedCostNumber
        })

        this.onCloseCostCategoriesModal();

    }
    onCloseCostCategoriesModal = () => {
        this.setState({
            costNumber: null,

        });


    };
    onDeleteFixedCost(item) {
        this.props.deleteFixedCost({ "id": item.id, "number": 1 });
    }
    onDeleteVariableCost(item) {
        this.props.deleteVariableCost({ "id": item.id, "number": 2 });
    }
    onEditFixedCost(item) {
        console.log(item);
        this.setState({
            item: { ...item },
            fixedCostNumber: 1
        })
    }
    onEditVarCost(item) {
        this.setState({
            item: { ...item },
            fixedCostNumber: 2
        })

    }
    onCloseEditCostModal = () => {
        this.setState({
            item: null,
            fixedCostNumber: null
        })
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
                    this.props.getCostStructureList(this.props.businessPlan.id, () => {
                        this.props.getCategories();
                    });

                });
            }
        } else {
            this.props.getCostStructureList(this.props.businessPlan.id);
            this.props.getCategories();
        }
    }
    render() {
        const fixedCostsColumns = [
            {
                title: 'Cost type',
                dataIndex: 'category_title',
                key: 'category_title',
                width: '31.5%',
            },
            {
                title: 'Type',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '26%'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '23%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditFixedCost.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteFixedCost.bind(this, record)}><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];
        const varCostsColumns = [
            {
                title: 'Cost type',
                dataIndex: 'category_title',
                key: 'category_title',
                width: '31.5%',
            },
            {
                title: 'Type',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '26%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '23%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...leftButtonStyle }} onClick={this.onEditVarCost.bind(this, record)} >Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteVariableCost.bind(this, record)} ><DeleteOutlined /></Button>
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
                            Cost structure
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={16} offset={2}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Cost structure</Text>
                            <TooltipComponent code="coststruct" type="title" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.costs.is_cost_completed} onClick={this.onCompletedChange.bind(this)} />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Fixed costs</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    A fixed cost is a cost that does not change with an increase or decrease in the amount of goods or services produced or sold. Fixed costs are expenses that have to be paid by a start-up, independently of any specific business activity. Below are listed most common groups of fixed costs.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Table
                                dataSource={this.props.costs.fixed_costs}
                                columns={fixedCostsColumns}
                                rowKey={record => record.id}
                                pagination={false}
                                footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.openFixedCostCategories.bind(this)}><PlusOutlined />Add fixed cost</Button></Space>)}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Variable costs</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Are costs that changes in proportion to production output or service amount. Variable costs increase or decrease depending on a production or service volume; they rise as it increases and fall as production decreases.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Table
                                dataSource={this.props.costs.variable_costs}
                                columns={varCostsColumns}
                                rowKey={record => record.id}
                                pagination={false}
                                footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.openVarCostCategories.bind(this)}><PlusOutlined />Add variable cost</Button></Space>)}
                            />
                        </Col>
                    </Row>
                </Col>

                {
                    this.state.costNumber !== null ?
                        <CostCategoriesModal visibility={true} number={this.state.fixedCostNumber} onClose={this.onCloseCostCategoriesModal} onOpen={this.openAddCostModal} />
                        : null
                }
                {
                    this.state.item !== null ?
                        <EditCostModal visibility={true} item={this.state.item} onClose={this.onCloseEditCostModal} number={this.state.fixedCostNumber} />
                        : null
                }
                {
                    this.state.addModalVisibility !== null ?
                        <AddCostModal visibility={true} number={this.state.fixedCostNumber} onClose={this.closeAddCostModal} />
                        : null
                }

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        categories: state.costCategoriesList,
        costs: state.costStructure,
        category: state.selectedCostCategory
    };
}

export default connect(mapStateToProps, { getSelectedPlanOverview, deleteFixedCost, deleteVariableCost, getCategories, getCostStructureList, refreshPlan, saveState, selectCostCategory })(CostStructure);