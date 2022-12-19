import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Popover, Row, Typography, Tag } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveRevenue } from "../../../appStore/actions/revenueStreamActions";
import { getCustomerSegments } from "../../../appStore/actions/customerSegmentAction";
import TooltipComponent from "../Tooltip";

const { Option } = Select;
const { Text } = Typography;


class AddSegmentModal extends Component {
    state = {
        revenue: null,
        price: null,
        priceType: null,
        revenueError: '',
        priceError: '',
        priceTypeError: '',
        segment_names: [],
        names: [],
        popoverType: 'no predict',
        popoverVisibility: false,
        isAichangeName: '',
        isAichangePrice: '',
        isAichangePriceType: '',
        deleteMe: false
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        if (this.state.revenue === null) {
            this.setState({
                revenueError: 'Select revenue stream'
            });
            return;
        } else {
            this.setState({
                revenueError: ''
            });
        }

        if (this.state.price === null) {
            this.setState({
                priceError: 'Select price'
            });
            return;
        } else {
            this.setState({
                priceError: ''
            });
        }

        if (this.state.priceType === null) {
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
            "id": null,
            "business_plan_id": this.props.businessPlan.id,
            "segment": this.props.number,
            "stream_type_id": this.state.revenue,
            "price_type_id": this.state.priceType,
            "segments": this.state.segment_names
        };

        const price = this.props.types.prices.find(x => x.id === this.state.price);
        const reducerObj = {
            "price_category_id": this.state.price,
            "price_category_name": price.title,
            "price_type_id": this.state.priceType,
            "price_type_name": price.types.find(x => x.id === this.state.priceType)?.title,
            "stream_type_id": this.state.revenue,
            "stream_type_name": this.props.types.stream_types.find(x => x.id === this.state.revenue)?.title,
            "segment": this.props.number,
            "segments": this.state.segment_names
        }
        this.props.saveRevenue(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange(id, isAi) {
        this.setState({
            revenue: id,
            isAichangeName: isAi || '1'
        });
    }

    onPriceChange(id, isAi) {
        this.setState({
            price: id,
            priceType: null,
            isAichangePrice: isAi || '1'
        });
    }

    onPriceTypeChange(id, isAi) {
        this.setState({
            priceType: id,
            isAichangePriceType: isAi || '1'
        });
    }

    componentDidMount() {
        this.props.getCustomerSegments(this.props.businessPlan.id);
    }
    onSegmentsChange(value) {
        const segment_names = []
        const { consumers, business, public_bodies_ngo } = this.props.customerSegments
        const selectedSegmentElements = this.props.number === 1 ? consumers : this.props.number === 2 ? business : public_bodies_ngo;
        value.forEach(element => {
            const name = selectedSegmentElements.find(e => e.id === element).segment_name;
            segment_names.push(name)
        })
        this.setState({
            segment_names: segment_names
        });
    }
    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }


    handlePopoverVisibilityChange = (visible) => {

        if (this.props.customerSegments.aiPredict?.revenue === undefined) {

            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = "" //this.generateAIHelpText(this.props.customerSegments.aiPredict.revenue);
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

    generateAIText = () => {
        // to do improve this function
        const path = this.props.customerSegments.aiPredict.revenue;
        let consumersName = '';
        let price = '';
        let priceType = '';
        if (this.props.number === 1) {
            consumersName = path.consumer.map((x) => x.category[0])[0]
            //price = path.consumer.map((x) => x.price)[0] !== undefined && path.consumer.map((x) => x.price[0])[0]
            priceType = path.consumer.map((x) => x.pricingType[0])[0]
        } else if (this.props.number === 2) {
            consumersName = path.business.map((x) => x.category[0])[0]
            //price = path.business.map((x) => x.price)[0] !== undefined && path.business.map((x) => x.price[0])[0]
            priceType = path.business.map((x) => x.pricingType[0])[0]
        } else {
            consumersName = path.publicNgo.map((x) => x.category[0])[0]
            //price = path.publicNgo.map((x) => x.price)[0] !== undefined && path.publicNgo.map((x) => x.price[0])[0]
            priceType = path.publicNgo.map((x) => x.pricingType[0])[0]
        }


        let revenueName = this.props.types.stream_types.find((x) => x?.id === consumersName)
        let priceName = this.props.types?.prices.find((x) => x?.id === priceType).types.find((y) => y.id === price)
        let priceTypeName = this.props.types.prices.find(x => x?.id === priceType)
        if (this.state.revenue === revenueName.id) {
            revenueName = null
        }
        if (this.state.price === priceTypeName.id) {
            priceTypeName = null
        }

        if (this.state.priceType === priceName?.id) {
            priceName = null
        }
        return [revenueName?.title, priceTypeName?.title, priceName?.title]
    }

    filterAIValues = () => {
        // to do improve this function
        if (this.props.customerSegments.aiPredict.revenue) {
            const path = this.props.customerSegments.aiPredict.revenue;
            let consumersName = '';
            let price = '';
            let priceType = '';
            if (this.props.number === 1) {
                consumersName = path.consumer.map((x) => x.category[0])[0]
                //price = path.consumer.map((x) => x.price)
                priceType = path.consumer.map((x) => x.pricingType[0])[0]

            }
            else if (this.props.number === 2) {
                consumersName = path.business.map((x) => x.category[0])[0]
                //price = path.business.map((x) => x.price)
                priceType = path.business.map((x) => x.pricingType[0])[0]

            } else {
                consumersName = path.publicNgo.map((x) => x.category[0])[0]
                //price = path.publicNgo.map((x) => x.price)
                priceType = path.publicNgo.map((x) => x.pricingType[0])[0]
            }
            if (this.state.revenue !== consumersName) {
                this.onNameChange(consumersName, '2')
            }
            if (this.state.price !== priceType) {
                this.onPriceChange(priceType, '2')
            }
            if (this.state.priceType !== price[0] && price[0]) {
                this.onPriceTypeChange(price[0], '2')
            }
            this.hidePopover();
        }
    }
    sortingSegments = () => {

    }

    render() {
        const additionalTitle = this.props.number === 3 ? 'Public bodies & NGO' : this.props.number === 2 ? 'Business' : 'Consumers';
        const streamName = this.state.revenue !== null ? (<>{this.props.types.stream_types.find(x => x.id === this.state.revenue).title}</>) : null
        const Prices = this.state.price !== null ? (<>{this.props?.types?.prices.find(x => x.id === this.state.price).title}</>) : null
        const PriceType = this.state.priceType !== null ? (<>{this.props?.types?.prices.find(x => x.id === this.state.price)?.types.find(x => x.id === this.state.priceType)?.title}</> ): null;

        const consumersNames = this.props.customerSegments.consumers.map((obj) =>
            ({ label: obj.segment_name, value: obj.id })
        ).sort((p1, p2) => (p1.label > p2.label) ? 1 : (p1.label < p2.label) ? -1 : 0);
        const businessNames = this.props.customerSegments.business.map((obj) =>
            ({ label: obj.segment_name, value: obj.id })
        ).sort((p1, p2) => (p1.label > p2.label) ? 1 : (p1.label < p2.label) ? -1 : 0);
        const publicsNames = this.props.customerSegments.public_bodies_ngo.map((obj) =>
            ({ label: obj.segment_name, value: obj.id })
        ).sort((p1, p2) => (p1.label > p2.label) ? 1 : (p1.label < p2.label) ? -1 : 0);

        const segmentTag = (props) => {
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
                                        this.generateAIText()[0] === undefined && this.generateAIText()[1] === undefined && this.generateAIText()[2] === undefined ?
                                            <>
                                                <Text>
                                                    Based on the current information KABADA AI thinks that everything looks good.
                                                </Text>
                                            </>

                                            :
                                            <Text>
                                                Based on your input KABADA AI recommends that you consider adding {this.generateAIText()[0] && ' "Revenue Stream Name": ' + this.generateAIText()[0] + '; for '}

                                                {this.generateAIText()[1] && '"Price": ' + this.generateAIText()[1] + '.'} {this.generateAIText()[2] && '"Type of Pricing"' + this.generateAIText()[2] + '.'}
                                            </Text>
                                    }
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {
                                        this.generateAIText()[0] === undefined && this.generateAIText()[1] === undefined && this.generateAIText()[2] === undefined ?
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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Add revenue stream

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
                        < div >
                            <Button key="customCancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.onOK} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm" onFinish={this.handleOk}>
                        <Form.Item key="name"
                            label={
                                <div>
                                    <Text>Revenue Stream Name</Text>
                                    {/* <TooltipComponent code="revstrem1" type="text" /> */}
                                </div>}
                            validateStatus={this.state.revenueError !== '' ? 'error' : 'success'}
                        >
                            <Select
                                value={streamName}
                                style={{ width: '100%', background: '#BAE7FF' }}
                                placeholder="Select revenue stream"
                                onChange={this.onNameChange.bind(this)}
                                className={this.state.isAichangeName === '2' && "aicolor .ant-select-selector"}
                            >
                                {this.props.types.stream_types.map((item) => (
                                    <Option key={item.id} value={item.id}>{item.title} <TooltipComponent code={item.tooltipCode} type="text" /></Option>
                                ))}
                            </Select>

                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: "10px" }} key="price" //Prices
                            label={
                                <div>
                                    <Text>Prices</Text>
                                    {/* <TooltipComponent code="revstrem2" type="text" /> */}
                                </div>}
                            validateStatus={this.state.priceError !== '' ? 'error' : 'success'}>
                            <Select
                                value={Prices}
                                style={{ width: '100%' }}
                                placeholder="Select price"
                                onChange={this.onPriceChange.bind(this)}
                                className={this.state.isAichangePrice === '2' && "aicolor .ant-select-selector"}
                            >
                                {this.props?.types?.prices.map((item) => (
                                    <Option key={item.id} value={item.id}>{item.title} <TooltipComponent code={item.tooltipCode} type="text" /></Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingLeft: "10px" }} key="type"
                            label={
                                <div>
                                    <Text>Types of pricing</Text>
                                    {/* <TooltipComponent code="revstrem3" type="text" /> */}
                                </div>}
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Choose type"
                                value={PriceType}
                                disabled={this.state.price === null ? true : false}
                                onChange={this.onPriceTypeChange.bind(this)}
                                className={this.state.isAichangePriceType === '2' && "aicolor .ant-select-selector"}
                            >
                                {this.props?.types?.prices.find(x => x.id === this.state.price)?.types?.map((item) => (
                                    <Option key={item.id} value={item.id}>{item.title} <TooltipComponent code={item.tooltipCode} type="text" /></Option>
                                ))}
                            </Select>

                        </Form.Item>


                        <Form.Item key="names" name="names"
                            label={<div><Text>Segments</Text><TooltipComponent code="revstrem4" type="text" /></div>}
                        >
                            <Select style={{ width: '100%' }}
                                placeholder="Choose segment"
                                mode="multiple"
                                onChange={this.onSegmentsChange.bind(this)}
                                tagRender={segmentTag}
                                options={additionalTitle === "Consumers" ? consumersNames : additionalTitle === "Business" ? businessNames : additionalTitle === "Public bodies & NGO" && publicsNames}
                            />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        types: state.revenueTypes,
        customerSegments: state.customerSegments,
    };
}

export default connect(mapStateToProps, { saveRevenue, getCustomerSegments })(AddSegmentModal);

