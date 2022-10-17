import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Popover, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateRevenue, getStreamTypes, getRevenues } from "../../../appStore/actions/revenueStreamActions";
import { getCustomerSegments } from "../../../appStore/actions/customerSegmentAction";
import TooltipComponent from "../Tooltip";

const { Option } = Select;
const { Text } = Typography;

class EditSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenueID: this.props.item.stream_type_id,
            revenueTitle: this.props.item.stream_type_name,
            PriceId: this.props.item.price_category_id,
            priceTitle: this.props.item.price_category_name,
            priceTypeId: this.props.item.price_type_id,
            priceTypeTitle: this.props.item.price_type_name,
            priceTypeError: '',
            names: this.props.item.segments,
            aIObject: this.props.AIObject,
            isAichangeName: '',
            isAichangePrice: '',
            isAichangePriceType: '',
            popoverVisibility: false,
            popoverType: 'no predict',
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }
    onOK = () => {
        const price = this.props.types.prices.find(x => x.id === this.state.PriceId);
        console.log('Price type id:' + this.state.priceTypeTitle)
        console.log({ price })
        if (this.state.priceTypeId === null) {
            this.setState({
                priceTypeError: 'Select price type'
            });
            return;
        } else {
            this.setState({
                priceTypeError: ''
            });
        }

        const postObj = {
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlanId,
            "segment": this.props.item.segment,
            "stream_type_id": this.state.revenueID,
            "price_type_id": this.state.priceTypeId,
            "segments": this.state.names
        };

        console.log('Price type id:' + this.state.priceTypeId)
        console.log('Revenue id:' + this.props.item.stream_type_id)
        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "price_category_id": this.state.PriceId,
            "price_category_name": this.props.types?.prices.find((x) => x.id === this.state.priceId)?.title, //this.state.priceTitle, //Prices
            "price_type_id": this.state.priceTypeId,
            "price_type_name": this.state.priceTypeTitle, //Types of pricing
            "stream_type_id": this.state.revenueID,
            "stream_type_name": this.props.types.stream_types.find(x => x.id === this.state.revenueID)?.title,
            "segment": this.props.item.segment,
            "segments": this.state.names
        }

        //console.log('POST obj:' + JSON.stringify(postObj))
        console.log(this.props.types.stream_types.find(x => x.id === this.state.revenueID))
        console.log(this.state.revenueID)

        this.props.updateRevenue(postObj, reducerObj)
        console.info({ postObj, reducerObj })
        this.props.onClose();
    }

    onNameChange(typeId, isAi, title) {
        this.setState({
            revenueID: typeId,
            revenueTitle: title ?? typeId,
            isAichangeName: isAi || '1'
        });
        console.log(this.state.revenueID, this.state.revenueTitle)
        console.log(this.props.types.stream_types.find(x => x.id === this.state.revenueID))
    }

    onPriceChange(id, isAi, title) {
        console.log({ id, isAi, title })
        this.setState({
            priceId: id,
            priceTitle: title ?? id,
            isAichangePrice: isAi || '1',
            priceTypeId: null,
            priceTypeTitle: null

        });
        console.log(this.state.priceId, this.state.priceTitle)
        console.log(this.props.types?.prices.find((x) => x.id === this.state.priceId).title)
    }

    onPriceTypeChange(typeId, isAi, title) {

        this.setState({
            priceTypeId: typeId,
            priceTypeTitle: typeId,
            isAichangePriceType: isAi || '1'
        });
        console.log(this.state.priceTypeId, this.state.priceTypeTitle)

    }
    onNgoTypeChange(value) {
        this.setState({
            names: value
        });
    }

    componentDidMount() {
        this.props.getRevenues(this.props.businessPlanId);
        this.props.getStreamTypes();
        this.setState({
            // revenue: { id: this.props.item.stream_type_id, title: this.props.item.stream_type_name },
            // price: { id: this.props.item.price_category_id, title: this.props.item.price_category_name },
            // priceType: { id: this.props.item.price_type_id, title: this.props.item.price_type_name },
            priceId: this.props.item.price_category_id

        })
        console.log(this.props.item.price_category_id)
        console.log(this.state.priceId)
        console.log(this.props.item.price_category_name)
        console.log(this.state.priceTitle)

        this.props.getCustomerSegments(this.props.businessPlan.id);
        this.setState({
            segment_name: this.props.customerSegments.consumers.filter((x, index) => x.segment_name != null)
        })
    }

    handlePopoverVisibilityChange = (visible) => {

        if (this.props.customerSegments.aiPredict?.revenue === undefined) {

            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = "";
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

    generateAIText = () => {
        // to do: improve this function
        const path = this.props.one?.revenue;
        let consumersName = '';
        let price = '';
        let priceType = '';
        if (this.props.item.segment === 1) {
            consumersName = path?.consumer.map((x) => x.category[0])[0]

            // price = path?.consumer.map((x) => x.price[0])
            priceType = path?.consumer.map((x) => x.pricingType[0])[0]

        } else if (this.props.item.segment === 2) {
            consumersName = path?.business.map((x) => x.category[0])[0]
            //price = path?.business.map((x) => x.price[0])
            priceType = path?.business.map((x) => x.pricingType[0])[0]

        } else {
            consumersName = path?.publicNgo.map((x) => x.category[0])[0]
            //price = path?.publicNgo.map((x) => x.price[0])
            priceType = path?.publicNgo.map((x) => x.pricingType[0])[0]
        }


        let revenueName = consumersName && this.props?.types.stream_types?.find((x) => x.id === consumersName)

        // let priceName = priceType && this.props.types?.prices.find((x) => x?.id === priceType[0])
        // const selectedPriceType = this.props?.types?.prices.find(x => x.id === priceName?.id)?.types
        let priceTypeName = priceType && this.props.types.prices.find(x => x?.id === priceType)

        if (this.state.revenueID == revenueName?.id) {
            revenueName = null
        }
        // if (this.state.PriceTypeId === priceName?.id) {
        //     priceName = null
        // }
        if (this.state.PriceId === priceTypeName?.id) {
            priceTypeName = null
        }

        return [revenueName?.title, priceTypeName?.title]
    }

    filterAIValues = () => {
        console.info(this.props.customerSegments.aiPredict.revenue.consumer)
        console.info(this.props.number)
        if (this.props.customerSegments.aiPredict.revenue.consumer) {
            const path = this.props.customerSegments.aiPredict.revenue;
            let consumersName = '';
            let price = '';
            let priceType = '';
            if (this.props.item.segment === 1) {
                consumersName = path.consumer.map((x) => x.category[0])[0]
                //price = path.consumer.map((x) => x.price[0])
                priceType = path.consumer.map((x) => x.pricingType[0])[0]
                console.log(priceType)
            } else if (this.props.item.segment === 2) {
                consumersName = path.business.map((x) => x.category[0])[0]
                //price = path.business.map((x) => x.price[0])
                priceType = path.business.map((x) => x.pricingType[0])[0]

            } else {
                consumersName = path.publicNgo?.map((x) => x.category[0])[0]
                //price = path.publicNgo?.map((x) => x.price[0])
                priceType = path.publicNgo?.map((x) => x.pricingType[0])[0]
            }

            if (consumersName || priceType) {
                //console.info({ consumersName, priceType, price })
                if (this.state.revenueID !== consumersName) {
                    this.onNameChange(consumersName, '2', this.generateAIText()[0])
                }
                if (this.state.priceTypeId !== priceType) {
                    this.onPriceChange(priceType, '2', this.generateAIText()[1])
                }
                // if (this.state.priceTypeId !== price[0]) {
                //     this.onPriceTypeChange(price[0], '2', this.generateAIText()[2])
                //     console.info(price[0])
                // }
            }

            this.hidePopover();
        }
    }

    render() {
        const additionalTitle = this.props.item.segment === 3 ? 'Public bodies & NGO' : this.props.item.segment === 2 ? 'Business' : 'Consumers';
        const streamOptions = this.props.types.stream_types.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const priceOptions = this.props.types?.prices.map((obj) =>
            ({ label: obj.title, value: obj.id })
        );

        const priceTypeOptions = this.state.priceId === null ? [] :
            this.props?.types?.prices.find(x => x.id === this.state.priceId)?.types?.map((obj) =>
                ({ label: obj.title, value: obj.id })
            );

        const consumersNames = this.props.customerSegments.consumers.map((obj) =>
            <Option key={obj.id} value={obj.segment_name}>{obj.segment_name}</Option>
        )

        const businessNames = this.props.customerSegments.business.map((obj) =>
            <Option key={obj.segment_name} value={obj.segment_name}>{obj.segment_name}</Option>
        )

        const publicsNames = this.props.customerSegments.public_bodies_ngo.map((obj) =>
            <Option key={obj.segment_name} value={obj.segment_name}>{obj.segment_name}</Option>
        )
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
                                        this.generateAIText()[0] === undefined && this.generateAIText()[1] === undefined ?

                                            <>
                                                <Text>
                                                    Based on the current information KABADA AI thinks that everything looks good.

                                                </Text>
                                            </>

                                            :
                                            <Text>

                                                Based on your input KABADA AI recommends that you consider adding
                                                {this.generateAIText()[0] && ' "Revenue Stream Name" : ' + this.generateAIText()[0] + ';'}
                                                {this.generateAIText()[1] != undefined && '" Types of pricing"' + this.generateAIText()[1] + '.'}

                                            </Text>
                                    }
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {
                                        this.generateAIText()[0] === undefined && this.generateAIText()[1] === undefined ?
                                            <Button onClick={this.hidePopover}>Cancel</Button>
                                            :
                                            <>
                                                <Button type="primary" onClick={this.filterAIValues}>Add</Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                            </>
                                    }

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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Edit revenue stream {additionalTitle}

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



                    </Space>}

                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Save</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" onFinish={this.handleOk}>
                        <Form.Item key="name" 
                            label={<Space><Text>Revenue Stream Name</Text><TooltipComponent code="revstrem1" type="text" /></Space>}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select revenue stream"
                                options={streamOptions}
                                defaultValue={this.state.revenueTitle}
                                value={this.state.revenueTitle}
                                onChange={(e) => this.onNameChange(e)}
                                className={this.state.isAichangeName === '2' && "aicolor .ant-select-selector"}
                            />
                        </Form.Item>

                        <Form.Item 
                            style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: "10px" }} 
                            key="price" 
                            label={<Space size='small'><Text>Prices</Text><TooltipComponent code="revstrem2" type="text"/></Space>}
                        >
                            <Select
                                style={{ width: '100%' }}
                                options={priceOptions}
                                placeholder="Select price"
                                defaultValue={this.state.priceTitle}
                                value={this.state.priceTitle}
                                onChange={(e) => this.onPriceChange(e)}
                                //onChange={this.onPriceChange.bind(this)}
                                className={this.state.isAichangePrice === '2' && "aicolor .ant-select-selector"}
                            />
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingLeft: "10px" }} key="type" 
                            label={<Space><Text>Types of pricing</Text><TooltipComponent code="revstrem3" type="text" /></Space>}
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select
                                style={{ width: '100%' }}
                                options={priceTypeOptions}
                                placeholder="Choose type"
                                defaultValue={this.state.priceTypeTitle}
                                value={this.state.priceTypeTitle}
                                onChange={(e) => this.onPriceTypeChange(e)}
                                className={this.state.isAichangePriceType === '2' && "aicolor .ant-select-selector"}
                            />
                        </Form.Item>

                        <Form.Item key="Segments" 
                            label={<Space><Text>Segments</Text><TooltipComponent code="revstrem4" type="text" /></Space>}
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Choose segment"
                                onChange={this.onNgoTypeChange.bind(this)}
                                mode="multiple"
                                defaultValue={this.state.names}
                                value={this.state.names}
                            >
                                {additionalTitle === "Consumers" ? consumersNames : additionalTitle === "Business" ? businessNames : additionalTitle === "Public bodies & NGO" && publicsNames}
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        revenues: state.revenues,
        types: state.revenueTypes,
        customerSegments: state.customerSegments,
        businessPlan: state.selectedBusinessPlan,
        one: state.resourcesList?.aiPredict,
    };
}

export default connect(mapStateToProps, { updateRevenue, getStreamTypes, getRevenues, getCustomerSegments })(EditSegmentModal);