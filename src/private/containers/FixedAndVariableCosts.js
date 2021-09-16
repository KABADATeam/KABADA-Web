import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Input,Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight:"600",
    fontSize: '20px',
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


function FixedAndVariableCosts(props) {
    //rendOfBuildings table
    const rentOfBuildingsColumns = [
        {
            title:'Name',
            dataIndex: 'name',
            key: 'key',
            width: '40%',
        },
        {
            title: 'Price (€/mo.)',
            dataIndex: 'price',
            key: 'key',
            width: '30%',
        },
        {
            title: 'VAT Rate',
            dataIndex: 'vat',
            key: 'key',
            width: '15%',
        },
        {
            title: 'Price (€/mo.)',
            dataIndex: 'duration',
            key: 'key',
            width: '15%',
        },
    
    ]
    const utilitiesColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'key',
        width: '40%',
    },
    {
        title: 'Price (€/mo.)',
        dataIndex: 'price',
        key: 'key',
        width: '30%',
    },
    {
        title: 'VAT Rate',
        dataIndex: 'vat',
        key: 'key',
        width: '15%',
    },
    {
        title: 'Price (€/mo.)',
        dataIndex: 'duration',
        key: 'key',
        width: '15%',
    },
    ]

    
    const rentData = [
        {
            name:'Manufacturing buildings',
            price : 0,
            vat : 21,
            duration : '1st month.',
            key : 1
        },
        {
            name:'Office',
            price : 0,
            vat : 21,
            duration : '1st month.',
            key : 2
        },

    ]

    const utilitiesData = [
        {
            name:'Electricity',
            price : 0,
            vat : 21,
            duration : '1st month.',
            key : 1
        },
        {
            name:'Water',
            price : 0,
            vat : 21,
            duration : '1st month.',
            key : 2
        },
    ]


    return (
        <>
            <Col span={16} offset={4}>
                <Breadcrumb style={{ marginTop: "40px" }}>
                    <Breadcrumb.Item style={{ marginTop: "40px" }}>
                        <Space><Link to = '/personal-business-plans'>My Business plans</Link></Space>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ marginTop: "40px" }}>
                        <Space><Link to='/overview'>Lbas</Link></Space>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Space>Financial projections</Space>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Row align="middle" styke={{marginTop: "9px"}}>
                <Col span={12} offset={4}>
                    <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                        <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Revenue streams</Text>
                        <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                    </div>
                </Col>
            </Row>

            <Col span={16} offset={4}>
                <Divider/>
            </Col>
            <Col offset={4} span={16}>
                <Row style={{marginBottom: "50px"}}>
                    <Col span={7}>
                        <div style={{marginRight: '40px'}}>
                            <Typography.Title style={{...aboutTitleTextStyle}}>Fixed Costs</Typography.Title>
                            <Typography.Text style={{...textStyle}}>
                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                            </Typography.Text>
                        </div>
                    </Col>
                    <Col span={17}>
                        <Card size={'small'} style={{...tableCardStyle}} bodyStyle={{...tableCardBodyStyle}}>
                            <Table
                                dataSource={rentData}
                                columns={rentOfBuildingsColumns}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider/>
                <Row style={{marginBottom: "50px"}}>
                    <Col span={7}>
                        <div style={{marginRight: '40px'}}>
                            <Typography.Title style={{...aboutTitleTextStyle}}>Variable Costs</Typography.Title>
                            <Typography.Text style={{...textStyle}}>
                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                            </Typography.Text>
                        </div>
                    </Col>
                    <Col span={17}>
                        <Card size={'small'} style={{...tableCardStyle}} bodyStyle={{...tableCardBodyStyle}}>
                            <Table
                                dataSource={utilitiesData}
                                columns={utilitiesColumns}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>

            </Col>
        </>
    )
}

export default FixedAndVariableCosts
