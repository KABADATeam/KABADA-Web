import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Radio, Tag, Popover, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import '../../../css/AIelements.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveChannel } from "../../../appStore/actions/channelActions";

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

class AddChannelModal extends Component {
    state = {
        distributionError: '',
        productError: '',
        channelError: '',
        subchannelError: '',
        productType: '',
        popoverVisibility: false,
        popoverType: 'no predict',
        popoverTextObject: [],

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
            "distribution_channels_id": this.state.distributionChannels.map(i => i.id)
        };

        const products = this.state.selectedProducts.map(id => {
            return this.props.products.products.find(x => x.id === id);
        });
        const distributions = this.state.distributionChannels.map(obj => ({
            id: obj.id, name: obj.title
        }))
        console.log(this.state.distributionChannels);
        console.log(distributions)
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
        console.log(reducerObj)
        this.props.saveChannel(postObj, reducerObj);

        this.props.onClose();
    }




    onChannelChange(itemId) {
        const selectedChannel = this.props.types.find(x => x.id === itemId);
        const modifySelectedChannel = { ...selectedChannel, tag: 0 }
        this.setState({
            selectedChannel: modifySelectedChannel,
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
        const modifySubChannel = { ...subChannel, tag: 0 };
        const shopType = subChannel.types === null ? null : { ...subChannel.types[0], tag: 0 };
        const location = shopType === null ? null : { ...shopType.location_types[0], tag: 0 };
        this.setState({
            selectedSubChannel: modifySubChannel,
            shopType: shopType,
            location: location,
            distributionError: '',
            subchannelError: '',
            distributionChannels: []
        });
    }
    addSelectedValue = (value, state, segment_type) => {
        const resultArray = [];
        console.log(value);
        console.log(state);
        console.log(segment_type);
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
        const distribution_array = (subtypes.find(x => x.name === "Own shop").types).find(x => x.id === this.state.shopType.id).distribution_channels
        const distribution_values = this.addSelectedValue(value, this.state.distributionChannels, distribution_array);
        this.setState({
            distributionChannels: distribution_values,
            distributionError: ''
        });
    }

    onShopTypeSelection(e) {
        const shopType = { ...this.state.selectedSubChannel.types.find(x => x.id === e.target.value), tag: 0 };
        console.log(shopType);
        const location = shopType === null ? null : { ...shopType.location_types[0], tag: 0 };
        console.log(location)
        this.setState({
            shopType: shopType,
            location: location,
            distributionChannels: []
        });
    }

    onLocationSelection(e) {
        const location = { ...this.state.shopType.location_types.find(x => x.id === e.target.value), tag: 0 };
        this.setState({
            location: location,
            distributionChannels: []
        });
    }

    handlePopoverVisibilityChange = (visible) => {
        if (this.props.channels.aiChannelPredict === null) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = this.generateAIHelpText(this.props.channels.aiChannelPredict, this.props.types);
            if (text === undefined) {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'no predict',
                })
            } else {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'is predict',
                    popoverTextObject: text
                })
            }
        }
    }

    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }

    componentDidMount() {
        // console.log(this.props.products.products);
        // console.log(this.props.types);
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
        })
    }

    compareArray = (arrayAI, arrayState) => {
        const newArray = []
        for (var i in arrayAI) {
            if (arrayState.indexOf(arrayAI[i]) === -1) {
                newArray.push(arrayAI[i]);
            }
        }
        return newArray;
    }

    onAIButtonClick = () => {
        const obj = this.props.channels.aiChannelPredict;
        const aiObject = obj.find(el => el.id === null);
        const channel_type = this.state.selectedChannel.id !== undefined ? this.state.selectedChannel.id : null;
        const ai_channel_type = aiObject.channelType[0]
        let new_channel_type_obj;
        let new_channel_subtype_obj;
        let new_shopType;
        let new_location;
        const new_distribution_channel_array = [...this.state.distributionChannels];
        if (channel_type !== ai_channel_type) {
            const channel_obj = this.props.types.find(x => x.id === ai_channel_type);
            new_channel_type_obj = { ...channel_obj, tag: 1 }
        } else {
            new_channel_type_obj = this.state.selectedChannel
        }
        if (new_channel_type_obj.name === 'Direct sales') {
            const ai_channel_subtype = aiObject.channelSubtype[0];
            const channel_subtype_array = this.props.types.find(x => x.id === ai_channel_type).subtypes;
            const channel_subtype_obj = channel_subtype_array.find(x => x.id === ai_channel_subtype);
            new_channel_subtype_obj = { ...channel_subtype_obj, tag: 1 }
            if (channel_subtype_obj.name === 'Own shop') {
                const ai_shopType = channel_subtype_obj.types.find(x => x.id === aiObject.subtypeType[0]);
                const shopTypeWithTag = this.state.shopType !== null ? { ...this.state.shopType, tag: 0 } : null;
                if (shopTypeWithTag === null) {
                    const ai_shopTypeWithTag = { ...ai_shopType, tag: 1 };
                    const ai_location = ai_shopTypeWithTag.location_types.find(x => x.id === aiObject.locationType[0]);
                    const ai_locationWithTag = { ...ai_location, tag: 1 };
                    const distribution_channels_ai = aiObject.distributionChannels;
                    const distribution_channels = this.state.distributionChannels === null ? [] : this.state.distributionChannels.map(e => e.id);
                    const distribution_channels_predict = this.compareArray(distribution_channels_ai, distribution_channels);
                    for (let i in distribution_channels_predict) {
                        const title = ai_shopType.distribution_channels.find(x => x.id === distribution_channels_predict[i])
                        if (title !== undefined) {
                            const new_distribution_channel_obj = {
                                id: distribution_channels_predict[i],
                                title: title.name,
                                tag: 1
                            }
                            new_distribution_channel_array.push(new_distribution_channel_obj)
                        }
                    }
                    new_shopType = ai_shopTypeWithTag;
                    new_location = ai_locationWithTag;
                } else if (shopTypeWithTag.id !== ai_shopType.id) {
                    new_channel_subtype_obj = { ...channel_subtype_obj, tag: 0 };
                    const ai_shopTypeWithTag = { ...ai_shopType, tag: 1 };
                    const ai_location = ai_shopTypeWithTag.location_types.find(x => x.id === aiObject.locationType[0]);
                    const ai_locationWithTag = { ...ai_location, tag: 1 };
                    const distribution_channels_ai = aiObject.distributionChannels;
                    const distribution_channels = this.state.distributionChannels === null ? [] : this.state.distributionChannels.map(e => e.id);
                    const distribution_channels_predict = this.compareArray(distribution_channels_ai, distribution_channels);
                    for (let i in distribution_channels_predict) {
                        const title = ai_shopType.distribution_channels.find(x => x.id === distribution_channels_predict[i])

                        const new_distribution_channel_obj = {
                            id: distribution_channels_predict[i],
                            title: title !== undefined ? title.name : undefined,
                            tag: 1
                        }
                        console.log(new_distribution_channel_obj)
                        if (new_distribution_channel_obj.title !== undefined) {
                            new_distribution_channel_array.push(new_distribution_channel_obj)
                        }
                    }
                    new_shopType = ai_shopTypeWithTag;
                    new_location = ai_locationWithTag;
                } else if (shopTypeWithTag.id === ai_shopType.id) {
                    new_channel_subtype_obj = { ...channel_subtype_obj, tag: 0 };
                    const ai_shopTypeWithTag = { ...ai_shopType, tag: 0 };
                    const ai_location = ai_shopTypeWithTag.location_types.find(x => x.id === aiObject.locationType[0]);
                    const ai_locationWithTag = this.state.location.id === aiObject.locationType[0] ? { ...ai_location, tag: 0 } : { ...ai_location, tag: 1 };
                    const distribution_channels_ai = aiObject.distributionChannels;
                    const distribution_channels = this.state.distributionChannels === null ? [] : this.state.distributionChannels.map(e => e.id);
                    const distribution_channels_predict = this.compareArray(distribution_channels_ai, distribution_channels);
                    console.log(distribution_channels_predict)
                    for (let i in distribution_channels_predict) {
                        const title = ai_shopType.distribution_channels.find(x => x.id === distribution_channels_predict[i])

                        const new_distribution_channel_obj = {
                            id: distribution_channels_predict[i],
                            title: title !== undefined ? title.name : undefined,
                            tag: 1
                        }
                        console.log(new_distribution_channel_obj)
                        if (new_distribution_channel_obj.title !== undefined) {
                            new_distribution_channel_array.push(new_distribution_channel_obj)
                        }
                    }
                    new_shopType = ai_shopTypeWithTag;
                    new_location = ai_locationWithTag;
                }
            } else {
                new_shopType = null;
                new_location = null;
            }
        }
        this.setState({
            selectedChannel: new_channel_type_obj,
            selectedSubChannel: new_channel_subtype_obj,
            shopType: new_shopType,
            location: new_location,
            distributionError: '',
            channelError: '',
            subchannelError: '',
            distributionChannels: new_distribution_channel_array
        })
        this.hidePopover();
    }

    generateAIHelpText = (predictsObj, types) => {
        const aiHintTextObject = [];
        const selectedItem = {
            'subtypeType': this.state.shopType,
            'locationType': this.state.location,
            'channelType': this.state.selectedChannel,
            'channelSubtype': this.state.selectedSubChannel,
            'distributionChannels': this.state.distributionChannels,
        }
        const channelSubType = types.find(obj => obj.name === 'Direct sales').subtypes;
        const shopType = channelSubType.find(obj => obj.name === 'Own shop').types;
        if (predictsObj !== undefined) {
            const predictObj = predictsObj.find(s => s.id === null);
            if (predictObj !== undefined) {
                const predictProperties = Object.getOwnPropertyNames(predictsObj.find(s => s.id === null));
                const filteredPredictProperties = predictProperties.filter(p => p !== 'id');
                for (const property of filteredPredictProperties) {
                    let selectedItemPropertyValues;
                    if (property === 'channelSubtype' || property === 'channelType' || property === 'distributionChannels') {
                        const selectedItemPropertyValuesObj = Object.getOwnPropertyDescriptor(selectedItem, property).value;
                        selectedItemPropertyValues = selectedItemPropertyValuesObj.types === null ? []
                            : selectedItemPropertyValuesObj.subtypes === null ? []
                                : selectedItemPropertyValuesObj.map(s => s.id);
                    } else if (property === 'subtypeType' || property === 'locationType') {
                        const selectedItemPropertyValuesObj = Object.getOwnPropertyDescriptor(selectedItem, property).value === null ? [] : Object.getOwnPropertyDescriptor(selectedItem, property).value;
                        selectedItemPropertyValues = selectedItemPropertyValuesObj === null ? [] : selectedItemPropertyValuesObj.map(s => s.id);
                    }
                    const predictObjPropertyValues = Object.getOwnPropertyDescriptor(predictObj, property).value;
                    const propertyType = property === 'channelType' ? types.map((obj) => ({ id: obj.id, title: obj.name }))
                        : property === 'channelSubtype' ? (types.find(obj => obj.name === 'Direct sales').subtypes).map(obj => ({ id: obj.id, title: obj.name }))
                            : property === 'subtypeType' ? (channelSubType.find((obj) => obj.name === 'Own shop').types).map(obj => ({ id: obj.id, title: obj.name }))
                                : property === 'locationType' ? (shopType.find(obj => obj.id === predictObj.subtypeType[0])).location_types.map(obj => ({ id: obj.id, title: obj.name }))
                                    : property === 'distributionChannels' ? (shopType.find(obj => obj.id === predictObj.subtypeType[0])).distribution_channels.map(obj => ({ id: obj.id, title: obj.name }))
                                        : [];
                    const comparePropertiesValues = this.compareArray(predictObjPropertyValues, selectedItemPropertyValues);
                    let propertiesValuesString = '';
                    if (comparePropertiesValues.length > 1) {
                        for (var i = 0; i < comparePropertiesValues.length; i++) {
                            const propertyTypeTitle = propertyType.find(t => t.id === comparePropertiesValues[i]);
                            if (propertyTypeTitle !== undefined) {
                                propertiesValuesString += i === predictObjPropertyValues.length - 1 ? propertyTypeTitle.title + '' : propertyTypeTitle.title + ', ';
                            }
                        }
                        const new_obj = {
                            type_title: property === 'channelType' ? 'Channel' : property === 'channelSubtype' ? 'Direct sales channel' : property === 'subtypeType' ? 'Own shop type'
                                : property === 'locationType' ? 'Store location' : property === 'distributionChannels' ? 'Distribution channels' : null,
                            text: propertiesValuesString
                        }
                        aiHintTextObject.push(new_obj);
                    } else if (comparePropertiesValues.length === 1) {
                        const propertyTypeTitle = propertyType.find(t => t.id === comparePropertiesValues[0]);
                        propertiesValuesString = propertyTypeTitle.title + '';
                        const new_obj = {
                            type_title: property === 'channelType' ? 'Channel' : property === 'channelSubtype' ? 'Direct sales channel' : property === 'subtypeType' ? 'Own shop type'
                                : property === 'locationType' ? 'Store location' : property === 'distributionChannels' ? 'Distribution channels' : null,
                            text: propertiesValuesString
                        }
                        aiHintTextObject.push(new_obj);
                    } else {
                        this.setState({
                            popoverType: 'no predict',
                        })
                    }
                }
                return aiHintTextObject
            } else {
                this.setState({
                    popoverType: 'no predict',
                })
            }

        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }

    }

    getShopTypeColor = (id) => {
        const element = this.state.shopType.id === id ? this.state.shopType : undefined;
        if (element === undefined) {
            let color = "white"
            return color
        } else {
            if (element.tag === 0) {
                let color = "#FFFFFF"
                return color
            } else if (element.tag === 1) {
                let color = "#BAE7FF"
                return color
            } else {
                let color = "#FFFFFF"
                return color
            }
        }
    }

    getLocationColor = (id) => {
        const element = this.state.location.id === id ? this.state.location : undefined;
        if (element === undefined) {
            let color = "white"
            return color
        } else {
            if (element.tag === 0) {
                let color = "#FFFFFF"
                return color
            } else if (element.tag === 1) {
                let color = "#BAE7FF"
                return color
            } else {
                let color = "#FFFFFF"
                return color
            }
        }
    }

    render() {
        const productOptions = this.props.products.products.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const physicalProdChannelOptions = this.props.types.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const serviceProdChannelOptions = serviceChannelTypeData.map((obj) =>
            ({ label: obj.name, value: obj.id })
        )
        const channelSubtypeOptions = this.state.selectedChannel.subtypes === null ? [] :
            this.state.selectedChannel.subtypes.filter((obj) => obj.name !== "").map((obj) => ({ label: obj.name, value: obj.id }));
        const shopTypeOptions = this.state.selectedSubChannel.types === null ? [] : this.state.selectedSubChannel.types.map((obj) =>
            <Radio key={obj.id} value={obj.id} style={{ backgroundColor: this.getShopTypeColor(obj.id) }}>{obj.name}</Radio>
        );
        const locationTypeOptions = this.state.shopType === null ? [] : this.state.shopType.location_types.map((obj) =>
            <Radio key={obj.id} value={obj.id} style={{ backgroundColor: this.getLocationColor(obj.id) }}>{obj.name}</Radio>
        );
        const distributionTypeOptions = this.state.shopType === null ? [] : this.state.shopType.distribution_channels.map((obj) =>
            ({ label: obj.name, value: obj.id })
        );
        const channelTypeValue = this.state.selectedChannel.id !== undefined ? this.state.selectedChannel.id : null;
        const channelSubTypeValue = this.state.selectedSubChannel.id !== undefined ? this.state.selectedSubChannel.id : null;
        const distributionChannelValue = this.state.distributionChannels !== null ? this.state.distributionChannels.map(e => e.id) : []
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
            const tagColor = this.state.distributionChannels !== null ? this.state.distributionChannels.find(t => t.id === value) : null
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
            } else if (tagColor === null) {
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
        const popoverContent = (
            <>
                {
                    this.state.popoverType === 'no predict' ?
                        <>
                            <Row>
                                <Text>
                                    Based on the current information KABADA AI did not have any suggestions.
                                </Text>
                            </Row>
                            <Row style={{ marginTop: '12px' }}>
                                <Button onClick={this.hidePopover}>Cancel</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Row>
                                    {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Text>Based on the current information KABADA AI thinks that everything looks good.</Text>
                                            :
                                            <Text>
                                                Based on your input KABADA AI recommends that you consider adding {this.state.popoverTextObject.map((e, index) => {
                                                    if (index + 1 === this.state.popoverTextObject.length) {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text};</Text>
                                                        )
                                                    }
                                                })}.
                                            </Text>
                                    }
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Button onClick={this.hidePopover}>Cancel</Button>
                                            :
                                            <>
                                                <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                            </>
                                    }
                                    {/* <Text>Test</Text>
                                    <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                    <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button> */}
                                </Row>
                            </Row>
                        </>
                }
            </>
        )
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Add New Channel
                        <Popover
                            placement='topLeft'
                            title='AI Hint'
                            content={popoverContent}
                            overlayStyle={{ width: "328px" }}
                            trigger="click"
                            visible={this.state.popoverVisibility}
                            onVisibleChange={this.handlePopoverVisibilityChange}
                        >
                            <Button
                                icon=
                                {<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <rect width="28" height="28" rx="14" fill="#1990FE" />
                                    <path d="M22.7077 11.9719C22.1277 11.9719 21.9249 12.3878 21.876 12.4719H20.7385V9.5C20.7385 8.11937 19.6369 7 18.2769 7H9.41538C8.05538 7 6.95385 8.11937 6.95385 9.5V12.4719H5.81631C5.76738 12.4156 5.56462 11.9719 4.98462 11.9719C4.45969 11.9719 4 12.4006 4 12.9719C4 13.5438 4.46062 13.9437 4.98462 13.9437C5.56462 13.9437 5.76738 13.5281 5.81631 13.4719H6.95385V17.4438C6.95385 18.8244 8.056 19.9438 9.41538 19.9438L10.8923 19.9719V22.5966C10.8923 22.7281 10.9754 23 11.2615 23C11.3391 23 11.4153 22.9747 11.4799 22.9272L15.3231 19.9719L18.2769 19.9721C19.6363 19.9721 20.7385 18.8527 20.7385 17.4721V13.4719H21.8763C21.9262 13.5844 22.1292 13.9719 22.7077 13.9719C23.2326 13.9719 23.6923 13.5431 23.6923 13C23.6923 12.4281 23.2338 11.9719 22.7077 11.9719ZM18.7692 15C18.7692 15.5522 18.3283 16 17.7846 16H9.90769C9.36308 16 8.92308 15.5531 8.92308 15V11C8.92308 10.4478 9.364 10 9.90769 10H17.7846C18.3283 10 18.7692 10.4478 18.7692 11V15ZM10.8923 11.9719C10.3486 11.9719 9.90769 12.4197 9.90769 12.9719C9.90769 13.5241 10.3486 13.9719 10.8923 13.9719C11.436 13.9719 11.8769 13.5241 11.8769 12.9719C11.8769 12.4469 11.4369 11.9719 10.8923 11.9719ZM16.8 11.9719C16.2563 11.9719 15.8154 12.4197 15.8154 12.9719C15.8154 13.5241 16.2563 13.9719 16.8 13.9719C17.3437 13.9719 17.7846 13.5241 17.7846 12.9719C17.7846 12.4469 17.3446 11.9719 16.8 11.9719Z" fill="white" />
                                </svg>
                                }
                                type="link"
                            />
                        </Popover>
                    </Space>
                    }
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
                        <Form.Item
                            key="product"
                            name="product"
                            label="Choose product"
                            validateStatus={this.state.productError !== '' ? 'error' : 'success'}
                        >
                            <Select
                                style={{ width: '100%' }}
                                mode="multiple"
                                placeholder="Select product(s)"
                                onChange={(e) => this.onProductChange(e)}
                                tagRender={productTag}
                                options={productOptions}
                            />
                        </Form.Item>

                        <Form.Item
                            key="channelType"
                            label="Channel"
                            validateStatus={this.state.channelError !== '' ? 'error' : 'success'}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select channel"
                                className={this.state.selectedChannel.tag === 1 ? "aicolor .ant-select-selector" : "simplecolor .ant-select-selector"}
                                value={channelTypeValue}
                                onChange={this.onChannelChange.bind(this)}
                                options={this.state.productType[0] === 'Service' ? serviceProdChannelOptions : physicalProdChannelOptions}
                            />
                        </Form.Item>

                        {
                            this.state.selectedChannel.subtypes === null ? null :
                                <Form.Item
                                    key="channelSubtype"
                                    label="Direct sales channel"
                                    validateStatus={this.state.subchannelError !== '' ? 'error' : 'success'}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select channel"
                                        onChange={this.onChannelSubtypeChange.bind(this)}
                                        className={this.state.selectedSubChannel.tag === 1 ? "aicolor .ant-select-selector" : "simplecolor .ant-select-selector"}
                                        value={channelSubTypeValue}
                                        options={channelSubtypeOptions}
                                    />
                                </Form.Item>
                        }

                        {
                            this.state.selectedSubChannel.types === null ? null :
                                <Form.Item key="ownShopType" label="Own Shop Type">
                                    <Radio.Group
                                        key="groupOne"
                                        onChange={this.onShopTypeSelection.bind(this)}
                                        value={this.state.shopType === null ? 0 : this.state.shopType.id}
                                    >
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

                                        <Form.Item
                                            key="distributionChannel"
                                            label="Distribution channels"
                                            validateStatus={this.state.distributionError !== '' ? 'error' : 'success'}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                mode="multiple"
                                                value={distributionChannelValue}
                                                placeholder="Select distribution channel"
                                                onChange={this.onDistributionChannelChange.bind(this)}
                                                tagRender={distributionTag}
                                                options={distributionTypeOptions}
                                            />
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

                                        <Form.Item
                                            key="distributionChannel2"
                                            label="Distribution channels"
                                            validateStatus={this.state.distributionError !== '' ? 'error' : 'success'}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                mode="multiple"
                                                value={distributionChannelValue}
                                                placeholder="Select distribution channel"
                                                onChange={this.onDistributionChannelChange.bind(this)}
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
        products: state.products,
        channels: state.channels
    };
}

export default connect(mapStateToProps, { saveChannel })(AddChannelModal);

