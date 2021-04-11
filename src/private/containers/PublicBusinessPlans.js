import React from "react";
import { Input, Card, Typography, Space, Table, DatePicker, Select, Row, Col, Avatar, Dropdown, Button, Menu } from 'antd';
import { SearchOutlined, CaretDownOutlined, CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
import { iconColor, pageHeaderStyle, filterStyle } from '../../styles/customStyles';
import '../../css/publicBusinessPlans.css';

const { Title, Text } = Typography;
const { Option } = Select;

const position = { 'position': 'fixed', 'left': '50%', 'transform': 'translate(-50%)' }
const publicPlansCardStyle = {
    display: 'flex', justifyContent: 'center', minHeight: '423px',
    backgroundColor: '#FFFFFF', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
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
                        <a className="ant-dropdown-link">
                            Actions <CaretDownFilled />
                        </a>
                    </Dropdown>
                ),
            },
        ];
        return (
            <Row >
                <Col style={{ ...position, marginTop: '64px', width: '1200px' }}>

                    <Title level={2} style={{ ...pageHeaderStyle, marginBottom: '0px', textAlign: 'left', color: '#262626', fontWeight: 600 }}>Public business plans</Title>

                    <Card style={{ ...publicPlansCardStyle, }} bodyStyle={{ width: '100%', paddingTop: '20px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' }}>
                        <Input.Group style={{ marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px', width: '100%' }} >
                            <Row gutter={[16, 10]}>
                                <Col span={8}>
                                    <Input style={filterStyle} placeholder="Search by name..." prefix={<SearchOutlined style={iconColor} />} />
                                </Col>
                                <Col span={8}>
                                    <Select dropdownClassName="filterSelect" placeholder="Choose Industry" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                        <Option value="Industry">Industry</Option>
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select dropdownClassName="filterSelect" placeholder="Sort by: Newest" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                        <Option value="newest">Sort by: Newest</Option>
                                        <Option value="oldest">Sort by: Oldest</Option>
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <DatePicker style={filterStyle} placeholder="Date Created" />
                                </Col>
                                <Col span={8}>
                                    <Select dropdownClassName="filterSelect" placeholder="Choose Country" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                        <Option value="Country">Country</Option>
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select dropdownClassName="filterSelect" placeholder="Choose Language" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                        <Option value="Language">Language</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Input.Group>
                        <Table style={{ width: '100%' }} size="default" columns={columns} pagination={{ showTotal: (total, range) => <Text style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>{range[0]}-{range[1]} of {total}</Text>, position: ['bottomLeft'] }} dataSource={data} onChange={this.handleChange} />
                    </Card >
                </Col>
            </Row >
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
