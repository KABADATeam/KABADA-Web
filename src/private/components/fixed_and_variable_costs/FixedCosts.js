import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import FixedCostTable from './FixedCostTable';
import UnsavedChangesHeader from '../UnsavedChangesHeader';


const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}

const { Option } = Select;
const { Text } = Typography;

function FixedCosts(props) {
    const [cost_items, setCostItems] = useState([]);
    const [original_items, setOriginalItems] = useState([])
    const [selectedPeriod, setSelectedPeriod] = useState([]);
    const planId = props.planId;


    const discardChanges = () => {
        console.log('Discard changes')
    }

    const saveChanges = () => {
        console.log('Save changes');
    }

    const setItems = (fixedArray,num) => {
        const array = []
        fixedArray.forEach(element => {
            // for each object in types array create new object and add it to array
            element.types.forEach(element1 => {
                const obj = {
                    category_title: element.category_title,
                    category_id: element.category_id,
                    cost_item_id: element1.cost_item_id,
                    price: element1.price === null ? 0 : element1.price,
                    vat: element1.vat,
                    first_expenses: element1.first_expenses
                }
                array.push(obj)
            });
        });
        if(num === 1){
            setCostItems(array);
        }
        if(num===2){
            setOriginalItems(array)
        }
    }

    // check if two arrays are equal to each other
    const arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.sort();
        b = b.sort();
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const updateCostItemsProperties = (value, record, inputName) => {
        //     console.log(JSON.stringify('Value:'+value))
        //     console.log(JSON.stringify(record))
        const array = cost_items;
        // loop though each object in cost_items array. check for item with given id
        //update price,firstexpenses, or vat rate fields. depending on given input name
        array.forEach(element => {
            if (element.cost_item_id === record.cost_item_id) {
                if (inputName === "price") {
                    element.price = value;
                } else if (inputName === "vat") {
                    element.vat = value;
                } else if (inputName === "first_expenses") {
                    element.first_expenses = value;
                }
            }
        });
        setCostItems(array);
        // props.changeItemsCosts(array);
        console.log(JSON.stringify(cost_items));

        //if array is not equal to original one then
        // if (arraysEqual(original_items, array) === false) {
        //     props.setSaveVisible();
        // }
    }
    const monthsSet = () => {
        const months = []
        for (var a = 1; a < 13; a++) {
            months.push(a);
        }
        setSelectedPeriod(months);
    }

    // const onVat = (e)=>{
    //     console.log(JSON.stringify(e))
    // }

    useEffect(() => {
        setItems(props.financialProjections.fixed,1);
        monthsSet();
        console.log('Use effect cost_items' + JSON.stringify(cost_items))
        //what we put inside [] is basically when one of those
        //change it will recall useEffect once more
        setItems(props.financialProjections.fixed,2);
    }, [props])
    const fixed_costs_columns = [
        {
            title: 'Name',
            dataIndex: 'type_title',
            width: '55%',
        },
        {
            title: 'Euro/mo. without VAT',
            dataIndex: 'price',
            width: '20%',
            render: (text, record, index) => (
                <InputNumber
                    min={0}
                    size="large"
                    defaultValue={text === null ? 0 : text}
                    // value={text === null ? 0 : text}
                    // formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={e => updateCostItemsProperties(e, record, "price")}
                />
            )
        },
        {
            title: 'VAT Rate',
            dataIndex: 'vat',
            width: '10%',
            render: (text, record, index) => (
                <Select defaultValue={text === null ? 'Null' : text} onChange={e => updateCostItemsProperties(e, record, "vat")}>
                    <Option value={props.countryVats.standardRate}>{props.countryVats.standardRate + "%"}</Option>
                    <Option value={props.countryVats.reducedRates2}>{props.countryVats.reducedRates2 + "%"}</Option>
                    <Option value={props.countryVats.reducedRates1}>{props.countryVats.reducedRates1 + "%"}</Option>
                    <Option value={props.countryVats.superReducedRate}>{props.countryVats.superReducedRate === null ? "Null" : props.countryVats.superReducedRate}</Option>
                </Select>
            )
        },
        {
            title: 'First expenses',
            dataIndex: 'first_expenses',
            width: '15%',
            render: (text, record, index) => (
                <Input.Group compact>
                    <Select defaultValue={text === null ? "1st mo." : text} onChange={e => updateCostItemsProperties(e, record, "first_expenses")}>
                        {selectedPeriod.map((value, index) => (
                            <Option value={value + "mo."}>{value + "mo."}</Option>
                        ))}
                    </Select>
                </Input.Group>
            )
        },
    ];
    const costitems = {
        "business_plan_id": props.planId,
        "cost_items": [

        ]
    }
    return (
        <>
            {props.financialProjections.fixed.map((obj, index) => {
                return (
                    <div style={{ marginBottom: 24 }}>
                        <Col span={24}>
                            <Row>
                                <Col span={7}>
                                    {index === 0 ?
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Fixed Costs</Typography.Title>
                                            <Typography.Text style={{ ...textStyle }}>
                                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                                            </Typography.Text>
                                        </div> : <div></div>}
                                </Col>
                                {/* returns second column with table */}
                                {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                                <Col span={17}>
                                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                        <Table
                                            rowKey="id"
                                            columns={fixed_costs_columns}
                                            dataSource={obj.types}
                                            pagination={false}
                                            title={() => obj.category_title}
                                        />
                                    </Card>
                                </Col>

                            </Row>
                        </Col>
                    </div>)
            })}

        </>
    )

}

export default FixedCosts;
