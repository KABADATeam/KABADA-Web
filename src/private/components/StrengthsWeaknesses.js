import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableCardBodyStyle, tableCardStyle, tableTitleStyle, tableDescriptionStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { updateSwotList, createNewItem, deleteItem, updateItem } from "../../appStore/actions/swotAction";

class StrengthsWeaknesses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedStrengths: [],
            checkedWeaknesses: []
        }
    }

    onAddItem = () => {
        const newItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": null,
                "name": "-",
                "operation": 0
            },
            "kind": 0
        };

        this.props.createNewItem(1, newItem);
    }

    onDeleteItem = (item) => {
        const deleteItem = {
            "business_plan_id": this.props.businessPlan.id,
            "strengths_weakness": [
                {
                    "id": item.id,
                    "name": item.title,
                    "operation": -1
                }
            ]
        };
        this.props.deleteItem(1, deleteItem);
    }

    handleState = (item, type, rowIndex) => event => {
        if (type === 1) {  // if strength
            //if strength checked value is 1 else 0
            item.value = event.target.checked === true ? 1 : 0;
            console.log('is checked?'+event.target.checked)
            //checking if strength is checked or not. based on that add to list or delete from it


            const clone = JSON.parse(JSON.stringify(this.state.checkedStrengths))
            const weaknessesClone = JSON.parse(JSON.stringify(this.state.checkedWeaknesses))
            //check if strength is already selected. then i need to delete it
            const index = clone.indexOf(item.id)
            if (index !== null && index !== undefined && index !== -1) {
                //delete value with that index from list
                // clone.splice(index, 1)
                this.setState({
                    checkedStrengths: this.state.checkedStrengths.filter(s => s !== item.id),
                }, () => {
                    console.log('Unceked strengths' + JSON.stringify(this.state.checkedStrengths))
                    // console.log('Weaknesses' + JSON.stringify(this.state.checkedWeaknesses))
                })
                //find weakness with same index and delete it it from checkedWeaknesses
            } else {
                //on add. check if weakness with same index as strengh exist. if so delete it
                this.setState({
                    checkedStrengths: [...this.state.checkedStrengths, item.id]
                }, () => console.log('Checked strength:'+JSON.stringify(this.state.checkedStrengths)))
                const weaknessIndex = weaknessesClone.indexOf(item.id)
                if(weaknessIndex !== null && weaknessIndex !== undefined && weaknessIndex !== -1){
                    // if weakness with same id is checked remove it
                    this.setState({
                        checkedWeaknesses: this.state.checkedWeaknesses.filter(weakness => weakness !== item.id)
                    }, () => {
                        console.log('Deleted weakness:'+JSON.stringify(this.state.checkedWeaknesses))
                    })
                }

            }

        } else {    // weakness
            item.value = event.target.checked === true ? 2 : 0;
            console.log('is checked?'+event.target.checked)

            console.log(item.value)
            // checking if weakness is checked or not. based on that add to list or delete from it
            const clone = JSON.parse(JSON.stringify(this.state.checkedWeaknesses))
            const strengthsClone = JSON.parse(JSON.stringify(this.state.checkedStrengths))
            let index = clone.indexOf(item.id)
            if (index !== null && index !== undefined && index !== -1) {
                // clone.splice(index, 1)
                this.setState({
                    checkedWeaknesses: this.state.checkedWeaknesses.filter(w => w !== item.id)
                }, () => {
                    console.log('Unceked weakness' + JSON.stringify(this.state.checkedWeaknesses))
                })
            } else {
                this.setState({
                    checkedWeaknesses: [...this.state.checkedWeaknesses, item.id]
                }, () => console.log('Checked weakness:'+JSON.stringify(this.state.checkedWeaknesses)))
                const strengthIndex = strengthsClone.indexOf(item.id)
                if(strengthIndex !== null && strengthIndex !== undefined && strengthIndex !== -1){
                    console.log('Strength with same id is checked')
                    console.log(JSON.stringify(this.state.checkedStrengths))
                    this.setState({
                        checkedStrengths: this.state.checkedStrengths.filter(s => s !== item.id)
                    })
                    // if strength with same id is checked remove it
                    // this.state({
                    //     checkedStrengths: this.state.checkedStrengths.filter(strength => strength !== item.id)
                    // }, () => {
                    //     console.log('Deleted strength:'+JSON.stringify(this.state.checkedStrengths))
                    // })
                }

            }
        }

        this.props.updateSwotList(1, item);
        console.log('Item to update:'+JSON.stringify(item))
    };

    isWeaknessDisabled(id) {
        return (
            this.state.checkedWeaknesses.length > 5 && this.state.checkedWeaknesses.indexOf(id) === -1
        )
    }

    isStrengthDisabled(id) {
        return (
            this.state.checkedStrengths.length > 5 && this.state.checkedStrengths.indexOf(id) === -1
        )
    }

    onTitleChange = (item) => event => {
        const updateItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": item.id,
                "name": event.target.value,
                "operation": item.value
            },
            "kind": 0
        };
        if (event.target.value !== '') {
            this.props.updateItem(1, updateItem);
        }
    }

    componentDidMount(){
        const data =  JSON.parse(JSON.stringify(this.props.list.original.strengths_weakness_items.concat(this.props.list.updates.strengths.filter(x => isNaN(x.id) === false))))
        // const data =JSON.parse(JSON.stringify(this.props.list.original.strengths.strengths_weakness_items))
        console.log(JSON.stringify(data))
        data.forEach(element => {
            if(element.value == 1){
                //if value is 1, meaning strength is selected. then add to existing checkedStrengths
                // this.setState({
                //     checkedStrengths: [...this.state.checkedStrengths, element.id]
                // })
                console.log('Strength is selected:'+element.id + "value:"+element.value)
            }else if(element.value == 2){
                console.log('Weakness is selected:'+element.id + "value:"+element.value)
                // this.setState({
                //     checkedWeaknesses: [...this.state.checkedWeaknesses,element.id]
                // })
            }
        });
    }

    render() {
        const data = this.props.list.original.strengths_weakness_items.concat(this.props.list.updates.strengths.filter(x => isNaN(x.id) === false));

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'title',
                key: 'title',
                render: (title, record, rowIndex) => (
                    (record.isLocal === true) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onChange={this.onTitleChange(record)}
                                placeholder="Enter title"
                                defaultValue={record.title}
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.onDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
                        </Space>
                    ) : ((record.title) ? (<Space><Typography>{record.title}</Typography><Tooltip title={record.description}><span><InfoCircleFilled style={{ color: '#BFBFBF' }} /></span></Tooltip></Space>) :
                        (<Space><Typography>{record.title}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Strengths',
                dataIndex: 'strengths',
                key: 'strengths',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 1 ? true : false}
                        // disabled={record.value === 2 ? true : false}
                        disabled={this.isStrengthDisabled(record.id)}
                        onChange={this.handleState(record, 1)}
                    />
                ),
                width: '23%',
            },
            {
                title: 'Weakness',
                dataIndex: 'weakness',
                key: 'weakness',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 2 ? true : false}
                        // disabled={record.value === 1 ? true : false}
                        disabled={this.isWeaknessDisabled(record.id)}
                        onChange={this.handleState(record, 2)}
                    />
                ),
                width: '23%',
            }
        ];

        return (
            <>
                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                    <Table
                        title={() => <>
                            <Typography style={{ ...tableTitleStyle }}>Strengths and weaknesses</Typography>
                            <Typography style={{ ...tableDescriptionStyle }}>
                                Select 3 - 6 items in each column. Each of the item can be selected only for one side – S or W</Typography>
                        </>}
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddItem.bind(this)}><PlusOutlined />Add item</Button>)}
                    />
                </Card>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { updateSwotList, createNewItem, deleteItem, updateItem })(StrengthsWeaknesses);

