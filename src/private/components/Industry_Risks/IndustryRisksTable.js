import React, { Component } from 'react'
import { Table, Typography, Tag } from 'antd';
import '../../../css/IndustryRisks.css'



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
                title: 'Risk',
                dataIndex: 'risk',
                key: 'risk',
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
                render: total => (

                    <Tag >
                        {total === 0 ? <span className='low'>Low</span> : total === 5 ? <span className='medium'>midem</span> : <span className='high'>High</span>}
                    </Tag >

                ),

            }

        ];
        const dataSource = [
            {
                key: 1,
                risk: 'Political and legal',
                likelihood: 'High',
                severity: 'Medium',
                total: 5,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            },
            {

                key: 2,
                risk: 'Economic',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }, {
                key: 3,
                risk: 'Social',
                likelihood: 'High',
                severity: 'Medium',
                total: 9,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }, {

                key: 4,
                risk: 'Technological',
                likelihood: 'High',
                severity: 'Medium',
                total: 0,
                description: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be foundas a welcome guest in many households across the world.'
            }
        ];


        return (
            <div>
                <Table
                    title={this.props.title}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={dataSource}
                    pagination={false}
                />

                <Table
                    style={{ marginTop: '25px' }}
                    title={this.props.title}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Table
                    style={{ marginTop: '25px' }}
                    title={this.props.title}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div >
        )
    }
}