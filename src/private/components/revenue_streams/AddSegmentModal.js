import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select } from 'antd';
import '../../../css/customModal.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveRevenue } from "../../../appStore/actions/revenueStreamActions";
import { getCustomerSegments } from "../../../appStore/actions/customerSegmentAction";

const { Option } = Select;

class AddSegmentModal extends Component {
    state = {
        revenue: null,
        price: null,
        priceType: null,
        revenueError: '',
        priceError: '',
        priceTypeError: '',
        segment_names: [],
        names: []
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
            "segments": this.state.names
        };

        const price = this.props.types.prices.find(x => x.id === this.state.price);
        const reducerObj = {
            "price_category_id": this.state.price,
            "price_category_name": price.title,
            "price_type_id": this.state.priceType,
            "price_type_name": price.types.find(x => x.id === this.state.priceType).title,
            "stream_type_id": this.state.revenue,
            "stream_type_name": this.props.types.stream_types.find(x => x.id === this.state.revenue).title,
            "segment": this.props.number,
            "segments": this.state.names
        }
        console.log('POST OBJECT ON CREATE IS: ' + JSON.stringify(postObj))
        this.props.saveRevenue(postObj, reducerObj);

        this.props.onClose();
    }

    onNameChange(id) {
        console.log('Revenue stream name id:' + id)
        this.setState({
            revenue: id
        });
    }

    onPriceChange(id) {
        console.log('Price id:' + id)
        this.setState({
            price: id,
            priceType: null
        });
    }

    onPriceTypeChange(id) {
        console.log('Price type id:' + id)
        this.setState({
            priceType: id
        });
    }

    componentDidMount() {
        this.props.getCustomerSegments(this.props.businessPlan.id);
        this.setState({
            segment_name: this.props.customerSegments.consumers.filter((x, index) => x.segment_name != null)
        }, () => console.log(this.state.segment_name))

        console.log(this.props.customerSegments.consumers)

    }
    onNgoTypeChange(value) {
        this.setState({
            names: value
        });
    }
    render() {
        const additionalTitle = this.props.number === 3 ? '(other)' : '(segment ' + this.props.number + ')';
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
        const consumersNames = this.props.customerSegments.consumers.map((obj) =>
            <Option key={obj.segment_name} value={obj.segment_name}>{obj.segment_name}</Option>
        )
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Add revenue stream {additionalTitle}</Space>}
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
                        <Form.Item key="name" name="name" label="Revenue Stream Name"
                            validateStatus={this.state.revenueError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Select revenue stream" onChange={this.onNameChange.bind(this)} >
                                {streamOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: "10px" }} key="price" name="price" label="Prices"
                            validateStatus={this.state.priceError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Select price" onChange={this.onPriceChange.bind(this)} >
                                {priceOptions}
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 0px)', paddingLeft: "10px" }} key="type" name="type" label="Types of pricing"
                            validateStatus={this.state.priceTypeError !== '' ? 'error' : 'success'}>
                            <Select style={{ width: '100%' }} placeholder="Choose type" disabled={this.state.price === null ? true : false} onChange={this.onPriceTypeChange.bind(this)} >
                                {priceTypeOptions}
                            </Select>
                        </Form.Item>


                        <Form.Item key="names" name="names" label="Consumers"
                        //validateStatus={this.state.segment_name !== null ? 'error' : 'success'}
                        >
                            <Select style={{ width: '100%' }}
                                placeholder="Choose consumer"
                                mode="multiple"
                                onChange={this.onNgoTypeChange.bind(this)} >
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
        businessPlan: state.selectedBusinessPlan,
        types: state.revenueTypes,
        customerSegments: state.customerSegments,
    };
}

export default connect(mapStateToProps, { saveRevenue, getCustomerSegments })(AddSegmentModal);

