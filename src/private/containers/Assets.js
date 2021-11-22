import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Col, Typography, Card, Select, Space, Input, Table, Button, InputNumber, Tooltip, Breadcrumb, Switch } from 'antd';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import { connect } from 'react-redux';
import { CaretDownFilled, UserOutlined, InfoCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getAssets, updateAssets, saveState } from '../../appStore/actions/assetsAction';
import { getCountryShortCode } from '../../appStore/actions/countriesActions';
import { getCountryVats } from '../../appStore/actions/vatAction';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
//import { getCountryVats } from '../../appStore/actions/vatAction';
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { conditionalExpression } from '@babel/types';

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
            total_investments: null,
            own_assets: null,
            investment_amount: null,
            original_assets_items: [],
            assets_items: [],
            visibleHeader: 'hidden',
        }
    }

    onBackClick() {
        this.props.history.push(`/overview`);
    }
    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));
        let original = array1;
        let modified = array2;

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.sort();
        b = b.sort();
        for (var i = 0; i < original.length; ++i) {
            if (original[i].amount !== modified[i].amount || original[i].vat !== modified[i].vat) {
                // console.log('Original price:' + original[i].price + ", modified price is: " + modified[i].price)
                console.log('They are not equal')
                return false;
            }
        }
        return true;
    }

    getUpdatesWindowState() {
        const original = this.state.original_assets_items;
        const modified = this.state.assets_items
        if (original === null) {
            return 'hidden'
        }
        if (modified === null) {
            return 'hidden'
        }
        if (this.arraysEqual(original, modified) === false) {
            return 'visible'
        }
        return 'hidden'
    }

    setItems = (assetsArray) => {
        const array = [];
        var index = 0;
        const defaultVATValue = this.props.vat.vat.find((item) => item.key === 0);
        assetsArray.forEach(item => {
            const obj = {
                resource_id: item.resource_id,
                resource_title: item.resource_title,
                resource_status: item.resource_status,
                type_title: item.type_title,
                amount: item.amount === null ? 0 : item.amount,
                vat: item.vat === null ? defaultVATValue.vatValue : item.vat,
                index: index
            }
            array.push(obj);
            index = index + 1;
        })
        this.setState({
            assets_items: array,
        })
        console.log(array);
    }
    getOriginalAssetsItems = (assetsArray) => {
        const array = [];
        var index = 0;

        assetsArray.forEach(item => {
            const obj = {
                resource_id: item.resource_id,
                resource_title: item.resource_title,
                resource_status: item.resource_status,
                type_title: item.type_title,
                amount: item.amount,
                vat: item.vat,
                index: index
            }
            array.push(obj);
            index = index + 1;
        })
        this.setState({
            original_assets_items: array,
        })
    }
    computeAmounts = () => {
        const total_investments_values_list = [];
        const own_assets_values_list = [];
        const assets_items_array = this.state.assets_items;
        assets_items_array.map((item) => {
            const obj = {
                amount: item.amount
            }
            const value = parseInt(Object.values(obj));
            total_investments_values_list.push(value);
        })
        const total_investments_value = total_investments_values_list.reduce(function (total_investments_value, value) {
            const updated_total_investments_value = total_investments_value + value;
            return updated_total_investments_value;
        })
        const own_assets_array = assets_items_array.filter((item) => item.resource_status === 'Own');
        own_assets_array.map((item) => {
            const obj = {
                amount: item.amount
            }
            const value = parseInt(Object.values(obj));
            own_assets_values_list.push(value);
        })
        const own_assets_value = own_assets_values_list.reduce(function (own_assets_value, value) {
            const updated_own_assets_value = own_assets_value + value;
            return updated_own_assets_value
        });
        //compute investments_amount 
        let investments_amount_value = total_investments_value - own_assets_value;
        this.setState({
            total_investments: total_investments_value,
            own_assets: own_assets_value,
            investment_amount: investments_amount_value,
        })
    }
    updateAssetsItemsProperties = (value, obj, inputName) => {
        const array = this.state.assets_items;
        array.forEach(item => {
            if (item.resource_id === obj.resource_id) {
                if (inputName === 'amount') {
                    item.amount = Number(value);
                } else if (inputName === 'vat') {
                    console.log('Update', + value);
                    item.vat = value
                }
            }
            this.computeAmounts();
        })
        this.setState({
            assets_items: array
        })
        const visibilityString = this.getUpdatesWindowState();
        this.setState({
            visibleHeader: visibilityString
        });
    }
    saveChanges = () => {
        const assets_items_for_post = [];
        const assets_items_for_reducer = [];
        const assets_items_array = this.state.assets_items;
        assets_items_array.map((item, index) => {
            const obj = {
                resource_id: item.resource_id,
                amount: item.amount,
                vat: item.vat
            }
            assets_items_for_post.push(obj);
        })
        // create assets items object, they will be using on reducerObject
        assets_items_array.map((item, index) => {
            const obj = {
                resource_id: item.resource_id,
                resource_title: item.resource_title,
                resource_status: item.resource_status,
                type_title: item.type_title,
                amount: item.amount,
                vat: item.vat
            }
            assets_items_for_reducer.push(obj);
        })
        const postObject = {
            business_plan_id: this.props.businessPlan.id,
            total_investments: this.state.total_investments === null ? 0 : this.state.total_investments,
            own_assets: this.state.own_assets === null ? 0 : this.state.own_assets,
            investment_amount: this.state.investment_amount === null ? 0 : this.state.investment_amount,
            physical_assets: assets_items_for_post
        }
        const reducerObject = {
            business_plan_id: this.props.businessPlan.id,
            total_investments: this.state.total_investments === null ? 0 : this.state.total_investments,
            own_assets: this.state.own_assets === null ? 0 : this.state.own_assets,
            investment_amount: this.state.investment_amount === null ? 0 : this.state.investment_amount,
            physical_assets: assets_items_for_post
        }
        this.setState({
            visibleHeader: 'hidden'
        })
        console.log(postObject);
        this.props.updateAssets(postObject, reducerObject);
    }
    onCompletedChange(state) {
        this.props.saveState(this.props.businessPlan.id, state, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        });
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    this.props.getAssets(this.props.businessPlan.id, () => {
                        const obj = { id: this.props.businessPlan.id }
                        this.props.getCountryShortCode(obj, (data) => {
                            console.log(this.props.countryCode.countryShortCode)
                            this.props.getCountryVats(this.props.countryCode.countryShortCode);
                        });
                        this.setItems(this.props.assets.physical_assets);
                        this.getOriginalAssetsItems(this.props.assets.physical_assets);
                    })

                });

            }
        } else {
            this.props.getAssets(this.props.businessPlan.id, () => {
                const obj = { id: this.props.businessPlan.id }
                this.props.getCountryShortCode(obj, (data) => {
                    console.log(this.props.countryCode.countryShortCode)
                    this.props.getCountryVats(this.props.countryCode.countryShortCode);
                });
                this.setItems(this.props.assets.physical_assets);
                this.getOriginalAssetsItems(this.props.assets.physical_assets);
            })
            //this.setItems(this.props.assets.physical_assets);
            //this.getOriginalAssetsItems(this.props.assets.physical_assets);
            //const obj = { id: this.props.businessPlan.id }
            //this.props.getCountryShortCode(obj, (data) => {
            //    this.props.getCountryVats(this.props.countryCode.countryShortCode);
            //});
        }
    }

    render() {
        const defaultVATValue = this.props.vat.vat.find((element) => element.key === 0);
        const vatOptions = this.props.vat.vat.map((v, index) => (
            <Option value={v.vatValue}>{v.vatValue + "%"}</Option>
        ))
        const assetsColumns = [
            {
                title: 'Asset',
                dataIndex: 'type_title',
                key: 'type_title',
                width: '15%',
            },
            {
                title: 'Name',
                dataIndex: 'resource_title',
                key: 'resource_title',
                width: '20%',
            },
            {
                title: 'Statuss',
                dataIndex: 'resource_status',
                key: 'resource_status',
                width: '15%',
                align: 'right',
                render: (text, obj, record) => (
                    text === null ? <div style={{ display: 'flex', justifyContent: 'center' }}><Text>-</Text></div> : <Text>{text}</Text>
                )
            },

            {
                title: 'Total amount with VAT',
                dataIndex: 'amount',
                key: 'amount',
                width: '30%',
                align: 'right',
                render: (text, obj, record) => (
                    <div style={{ float: 'right' }}>
                        <Input style={{ width: 103 }}
                            prefix="€"
                            size="large"
                            onChange={e => this.updateAssetsItemsProperties(e.target.value, obj, 'amount')}
                            defaultValue={text === null ? 0 : text}
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
                render: (text, obj, record) => (
                    <Space size={0}>
                        <Select defaultValue={text === null ? defaultVATValue.vatValue : text}
                            suffixIcon={<CaretDownFilled />}
                            onChange={e => this.updateAssetsItemsProperties(e, obj, 'vat')}
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
                    visibility={this.state.visibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
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
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={this.props.assets.is_assets_completed} onClick={this.onCompletedChange.bind(this)} />
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
                                    <Table
                                        title={() => (
                                            <div>
                                                <Row style={{ marginBottom: 16 }}>
                                                    <div>
                                                        <Text style={{ ...titleTextStyle }}>Physical and Intellectual assets</Text>
                                                    </div>
                                                </Row>
                                            </div>
                                        )}
                                        rowKey="resource_id"
                                        dataSource={this.state.assets_items}
                                        columns={assetsColumns}
                                        pagination={false}
                                        footer={pageData => {
                                            let total_amount = 0;
                                            let own_assets_amount = 0;
                                            pageData.forEach(({ amount }) => {
                                                total_amount += amount;
                                            });
                                            const ownAssets = pageData.filter((item) => item.resource_status === 'Own')
                                            ownAssets.forEach(({ amount }) => {
                                                own_assets_amount += amount
                                            })
                                            return (
                                                <>
                                                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                                                        <Row style={{ marginBottom: 8 }}>

                                                            <Col span={16}>
                                                                <Text>Investments</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{total_amount}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginBottom: 8 }}>
                                                            <Col span={16}>
                                                                <Text>Own Assets (physical & intellectual)</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{own_assets_amount}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginBottom: 8 }}>
                                                            <Col span={16}>
                                                                <Text>Additional necessary funds for investments in assets</Text>
                                                            </Col>
                                                            <Col span={8}>
                                                                <div style={{ float: 'right' }}>
                                                                    <Text>{total_amount - own_assets_amount}</Text>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </>
                                            )
                                        }}
                                    />
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
export default connect(mapStateToProps, { refreshPlan, getAssets, updateAssets, getCountryShortCode, getCountryVats, saveState, getSelectedPlanOverview })(AssetsWindow);