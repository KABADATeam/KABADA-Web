import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveChannel } from "../../../appStore/actions/channelActions";

const { Option } = Select;

class AddChannelModal extends Component {
    state = {
        distributionError: '',
        productError: '',
        channelError: '',
        subchannelError: '',
        productType: '',

        shopType: null,
        location: null,
        selectedChannel: { "subtypes": null },
        selectedSubChannel: { "types": null },
        distributionChannels: [],
        selectedProducts: []
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {

        if (this.state.shopType !== null && this.state.distributionChannels.length === 0) {
            this.setState({
                distributionError: 'Select distribution channel'
            });
            return;
        }

        if (this.state.selectedProducts.length === 0) {
            this.setState({
                productError: 'Select product'
            });
            return;
        }

        if (Object.keys(this.state.selectedChannel).length === 1) {
            this.setState({
                channelError: 'Select channel'
            });
            return;
        }

        if (Object.keys(this.state.selectedChannel).length > 1) {
            if (this.state.selectedChannel.subtypes !== null && Object.keys(this.state.selectedSubChannel).length === 1) {
                this.setState({
                    subchannelError: 'Select channel'
                });
                return;
            }
        }

        const postObj = {
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "channel_type_id": this.state.selectedChannel.id,
            "product_id": this.state.selectedProducts,
            "channel_subtype_id": this.state.selectedSubChannel.id === undefined ? null : this.state.selectedSubChannel.id,
            "subtype_type_id": this.state.shopType === null ? null : this.state.shopType.id,
            "location_type_id": this.state.location === null ? null : this.state.location.id,
            "distribution_channels_id": this.state.distributionChannels
        };

        const products = this.state.selectedProducts.map(id => {
            return this.props.products.products.find(x => x.id === id);
        });
        const distributions = this.state.distributionChannels.map(id => {
            return this.state.shopType.distribution_channels.find(x => x.id === id);
        });

        const type = this.state.shopType === null ? null : {
            "id": this.state.shopType.id,
            "name": this.state.shopType.name,
            "location_type_id": this.state.location.id
        }

        const reducerObj = {
            "products": products,
            "channel_type": this.state.selectedChannel,
            "distribution_channels": distributions,
            "channel_subtype": this.state.selectedSubChannel.id === undefined ? null : { ...this.state.selectedSubChannel, "type": type },
        }

        this.props.saveChannel(postObj, reducerObj);

        this.props.onClose();
    }




    onChannelChange(itemId) {
        const selectedChannel = this.props.types.find(x => x.id === itemId);
        this.setState({
            selectedChannel: selectedChannel,
            selectedSubChannel: { "types": null },
            shopType: null,
            location: null,
            distributionError: '',
            channelError: '',
            subchannelError: '',
            distributionChannels: []
        });
    }

    onChannelSubtypeChange(itemId) {
        const subChannel = this.state.selectedChannel.subtypes.find(x => x.id === itemId);
        const shopType = subChannel.types === null ? null : subChannel.types[0];
        const location = shopType === null ? null : shopType.location_types[0];
        this.setState({
            selectedSubChannel: subChannel,
            shopType: shopType,
            location: location,
            distributionError: '',
            subchannelError: '',
            distributionChannels: []
        });
    }

    onDistributionChannelChange(id) {
        this.setState({
            distributionChannels: id,
            distributionError: ''
        });
    }

    onShopTypeSelection(e) {
        const shopType = this.state.selectedSubChannel.types.find(x => x.id === e.target.value);
        const location = shopType === null ? null : shopType.location_types[0];
        this.setState({
            shopType: shopType,
            location: location,
            distributionChannels: []
        });
    }

    onLocationSelection(e) {
        const location = this.state.shopType.location_types.find(x => x.id === e.target.value);
        this.setState({
            location: location,
            distributionChannels: []
        });
    }

    componentDidMount() {
        console.log(this.props.products.products);
        console.log(this.props.types);
    }

    // onProductChange(id, product_type) {

    //     console.log(id);
    //     console.log(this.state.selectedProducts);
    //     console.log(this.props.products.products.map((x) => x.id));
    //     console.log(product_type);
    //     const filter = this.props.products.products.filter((x, index) => x.id === id[0])
    //     console.log(filter.map((x) => x.product_type));

    //     this.setState({
    //         selectedProducts: id,
    //         productError: '',
    //         productType: filter.map((x) => x.product_type)
    //     }, () => console.log(this.state.productType));
    // }



    onProductChange = (id, type) => {


        const filter = this.props.products.products.filter((x, index) => x.id === id[0])
        type = filter.map((x) => x.product_type)
        this.setState({
            selectedProducts: id,
            productType: type
        }, () => console.log(this.state.productType))
        console.log(id);

    }

    render() {
        const productOptions = this.props.products.products.map((obj) =>

            <Option key={obj.id} value={obj.id}>{obj.name}</Option>

        );

        const channelOptions = this.props.types.map((obj) =>

            <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        );

        const channelSubtypeOptions = this.state.selectedChannel.subtypes === null ? [] :
            this.state.selectedChannel.subtypes.map((obj) => {
                return (obj.name !== "" ? <Option key={obj.id} value={obj.id}>{obj.name}</Option> : null)
            }
            );

        const shopTypeOptions = this.state.selectedSubChannel.types === null ? [] : this.state.selectedSubChannel.types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );



        const locationTypeOptions = this.state.shopType === null ? [] : this.state.shopType.location_types.map((obj) =>
            <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
        );

        const distributionTypeOptions = this.state.shopType === null ? [] : this.state.shopType.distribution_channels.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        );

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Add New Channel</Space>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item key="product" name="product" label="Choose product"
                            validateStatus={this.state.productError !== '' ? 'error' : 'success'}>
                            {/* <Select style={{ width: '100%' }} mode="multiple" placeholder="Select product(s)" onChange={this.onProductChange.bind(this)} >
                                {productOptions}
                            </Select> */}
                            <Select style={{ width: '100%' }} mode="multiple" placeholder="Select product(s)" onChange={(e) => this.onProductChange(e)} >
                                {productOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="channelType" name="channelType" label="Channel"
                            validateStatus={this.state.channelError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Select channel" onChange={this.onChannelChange.bind(this)} >
                                {this.state.productType[0] !== 'Service' ? channelOptions : (
                                    <>
                                        <Option key='3c81ac65-960e-44aa-b752-17808fa31c1f' value='3c81ac65-960e-44aa-b752-17808fa31c1f'>Direct sales</Option>
                                        <Option key='b0cb1000-5a92-47a0-a45b-499c5f580524' value='b0cb1000-5a92-47a0-a45b-499c5f580524'>Agents</Option>
                                        <Option key='d57d1d34-e721-4d46-a5f4-a3f9e7d3a198' value='d57d1d34-e721-4d46-a5f4-a3f9e7d3a198'>Other</Option>
                                    </>
                                )}
                            </Select>
                        </Form.Item>

                        {
                            this.state.selectedChannel.subtypes === null ? null :
                                <Form.Item key="channelSubtype" label="Direct sales channel"
                                    validateStatus={this.state.subchannelError !== '' ? 'error' : 'success'}>
                                    <Select style={{ width: '100%' }} placeholder="Select channel" onChange={this.onChannelSubtypeChange.bind(this)} >
                                        {channelSubtypeOptions}
                                    </Select>
                                </Form.Item>
                        }

                        {
                            this.state.selectedSubChannel.types === null ? null :
                                <Form.Item key="ownShopType" label="Own Shop Type">
                                    <Radio.Group key="groupOne" onChange={this.onShopTypeSelection.bind(this)} value={this.state.shopType === null ? 0 : this.state.shopType.id}>
                                        <Space direction="vertical">
                                            {shopTypeOptions}
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                        }

                        {
                            this.state.shopType === null ? null :
                                this.state.shopType.name === "Physical" ?
                                    <>
                                        <Form.Item key="physicalLocation" label="Physical store location">
                                            <Radio.Group key="groupTwo" onChange={this.onLocationSelection.bind(this)} value={this.state.location === null ? 0 : this.state.location.id}>
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item key="distributionChannel" name="distributionChannel" label="Distribution channels"
                                            validateStatus={this.state.distributionError !== '' ? 'error' : 'success'}>
                                            <Select style={{ width: '100%' }} mode="multiple" value={this.state.distributionChannels} autoClearSearchValue={true} placeholder="Select distribution channel" onChange={this.onDistributionChannelChange.bind(this)} >
                                                {distributionTypeOptions}
                                            </Select>
                                        </Form.Item>
                                    </>
                                    :
                                    <>
                                        <Form.Item key="onlineLocation" label="Online store location">
                                            <Radio.Group key="groupThree" onChange={this.onLocationSelection.bind(this)} value={this.state.location === null ? 0 : this.state.location.id}>
                                                <Space direction="vertical">
                                                    {locationTypeOptions}
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item key="distributionChannel2" name="distributionChannel2" label="Distribution channels"
                                            validateStatus={this.state.distributionError !== '' ? 'error' : 'success'}>
                                            <Select style={{ width: '100%' }} mode="multiple" value={this.state.distributionChannels} autoClearSearchValue={true} placeholder="Select distribution channel" onChange={this.onDistributionChannelChange.bind(this)} >
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

export default connect(mapStateToProps, { saveChannel })(AddChannelModal);

