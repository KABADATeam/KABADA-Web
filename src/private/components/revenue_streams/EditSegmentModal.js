import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateRevenue } from "../../../appStore/actions/revenueStreamActions";

const { Option } = Select;

class EditSegmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: this.props.item.stream_type_id,
            price: this.props.item.price_category_id,
            priceType: this.props.item.price_type_id,
            priceTypeError: ''
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    onBack = () => {
        this.props.onClose();
    }

    onOK = () => {
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
            "id": this.props.item.id,
            "business_plan_id": this.props.businessPlan.id,
            "segment": this.props.number,
            "stream_type_id": this.state.revenue,
            "price_type_id": this.state.priceType
        };

        const price = this.props.types.prices.find(x => x.id === this.state.price);
        const reducerObj = {
            "id": this.props.item.id,
            "key": this.props.item.id,
            "price_category_id": this.state.price,
            "price_category_name": price.title,
            "price_type_id": this.state.priceType,
            "price_type_name": price.types.find(x => x.id === this.state.priceType).title,
            "stream_type_id": this.state.revenue,
            "stream_type_name": this.props.types.stream_types.find(x => x.id === this.state.revenue).title,
            "segment": this.props.item.segment
        }

        this.props.updateRevenue(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange (id) {
        this.setState({
            revenue: id
        });
    }

    onPriceChange(id) {
        this.setState({
            price: id,
            priceType: null
        });
    }

    onPriceTypeChange(id) {
        this.setState({
            priceType: id
        });
    }

    render() {
        const streamOptions = this.props.types.stream_types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const priceOptions = this.props.types.prices.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        const priceTypeOptions = this.state.price === null ? [] :
            this.props.types.prices.find(x => x.id === this.state.price).types.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack}/>Edit revenue stream</Space>}
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
                            <Select style={{ width: '100%' }} placeholder="Select revenue stream" value={this.state.revenue} onChange={this.onNameChange.bind(this)} >
                                {streamOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: "10px" }} key="price" label="Prices">
                            <Select style={{ width: '100%' }} placeholder="Select price" value={this.state.price} onChange={this.onPriceChange.bind(this)} >
                                {priceOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingLeft: "10px" }} key="type" label="Types of pricing"
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Choose type" value={this.state.priceType} onChange={this.onPriceTypeChange.bind(this)} >
                                {priceTypeOptions}
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
        businessPlan: state.selectedBusinessPlan,
        types: state.revenueTypes
    };
}

export default connect(mapStateToProps, { updateRevenue })(EditSegmentModal);

