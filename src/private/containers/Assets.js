import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip, Breadcrumb, Switch } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowLeftOutlined} from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getAssets, updateAsset } from '../../appStore/actions/assetsAction';
import { getCountryShortCode } from '../../appStore/actions/countriesActions';
import { getCountryVats } from '../../appStore/actions/vatAction';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { getCountryVat } from '../../appStore/actions/vatsActions';

const { Option } = Select;

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px"
}

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}
const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
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

class AssetsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_assets_completed: false,
            physical_assets: [], 
            visibleHeader: 'hidden'

        }
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }
    onTitleChange = (item) => event => {
        const updateItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                  "id": item.id,
                  "name": event.target.value,
                  "operation": item.value
            },
            "kind": 1
        };
        if (event.target.value !== '') {
            this.props.updateItem(2, updateItem);
        }
    }

    onTotalAmountChange = (item) => event => {
        const savedObject = {
            "business_plan_id": this.props.businessPlan.id,
            "physical_assets": {
                "resource_id": item.resource_id,
                "amount": event.target.value,
                "vat": item.vat
            }}
        const reducerObject = {
            "resource_id": item.resource_id,
            "resource_title": item.resource_title,
            "resource_status": item.resource_status,
            "amount": event.target.value,
            "vat": item.vat
        } 
        console.log(savedObject);
        console.log(reducerObject)
        this.props.updateAsset(savedObject, reducerObject);        
    }
    

    getUpdatesWindowState(value) {
        if (value === false) {
            return 'visible'
        } else if (value === true) {
            return 'hidden'
        } else {
            return 'hidden'
        }
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getAssets(this.props.businessPlan.id)
                    this.props.getCountryVats(this.props.countryCode.countryShortCodeV2)
                });
            }
        } else {
            this.props.getAssets(this.props.businessPlan.id)
            this.props.getCountryVats(this.props.countryCode.countryShortCodeV2)
            
            //const obj = { id: this.props.businessPlan.id }
            //this.props.getCountryShortCode(obj, (data) => {
            //    this.props.getCountryVats(this.props.countryCode.countryShortCode);
            //});

        }
    }


    render() {
        const defaultVATValue = this.props.vat.vat.find((element) => element.key === 0);
        const assetsColumns = [
            {
                title: 'Asset',
                dataIndex: 'type_title',
                key: 'resource_id',
                width: '15%',
            },
            {
                title: 'Name',
                dataIndex: 'resource_title',
                key: 'resource_id',
                width: '20%',
            },
            {
                title: 'Statuss',
                dataIndex: 'resource_status',
                key: 'resource_id',
                width: '15%',
                align: 'right',
                render: (text, obj, record) => (
                    text === null ? <div style={{ display: 'flex', justifyContent: 'center' }}><Text>-</Text></div> : <Text>{text}</Text>
                )
            },
        
            {
                title: this.state.vat_payer === false ? 'Total amount' : 'Total amount with VAT' ,
                dataIndex: 'amount',
                key: 'resource_id',
                width: '30%',
                align: 'right',
                render: (text, obj, record) => (
                    <div style={{ float: 'right' }}>
                        <Input style={{ width: 103 }} 
                            prefix="€" 
                            size="large"
                            onChange={this.onTotalAmountChange(obj)}
                            defaultValue={null}
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
                width: '20%',
                render: (value, obj, record) => (
                    <Space size={0}>                                
                        <Select defaultValue={defaultVATValue.vatValue} suffixIcon={<CaretDownFilled />} disabled={this.state.vat_payer === false ? true : false } >
                            {this.props.vat.vat.map((v, index) => (
                                <Option value={v.vatValue}>{v.vatValue + "%"}</Option>
                            ))}
                        </Select>
                    </Space>
                ),
            }
        ];
        return (
            <>
                <UnsavedChangesHeader
                    visibility={this.state.visibleHeader}
                    //discardChanges={this.discardChanges}
                    //saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Financial projections
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Assets</Text>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch />
                        </div>
                    </Col>
                </Row>
                <Col span={16} offset={4}>
                <Col span={24} >
                    <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                            <div style={{ marginRight: '40px' }}>
                                <Typography.Title style={{ ...aboutTitleTextStyle }}>Assets</Typography.Title>
                                <Typography.Text style={{ ...textStyle }}>
                                    Explanation … Before you start selling your product or service, you need to  understand what investments are needed to start your business. Bellow in this section are most  usuall investment categories for start-up business
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <div style={{ marginTop: 20, marginLeft: 16, marginBottom: 20 }}>
                                        <Text style={{ ...titleTextStyle }}>Physical and Intellectual assets</Text>
                                    </div>
                                    <Table
                                        dataSource={this.props.assets.original_assets}
                                        columns={assetsColumns}
                                        pagination={false}
                                    />
                                    <div style={{ marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
                                        <Row style={{ marginBottom: 8 }}>

                                            <Col span={16}>
                                                <Text>Investments</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Own Assets (physical & intellectual)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col span={16}>
                                                <Text>Additional necessary funds for investments in assets</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={16}>
                                                <div style={{ marginTop: 13 }}>
                                                    <Text>How much can I invest my money? </Text>
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
                                        <Divider />
                                        <Row>
                                            <Col span={16}>
                                                <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>Loan (Long term)</Text>
                                            </Col>
                                            <Col span={8}>
                                                <div style={{ float: 'right' }}>
                                                    <Text style={{ fontWeight: 600, fontSize: 14, fontStyle: 'normal' }}>Suma</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card >
                            </div>
                        </Col>
                    </Row>
                </Col>
                </Col>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        countryCode: state.countryShortCode,
        vat: state.vat,
        assets: state.assets
    };
}
export default connect(mapStateToProps, { refreshPlan, getAssets, updateAsset, getCountryShortCode, getCountryVats, getCountryVat })(AssetsWindow);