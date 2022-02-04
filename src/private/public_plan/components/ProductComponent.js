import React from 'react';
import { Button, Row, Col, Typography, Card, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, defaultButtonStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
//import { refreshPlan } from "../../appStore/actions/refreshAction";
import { deleteActivity } from "../../../appStore/actions/keyActivitiesAction"

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

class ProductComponent extends React.Component {

    openCategoriesModal = (item) => {
        this.props.getProductID(item.id)
        this.props.onOpen()
    }
    openEditActivityModal = (item) => {
        this.props.getProductID(this.props.data.id)
        this.props.onOpenEditModal(item)
    }
    onDeleteActivity = (item) => {
        this.props.deleteActivity({ "id": item.id, "product_id": this.props.data.id });
    }
    render() {
        const activitiesColumns = [
            {
                title: 'Activity',
                dataIndex: 'type_name',
                key: 'type_name',
                width: '29.67%',
            },
            {
                title: 'Sub Type',
                dataIndex: 'sub_type_name',
                key: 'sub_type_name',
                width: '28.53%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '22.27%',
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: '19.5%',
                render: (obj, record) => (
                    <Space size={0} style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                        <Button size="medium" style={{ ...defaultButtonStyle }} onClick={this.openEditActivityModal.bind(this, record)}>View</Button>
                    </Space>
                ),
            }
        ];
        return (
            <>
                <Col offset={2} span={20}>
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>{this.props.data.title}</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Description
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                                <Table
                                    title={() => <>
                                        <Typography style={{ ...tableTitleStyle }}>Key Activities</Typography>
                                        <Typography style={{ ...textStyle }}>
                                            Description
                                        </Typography>
                                    </>}
                                    dataSource={this.props.data.activities}
                                    style={{ marginTop: 20 }}
                                    columns={activitiesColumns}
                                    pagination={false}
                                />
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

export default connect(mapStateToProps, { deleteActivity })(ProductComponent);