import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Space, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getCashFlow } from "../../../appStore/actions/cashFlowAction"
import { logout } from '../../../appStore/actions/authenticationActions';
import TooltipComponent from '../../components/Tooltip';
import Cookies from 'js-cookie';
import TextHelper from '../../components/TextHelper';

const { Text } = Typography;
const { Title } = Typography;

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
const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}
class CashFlow extends React.Component {

    onBackClick() {
        this.props.history.push(`/public/overview`);
    }

    onCompletedChange(state) {
        /*this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });*/
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPublicPlan(localStorage.getItem("plan"), () => {
                        this.props.getCashFlow(this.props.businessPlan.id);
                    });
                }
            } else {
                this.props.getCashFlow(this.props.businessPlan.id);
            }
        } else {
            this.props.history.push('/')
        }

    }
    render() {

        const months = this.props.cashFlowData.tableColumns;
        const data = this.props.cashFlowData.dataForTable;

        const renderContent = (value, row, index) => {
            const obj = {
                children: <p style={{ marginBottom: 0, float: 'right' }}>{value}</p>,
                props: {
                    style: { fontWeight: 600, fontSize: '14px', background: (parseInt(value) < 0) ? "#FFCCC7" : '', marginBottom: 0 },
                }
            }
            if (row.tag === "title" || row.tag === "section") {
                obj.props.colSpan = 0;

            }
            if (row.tag === "summary") {
                obj.props.style = { background: '#FAFAFA', marginBottom: 0, fontWeight: 600, fontSize: '14px' }
            }
            return obj;
        };



        const cashFlowColumns = [
            {
                title: 'Cash flow',
                dataIndex: 'title',
                key: 'title',
                fixed: 'left',
                width: 600,
                render: (text, row, index) => {
                    if (row.tag === "title") {
                        return {
                            children: <h1 style={{ marginBottom: 0 }}>{text}</h1>,
                            props: {
                                colSpan: 1,
                                style: { marginBottom: 0 },
                            },
                        };
                    }
                    if (row.tag === "section") {
                        return {
                            children: <h3 style={{ marginBottom: 0 }}>{text}</h3>,
                            props: {
                                colSpan: 1,
                                style: { marginBottom: 0 },
                            },
                        };
                    }
                    if (row.tag === "summary") {
                        return {
                            children: <h3 style={{ marginBottom: 0 }}>{text}</h3>,
                            props: {
                                style: { background: (parseInt(text) < 0) ? "#FFCCC7" : '#FAFAFA', marginBottom: 0 }
                            },
                        };
                    }
                    if (text < 0) {
                        return {
                            children: <p style={{ marginBottom: 0 }}>{text}</p>,
                            props: {
                                style: { background: "#FFCCC7", marginBottom: 0 }
                            },
                        };
                    }
                    return <p style={{ marginBottom: 0, paddingLeft: 10 }}>{text}</p>;

                },
            },
            {
                title: 'Month',
                dataIndex: 'month',
                key: 'month',
                fixed: 'left',
                align: 'left',
                children: months,
                render: renderContent,
            },
            {
                title: 'Total Year 1 (EUR)',
                dataIndex: 'totalYear1',
                key: 'totalYear1',
                fixed: 'right',
                width: 100,
                render: renderContent,
            },
            {
                title: 'Total Year 2 (EUR)',
                dataIndex: 'totalYear2',
                key: 'totalYear2',
                fixed: 'right',
                width: 100,
                render: renderContent,
            },
        ];

        return (
            <>
                <Col span={23} offset={1}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/public-business-plans'>Public Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cash flow
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={18} offset={1}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Cash flow</Text>
                            <TooltipComponent code="cashflow" type="title" />
                        </div>
                    </Col>
                </Row>
                <Col span={22} offset={1}>
                    <Divider />
                </Col>
                <Col offset={1} span={22}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={12}>
                            <Title level={4}>Cash flow</Title>
                            <TextHelper code="cashflowhelp" type="lefttext"/>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={24}>
                            <Table
                                columns={cashFlowColumns}
                                dataSource={data}
                                pagination={false}
                                bordered
                                scroll={{ x: 'max-content' }} //'calc(700px + 50%)'
                                sticky
                                showHeader
                            />
                        </Col>
                    </Row>
                </Col>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        cashFlowData: state.cashFlow
    };
}

export default connect(mapStateToProps, { refreshPublicPlan, getCashFlow,logout })(CashFlow);