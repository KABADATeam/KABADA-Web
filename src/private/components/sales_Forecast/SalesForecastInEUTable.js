import React from 'react'
import { Input, Select, Table } from 'antd';

function SalesForecastInEUTable() {
    const dataSource = [
        {
            key: '1',
            month: 1,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '2',
            month: 2,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '3',
            month: 3,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '4',
            month: 4,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '5',
            month: 5,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '6',
            month: 6,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '7',
            month: 7,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '8',
            month: 8,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '9',
            month: 9,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '10',
            month: 10,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '11',
            month: 11,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        }, {
            key: '12',
            month: 12,
            withoutVAT: 5,
            Qty: 100,
            total: '$' + 500.00,
            vat: 21 + '%',
            paid: 'Immediate',
        },

    ];

    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',


        },
        {
            title: 'Euro/pc without VAT',
            dataIndex: 'withoutVAT',
            key: 'withoutVAT',
            width: '5%',
            render: text => <input className="input-in-table" placeholder={text} />,
        },
        {
            title: 'Qty',
            dataIndex: 'Qty',
            key: 'Qty',
            width: '5%',
            render: text => <input className="input-in-table" placeholder={text} />,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '5%',
        },
        {
            title: 'VAT',
            dataIndex: 'vat',
            key: 'vat',
            width: '10%',
            render: () => (
                <Input.Group compact>
                    <Select defaultValue="21%">
                        <Option value="21">21 %</Option>
                        <Option value="30">30 %</Option>
                        <Option value="40">40 %</Option>
                    </Select>
                </Input.Group>
            )
        },
        {
            title: 'When paid',
            dataIndex: 'paid',
            key: 'paid',
            width: '10%',
            render: () => (
                <Input.Group compact>
                    <Select defaultValue="Immediate">
                        <Option value="Immediate">Immediate</Option>
                        <Option value="Next month">Next month</Option>
                        <Option value="After two months">After two months</Option>
                        <Option value="After three months">After three months</Option>
                        <Option value="One month in advance">One month in advance</Option>
                    </Select>
                </Input.Group>
            )
        },
    ];
    const { Option } = Select;
    return (
        <div>


            <Table title={() => 'Sales forecast in EU'} columns={columns} dataSource={dataSource} pagination={false} />


        </div>
    )
}

export default SalesForecastInEUTable;