import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableCardBodyStyle, tableCardStyle, tableTitleStyle, tableDescriptionStyle } from '../../../../styles/customStyles';
import '../../../../css/swotStyle.css';
import { connect } from 'react-redux';
import { createNewItem, deleteItem, updateItem, updateCheckedStrenghsAndOportunities } from "../../../../appStore/actions/swotAction";
import TooltipComponent from '../../../components/Tooltip';

class StrengthsWeaknesses extends Component {

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
                                placeholder="Enter title"
                                defaultValue={record.title}
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.onDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
                        </Space>
                    ) : ((record.title) ? (<Space><Typography>{record.title}<TooltipComponent code={'swotsw'+rowIndex} type='text'/></Typography></Space>):
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
                        disabled={true}
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
                        disabled={true}
                    />
                ),
                width: '23%',
            }
        ];

        return (
            <>
                <Table
                    title={() => <>
                        <Typography style={{ ...tableTitleStyle }}>Strengths and weaknesses</Typography>
                        <Typography style={{ ...tableDescriptionStyle }}>
                            Select 3 - 6 items in each column. Each of the item can be selected only for one side – S or W</Typography>
                    </>}
                    dataSource={data}
                    columns={columns}
                    pagination={false} 
                />
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

export default connect(mapStateToProps, { createNewItem, deleteItem, updateItem, updateCheckedStrenghsAndOportunities })(StrengthsWeaknesses);

