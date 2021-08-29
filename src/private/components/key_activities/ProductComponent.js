import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Row, Col, Typography, Card, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
//import { refreshPlan } from "../../appStore/actions/refreshAction";
import { deleteActivity } from "../../../appStore/actions/keyActivitiesAction"

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
const tableTitleStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#262626',
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

class ProductComponent extends React.Component {

    openCategoriesModal = (item) => {
        this.props.getProductID(item.id)
        this.props.onOpen()
    }
    openEditActivityModal = (item) => {
        this.props.getProductID(item.id)
        this.props.onOpenEditModal(item)
    }
    onDeleteActivity = (item) => {
        this.props.deleteActivity({ "id": item.id });
    }
    render() {
        const activitiesColumns = [
            {
                title: 'Activity',
                dataIndex: 'type_name',
                key: 'type_name',
                width: '30%',
            },
            {
                title: 'Sub Type',
                dataIndex: 'sub_type_name',
                key: 'sub_type_name',
                width: '30%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '10%',
                render: (obj, record) => (
                    <Space size={0}>
                        <Button size="medium" style={{ ...leftButtonStyle }}  onClick={this.openEditActivityModal.bind(this, record)}>Edit</Button>
                        <Button size="small" style={{ ...rightButtonStyle, width: "32px", height: "32px" }} onClick={this.onDeleteActivity.bind(this, record)}><DeleteOutlined /></Button>
                    </Space>
                ),
            }
        ];
        return (
            <>
                <Col offset={4} span={16}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>{this.props.data.title}</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Description
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Typography.Title style={{ ...tableTitleStyle, marginLeft: 20}}>
                                    Key Activities
                                </Typography.Title>
                                <Typography.Text style={{ ...textStyle, marginLeft:20}}>
                                    Description
                                </Typography.Text>
                                <Table
                                    dataSource={this.props.data.activities}
                                    style={{marginTop: 20}}
                                    columns={activitiesColumns}
                                    pagination={false}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.openCategoriesModal.bind(this, this.props.data)}><PlusOutlined />Add Activity</Button></Space>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                </Col>
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        activities: state.keyActivities,
    };
}

export default connect(mapStateToProps, {deleteActivity})(ProductComponent);