import React from 'react';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';

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

class KeyResources extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 1,
                    type: 'Physical',
                    resource: 'Buildings',
                    columnLabel: 'Rent Permanently',
                },
                {
                    key: 2,
                    type: 'Physical',
                    resource: 'Transport',
                    columnLabel: 'Rent Time to time',
                },
                {
                    key: 3,
                    type: 'Human',
                    resource: 'Office worker',
                    columnLabel: 'Employ Permanently',
                },
                {
                    key: 4,
                    type: 'Human',
                    resource: 'Factory worker',
                    columnLabel: 'Employ Permanently',
                },
            ],
        };
    }

    componentDidMount() {
    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    addNewItem() {

    }

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

        const data = this.state.data;
        const columns = [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: '20%',
            },
            {
                title: 'Resource',
                dataIndex: 'resource',
                key: 'resource',
                width: '30%',
            },
            {
                title: 'Column label',
                dataIndex: 'columnLabel',
                key: 'columnLabel',
                width: '40%',
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
                            Key Resources
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col offset={4}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Key Resource</Text> <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
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
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Key resources</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    To reach the value proposition a company needs resources, these resources can be seen as the main assets to reach a company’s goal.
                                    Different departments within companies might even require different resources.
                                    These resources are needed to create the value proposition, to serve customer segments and to deliver the product or service to the customer.
                                    In that way the quality of the resources has a direct impact on the client and ultimately on the revenues,
                                    which needs to be known to create a sustainable business model.
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={17}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    title={() => <>
                                        <Typography style={{ ...tableTitleStyle }}>Key resources</Typography>
                                        <Typography style={{ ...tableDescriptionStyle }}>
                                            Only state those resources that make you unique compared to your competitors in the market.
                                            </Typography>
                                    </>}
                                    dataSource={data}
                                    columns={columns}
                                    pagination={false}
                                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.addNewItem.bind(this)}><PlusOutlined />Add key resource</Button>)}
                                />
                            </Card >
                        </Col>
                    </Row>
                </Col>
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

export default connect(mapStateToProps)(KeyResources);