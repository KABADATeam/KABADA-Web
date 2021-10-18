import React from 'react'
import { connect } from 'react-redux';
import {updateFixedAndVarCosts} from '../../../appStore/actions/financialProjectionsActions'
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
        }
    }

    onCancel = () => {
        this.props.handleCancel();
        this.setState({
            checked: [],
            data: [],
            monthsChecked: null
        });
    }
    // save to database

    //on save changes dont save disabled data in array
    save = () => {
        console.log('Checked length is: ' + this.state.checked.length)
        const pricesWithoutDisabled = []
        const original = this.state.data;
        // loop through data array and check if index of each object is less than
        // monthsChecked. 
        original.map((element, index) => {
            if (index < this.state.monthsChecked) {
                pricesWithoutDisabled.push(element.price);
            } else if (index > this.state.monthsChecked) {
                pricesWithoutDisabled.push(element.price)
            }
        });
        console.log('Prices without disabled: ' + JSON.stringify(pricesWithoutDisabled))
        // loop through cost_items state array. put only required fields to items array
        // then then dispatch action to update
        // loop through cost_items state array. put only required fields to items array
        const items = []
        const array = this.props.cost_items;
        array.map((element, index) => {
            if (element.type === "Variable") {
                // update only item with gived id
                if(element.cost_item_id === this.props.record.cost_item_id){
                    const obj = {
                        cost_item_id: element.cost_item_id,
                        price: element.price,
                        vat: element.vat,
                        first_expenses: element.first_expenses,
                        monthly_expenses: pricesWithoutDisabled,
                    }
                    items.push(obj)
                }else{
                    // dont update other elements monthly expenses
                    const obj = {
                        cost_item_id: element.cost_item_id,
                        price: element.price,
                        vat: element.vat,
                        first_expenses: element.first_expenses,
                        monthly_expenses: element.monthly_expenses,
                    }
                    items.push(obj)
                }
                
            } else if (element.type === 'Fixed') {
                const obj = {
                    cost_item_id: element.cost_item_id,
                    price: element.price,
                    vat: element.vat,
                    first_expenses: element.first_expenses,
                    monthly_expenses: null
                }
                items.push(obj);
            }
        });
        // postObject for post request
        const postObject = {
            business_plan_id: this.props.businessPlanId,
            cost_items: items
        }
        this.props.updateFixedAndVarCosts(postObject);

        // set states to null again.and call function handleOk from FixedAndVariableCosts component to close this screen
        this.setState({
            checked: [],
            data: [],
            monthsChecked: null
        });
        this.props.handleOk(pricesWithoutDisabled, this.props.record);
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
            console.log('Monthly expenses are not passed')
        } else {
            for (var i = 0; i < this.props.monthly_expenses.length; i++) {
                console.log('Monthly expenses at index' + i + ' ,and element is:' + this.props.monthly_expenses[i])
                duom.push({ id: i + 1, month: i + 1, price: this.props.monthly_expenses[i] })
            }
            console.log('montly expenses are passed')
        }

        this.setState({
            data: duom
        });
    }
    componentDidMount() {
        this.loadData();
        // console.log('Monthly expenses equal to:'+JSON.stringify(this.props.monthly_expenses));
        console.log('Cost_items array is:'+JSON.stringify(this.props.cost_items))
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
    };
  
  }
export default connect(mapStateToProps,{updateFixedAndVarCosts})(withRouter(VariableCostPopUp));
