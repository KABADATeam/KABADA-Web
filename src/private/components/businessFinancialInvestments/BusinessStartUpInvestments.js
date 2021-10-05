import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled, UserOutlined, InfoCircleFilled } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
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

const assetsDataSource = [
    {
        id: "1",
        title: "Inventory buildings",
        status: 'Own',
        total_amount: 0,
        vat: 21,
    },
    {
        id: "2",
        title: "Office",
        status: 'Own',
        total_amount: 0,
        vat: 21,
    },
    {
        id: "3",
        title: "Transport",
        status: 'Own',
        total_amount: 0,
        vat: 21,
    },
]
const workinCapitalDataSource = [
    {
        id: "1",
        title: "Salary",
        status: null,
        total_amount: 0,
        vat: null,
    },
    {
        id: "2",
        title: "Buildings/ Property rent (long term)",
        status: 'Rent',
        total_amount: 0,
        vat: 21,
    },
]
const businessInvestmentsColumns = [
    {
        title: 'Asset',
        dataIndex: 'resource_title',
        key: 'resource_id',
        width: '45%',
    },
    {
        title: 'Statuss',
        dataIndex: 'resource_status',
        key: 'resource_id',
        width: '10%',
        align: 'center',
        render: (text, obj, record) => (
            text === null ? <div style={{ display: 'flex', justifyContent: 'center' }}><Text>-</Text></div> : <Text>{text}</Text>
        )
    },

    {
        title: 'Total amount with VAT',
        dataIndex: 'amount',
        key: 'resource_id',
        width: '25%',
        align: 'right',
        render: (text, obj, record) => (
            <div style={{ float: 'right' }}>
                <InputNumber
                    size="large"
                    defaultValue={text}
                    formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
            </div>

        )

    },
    {
        title: () => (
            <Space>
                <Text>VAT Rate</Text>
                <Tooltip title="Tooltip text">
                    <InfoCircleFilled style={{ color: '#BFBFBF' }} />
                </Tooltip>
            </Space>
        ),
        dataIndex: 'vat',
        key: 'vat',
        align: 'right',
        width: '15%',
        render: (text, obj, record) => (
            <Space size={0}>
                <Select defaultValue={text + "%"} suffixIcon={<CaretDownFilled />}>
                    <Option value="21">15%</Option>
                    <Option value="9">9%</Option>
                </Select>
            </Space>
        ),
    }
];

class BusinessStartUpInvestments extends React.Component {
    render() {
        const ownAndBuyAssets = this.props.investments.physical_assets.filter(obj => obj.resource_status === 'Own'|| obj.resource_status === 'Buy' || obj.resource_status === null );
        console.log(ownAndBuyAssets);
        const rentAssets = this.props.investments.physical_assets.filter(obj => obj.resource_status === 'Rent');
        console.log(rentAssets);
        return (
            <>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Business start-up investments</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Explanation … Before you start selling your product or service, you need to  understand what investments are needed to start your business. Bellow in this section are most  usuall investment categories for start-up business
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ display: 'flex' }}>
                                        <Col span={12}>
                                            <div style={{ marginTop: 24, marginLeft: 16 }}>
                                                <Text style={{ ...titleTextStyle }}>What Period?</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{ float: "right", marginTop: 16, marginBottom: 16, marginRight: 16 }}>
                                                <Select defaultValue="12month" suffixIcon={<CaretDownFilled />} size='default'>
                                                    <Option value="12month">12 mo.</Option>
                                                    <Option value="24month">24 mo.</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ display: 'flex' }}>
                                        <Col span={12}>
                                            <div style={{ marginTop: 24, marginLeft: 16 }}>
                                                <Text style={{ ...titleTextStyle }}>Do you pay VAT</Text>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{ float: "right", marginTop: 16, marginBottom: 16, marginRight: 16 }}>
                                                <Select defaultValue="true" suffixIcon={<CaretDownFilled />}>
                                                    <Option value="true">Yes</Option>
                                                    <Option value="false">No</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </div>
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Physical and Intellectual assets</Text>
                                    </div>
                                    <Table
                                        dataSource={ownAndBuyAssets}
                                        columns={businessInvestmentsColumns}
                                        pagination={false}
                                    />
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Working capital</Text>
                                    </div>
                                    <Table
                                        dataSource={rentAssets}
                                        columns={businessInvestmentsColumns}
                                        pagination={false}
                                    />
                                </Card >
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row style={{ marginBottom: 8 }}>

                                            <Col span={16}>
                                                <Text>Total investments</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Own assets</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={16}>
                                                <div style={{marginTop: 13}}>
                                                <Text>How much of your own money (savings) wiil you invest? </Text>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <InputNumber
                                                        size="large"
                                                        defaultValue="0"
                                                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider/>
                                        <Row>
                                            <Col span={16}>
                                                <Text style={{fontWeight: 600, fontSize: 16, fontStyle: 'normal'}}>Loan amount</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text style={{fontWeight: 600, fontSize: 16, fontStyle: 'normal'}}>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
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
        investments: state.businessInvestment,
    };
}

export default connect(mapStateToProps)(BusinessStartUpInvestments);