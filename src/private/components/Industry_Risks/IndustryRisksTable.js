import React, { Component } from 'react'
import { Table, Typography } from 'antd';
const { Text } = Typography;
export default class IndustryRisksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        const columns = [
            {
                // <PlusSquareOutlined style={{ fontSize: '20px' }} />
                title: 'Risk',
                dataIndex: 'risk',
                key: 'risk',
                width: '35%',
                render: (text, record, index) =>
                    <Text> {record.risk}</Text>

            },
            {
                title: 'Likelihood',
                dataIndex: 'likelihood',
                key: 'likelihood',
                width: '15%',
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                key: 'severity',
                width: '5%',

            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '5%',

            }

        ];
        const dataSource = [
            {
                id: 1,
                risk: 'Political and legal',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }, {

                id: 2,
                risk: 'Economic',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }, {
                id: 3,
                risk: 'Social',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }, {

                id: 4,
                risk: 'Technological',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }
        ];
        return (
            <div>
                <Table title={() => this.props.title} columns={columns} dataSource={dataSource} expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }} pagination={false} />
            </div>
        )
    }
}
