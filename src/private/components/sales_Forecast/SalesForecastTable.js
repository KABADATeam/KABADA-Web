import React from 'react'
import { Table } from 'antd';

function SalesForecastTable({ columns, dataSource }) {

    return (
        <div>


            <Table title={() => 'Sales forecast in EU'} columns={columns} dataSource={dataSource} pagination={false} />


        </div>
    )
}

export default SalesForecastTable;