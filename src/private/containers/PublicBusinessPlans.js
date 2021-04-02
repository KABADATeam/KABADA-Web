import React from "react";
import { Form, Input, Button, Card, Typography, Space, Table, DatePicker, Select, Row, Col, PageHeader } from 'antd';
import { DownOutlined, SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
import { cardStyle, buttonStyle, textColor, inputStyle } from '../../styles/customStyles';
import { tailLayout } from '../../styles/customLayouts';

const { Title, Text } = Typography;
const { Option } = Select;

const pageHeaderStyle = {
    'width': '1200px', 'height': '102px', 'padding': '40px 0px 24px', 'background': '#F5F5F5', 'fontWeight': '600',
    'fontSize': '30px', 'lineHeight': '38px',
};
const groupStyle = { 'display': 'flex', 'justify-content': 'center', };
const tableStyle = { 'height': '423px', 'width': '1200px', };
const inputGroupStyle = { 'height': '140px', 'width': '1200px' };

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

    render() {
        const data = this.props.publicPlans;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
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
                sorter: (a, b) => a.country.localeCompare(b.country),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Date Created',
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                sorter: (a, b) => new Date(a.dateCreated.substring(6, 10), a.dateCreated.substring(3, 5), a.dateCreated.substring(0, 2)).getTime() - new Date(b.dateCreated.substring(6, 10), b.dateCreated.substring(3, 5), b.dateCreated.substring(0, 2)).getTime(),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
                sorter: (a, b) => a.owner.localeCompare(b.owner),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '',
                key: 'action',
                render: () => (
                    <Space size="middle">
                        <a className="ant-dropdown-link">
                            Actions <DownOutlined />
                        </a>
                    </Space>
                ),
            },
        ];
        return (
            <div style={{ 'background-color': '#E8E8E8' }}>
                <Card {...tailLayout} style={groupStyle} bodyStyle={{ padding: "0", }}>
                    <PageHeader
                        style={pageHeaderStyle}
                        className="site-page-header"
                        title="Public business plans"
                    />
                    <Input.Group style={inputGroupStyle} size="large">
                        <Row gutter={[16, 10]}>
                            <Col span={8}>
                                <Input placeholder="Search by name..." prefix={<SearchOutlined />} style={{ ...inputStyle, 'text-align': 'left' }} size="large" />
                            </Col>
                            <Col span={8}>
                                <Select style={{ 'width': '100%', borderRadius: '10px', }} placeholder="Choose Industry" suffixIcon={<CaretDownOutlined />} allowClear>
                                    <Option value="Industry">Industry</Option>
                                </Select>
                            </Col>
                            <Col span={8}>
                                <Select style={{ 'width': '100%' }} placeholder="Sort by: Newest" suffixIcon={<CaretDownOutlined />} allowClear>
                                    <Option value="Date">Date</Option>
                                </Select>
                            </Col>
                            <Col span={8}>
                                <DatePicker placeholder="Date Created" size="large" style={inputStyle} />
                            </Col>
                            <Col span={8}>
                                <Select style={{ 'width': '100%' }} placeholder="Choose Country" suffixIcon={<CaretDownOutlined />} allowClear>
                                    <Option value="Country">Country</Option>
                                </Select>
                            </Col>
                            <Col span={8}>
                                <Select style={{ 'width': '100%' }} placeholder="Choose Language" suffixIcon={<CaretDownOutlined />} allowClear>
                                    <Option value="Language">Language</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Input.Group>
                    <Table style={tableStyle} columns={columns} pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, position: ['bottomLeft'] }} dataSource={data} onChange={this.handleChange} />
                </Card >
            </div >
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
