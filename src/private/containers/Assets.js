import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip, Breadcrumb, Switch } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getAssets, saveChanges, discardChanges, saveState, updateAssetsItemVat, updateAssetsItemAmount } from '../../appStore/actions/assetsAction';
import { getCountryShortCode } from '../../appStore/actions/countriesActions';
import { getCountryVats } from '../../appStore/actions/vatAction';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
//import { getCountryVats } from '../../appStore/actions/vatAction';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { logout } from '../../appStore/actions/authenticationActions';
import { conditionalExpression } from '@babel/types';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import TooltipComponent from '../components/Tooltip';
import TextHelper from '../components/TextHelper';
import '../../css/Assets.css';
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

    getUpdatesWindowState() {
        let original = JSON.stringify(this.props.assets.physical_assets_original);
        let modified = JSON.stringify(this.props.assets.physical_assets_updated)
        if (original === modified) {
            return 'hidden'
        } else {
            return 'visible'
        }
    }

    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }
    saveChanges = () => {
        this.props.saveChanges(this.props.businessPlan.id, () => {
            this.props.getCountryVats(this.props.businessPlan.countryShortCode, () => {
                this.props.getAssets(this.props.businessPlan.id);
            });
        });
    }
    discardChanges = () => {
        this.props.discardChanges();
    }
    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        this.props.getCountryVats(this.props.businessPlan.countryShortCode, () => {
                            this.props.getAssets(this.props.businessPlan.id);
                        });
                        //this.props.getAssets(this.props.businessPlan.id);
                        this.props.getTooltips();
                    });
                }
            } else {
                // this.props.getCountryVats(this.props.businessPlan.countryShortCode);
                // this.props.getAssets(this.props.businessPlan.id);
                this.props.getCountryVats(this.props.businessPlan.countryShortCode, () => {
                    this.props.getAssets(this.props.businessPlan.id);
                });
            }
        } else {
            this.props.logout()
            this.props.history.push('/login')
        }

    }

    render() {
        const isVisibleHeader = this.getUpdatesWindowState();
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
                        <Select defaultValue={text === null ? this.props.vat.defaultVAT : text + '%'}
                            suffixIcon={<CaretDownFilled />}
                            onChange={e => this.props.updateAssetsItemVat(e, obj)}
                            style={{ width: 79 }}
                            className='assets-selector-style'
                        >
                            {vatOptions}
                        </Select>
                    </Space>
                ),
            }
        ];
        return (
            <>
                <UnsavedChangesHeader
                    visibility={isVisibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                {this.props.vat.defaultVAT === null ?
                    <div></div>
                    :
                    <div>
                        <Col span={20} offset={2}>
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
                            <Col span={16} offset={2}>
                                <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                                    <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                                    <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Assets</Text>
                                    <TooltipComponent code="assets" type="title" />
                                </div>
                            </Col>
                            <Col span={4}>
                                <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                                    <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.assets.is_assets_completed} onClick={this.onCompletedChange.bind(this)} />
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
                }
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
export default connect(mapStateToProps, { 
    refreshPlan, 
    logout, 
    getAssets, 
    saveChanges, 
    discardChanges, 
    getCountryShortCode, 
    getCountryVats, 
    saveState, 
    getSelectedPlanOverview, 
    updateAssetsItemVat, 
    updateAssetsItemAmount,
    getTooltips 
})(AssetsWindow);