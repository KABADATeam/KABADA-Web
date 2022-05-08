import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Tag, Popover, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateChannel } from "../../../appStore/actions/channelActions";

const { Option } = Select;
const { Text } = Typography;

const serviceChannelTypeData = [
    {
        "id": '3c81ac65-960e-44aa-b752-17808fa31c1f',
        "name": 'Direct sales'
    },
    {
        "id": 'b0cb1000-5a92-47a0-a45b-499c5f580524',
        "name": 'Agents'
    },
    {
        "id": 'd57d1d34-e721-4d46-a5f4-a3f9e7d3a198',
        "name": 'Other'
    }
]



class EditChannelModal extends Component {
    constructor(props) {
        super(props);
        const channel = { ...props.types.find(item => item.id === props.item.channel_type.id), tag: 0 };
        const sub_channel = props.item.channel_subtype === null ? null : { ...channel.subtypes.find(item => item.id === props.item.channel_subtype.id), tag: 0 };
        const shoptype = sub_channel === null ? null : { ...props.item.channel_subtype.type, tag: 0 };
        const distribution = shoptype === null ? [] : props.item.distribution_channels.map(x => ({ id: x.id, tag: 0 }));
        const shop_type = sub_channel === null || props.item.channel_subtype.type === null ? null : { ...sub_channel.types.find(x => x.id === props.item.channel_subtype.type.id), tag: 0 };
        const shop_location = shop_type === null ? null : { ...shop_type.location_types.find(x => x.id === props.item.channel_subtype.type.location_type_id), tag: 0 };
        const selectedProductID = props.item.products[0].id;
        const filteredProduct = this.props.products.products.find((x) => x.id === selectedProductID);

        this.state = {
            error: {
                distribution: "",
                product: "",
                channel: "",
                sub_channel: ""
            },
            popoverVisibility: false,
            popoverType: 'no predict',
            popoverTextObject: [],

            selected_channel: channel,
            selected_subtype: sub_channel,
            selected_shopType: shop_type,
            selected_shopLocation: shop_location,
            selected_distribution: distribution,
            selected_products: props.item.products.map(x => x.id),
            selected_product_type: filteredProduct.product_type
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {

        if (this.state.selected_subtype.shop.type !== null && this.state.selected_subtype.distribution.length === 0) {
            this.setState({
                error: { ...this.state.error, distribution: "Select distribution channel" }
            });
            return;
        }

        if (this.state.selected_products.length === 0) {
            this.setState({
                error: { ...this.state.error, product: "Select product" }
            });
            return;
        }

        if (this.state.selected_channel === null) {
            this.setState({
                error: { ...this.state.error, channel: "Select channel" }
            });
            return;
        }

        if (this.state.selected_subtype.id === undefined && this.state.selected_channel.subtypes !== null) {
            this.setState({
                error: { ...this.state.error, sub_channel: "Select channel" }
            });
            return;
        }

        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "channel_type_id": this.state.selected_channel.id,
            "product_id": this.state.selected_products,
            "channel_subtype_id": this.state.selected_subtype.id === undefined ? null : this.state.selected_subtype.id,
            "subtype_type_id": this.state.selected_subtype.shop.type === null ? null : this.state.selected_subtype.shop.type.id,
            "location_type_id": this.state.selected_subtype.shop.location === null ? null : this.state.selected_subtype.shop.location.id,
            "distribution_channels_id": this.state.selected_subtype.distribution
        };
        const products = this.state.selected_products.map(id => {
            return this.props.products.products.find(x => x.id === id);
        });
        const distributions = this.state.selected_subtype.distribution.map(id => {
            return this.state.selected_subtype.shop.type.distribution_channels.find(x => x.id === id);
        });

        const type = this.state.selected_subtype.shop.type === null ? null : {
            "id": this.state.selected_subtype.shop.type.id,
            "name": this.state.selected_subtype.shop.type.name,
            "location_type_id": this.state.selected_subtype.shop.location.id
        }

        const reducerObj = {
            "products": products,
            "channel_type": this.state.selected_channel,
            "distribution_channels": distributions,
            "channel_subtype": this.state.selected_subtype.id === undefined ? null : { ...this.state.selected_subtype, "type": type },
        }
        this.props.updateChannel(postObj, reducerObj);
        this.props.onClose();
    }

    onProductChange(id) {
        const filter = this.props.products.products.filter((x) => x.id === id[0]);
        const type = filter.map((x) => x.product_type);
        console.log(type[0]);
        this.setState({
            selected_products: id,
            selected_product_type: type[0],
            error: { ...this.state.error, product: "" }
        });
    }

    onChannelChange(itemId) {
        const selectedChannel = this.props.types.find(x => x.id === itemId);
        const modifySelectedChannel = { ...selectedChannel, tag: 0 };
        this.setState({
            selected_channel: modifySelectedChannel,
            selected_subtype: null,
            selected_shopType: null,
            selected_shopLocation: null,
            selected_distribution: null,
            error: { ...this.state.error, channel: "" }
        });
    }

    onChannelSubtypeChange(itemId) {
        const subChannel = this.state.selected_channel.subtypes.find(x => x.id === itemId);
        const shopType = subChannel.types === null ? [] : ({ id: subChannel.id, name: subChannel.name, tag: 0 });
        const location = subChannel.types === null ? [] : subChannel.types;
        console.log('location id ', this.state.selected_shopLocation)
        console.log(location);
        this.setState({
            selected_subtype: { ...subChannel, tag: 0 },
            selected_shopType: shopType,
            selected_shopLocation: location,
            error: { ...this.state.error, sub_channel: "" }
        });
    }

    addSelectedValue = (value, state, segment_type) => {
        const resultArray = [];
        if (state === null) {
            const type = segment_type.find((obj) => obj.id === value[0]);
            const new_obj = {
                id: type.id,
                title: type.name,
                tag: 0
            }
            resultArray.push(new_obj);
        } else {
            for (var i = 0; i < value.length; i++) {
                if (state[i] === undefined) {
                    const type = segment_type.find((obj) => obj.id === value[i]);
                    const new_obj = {
                        id: type.id,
                        title: type.name,
                        tag: 0
                    }
                    resultArray.push(new_obj)
                } else {
                    const type = state.find((obj) => obj.id === value[i]);
                    if (type.tag === 0) {
                        const new_obj = {
                            id: type.id,
                            title: type.name,
                            tag: 0
                        }
                        resultArray.push(new_obj);
                    } else if (type.tag === 1) {
                        const new_obj = {
                            id: type.id,
                            title: type.name,
                            tag: 1
                        }
                        resultArray.push(new_obj);
                    }
                }
            }
        }
        return resultArray;
    }

    onDistributionChannelChange(value) {
        const subtypes = this.props.types.find(x => x.name === 'Direct sales').subtypes;
        console.log(this.state.selected_subtype);
        console.log('types ', this.props.types);
        const distribution_array = (subtypes.find(x => x.name === "Own shop").types).find(x => x.id === this.state.selected_shopType.id).distribution_channels;
        const distribution_values = this.addSelectedValue(value, this.state.selected_distribution, distribution_array);
        console.log(distribution_values);
        this.setState({
            selected_distribution: distribution_values, 
            error: { ...this.state.error, distribution: "" }
        });
    }

    onShopTypeSelection(e) {
        const shopType = { ...this.state.selected_subtype.types.find(x => x.id === e.target.value), tag: 0 };
        const location = shopType === null ? null : { ...shopType.location_types[0], tag: 0 };
        this.setState({
            selected_shopType: shopType,
            selected_shopLocation: location,
            selected_distribution: []
        });
    }

    onLocationSelection(e) {
        const location = { ...this.state.selected_shopType.location_types.find(x => x.id === e.target.value), tag: 0 };
        this.setState({
            selected_shopLocation: location
        });
    }

    render() {
        const productOptions = this.props.products.products.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const physicalProdChannelOptions = this.props.types.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const serviceProdChannelOptions = serviceChannelTypeData.map((obj) =>
            ({ label: obj.name, value: obj.id }))
        const channelTypeValue = this.state.selected_channel.id !== undefined ? this.state.selected_channel.id : null;

        const channelSubtypeOptions = this.state.selected_channel.subtypes === null ? [] :
            this.state.selected_channel.subtypes.filter((obj) => obj.name !== "").map((obj) => ({ label: obj.name, value: obj.id }));
        const channelSubTypeValue = this.state.selected_subtype.id !== null ? this.state.selected_subtype.id : null;

        const shopTypeOptions = this.state.selected_subtype === null ? [] : this.state.selected_subtype.types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );
        const subChannelTypes = this.state.selected_subtype === null ? [] : this.state.selected_subtype.types.find(x => x.id === this.state.selected_shopType.id);

        const locationTypeOptions = this.state.selected_subtype === null ? [] : subChannelTypes.location_types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );
        const distributionTypeOptions = this.state.selected_subtype === null ? [] : subChannelTypes.distribution_channels.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const distributionChannelValue = this.state.selected_subtype !== null ? this.state.selected_distribution.map(e => e.id) : []

        const productTag = (props) => {
            const { label, value, onClose } = props;
            return (
                <Tag
                    closable
                    onClose={onClose}
                    style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                >
                    {label}
                </Tag>
            )
        }
        const distributionTag = (props) => {
            const { label, value, onClose } = props;
            const tagColor = this.state.selected_distribution !== null ? this.state.selected_distribution.find(t => t.id === value) : null;
            if (tagColor.tag === 1) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#BAE7FF' }}
                    >
                        {label}
                    </Tag>
                );
            } else if (tagColor.tag === 0) {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            } else {
                return (
                    <Tag
                        closable
                        onClose={onClose}
                        style={{ fontSize: '14px', lineHeight: '22px', background: '#F5F5F5' }}
                    >
                        {label}
                    </Tag>
                );
            }
        }
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Edit Channel</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item
                            key="product"
                            name="product"
                            initialValue={this.state.selected_products}
                            label="Choose product"
                            validateStatus={this.state.error.product !== '' ? 'error' : 'success'}>
                            <Select
                                style={{ width: '100%' }}
                                mode="multiple"
                                placeholder="Select product(s)"
                                onChange={this.onProductChange.bind(this)}
                                tagRender={productTag}
                                options={productOptions}
                            />
                        </Form.Item>

                        <Form.Item
                            key="channelType"
                            name="channelType"
                            initialValue={this.state.selected_channel.id}
                            label="Channel"
                            validateStatus={this.state.error.channel !== '' ? 'error' : 'success'}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select channel"
                                onChange={this.onChannelChange.bind(this)}
                                value={channelTypeValue}
                                options={this.state.selected_product_type === 'Service' ? serviceProdChannelOptions : physicalProdChannelOptions}
                            />
                        </Form.Item>

                        {
                            this.state.selected_channel.subtypes === null ? null :
                                <Form.Item
                                    key="channelSubtype"
                                    name="subType"
                                    label="Direct sales channel"
                                    initialValue={this.state.selected_subtype.id}
                                    validateStatus={this.state.error.sub_channel !== '' ? 'error' : 'success'}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select channel"
                                        onChange={this.onChannelSubtypeChange.bind(this)}
                                        value={channelSubTypeValue}
                                        options={channelSubtypeOptions}
                                    />
                                </Form.Item>
                        }

                        {
                            this.state.selected_subtype.types === null ? null :
                                <Form.Item
                                    key="ownShopType"
                                    label="Own Shop Type"
                                >
                                    <Radio.Group
                                        key="groupOne"
                                        onChange={this.onShopTypeSelection.bind(this)}
                                        defaultValue={this.state.selected_shopType.id}
                                    >
                                        <Space direction="vertical">
                                            {shopTypeOptions}
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                        }

                        {
                            this.state.selected_subtype.types === null ? null :
                                this.state.selected_shopType.name === "Physical" ?
                                    <>
                                        <Form.Item
                                            key="physicalLocation"
                                            label="Physical store location"
                                        >
                                            <Radio.Group
                                                key="groupTwo"
                                                onChange={this.onLocationSelection.bind(this)}
                                                defaultValue={this.state.selected_shopLocation.id}
                                            >
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item
                                            key="distributionChannel"
                                            name="distributionChannel"
                                            label="Distribution channels"
                                            initialValue={this.state.selected_subtype.distribution}
                                            validateStatus={this.state.error.distribution !== '' ? 'error' : 'success'}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                mode="multiple"
                                                placeholder="Select distribution channel"
                                                onChange={this.onDistributionChannelChange.bind(this)}
                                                value={distributionChannelValue}
                                                tagRender={distributionTag}
                                                options={distributionTypeOptions}
                                            />
                                        </Form.Item>
                                    </>
                                    :
                                    <>
                                        <Form.Item
                                            key="onlineLocation"
                                            label="Online store location"
                                        >
                                            <Radio.Group
                                                key="groupThree"
                                                onChange={this.onLocationSelection.bind(this)}
                                                defaultValue={this.state.selected_shopLocation.id}
                                            >
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item
                                            key="distributionChannel2"
                                            name="distributionChannel2"
                                            label="Distribution channels"
                                            initialValue={this.state.selected_subtype.distribution}
                                            validateStatus={this.state.error.distribution !== '' ? 'error' : 'success'}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                mode="multiple"
                                                placeholder="Select distribution channel"
                                                onChange={this.onDistributionChannelChange.bind(this)}
                                                value={distributionChannelValue}
                                                tagRender={distributionTag}
                                                options={distributionTypeOptions}
                                            />
                                        </Form.Item>
                                    </>
                        }
                    </Form>
                </Modal >
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        types: state.channelTypes,
        products: state.products
    };
}

export default connect(mapStateToProps, { updateChannel })(EditChannelModal);

