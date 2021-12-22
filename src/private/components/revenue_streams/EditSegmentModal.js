import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { updateRevenue, getStreamTypes, getRevenues } from "../../../appStore/actions/revenueStreamActions";
import { getCustomerSegments } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class EditSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: { id: this.props.item.stream_type_id, title: this.props.item.stream_type_name },
            price: { id: this.props.item.price_category_id, title: this.props.item.price_category_name },
            priceType: { id: this.props.item.price_type_id, title: this.props.item.price_type_name },
            priceTypeError: '',
            names: this.props.item.segments
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
        const price = this.props.types.prices.find(x => x.id === this.state.price.id);
        console.log('Price type id:' + this.state.priceType.id)
        if (this.state.priceType.id === null) {
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
            "segment": this.props.number,
            "stream_type_id": this.props.item.stream_type_id,
            "price_type_id": this.state.priceType.id,
            "segments": this.state.names
        };

        console.log('Price type id:' + this.state.priceType.id)
        console.log('Revenue id:' + this.props.item.stream_type_id)
        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "price_category_id": this.state.price.id,
            "price_category_name": price.title,
            "price_type_id": this.state.priceType.id,
            "price_type_name": price.types.find(x => x.id === this.state.priceType.id).title,
            "stream_type_id": this.state.revenue.id,
            "stream_type_name": this.props.types.stream_types.find(x => x.id === this.state.revenue.id).title,
            "segment": this.props.item.segment,
            "segments": this.state.names
        }

        //console.log('POST obj:' + JSON.stringify(postObj))
        const tt = price.types.find(x => x.id === this.state.priceType.id)
        console.log(tt.title)

        this.props.updateRevenue(postObj, reducerObj)
        this.props.onClose();
    }

    onNameChange(typeId) {
        const obj = {
            'id': typeId,
            'title': this.props.item.stream_type_name
        }
        this.setState({
            revenue: obj
        });
    }

    onPriceChange(id) {
        const obj = {
            id: id,
            title: this.props.item.price_title
        }
        console.log('Price id:' + id)
        this.setState({
            price: obj
        });
    }

    onPriceTypeChange(typeId) {
        const obj = {
            id: typeId,
            title: this.props.item.price_type_name
        }
        this.setState({
            priceType: obj
        });
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
            revenue: { id: this.props.item.stream_type_id, title: this.props.item.stream_type_name },
            price: { id: this.props.item.price_category_id, title: this.props.item.price_category_name },
            priceType: { id: this.props.item.price_type_id, title: this.props.item.price_type_name },
            //names: this.props.item.segments
        }, () => console.log('Revenue:' + JSON.stringify(this.state.revenue)))
        console.log(this.props.item);

        this.props.getCustomerSegments(this.props.businessPlan.id);
        this.setState({
            segment_name: this.props.customerSegments.consumers.filter((x, index) => x.segment_name != null)
        }, () => console.log(this.state.segment_name))
    }

    render() {
        const streamOptions = this.props.types.stream_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const priceOptions = this.props.types.prices.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const priceTypeOptions = this.state.price.id === null ? [] :
            this.props.types.prices.find(x => x.id === this.state.price.id).types.map((obj) =>
                <Option key={obj.id} value={obj.id}>{obj.title}</Option>
            );
        const consumersNames = this.props.customerSegments.consumers.map((obj) =>
            <Option key={obj.id} value={obj.segment_name}>{obj.segment_name}</Option>
        )

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Edit revenue stream</Space>}
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
                        <Form.Item key="name" label="Revenue Stream Name">
                            <Select style={{ width: '100%' }} placeholder="Select revenue stream" defaultValue={this.state.revenue.title} onChange={this.onNameChange.bind(this)} >
                                {streamOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: "10px" }} key="price" label="Prices">
                            <Select style={{ width: '100%' }} placeholder="Select price" defaultValue={this.state.price.title} onChange={this.onPriceChange.bind(this)} >
                                {priceOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingLeft: "10px" }} key="type" label="Types of pricing"
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Choose type" defaultValue={this.state.priceType.title} onChange={this.onPriceTypeChange.bind(this)} >
                                {priceTypeOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item key="type" name="type" label="Consumers"
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Choose consumer"
                                onChange={this.onNgoTypeChange.bind(this)}
                                mode="multiple"
                                defaultValue={this.state.names}
                                value={this.state.names}
                            >
                                {consumersNames}
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
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { updateRevenue, getStreamTypes, getRevenues, getCustomerSegments })(EditSegmentModal);

