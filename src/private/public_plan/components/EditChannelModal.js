import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateChannel } from "../../../appStore/actions/channelActions";

const { Option } = Select;

class EditChannelModal extends Component {
    constructor(props) {
        super(props);
        const channel = props.types.find(item => item.id === props.item.channel_type.id);
        const sub_channel = props.item.channel_subtype === null ? null : channel.subtypes.find(item => item.id === props.item.channel_subtype.id);
        const type = sub_channel === null ? null : props.item.channel_subtype.type;
        const distribution = type === null ? [] : props.item.distribution_channels.map(x => x.id);
        const shop_type = sub_channel === null || props.item.channel_subtype.type === null ? null : sub_channel.types.find(x => x.id === props.item.channel_subtype.type.id);
        const shop_location = shop_type === null ? null : shop_type.location_types.find(x => x.id === props.item.channel_subtype.type.location_type_id);

        const sub_type = sub_channel === null ? { types: null } : sub_channel;

        this.state = {
            error: {
                distribution: "",
                product: "",
                channel: "",
                sub_channel: ""
            },

            selected_channel: channel,
            selected_subtype: { ...sub_type, "shop": { type: shop_type, location: shop_location }, "distribution": distribution },
            selected_products: props.item.products.map(x => x.id)
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        this.props.onClose();
    }

    onProductChange(id) {
        this.setState({
            selected_products: id,
            error: { ...this.state.error, product: "" }
        });
    }

    onChannelChange(itemId) {
        const selectedChannel = this.props.types.find(x => x.id === itemId);
        this.setState({
            selected_channel: selectedChannel,
            selected_subtype: { "types": null, "distribution": [], "shop": { "type": null, "location": null } },
            error: { ...this.state.error, channel: "" }
        });
    }

    onChannelSubtypeChange(itemId) {
        const subChannel = this.state.selected_channel.subtypes.find(x => x.id === itemId);
        const shopType = subChannel.types === null ? null : subChannel.types[0];
        const location = shopType === null ? null : shopType.location_types[0];
        this.setState({
            selected_subtype: { ...subChannel, "distribution": [], "shop": { "type": shopType, "location": location } },
            error: { ...this.state.error, sub_channel: "" }
        });
    }

    onDistributionChannelChange(id) {
        this.setState({
            selected_subtype: { ...this.state.selected_subtype, "distribution": id },
            error: { ...this.state.error, distribution: "" }
        });
    }

    onShopTypeSelection(e) {
        const shopType = this.state.selected_subtype.types.find(x => x.id === e.target.value);
        const location = shopType === null ? null : shopType.location_types[0];
        this.setState({
            selected_subtype: { ...this.state.selected_subtype, "distribution": [], "shop": { "type": shopType, "location": location } }
        });
    }

    onLocationSelection(e) {
        const location = this.state.selected_subtype.shop.type.location_types.find(x => x.id === e.target.value);
        const shop = { ...this.state.selected_subtype.shop, "location": location };
        this.setState({
            selected_subtype: { ...this.state.selected_subtype, "shop": shop }
        });
    }

    render() {
        const productOptions = this.props.products.products.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        );

        const channelOptions = this.props.types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        );

        const subTypes = this.state.selected_channel.subtypes === null ? [] : this.state.selected_channel.subtypes;
        const subtypeOptions = subTypes.map((obj) => {
            return (obj.name !== "" ? <Option key={obj.id} value={obj.id}>{obj.name}</Option> : null)
        }
        );

        const shopTypeOptions = this.state.selected_subtype.types === null ? [] : this.state.selected_subtype.types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );

        const locationTypeOptions = this.state.selected_subtype.shop.type === null ? [] : this.state.selected_subtype.shop.type.location_types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );

        const distributionTypeOptions = this.state.selected_subtype.shop.type === null ? [] : this.state.selected_subtype.shop.type.distribution_channels.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        );

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Channel</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            {/* <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button> */}
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item key="product" name="product" initialValue={this.state.selected_products} label="Choose product"
                            validateStatus={this.state.error.product !== '' ? 'error' : 'success'} >
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select product(s)" onChange={this.onProductChange.bind(this)} disabled={true}>
                                {productOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="channelType" name="channelType" initialValue={this.state.selected_channel.id} label="Channel"
                            validateStatus={this.state.error.channel !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Select channel" onChange={this.onChannelChange.bind(this)} disabled={true}>
                                {channelOptions}
                            </Select>
                        </Form.Item>

                        {
                            this.state.selected_channel.subtypes === null ? null :
                                <Form.Item key="channelSubtype" name="subType" label="Direct sales channel" initialValue={this.state.selected_subtype.id}
                                    validateStatus={this.state.error.sub_channel !== '' ? 'error' : 'success'}>
                                    <Select disabled={true} style={{ width: '100%' }} placeholder="Select channel" onChange={this.onChannelSubtypeChange.bind(this)} >
                                        {subtypeOptions}
                                    </Select>
                                </Form.Item>
                        }

                        {
                            this.state.selected_subtype.types === null ? null :
                                <Form.Item key="ownShopType" label="Own Shop Type">
                                    <Radio.Group disabled={true} key="groupOne" onChange={this.onShopTypeSelection.bind(this)} value={this.state.selected_subtype.shop.type.id}>
                                        <Space direction="vertical">
                                            {shopTypeOptions}
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                        }

                        {
                            this.state.selected_subtype.shop.type === null ? null :
                                this.state.selected_subtype.shop.type.name === "Physical" ?
                                    <>
                                        <Form.Item key="physicalLocation" label="Physical store location">
                                            <Radio.Group disabled={true} key="groupTwo" onChange={this.onLocationSelection.bind(this)} value={this.state.selected_subtype.shop.location.id}>
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item key="distributionChannel" name="distributionChannel" label="Distribution channels" initialValue={this.state.selected_subtype.distribution}
                                            validateStatus={this.state.error.distribution !== '' ? 'error' : 'success'}>
                                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Select distribution channel" onChange={this.onDistributionChannelChange.bind(this)} >
                                                {distributionTypeOptions}
                                            </Select>
                                        </Form.Item>
                                    </>
                                    :
                                    <>
                                        <Form.Item key="onlineLocation" label="Online store location">
                                            <Radio.Group disabled={true} key="groupThree" onChange={this.onLocationSelection.bind(this)} value={this.state.selected_subtype.shop.location.id}>
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item key="distributionChannel2" name="distributionChannel2" label="Distribution channels" initialValue={this.state.selected_subtype.distribution}
                                            validateStatus={this.state.error.distribution !== '' ? 'error' : 'success'}>
                                            <Select disabled={true} style={{ width: '100%' }} mode="multiple" placeholder="Select distribution channel" onChange={this.onDistributionChannelChange.bind(this)} >
                                                {distributionTypeOptions}
                                            </Select>
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

