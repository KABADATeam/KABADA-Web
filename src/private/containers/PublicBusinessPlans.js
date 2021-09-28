import React from "react";
import { Input, Card, Typography, Space, Table, DatePicker, Select, Row, Col, Avatar, Dropdown, Menu, Form, Layout, Button } from 'antd';
import { SearchOutlined, CaretDownOutlined, CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
import { iconColor, pageHeaderStyle, filterStyle } from '../../styles/customStyles';
import '../../css/publicBusinessPlans.css';
import { getSelectedPlan } from "../../appStore/actions/planActions";
import { isEmptyStatement } from "@babel/types";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const publicPlansCardStyle = {
    display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

class PublicBusinessPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planData: this.props.publicPlans,
            sorting: false
        };
    }

    componentDidMount() {
        this.props.getAllPublicPlans();
        console.log("ww")
        this.setState({
            planData: this.props.publicPlans
        });
        console.log(this.props.publicPlans);
        console.log("ww")
    }



    getFullDate = (date) => {
        const dateAndTime = date.split('T');
        return dateAndTime[0].split('-').reverse().join('.');
    }

    onFinish = (values) => {
        console.log(values);

    };

    search = (values, changedValues) => {
        let sorted = false;
        let filteredData = this.props.publicPlans;

        Object.keys(changedValues).forEach(function (key, index) {
            if (changedValues[key] !== undefined) {
                if (key === "dateCreated") {
                    if (changedValues[key] !== null) {
                        filteredData = filteredData.filter(item => {
                            return (
                                item[key].indexOf(changedValues[key].toISOString().split('T')[0]) >= 0
                            )

                        });
                    }
                }
                if (key === "language") {
                    // filter by language
                }
                if (key === "sorting" && changedValues[key] !== undefined) {
                    sorted = changedValues[key];
                }
                if (key === "industry" || key === "name" || key === "country") {
                    console.log(`key=${key}  value=${changedValues[key]}`)
                    filteredData = filteredData.filter(item => {
                        return (
                            item[key].toLowerCase().indexOf(changedValues[key].toLowerCase()) >= 0

                        )
                    });
                }
            }
        });

        this.setState({
            planData: filteredData,
            sorting: sorted,
        });
    };

    onPublicPlanClick = (plan) => {
        console.log(plan);
        this.props.getSelectedPlan(plan);
        localStorage.setItem("public_plan", plan.id);
        this.props.history.push(`/public/overview`);
    }

    render() {
        if (this.state.planData.length === 0) {
            this.state.planData = this.props.publicPlans
        }
        console.log(this.props.publicPlans);
        console.log(this.state.planData);

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
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sortDirections: ['descend', 'ascend'],
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (text, record) => (
                    <Text style={{ fontWeight: '600', cursor: 'pointer' }}>
                        <Button type="link">{record.name}</Button>
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
                sortDirections: ['descend', 'ascend']
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
                        <a href="/#" className="ant-dropdown-link">
                            Actions <CaretDownFilled />
                        </a>
                    </Dropdown>
                ),
            },
        ];

        const uniqueIndustries = [];
        const uniqueCountries = [];

        this.props.publicPlans.forEach(item => {
            if (uniqueIndustries.indexOf(item.industry) === -1) {
                uniqueIndustries.push(item.industry)
            }
            if (uniqueCountries.indexOf(item.country) === -1) {
                uniqueCountries.push(item.country)
            }
        });

        return (
            <Layout style={{ backgroundColor: '#F5F5F5' }}>
                <Content style={{ marginTop: "40px" }}>
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
                                                <Select dropdownClassName="filterSelect" placeholder="Choose Industry"
                                                    suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    {uniqueIndustries.map((item) => (
                                                        <Option key={item}>{item}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="sorting">
                                                <Select dropdownClassName="filterSelect" placeholder="Sort by" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    <Option value="descend">Sort by: Newest</Option>
                                                    <Option value="ascend">Sort by: Oldest</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="dateCreated">
                                                <DatePicker style={filterStyle} placeholder="Date Created" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item noStyle={true} name="country">
                                                <Select dropdownClassName="filterSelect" placeholder="Choose Country" suffixIcon={<CaretDownOutlined style={iconColor} />} allowClear>
                                                    {uniqueCountries.map((item) => (
                                                        <Option key={item}>{item}</Option>
                                                    ))}
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
                                <Table
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: () => { this.onPublicPlanClick(record) }
                                        };
                                    }} style={{ width: '100%' }} size="default"
                                    columns={columns} pagination={{
                                        defaultPageSize: 5, showTotal: (total, range) =>
                                            <Text style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>
                                                {range[0]}-{range[1]} of {total}</Text>, position: ['bottomLeft']
                                    }} dataSource={this.state.planData} onChange={this.handleChange} />
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

export default connect(mapStateToProps, { getAllPublicPlans, getSelectedPlan })(PublicBusinessPlans);
