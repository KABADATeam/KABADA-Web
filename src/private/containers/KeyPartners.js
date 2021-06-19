import React from 'react';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import KeyPartnersModal from "../components/KeyPartnersModal";

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

class KeyPartners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyDistributorsData: [
                {
                    key: 1,
                    type: 'Self Distribution',
                    company: '-',
                    priority: 'Yes',
                },
                {
                    key: 2,
                    type: 'Retailer',
                    company: 'Unicod Inc.',
                    priority: '',
                },
                {
                    key: 3,
                    type: 'Many Retailers',
                    company: '-',
                    priority: '',
                },
            ],
            keySuppliersData: [
                {
                    key: 1,
                    type: 'Outsourced',
                    company: 'Let it be LTD',
                },
                {
                    key: 2,
                    type: 'Outsourced',
                    company: 'Copmany Inc',
                },
                {
                    key: 3,
                    type: 'Financiers',
                    company: 'Unicod Inc.',
                },
            ],
            isVisible: false
        };
    }

    componentDidMount() {
    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    addNewItem = () => {
        this.setState({
            isVisible: true,
        })
    }
    closeNewItemModal = () => {
        console.log('Clicked cancel button');
        this.setState({
            isVisible: false,
        });
    };

    deleteItem(row) {
        console.log(row);
        const dataSource = [...this.state.data];
        this.setState({
            data: dataSource.filter((item) => item.key !== row.key),
        });
    }

    editItem(row) {
        console.log(row)
    }

    render() {

        const keyDistributorsData = this.state.keyDistributorsData;
        const keySuppliersData = this.state.keySuppliersData;
        const keyDistributorsCount = this.state.keyDistributorsData.length;
        const keyDistributorsColumns = [
            {
                title: 'Distributor type',
                dataIndex: 'type',
                key: 'type',
                width: '38%',
            },
            {
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
                width: '15%',
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                width: '37%',
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

        const keySuppliersColumns = [
            {
                title: 'Supplier type',
                dataIndex: 'type',
                key: 'type',
                width: '38%',
            },
            {
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
                width: '52%',
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
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <a href="personal-business-plans">My Business plans</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Kabada Intelligence Ltd.</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Key Partners
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col offset={4}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Partners</Text>
                        </div>
                    </Col>
                    <Col span={11}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key Distributors</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Possible if you distribute your products through your own channels – directly, your own store, homepage. Often the case in some service sectors.
                                    <br /><br />
                                    You can choose type “Many Retailers” if you believe that distribution channels are strongly diversified and no distributor is of high importance
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={keyDistributorsData}
                                    columns={keyDistributorsColumns}
                                    pagination={false}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} disabled={(keyDistributorsCount === 3) ? true : false} onClick={this.addNewItem.bind(this)}><PlusOutlined />Add Distributor</Button><Text>Maximum distributors: {keyDistributorsCount}/3 <InfoCircleFilled style={{ fontSize: '16px', color: '#BFBFBF', marginLeft: '5px' }} /></Text></Space>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key Suppliers</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Consider professional associations, networks locally and internationally, employers’ unions, chambers of commerce, trade unions
                                    <br /> <br />
                                    Consider relevant regulatory bodies, watchdogs, supporting institutions, municipalities, state revenue service and similar
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    dataSource={keySuppliersData}
                                    columns={keySuppliersColumns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addNewItem.bind(this)}><PlusOutlined />Add Suppliers</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={7}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Other</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Consider professional associations, networks locally and internationally, employers’ unions, chambers of commerce, trade unions
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    title={() => <>
                                        <Typography style={{ ...tableTitleStyle }}>Various other<InfoCircleFilled style={{ fontSize: '16px', color: '#BFBFBF', marginLeft: '17px' }} /></Typography>
                                    </>}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addNewItem.bind(this)}><PlusOutlined />Add Other Partners</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                </Col>
                <KeyPartnersModal visibility={this.state.isVisible} handleClose={this.closeNewItemModal} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        message: state.message,
    };
}

export default connect(mapStateToProps)(KeyPartners);