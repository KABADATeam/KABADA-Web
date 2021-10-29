import React from 'react'
import { connect } from 'react-redux';
import { updateFixedAndVarCosts, getFinancialProjectionsCosts, getBusinessStartUpInvestmentInformation } from '../../../appStore/actions/financialProjectionsActions'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Select, InputNumber, Popconfirm, Input, Divider, Modal, Col, Typography, Card, Table, Button } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { isForOfStatement, isGenericTypeAnnotation, thisExpression } from '@babel/types';
// import {getBusinessStartUpInvestmentInformation} from '../../../appStore/actions/businessInvestmentAction'

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
            monthsChecked: null,
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

        original.forEach((element, index) => {
            if (index < this.state.monthsChecked) {
                pricesWithoutDisabled.push(element.price);
            } else if (index >= this.state.monthsChecked) {
                pricesWithoutDisabled.push(0)
            }
        });
        this.props.onVariableChange(pricesWithoutDisabled,this.props.record,"monthly_expenses",1);
        this.setState({
            checked: [],
            data: [],
            monthsChecked: null
        });
        this.props.handleOk();
    }
    //when Selected months is changed
    onMonthsChanged = (value) => {
        this.setState({
            monthsChecked: value
        });
        const array = []
        //loop through array. loop while index is not greater that provided value. add id's to array
        this.state.data.map((obj, index) => {
            if (index <= value - 1) {
                array.push(obj.id)
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
        const array = JSON.parse(JSON.stringify(this.state.data));
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

    loadData = (selectedPeriod) => {
        const duom = []
        console.log('Selected period is: '+this.props.financialProjections.period)

        // if selected period is null then it can be 12 by deefault
        if(selectedPeriod === null || selectedPeriod === 12){
            // checking if there is something in monthly_expenses or not
            if(this.props.monthly_expenses === null || this.props.monthly_expenses === undefined){
                for (var i = 1; i < 13; i++) {
                    duom.push({ id: i, month: i, price: 0 })
                }
            }else if(this.props.monthly_expenses.length === 12 || this.props.monthly_expenses.length === 24){
                //this.props.monthly_expenses.length
                for (var i = 0; i < 12; i++) {
                    console.log('Monthly expenses at index' + i + ' ,and element is:' + this.props.monthly_expenses[i])
                    duom.push({ id: i+1, month: i+1, price: this.props.monthly_expenses[i] })
                }
            }
        }else if(selectedPeriod === 24){
            // if there is no data. set array with 24 prices at 0
            if(this.props.monthly_expenses === null || this.props.monthly_expenses === undefined){
                for(var i=1;i<25;i++){
                    duom.push({id: i, month: i, price: 0})
                }
            }else if(this.props.monthly_expenses.length === 12){
                //add twelve items that exist in monthly_expenses array. then add
                for (var i = 0; i < 24; i++) {
                    console.log('Monthly expenses at index' + i + ' ,and element is:' + this.props.monthly_expenses[i])
                    if(i < 12){
                        duom.push({ id: i+1, month: i+1, price: this.props.monthly_expenses[i]});
                    }else if(i >= 12){
                        duom.push({id: i+1, month: i+1, price: 0});
                    }
                }
            }else if(this.props.monthly_expenses.length === 24){
                for (var i = 0; i < 24; i++) {
                    console.log('Monthly expenses at index' + i + ' ,and element is:' + this.props.monthly_expenses[i])
                    duom.push({ id: i+1, month: i+1, price: this.props.monthly_expenses[i] })
                }
            }
        }
        this.setState({
            data: duom
        });
    }

    componentDidMount() {
        console.log('Business plan Id is: '+this.props.businessPlanId);
        this.props.getBusinessStartUpInvestmentInformation(this.props.businessPlanId,()=>{
            this.setState({monthsChecked: this.props.financialProjections.period});
            this.loadData(this.props.financialProjections.period);
        });
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
                                    <Select defaultValue={this.props.financialProjections.period === null?12:this.props.financialProjections.period}
                                        suffixIcon={<CaretDownFilled />} size='default' onSelect={this.onMonthsChanged.bind(this)}>
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
        financialProjections: state.financialProjections,
    };

}
export default connect(mapStateToProps, { updateFixedAndVarCosts, getFinancialProjectionsCosts,getBusinessStartUpInvestmentInformation })(withRouter(VariableCostPopUp));
