import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableTitleStyle, tableDescriptionStyle, tableCardBodyStyle, tableCardStyle } from '../../../../styles/customStyles';
import '../../../../css/swotStyle.css';
import { connect } from 'react-redux';
import { createNewItem, updateItem, deleteItem, updateCheckedStrenghsAndOportunities } from "../../../../appStore/actions/swotAction";
import TooltipComponent from '../../../components/Tooltip';

class OpportunitiesThreats extends Component {

    
    // 
    render() {
        const data = this.props.list.original.oportunities_threats.concat(this.props.list.updates.opportunities.filter(x => isNaN(x.id) === false));

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
                    ) : ((record.title) ? (<Space><Typography>{record.title}<TooltipComponent code={'swotot'+rowIndex} type='text'/></Typography></Space>) :
                        (<Space><Typography>{record.title}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Opportunities',
                dataIndex: 'checkedOpportunities',
                key: 'checkedOpportunities',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 3 ? true : false}
                        disabled={true} 
                    />
                ),
                width: '23%',
            },
            {
                title: 'Threats',
                dataIndex: 'checkedThreats',
                key: 'checkedThreats',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 4 ? true : false}
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
                        <Typography style={{ ...tableTitleStyle }}>Opportunities and threats</Typography>
                        <Typography style={{ ...tableDescriptionStyle }}>
                            List of predefined options for each part, where some of the items can be define for both sides,
                            some can be simultaneously on both sides, some only for O or T part</Typography>
                    </>}
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        list: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { createNewItem, updateItem, deleteItem, updateCheckedStrenghsAndOportunities })(OpportunitiesThreats);

