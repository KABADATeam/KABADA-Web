import React from 'react'
import { connect } from 'react-redux';
import { updateFixedAndVarCosts, getFinancialProjectionsCosts } from '../../../appStore/actions/financialProjectionsActions'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Select, InputNumber, Popconfirm, Input, Divider, Modal, Col, Typography, Card, Table, Button } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { thisExpression } from '@babel/types';

const { Option } = Select;
const { Text } = Typography;

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    marginBottom: "20px",
}
class VariableCostPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthsChecked: 12,
            checked: [],
            data: [],
            cost_items: []
        }
    }

    onCancel = () => {
        this.props.handleCancel();
        this.setState({
            checked: [],
            data: [],
            monthsChecked: null,
        });
    }

    //on save changes dont save disabled data in array
    save = () => {
        const pricesWithoutDisabled = [];
        const original = this.state.data;
        // clone fixed and variable states that are passed to this component
        const modifiedFixedArray = JSON.parse(JSON.stringify(this.props.fixed));
        const modifiedVariableArray = JSON.parse(JSON.stringify(this.props.variable));
        const originalFixedArray = JSON.parse(JSON.stringify(this.props.originalFixed));
        const originalVariableArray = JSON.parse(JSON.stringify(this.props.originalVariable));
        const items = [];
        // loop through data array and check if index of each object is less than monthsChecked
        original.forEach((element, index) => {
            if (index < this.state.monthsChecked) {
                pricesWithoutDisabled.push(element.price);
            } else if (index >= this.state.monthsChecked) {
                pricesWithoutDisabled.push(0)
            }
        });

        //check what elements where changed
        // looping through original array and checking if any of attributes where changed in modified array 
        originalFixedArray.map((obj, index) => {
            obj.types.map((element, index1) => {
                if (originalFixedArray[index].types[index1].price !== modifiedFixedArray[index].types[index1].price ||
                    originalFixedArray[index].types[index1].vat !== modifiedFixedArray[index].types[index1].vat ||
                    originalFixedArray[index].types[index1].first_expenses !== modifiedFixedArray[index].types[index1].first_expenses ||
                    originalFixedArray[index].types[index1].monthly_expenses !== modifiedFixedArray[index].types[index1].monthly_expenses
                ) {
                    const modifiedObj = {
                        cost_item_id: modifiedFixedArray[index].types[index1].cost_item_id,
                        price: modifiedFixedArray[index].types[index1].price,
                        vat: modifiedFixedArray[index].types[index1].vat,
                        first_expenses: modifiedFixedArray[index].types[index1].first_expenses,
                        monthly_expenses: modifiedFixedArray[index].types[index1].monthly_expenses
                    }
                    items.push(modifiedObj);
                }
            });
        });

        // looping through originalVariableArray and checking if attributes values where changed in modified array 
        originalVariableArray.map((obj, index) => {
            obj.types.map((element, index1) => {
                // first for element with this cost_item_id. all other elements will be checked in other way
                if(element.cost_item_id === this.props.record.cost_item_id){
                    const modifiedObj = {
                        cost_item_id: modifiedVariableArray[index].types[index1].cost_item_id,
                        price: modifiedVariableArray[index].types[index1].price,
                        vat: modifiedVariableArray[index].types[index1].vat,
                        first_expenses: modifiedVariableArray[index].types[index1].first_expenses,
                        monthly_expenses: pricesWithoutDisabled
                    }
                    items.push(modifiedObj);
                }else{
                    // in variable state only vat could be changed
                    if (originalVariableArray[index].types[index1].vat !== modifiedVariableArray[index].types[index1].vat) {
                        const modifiedObj = {
                            cost_item_id: modifiedVariableArray[index].types[index1].cost_item_id,
                            price: modifiedVariableArray[index].types[index1].price,
                            vat: modifiedVariableArray[index].types[index1].vat,
                            first_expenses: modifiedVariableArray[index].types[index1].first_expenses,
                            monthly_expenses: modifiedVariableArray[index].types[index1].monthly_expenses
                        }
                        items.push(modifiedObj);
                    }
                }
            });
        });
        // postObject for update
        const postObject = {
            business_plan_id: this.props.businessPlan.id,
            cost_items: items
        }

        // dispatching action to update fixedAndVar costs
        this.props.updateFixedAndVarCosts(postObject);

        this.setState({
            checked: [],
            data: [],
            monthsChecked: null
        });
        this.props.handleOk();
    }
    //when Selected months is changed
    onMonthsChanged = (value) => {
        console.log(value)
        this.setState({
            monthsChecked: value
        });
        const array = []
        //loop through array. loop while index is not greater that provided value. add id's to array
        this.state.data.map((obj, index) => {
            if (index <= value - 1) {
                array.push(obj.id)
                console.log(obj.id)
            }
        });
        this.setState({
            checked: array
        });
    }

    isDisabled = id => {
        return (
            this.state.checked.length > 0 && this.state.checked.indexOf(id) === -1
        );
    };

    onDataChange = (record, value) => {
        const array = this.state.data;
        array.forEach(element => {
            if (element.id === record.id) {
                element.price = value;
            }
        });
        this.setState({
            data: array
        });
        console.log('State set to:' + JSON.stringify(this.state.data))
    }

    loadData = () => {
        const duom = []
        if (this.props.monthly_expenses === null || this.props.monthly_expenses === undefined) {
            for (var i = 1; i < 13; i++) {
                duom.push({ id: i, month: i, price: 0 })
            }
        } else {
            for (var i = 0; i < this.props.monthly_expenses.length; i++) {
                console.log('Monthly expenses at index' + i + ' ,and element is:' + this.props.monthly_expenses[i])
                duom.push({ id: i + 1, month: i + 1, price: this.props.monthly_expenses[i] })
            }
        }
        this.setState({
            data: duom
        });
    }

    componentDidMount() {
        // this.props.getFinancialProjectionsCosts(this.props.businessPlan.id, () => {
        //     console.log('VariableCostPopUp:  ' + JSON.stringify(this.props.variable));
            
        // });
        this.loadData();
        // console.log('Monthly expenses equal to:'+JSON.stringify(this.props.monthly_expenses));
    }
    render() {
        const columns = [
            {
                title: 'Month',
                dataIndex: 'month',
                width: '65%'
            },
            {
                title: 'Euro/mo. without VAT',
                dataIndex: 'price',
                width: '35%',
                render: (text, record, index) => {
                    if (index === 0) { }
                    return (<InputNumber
                        defaultValue={text === null ? 0 : text}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        key={record.id}
                        disabled={this.isDisabled(record.id)}
                        onChange={(e) => this.onDataChange(record, e)}
                    />)
                }
            }
        ]
        return (
            <>
                <Modal
                    // title={this.props.category_title}
                    visible={this.props.visible}
                    onCancel={this.onCancel}
                    saveChanges={this.save}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.save} htmlType="submit" type={'primary'}>Save</Button>
                        </div>
                    }
                >
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <div style={{ display: 'flex' }}>
                            <Col span={12}>
                                <div style={{ marginTop: 24, marginLeft: 16 }}>
                                    <Text style={{ ...titleTextStyle }}>All months?</Text>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ float: "right", marginTop: 16, marginBottom: 16, marginRight: 16 }}>
                                    <Select defaultValue={12} suffixIcon={<CaretDownFilled />} size='default' onSelect={this.onMonthsChanged.bind(this)}>
                                        {this.state.data.map((obj, index) => (
                                            <Option value={obj.id}>{obj.month + "mo."}</Option>
                                        ))}
                                    </Select>
                                </div>
                            </Col>
                        </div>
                    </Card>
                    <div style={{ marginTop: "15px" }}></div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                        title={() => this.props.category_title}
                    />
                </Modal>
            </>
        )
    }

}

// selecting part of data from store. selecting states basically as with useSelector
//It is called every time the store state changes.
const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        financialProjections: state.financialProjections
    };

}
export default connect(mapStateToProps, { updateFixedAndVarCosts, getFinancialProjectionsCosts })(withRouter(VariableCostPopUp));
