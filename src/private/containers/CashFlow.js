import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Space, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getCashFlow } from "../../appStore/actions/cashFlowAction"
import { tableTitleStyle } from '../../styles/customStyles';

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

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    onCompletedChange(state) {
        //this.props.saveState(this.props.businessPlan.id, state);
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getCashFlow(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.getCashFlow(this.props.businessPlan.id);
        }
    }
    render() {
        console.log(this.props.cashFlowData)
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
                            Cash flow
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Cash flow</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={false} onClick={this.onCompletedChange.bind(this)} />
                        </div>
                    </Col>
                </Row>
                <Col span={16} offset={4}>
                    <Divider />
                </Col>
                <Col offset={4} span={16}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={12}>
                            <Title level={4}>Cash flow</Title>
                            <Typography.Text>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</Typography.Text>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={24}>
                            <Table
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={24}>
                            <Table
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={24}>
                            <Table
                                pagination={false}
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

export default connect(mapStateToProps, { refreshPlan, getCashFlow })(CashFlow);