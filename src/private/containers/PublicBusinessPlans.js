import React from "react";
import { Input, Card, Typography, Space, Table, DatePicker, Select, Row, Col, Avatar, Dropdown, Menu, Form, Layout, Button } from 'antd';
import { SearchOutlined, CaretDownOutlined, CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
import { iconColor, pageHeaderStyle, filterStyle } from '../../styles/customStyles';
import '../../css/publicBusinessPlans.css';
import { Link } from 'react-router-dom';
import { getSelectedPlan, getSelectedPlanDetails, getSelectedPlanOverview, getPlansOverview, downloadPDFFile } from "../../appStore/actions/planActions";
import { logout } from "../../appStore/actions/authenticationActions";
import Cookies from "js-cookie";
import moment from 'moment'

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
            sorting: false,
            selectedPlan: null
        };
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
        let filteredData = [...this.props.publicPlans];

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
                    if(values.sorting === 'descend'){
                        filteredData.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
                        });
                    }else if(values.sorting === 'ascend'){
                        filteredData.sort(function(a,b){
                            return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
                        });
                    }
                }
                if (key === "industry" || key === "name" || key === "country") {
                    //console.log(`key=${key}  value=${changedValues[key]}`)
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

    onPublicPlanClick = () => {
        this.props.getSelectedPlan(this.state.selectedPlan)
        localStorage.setItem("public_plan", this.state.selectedPlan.id);
        this.props.history.push(`/public/overview`);
    }

    downloadDOCFile = () => {
        console.log(this.state.selectedPlan);
        console.log('downloadDoc')
        this.props.downloadPDFFile(this.state.selectedPlan.id, this.state.selectedPlan.name);
    }

    componentDidMount(){
        if (Cookies.get('access_token') === undefined && Cookies.get('access_token') === null) {
            this.props.getAllPublicPlans();
            this.props.logout();
            this.props.history.push('/')
        } else {
            this.props.getAllPublicPlans((data => {
                this.setState({
                    planData: this.props.publicPlans
                })
            }));
        }
        
    }

    render() {
        const menu = () => (
            <Menu>
                <Menu.Item key="1" onClick={this.onPublicPlanClick}>
                    Open 
                </Menu.Item>
                <Menu.Item key="2" onClick={this.downloadDOCFile}>
                    Download PDF 
                </Menu.Item>
            </Menu>
        );
        console.log(this.state.selectedPlan);
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
                 render: (text, record) =>  
                (
                    <Space size="small">
                        <Avatar size={22} icon={<UserOutlined />} src={record.ownerAvatar ? "data:image/png;base64," + record.ownerAvatar : ""} />
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
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
                                            onMouseEnter: () => { this.setState({ selectedPlan: record}) }
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
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { getAllPublicPlans, getSelectedPlan, getSelectedPlanDetails, getSelectedPlanOverview, getPlansOverview, logout, downloadPDFFile })(PublicBusinessPlans);
