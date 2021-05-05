import React from "react";
import { Input, Card, Typography, Space, Table, DatePicker, Select, Row, Col, Avatar, Dropdown, Menu, Form, Layout } from 'antd';
import { SearchOutlined, CaretDownOutlined, CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
import { iconColor, pageHeaderStyle, filterStyle } from '../../styles/customStyles';
import '../../css/publicBusinessPlans.css';
import NewBusinessPlanModal from "../components/NewBusinessPlanModal";
const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const publicPlansCardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

class PublicBusinessPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: true,
            login: false,
            data: "",
            picture: "",
            googleSignup: "",
        };
    }

    componentDidMount() {
        this.props.getAllPublicPlans();
    }

    getFullDate = (date) => {
        const dateAndTime = date.split('T');
        return dateAndTime[0].split('-').reverse().join('.');
    }

    onFinish = (values) => {
        console.log(values);
    };

    search = (values, changedValues) => {
        console.log(values);
        console.log(changedValues);
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    1st action
              </Menu.Item>
                <Menu.Item key="2">
                    2nd action
              </Menu.Item>
            </Menu>
        );
        const data = this.props.publicPlans;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => (
                    <Text style={{ fontWeight: '600' }}>
                        {record.name}
                    </Text>
                ),
            },
            {
                title: 'Industry',
                dataIndex: 'industry',
                key: 'industry',
                sorter: (a, b) => a.industry.localeCompare(b.industry),
                sortDirections: ['descend', 'ascend'],

            },
            {
                title: 'Country',
                dataIndex: 'country',
                key: 'country',
            },
            {
                title: 'Date Created',
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                sorter: (a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => this.getFullDate(record.dateCreated),
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
                sorter: (a, b) => a.owner.localeCompare(b.owner),
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => (
                    <Space size="small">
                        <Avatar size={22} icon={<UserOutlined />} />
                        <Text>
                            {record.owner}
                        </Text>
                    </Space>
                ),
            },
            {
                title: '',
                key: 'action',
                render: () => (
                    <Dropdown overlay={menu}>
                        <a href="#" className="ant-dropdown-link">
                            Actions <CaretDownFilled />
                        </a>
                    </Dropdown>
                ),
            },
        ];
        return (
            <Layout style={{ backgroundColor: '#F5F5F5' }}>
                <Header></Header>
                <Content>
                    <Row wrap={false} justify="center" align="middle">
                        <Col span={20}>
                            <Title level={2} style={{ ...pageHeaderStyle, marginBottom: '0px', textAlign: 'left', color: '#262626' }}>Public business plans</Title>

                            <Card style={{ ...publicPlansCardStyle }} bodyStyle={{ width: '100%', paddingTop: '20px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }}>
                                <Form
                                    onValuesChange={this.search.bind(this)}
                                    onFinish={this.onFinish.bind(this)}
                                    style={{ marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px', width: '100%' }}
                                >
                                    <Row gutter={[16, 20]}>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="name">
                                                <Input style={filterStyle} placeholder="Search by name..." prefix={<SearchOutlined style={iconColor} />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="industry">
                                                <Select dropdownClassName="filterSelect" placeholder="Choose Industry" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    <Option value="Industry">Industry</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="sorting">
                                                <Select dropdownClassName="filterSelect" placeholder="Sort by: Newest" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    <Option value="newest">Sort by: Newest</Option>
                                                    <Option value="oldest">Sort by: Oldest</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="date">
                                                <DatePicker style={filterStyle} placeholder="Date Created" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="country">
                                                <Select dropdownClassName="filterSelect" placeholder="Choose Country" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    <Option value="Country">Country</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="language">
                                                <Select dropdownClassName="filterSelect" placeholder="Choose Language" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    <Option value="Language">Language</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                                <Table style={{ width: '100%' }} size="default" columns={columns} pagination={{ defaultPageSize: 5, showTotal: (total, range) => <Text style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>{range[0]}-{range[1]} of {total}</Text>, position: ['bottomLeft'] }} dataSource={data} onChange={this.handleChange} />
                            </Card >
                        </Col>
                    </Row >
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        message: state.message,
        publicPlans: state.publicPlans,
    };
}

export default connect(mapStateToProps, { getAllPublicPlans })(PublicBusinessPlans);
