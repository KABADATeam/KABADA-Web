import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip, Breadcrumb, Switch } from 'antd';
import { connect } from 'react-redux';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPublicPlan } from "../../../appStore/actions/refreshAction";
import { getAssets, discardChanges } from '../../../appStore/actions/assetsAction';
import { getCountryShortCode } from '../../../appStore/actions/countriesActions';
import { getCountryVats } from '../../../appStore/actions/vatAction';
import { getSelectedPlanOverview } from "../../../appStore/actions/planActions";
import { logout } from '../../../appStore/actions/authenticationActions';
import { conditionalExpression } from '@babel/types';
import TooltipComponent from '../../components/Tooltip';
import TextHelper from '../../components/TextHelper';
import '../../../css/Assets.css'
import Cookies from 'js-cookie';

const { Option } = Select;

const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "38px",
    lineHeight: "30px"
}
const tableTitleTextStyle = {
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

    onBackClick() {
        this.props.history.push(`/overview`);
    }

    
    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("public_plan") === undefined || localStorage.getItem("public_plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPublicPlan(localStorage.getItem("public_plan"), () => {
                        this.props.getAssets(this.props.businessPlan.id);
                    });
                }
            } else {
                console.log(this.props.businessPlan.id);
                //this.props.getCountryVats(this.props.businessPlan.countryShortCode);
                this.props.getAssets(this.props.businessPlan.id);
            }
        } else {
            this.props.logout()
            this.props.history.push('/login')
        }

    }

    render() {
        console.log(this.props.assets)
        console.log(this.props.vat);
        console.log(this.props.businessPlan.countryShortCode);
        const vatOptions = this.props.vat.vat.map((v, index) => (
            <Option value={v.vatValue} key={index}>{v.vatValue + "%"}</Option>
        ))
        const assetsColumns = [
            {
                title: 'Asset',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '20%',
            },
            {
                title: 'Name',
                dataIndex: 'resource_title',
                key: 'resource_title',
                width: '28%',
            },
            {
                title: 'Statuss',
                dataIndex: 'resource_status',
                key: 'resource_status',
                width: '12%',
                align: 'right',
                render: (text, obj, record) => (
                    text === null ? <div style={{ display: 'flex', justifyContent: 'center' }}><Text>-</Text></div> : <Text>{text}</Text>
                )
            },

            {
                title: 'Total amount with VAT',
                dataIndex: 'amount',
                key: 'amount',
                width: '24.5%',
                align: 'right',
                render: (text, obj, record) => (
                    <div style={{ float: 'right' }}>
                        <Input style={{ width: 103 }}
                            prefix="€"
                            size="large"
                            onChange={e => this.props.updateAssetsItemAmount(e.target.value, obj)}
                            defaultValue={text === null ? 0 : text}
                            className='assets-input-style'
                            disabled={true}
                        />
                    </div>

                )

            },
            {
                title: () => (
                    <Space>
                        <Text>VAT Rate
                            <TooltipComponent code="physintelassets" type="text" />
                        </Text>
                    </Space>
                ),
                dataIndex: 'vat',
                key: 'vat',
                align: 'right',
                width: '15%',
                render: (text, obj, record) => (
                    <Space size={0}>
                        <Select defaultValue={text === null ? this.props.vat.defaultVAT : text+' %'}
                            suffixIcon={<CaretDownFilled />}
                            onChange={e => this.props.updateAssetsItemVat(e, obj)}
                            style={{ width: 79 }}
                            className='assets-selector-style'
                            disabled={true}
                        >
                            {vatOptions} 
                        </Select>
                    </Space>
                ),
            }
        ];
        return (
            <>
                <div>
                    <Col span={20} offset={2}>
                        <Breadcrumb style={{ marginTop: "40px" }}>
                            <Breadcrumb.Item>
                                <Space><Link to='/public-business-plans'>Public Business plans</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Space><Link to='/public/overview'>{this.props.businessPlan.name}</Link></Space>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Financial projections
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>

                    <Row align="middle" style={{ marginTop: "9px", marginBottom: "25px" }}>
                        <Col span={16} offset={2}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Assets</Text>
                                <TooltipComponent code="assets" type="title" />
                            </div>
                        </Col>
                    </Row>
                    <Col span={20} offset={2}>
                        <Divider />
                    </Col>
                    <Col span={20} offset={2}>
                        <Col span={24} >
                            <Row style={{ marginTop: "50.5px", marginBottom: "50px" }}>
                                <Col span={8}>
                                    <div style={{ marginRight: '40px' }}>
                                        <Typography.Title style={{ ...aboutTitleTextStyle }}>Assets</Typography.Title>
                                        <TextHelper code="assetshelp" type="lefttext" />
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div>
                                        <Table
                                            title={() => (
                                                <div>
                                                    <Row>
                                                        <div>
                                                            <Text style={{ ...tableTitleTextStyle }}>Physical and Intellectual assets</Text>
                                                        </div>
                                                    </Row>
                                                </div>
                                            )}
                                            rowKey="resource_id"
                                            dataSource={[...this.props.assets.physical_assets]}
                                            columns={assetsColumns}
                                            pagination={false}
                                            footer={() => (
                                                <>
                                                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                                                        <Row style={{ marginBottom: 8 }}>

                                                            <Col span={16}>
                                                                <Text>Investments</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{this.props.assets.total_investments === null ? 0 : this.props.assets.total_investments}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginBottom: 8 }}>
                                                            <Col span={16}>
                                                                <Text>Own Assets (physical & intellectual)</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{this.props.assets.own_assets === null ? 0 : this.props.assets.own_assets}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginBottom: 8 }}>
                                                            <Col span={16}>
                                                                <Text>Additional necessary funds for investments in assets</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{this.props.assets.investment_amount === null ? 0 : this.props.assets.investment_amount}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </>
                                            )
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </div>

            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        countryCode: state.countryShortCode,
        vat: state.vat,
        assets: state.assets,
    };
}
export default connect(mapStateToProps, { refreshPublicPlan, logout, getAssets, discardChanges, getCountryShortCode, getCountryVats, getSelectedPlanOverview })(AssetsWindow);