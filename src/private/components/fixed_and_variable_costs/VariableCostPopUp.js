import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Modal, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, UpOutlined, DownOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';


class VariableCostPopUp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = [
            {
                'month': '1',
                'price': '0'
            },
            {
                'month': '2',
                'price': '0'
            },
            {
                'month': '3',
                'price': '0'
            },
            {
                'month': '4',
                'price': '0'
            },
            {
                'month': '5',
                'price': '0'
            },
            {
                'month': '6',
                'price': '0'
            },
            {
                'month': '7',
                'price': '0'
            },
            {
                'month': '8',
                'price': '0'
            },
            {
                'month': '9',
                'price': '0'
            },
            {
                'month': '10',
                'price': '0'
            },
            {
                'month': '11',
                'price': '0'
            },
            {
                'month': '12',
                'price': '0'
            }
        ]
        const columns = [
            {
                title: 'Month',
                dataIndex: 'month',
                width: '65%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '35%',
                render: (text, record, index) => (
                    <InputNumber
                        size="large"
                        defaultValue={text === null ? 0 : text}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                )
            }
        ]
        return (
            <Modal
                // title={this.props.category_title}
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
            >
                <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        title={() => this.props.category_title}
                    />

            </Modal>
        )
    }

}

export default VariableCostPopUp
